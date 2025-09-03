import { useState, useEffect, useRef, useCallback } from "react";
import { X, Zap } from "lucide-react";
import { useUser } from "@/contexts/UserContext";
import { useToast } from "@/hooks/use-toast";

interface GameState {
  player: { x: number; y: number };
  tokens: { x: number; y: number; id: number }[];
  obstacles: { x: number; y: number; id: number }[];
  score: number;
  timeLeft: number;
  gameRunning: boolean;
  gameOver: boolean;
}

interface EasterEggGameProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function EasterEggGame({ isOpen, onClose }: EasterEggGameProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const { user, trackAction } = useUser();
  const { toast } = useToast();
  
  const [gameState, setGameState] = useState<GameState>({
    player: { x: 50, y: 250 },
    tokens: [],
    obstacles: [],
    score: 0,
    timeLeft: 60,
    gameRunning: false,
    gameOver: false
  });

  const [keys, setKeys] = useState<Set<string>>(new Set());

  // Game dimensions
  const CANVAS_WIDTH = 800;
  const CANVAS_HEIGHT = 500;
  const PLAYER_SIZE = 20;
  const TOKEN_SIZE = 15;
  const OBSTACLE_SIZE = 25;

  // Initialize game
  const initGame = useCallback(() => {
    const tokens = [];
    const obstacles = [];
    
    // Generate tokens
    for (let i = 0; i < 15; i++) {
      tokens.push({
        x: Math.random() * (CANVAS_WIDTH - TOKEN_SIZE),
        y: Math.random() * (CANVAS_HEIGHT - TOKEN_SIZE),
        id: i
      });
    }
    
    // Generate obstacles
    for (let i = 0; i < 8; i++) {
      obstacles.push({
        x: Math.random() * (CANVAS_WIDTH - OBSTACLE_SIZE),
        y: Math.random() * (CANVAS_HEIGHT - OBSTACLE_SIZE),
        id: i
      });
    }

    setGameState({
      player: { x: 50, y: 250 },
      tokens,
      obstacles,
      score: 0,
      timeLeft: 60,
      gameRunning: true,
      gameOver: false
    });
  }, []);

  // Collision detection
  const checkCollision = (rect1: any, rect2: any, size1: number, size2: number) => {
    return rect1.x < rect2.x + size2 &&
           rect1.x + size1 > rect2.x &&
           rect1.y < rect2.y + size2 &&
           rect1.y + size1 > rect2.y;
  };

  // Game loop
  const gameLoop = useCallback(() => {
    if (!gameState.gameRunning || gameState.gameOver) return;

    setGameState(prev => {
      const newState = { ...prev };
      
      // Move player
      const speed = 4;
      if (keys.has('ArrowUp') && newState.player.y > 0) {
        newState.player.y -= speed;
      }
      if (keys.has('ArrowDown') && newState.player.y < CANVAS_HEIGHT - PLAYER_SIZE) {
        newState.player.y += speed;
      }
      if (keys.has('ArrowLeft') && newState.player.x > 0) {
        newState.player.x -= speed;
      }
      if (keys.has('ArrowRight') && newState.player.x < CANVAS_WIDTH - PLAYER_SIZE) {
        newState.player.x += speed;
      }

      // Check token collection
      newState.tokens = newState.tokens.filter(token => {
        if (checkCollision(newState.player, token, PLAYER_SIZE, TOKEN_SIZE)) {
          newState.score += 100;
          return false;
        }
        return true;
      });

      // Check obstacle collision
      const hitObstacle = newState.obstacles.some(obstacle =>
        checkCollision(newState.player, obstacle, PLAYER_SIZE, OBSTACLE_SIZE)
      );

      if (hitObstacle) {
        newState.gameOver = true;
        newState.gameRunning = false;
      }

      // Update time
      newState.timeLeft -= 0.016; // 60fps

      // Check win/lose conditions
      if (newState.timeLeft <= 0 || newState.tokens.length === 0) {
        newState.gameOver = true;
        newState.gameRunning = false;
      }

      return newState;
    });

    animationRef.current = requestAnimationFrame(gameLoop);
  }, [gameState.gameRunning, gameState.gameOver, keys]);

  // Render game
  const render = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    // Clear canvas with cyberpunk background
    const gradient = ctx.createLinearGradient(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);
    gradient.addColorStop(0, '#0A0A0B');
    gradient.addColorStop(0.5, '#111214');
    gradient.addColorStop(1, '#0A0A0B');
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT);

    // Grid pattern
    ctx.strokeStyle = '#39FF14';
    ctx.globalAlpha = 0.1;
    ctx.lineWidth = 1;
    for (let i = 0; i < CANVAS_WIDTH; i += 40) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, CANVAS_HEIGHT);
      ctx.stroke();
    }
    for (let i = 0; i < CANVAS_HEIGHT; i += 40) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(CANVAS_WIDTH, i);
      ctx.stroke();
    }
    ctx.globalAlpha = 1;

    // Render tokens
    gameState.tokens.forEach(token => {
      ctx.fillStyle = '#39FF14';
      ctx.shadowColor = '#39FF14';
      ctx.shadowBlur = 15;
      ctx.fillRect(token.x, token.y, TOKEN_SIZE, TOKEN_SIZE);
      ctx.shadowBlur = 0;
    });

    // Render obstacles
    gameState.obstacles.forEach(obstacle => {
      ctx.fillStyle = '#E7352C';
      ctx.shadowColor = '#E7352C';
      ctx.shadowBlur = 15;
      ctx.fillRect(obstacle.x, obstacle.y, OBSTACLE_SIZE, OBSTACLE_SIZE);
      ctx.shadowBlur = 0;
    });

    // Render player
    ctx.fillStyle = '#7A3BFF';
    ctx.shadowColor = '#7A3BFF';
    ctx.shadowBlur = 20;
    ctx.fillRect(gameState.player.x, gameState.player.y, PLAYER_SIZE, PLAYER_SIZE);
    ctx.shadowBlur = 0;

  }, [gameState]);

  // Handle keyboard
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      setKeys(prev => new Set(prev).add(e.code));
    };

    const handleKeyUp = (e: KeyboardEvent) => {
      setKeys(prev => {
        const newKeys = new Set(prev);
        newKeys.delete(e.code);
        return newKeys;
      });
    };

    if (isOpen) {
      window.addEventListener('keydown', handleKeyDown);
      window.addEventListener('keyup', handleKeyUp);
    }

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('keyup', handleKeyUp);
    };
  }, [isOpen]);

  // Game loop effect
  useEffect(() => {
    if (gameState.gameRunning) {
      animationRef.current = requestAnimationFrame(gameLoop);
    }
    return () => {
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [gameState.gameRunning, gameLoop]);

  // Render effect
  useEffect(() => {
    if (isOpen) {
      render();
    }
  }, [isOpen, gameState, render]);

  // Handle game end
  useEffect(() => {
    if (gameState.gameOver && user) {
      const points = Math.floor(gameState.score / 10);
      if (points > 0) {
        trackAction('easter_egg_completed');
        toast({
          title: "Chaos Protocol Complete!",
          description: `You earned ${points} chaos points for the leaderboard!`,
          variant: "default"
        });
      }
    }
  }, [gameState.gameOver, gameState.score, user, trackAction, toast]);

  if (!isOpen) return null;

  const startGame = () => {
    initGame();
  };

  const restartGame = () => {
    initGame();
  };

  return (
    <div className="fixed inset-0 z-50 bg-black/95 backdrop-blur-sm flex items-center justify-center">
      <div className="relative bg-gradient-to-br from-jet-black via-onyx to-jet-black rounded-xl p-6 border border-toxic-green/30 max-w-4xl w-full mx-4">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-dim-gray hover:text-blood-red transition-colors duration-200"
          data-testid="game-close"
        >
          <X size={24} />
        </button>

        {/* Game Header */}
        <div className="text-center mb-6">
          <h2 className="font-brand text-3xl text-blood-red mb-2">CHAOS PROTOCOL</h2>
          <p className="text-ash-white text-sm">Collect all green tokens while avoiding red obstacles</p>
          <p className="text-dim-gray text-xs">Use arrow keys to move</p>
        </div>

        {/* Game Stats */}
        <div className="flex justify-between items-center mb-4 text-ash-white">
          <div>Score: <span className="text-toxic-green font-bold">{gameState.score}</span></div>
          <div>Time: <span className="text-blood-red font-bold">{Math.max(0, Math.floor(gameState.timeLeft))}</span></div>
          <div>Tokens: <span className="text-glitch-purple font-bold">{gameState.tokens.length}</span></div>
        </div>

        {/* Game Canvas */}
        <div className="relative flex justify-center mb-6">
          <canvas
            ref={canvasRef}
            width={CANVAS_WIDTH}
            height={CANVAS_HEIGHT}
            className="border border-toxic-green/50 rounded-lg bg-jet-black"
            style={{ maxWidth: '100%', height: 'auto' }}
          />
          
          {/* Game Over Overlay */}
          {gameState.gameOver && (
            <div className="absolute inset-0 bg-black/80 flex items-center justify-center rounded-lg">
              <div className="text-center">
                <h3 className="font-brand text-2xl text-blood-red mb-4">
                  {gameState.tokens.length === 0 ? 'VICTORY!' : 'GAME OVER'}
                </h3>
                <p className="text-ash-white mb-2">Final Score: {gameState.score}</p>
                {user && (
                  <p className="text-toxic-green text-sm mb-4">
                    +{Math.floor(gameState.score / 10)} Chaos Points Added!
                  </p>
                )}
                <button
                  onClick={restartGame}
                  className="px-6 py-2 bg-gradient-to-r from-toxic-green to-blood-red text-jet-black font-bold rounded-lg hover:shadow-lg transition-all duration-200"
                  data-testid="game-restart"
                >
                  Play Again
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Game Controls */}
        {!gameState.gameRunning && !gameState.gameOver && (
          <div className="text-center">
            <button
              onClick={startGame}
              className="flex items-center gap-2 px-8 py-3 bg-gradient-to-r from-blood-red to-glitch-purple text-ash-white font-bold rounded-lg hover:shadow-lg transition-all duration-200 mx-auto"
              data-testid="game-start"
            >
              <Zap size={20} />
              <span>INITIATE CHAOS PROTOCOL</span>
            </button>
          </div>
        )}
      </div>
    </div>
  );
}