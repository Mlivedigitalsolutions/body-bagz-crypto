import { useEffect, useRef, useState } from 'react';
import { Game, AUTO } from 'phaser';
import { MainScene } from './scenes/MainScene';
import { useUser } from '@/contexts/UserContext';
import { useToast } from '@/hooks/use-toast';
import { Button } from '@/components/ui/button';
import { Pause, Play, Settings, Home, Volume2, VolumeX } from 'lucide-react';
import { Card, CardContent } from '@/components/ui/card';
import { apiRequest } from '@/lib/queryClient';

interface GameCanvasProps {
  onExit: () => void;
}

interface GameStats {
  score: number;
  bestScore: number;
  combo: number;
  timeAlive: number;
  isGameOver: boolean;
}

export function GameCanvas({ onExit }: GameCanvasProps) {
  const gameRef = useRef<HTMLDivElement>(null);
  const phaserGameRef = useRef<Game | null>(null);
  const mainSceneRef = useRef<MainScene | null>(null);
  const [isPaused, setIsPaused] = useState(false);
  const [showPauseMenu, setShowPauseMenu] = useState(false);
  const [showGameOver, setShowGameOver] = useState(false);
  const [controlsMode, setControlsMode] = useState<'gestures' | 'buttons'>('gestures');
  const [performanceMode, setPerformanceMode] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [gameStats, setGameStats] = useState<GameStats>({
    score: 0,
    bestScore: parseInt(localStorage.getItem('rughunter_best') || '0'),
    combo: 0,
    timeAlive: 0,
    isGameOver: false
  });

  const { user } = useUser();
  const { toast } = useToast();

  // Initialize game
  useEffect(() => {
    if (!gameRef.current) return;

    const config = {
      type: AUTO,
      width: window.innerWidth,
      height: window.innerHeight,
      parent: gameRef.current,
      backgroundColor: '#000000',
      physics: {
        default: 'arcade',
        arcade: {
          gravity: { y: 300 },
          debug: false
        }
      },
      scale: {
        mode: Phaser.Scale.RESIZE,
        autoCenter: Phaser.Scale.CENTER_BOTH,
      },
      scene: [MainScene],
      input: {
        activePointers: 1,
      },
    };

    phaserGameRef.current = new Game(config);
    
    // Get reference to main scene
    phaserGameRef.current.scene.start('MainScene', {
      controlsMode,
      performanceMode,
      soundEnabled,
      onStatsUpdate: (stats: Partial<GameStats>) => {
        setGameStats(prev => ({ ...prev, ...stats }));
      },
      onGameOver: handleGameOver,
      onPause: () => setShowPauseMenu(true),
    });

    mainSceneRef.current = phaserGameRef.current.scene.getScene('MainScene') as MainScene;

    return () => {
      if (phaserGameRef.current) {
        phaserGameRef.current.destroy(true);
        phaserGameRef.current = null;
      }
    };
  }, []);

  // Handle game over
  const handleGameOver = async (finalStats: GameStats) => {
    setGameStats(finalStats);
    setShowGameOver(true);

    // Update best score
    if (finalStats.score > finalStats.bestScore) {
      localStorage.setItem('rughunter_best', finalStats.score.toString());
      setGameStats(prev => ({ ...prev, bestScore: finalStats.score }));
    }

    // Track action and save score
    if (user) {
      try {
        // Track arcade score action (max 50 points per session)
        const points = Math.min(Math.floor(finalStats.score / 10), 50);
        await apiRequest('/api/actions/track', {
          method: 'POST',
          body: { actionType: 'arcade_score', points }
        });

        // Save game score content
        await apiRequest(`/api/users/${user.id}/content`, {
          method: 'POST',
          body: {
            contentType: 'game_score',
            title: 'Rug Hunter',
            content: JSON.stringify({ score: finalStats.score }),
            metadata: { 
              mode: 'mobile',
              controlsUsed: controlsMode,
              timeAlive: finalStats.timeAlive,
              combo: finalStats.combo
            }
          }
        });

        // Analytics
        await apiRequest('/api/analytics', {
          method: 'POST',
          body: {
            events: [{
              event: 'game_end',
              properties: {
                score: finalStats.score,
                duration: finalStats.timeAlive,
                controls: controlsMode,
                combo: finalStats.combo
              }
            }]
          }
        });

        toast({
          title: "Score Saved!",
          description: `+${points} chaos points earned`,
        });
      } catch (error) {
        console.error('Error saving game stats:', error);
      }
    }
  };

  const handlePause = () => {
    if (!mainSceneRef.current) return;
    
    if (isPaused) {
      mainSceneRef.current.scene.resume();
      setIsPaused(false);
      setShowPauseMenu(false);
    } else {
      mainSceneRef.current.scene.pause();
      setIsPaused(true);
      setShowPauseMenu(true);
    }
  };

  const handleRestart = () => {
    if (!mainSceneRef.current) return;
    
    setShowGameOver(false);
    setShowPauseMenu(false);
    setIsPaused(false);
    
    // Restart the scene
    mainSceneRef.current.scene.restart({
      controlsMode,
      performanceMode,
      soundEnabled,
      onStatsUpdate: (stats: Partial<GameStats>) => {
        setGameStats(prev => ({ ...prev, ...stats }));
      },
      onGameOver: handleGameOver,
      onPause: () => setShowPauseMenu(true),
    });

    // Analytics
    apiRequest('/api/analytics', {
      method: 'POST',
      body: {
        events: [{
          event: 'game_start',
          properties: { controls: controlsMode }
        }]
      }
    });
  };

  const handlePostTweet = () => {
    const tweetText = `Just hunted down some ruggers and scored ${gameStats.score} points in Body Bagz Rug Hunter! 🎮💀 The villain era gaming is here. #BodyBagz #RugHunter`;
    window.open(`https://twitter.com/intent/tweet?text=${encodeURIComponent(tweetText)}`, '_blank');
  };

  return (
    <div className="relative w-full h-screen bg-black overflow-hidden">
      {/* Game Canvas */}
      <div ref={gameRef} className="w-full h-full" />

      {/* HUD Overlay */}
      <div className="absolute top-0 left-0 right-0 p-4 z-10 pointer-events-none">
        <div className="flex justify-between items-start">
          {/* Score Display */}
          <div className="text-left pointer-events-none">
            <div className="text-4xl font-brand text-toxic-green mb-1">
              {gameStats.score.toLocaleString()}
            </div>
            <div className="text-sm text-ash-white/80">
              Time: {Math.floor(gameStats.timeAlive)}s
            </div>
            {gameStats.combo > 1 && (
              <div className="text-lg font-tech text-glitch-purple">
                Villain Streak x{gameStats.combo}
              </div>
            )}
          </div>

          {/* Pause Button */}
          <Button
            onClick={handlePause}
            className="pointer-events-auto bg-blood-red/20 hover:bg-blood-red/40 border border-blood-red/50 text-blood-red p-3"
            size="sm"
          >
            {isPaused ? <Play className="w-4 h-4" /> : <Pause className="w-4 h-4" />}
          </Button>
        </div>
      </div>

      {/* Controls Toggle (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-10">
        <Button
          onClick={() => setControlsMode(prev => prev === 'gestures' ? 'buttons' : 'gestures')}
          className="bg-onyx/80 hover:bg-onyx border border-dim-gray text-ash-white text-xs px-3 py-2"
          size="sm"
        >
          {controlsMode === 'gestures' ? '👆 Gestures' : '🎮 Buttons'}
        </Button>
      </div>

      {/* Button Controls (when enabled) */}
      {controlsMode === 'buttons' && !showPauseMenu && !showGameOver && (
        <div className="absolute bottom-16 left-0 right-0 flex justify-between px-8 z-10">
          {/* Movement Buttons */}
          <div className="flex space-x-3">
            <Button
              className="bg-toxic-green/20 hover:bg-toxic-green/40 border border-toxic-green/50 text-toxic-green w-14 h-14 text-2xl"
              onTouchStart={() => mainSceneRef.current?.handleInput('left', true)}
              onTouchEnd={() => mainSceneRef.current?.handleInput('left', false)}
              onMouseDown={() => mainSceneRef.current?.handleInput('left', true)}
              onMouseUp={() => mainSceneRef.current?.handleInput('left', false)}
            >
              ⬅️
            </Button>
            <Button
              className="bg-toxic-green/20 hover:bg-toxic-green/40 border border-toxic-green/50 text-toxic-green w-14 h-14 text-2xl"
              onTouchStart={() => mainSceneRef.current?.handleInput('right', true)}
              onTouchEnd={() => mainSceneRef.current?.handleInput('right', false)}
              onMouseDown={() => mainSceneRef.current?.handleInput('right', true)}
              onMouseUp={() => mainSceneRef.current?.handleInput('right', false)}
            >
              ➡️
            </Button>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col space-y-2">
            <Button
              className="bg-blood-red/20 hover:bg-blood-red/40 border border-blood-red/50 text-blood-red w-12 h-8 text-xs"
              onClick={() => mainSceneRef.current?.handleInput('jump')}
            >
              JUMP
            </Button>
            <Button
              className="bg-blood-red/20 hover:bg-blood-red/40 border border-blood-red/50 text-blood-red w-16 h-16 font-bold"
              onClick={() => mainSceneRef.current?.handleInput('tag')}
            >
              TAG
            </Button>
          </div>
        </div>
      )}

      {/* Pause Menu */}
      {showPauseMenu && (
        <div className="absolute inset-0 bg-black/80 flex items-center justify-center z-20">
          <Card className="neon-card bg-jet-black border-blood-red max-w-sm w-full mx-4">
            <CardContent className="p-6 text-center space-y-4">
              <h2 className="font-brand text-3xl text-blood-red">PAUSED</h2>
              
              <div className="space-y-3">
                <Button
                  onClick={handlePause}
                  className="w-full bg-toxic-green hover:bg-toxic-green/80 text-black font-bold"
                >
                  Resume Game
                </Button>
                
                <Button
                  onClick={() => setControlsMode(prev => prev === 'gestures' ? 'buttons' : 'gestures')}
                  variant="outline"
                  className="w-full"
                >
                  Controls: {controlsMode === 'gestures' ? 'Gestures' : 'Buttons'}
                </Button>
                
                <Button
                  onClick={() => setPerformanceMode(!performanceMode)}
                  variant="outline"
                  className="w-full"
                >
                  Performance: {performanceMode ? 'High' : 'Standard'}
                </Button>
                
                <Button
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  variant="outline"
                  className="w-full flex items-center justify-center gap-2"
                >
                  {soundEnabled ? <Volume2 className="w-4 h-4" /> : <VolumeX className="w-4 h-4" />}
                  Sound: {soundEnabled ? 'On' : 'Off'}
                </Button>
                
                <Button
                  onClick={onExit}
                  variant="outline"
                  className="w-full text-blood-red border-blood-red hover:bg-blood-red/10"
                >
                  <Home className="w-4 h-4 mr-2" />
                  Exit Game
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Game Over Screen */}
      {showGameOver && (
        <div className="absolute inset-0 bg-black/90 flex items-center justify-center z-20">
          <Card className="neon-card bg-jet-black border-blood-red max-w-md w-full mx-4">
            <CardContent className="p-8 text-center space-y-6">
              <h2 className="font-brand text-4xl text-blood-red mb-4">GAME OVER</h2>
              
              <div className="space-y-3 text-ash-white">
                <div className="flex justify-between">
                  <span>Final Score:</span>
                  <span className="text-toxic-green font-bold">{gameStats.score.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Best Score:</span>
                  <span className="text-yellow-400 font-bold">{gameStats.bestScore.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Best Combo:</span>
                  <span className="text-glitch-purple font-bold">x{gameStats.combo}</span>
                </div>
                <div className="flex justify-between">
                  <span>Time Survived:</span>
                  <span className="text-ash-white font-bold">{Math.floor(gameStats.timeAlive)}s</span>
                </div>
              </div>

              {gameStats.score > gameStats.bestScore && (
                <div className="text-center p-3 bg-toxic-green/10 border border-toxic-green/30 rounded-lg">
                  <div className="text-toxic-green font-bold">🎉 NEW HIGH SCORE! 🎉</div>
                </div>
              )}
              
              <div className="space-y-3">
                <Button
                  onClick={handleRestart}
                  className="w-full bg-toxic-green hover:bg-toxic-green/80 text-black font-bold text-lg py-3"
                >
                  Play Again
                </Button>
                
                <div className="grid grid-cols-2 gap-3">
                  <Button
                    onClick={handlePostTweet}
                    className="bg-blood-red hover:bg-blood-red/80 text-white font-bold"
                  >
                    Post Chaos Tweet
                  </Button>
                  
                  <Button
                    onClick={() => window.location.href = '/leaderboard'}
                    className="bg-glitch-purple hover:bg-glitch-purple/80 text-white font-bold"
                  >
                    Leaderboard
                  </Button>
                </div>
                
                <Button
                  onClick={onExit}
                  variant="outline"
                  className="w-full text-blood-red border-blood-red hover:bg-blood-red/10"
                >
                  Exit to Home
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      )}

      {/* How to Play (Collapsible) */}
      <div className="absolute bottom-4 right-4 z-10">
        <details className="group">
          <summary className="cursor-pointer bg-onyx/80 hover:bg-onyx border border-dim-gray text-ash-white text-xs px-3 py-2 rounded-lg">
            How to Play
          </summary>
          <div className="absolute bottom-full right-0 mb-2 bg-jet-black border border-dim-gray rounded-lg p-4 text-ash-white text-xs w-64 group-open:block hidden">
            <h3 className="font-bold text-toxic-green mb-2">Controls:</h3>
            <ul className="space-y-1 text-xs">
              <li>• <strong>Swipe Left/Right:</strong> Move lanes</li>
              <li>• <strong>Swipe Up:</strong> Jump over hazards</li>
              <li>• <strong>Swipe Down:</strong> Slide under hazards</li>
              <li>• <strong>Tap:</strong> Tag nearby ruggers</li>
            </ul>
            <div className="mt-3 text-toxic-green text-xs">
              <strong>Goal:</strong> Hunt down crypto ruggers and avoid obstacles!
            </div>
          </div>
        </details>
      </div>
    </div>
  );
}