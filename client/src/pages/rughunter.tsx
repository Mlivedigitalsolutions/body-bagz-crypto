import { useState, Suspense, lazy } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { GamepadIcon, Smartphone, Zap, Target } from 'lucide-react';
import { UserButton } from "@/components/UserAuth";
import { SkullIcon, TelegramChaosIcon, XChaosIcon } from "@/components/icons";
import mainBrandLogo from "@assets/generated_images/Official_Body_Bagz_brand_logo_94353dbf.png";
import Footer from "@/components/footer";

// Lazy load the game canvas to avoid blocking the main bundle
const GameCanvas = lazy(() => import('@/game/rughunter/GameCanvas').then(module => ({ default: module.GameCanvas })));

export default function RugHunterPage() {
  const [gameStarted, setGameStarted] = useState(false);
  const [showInstructions, setShowInstructions] = useState(false);

  const handleStartGame = () => {
    setGameStarted(true);
    
    // Analytics
    try {
      fetch('/api/analytics', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          events: [{
            event: 'game_start',
            properties: { game: 'rug_hunter', platform: 'web' }
          }]
        })
      });
    } catch (error) {
      console.log('Analytics failed:', error);
    }
  };

  const handleExitGame = () => {
    setGameStarted(false);
  };

  if (gameStarted) {
    return (
      <div className="w-full h-screen bg-black">
        <Suspense fallback={
          <div className="flex items-center justify-center h-screen bg-black text-white">
            <div className="text-center">
              <div className="animate-spin w-12 h-12 border-4 border-toxic-green border-t-transparent rounded-full mx-auto mb-4"></div>
              <div className="font-tech text-toxic-green">Loading Game...</div>
            </div>
          </div>
        }>
          <GameCanvas onExit={handleExitGame} />
        </Suspense>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Navigation */}
      <nav className="relative z-50 px-4 md:px-6 py-3 md:py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="/" className="flex items-center space-x-4">
              <img 
                src={mainBrandLogo} 
                alt="Body Bagz Logo"
                className="w-12 h-12 object-contain"
                style={{filter: 'drop-shadow(0 0 8px rgba(231, 53, 44, 0.6))'}}
              />
              <span className="font-brand text-xl tracking-tight text-blood-red">BODY BAGZ</span>
            </a>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex space-x-6 xl:space-x-8">
              <a href="/" className="text-ash-white hover:text-toxic-green transition-colors font-semibold">HOME</a>
              <a href="/tools" className="text-ash-white hover:text-toxic-green transition-colors font-semibold">TOOLS</a>
              <a href="/leaderboard" className="text-ash-white hover:text-blood-red transition-colors font-semibold">LEADERBOARD</a>
              <a href="/game/rughunter" className="text-blood-red hover:text-blood-red transition-colors font-semibold border-b-2 border-blood-red">GAMES</a>
            </div>
            
            <UserButton />
            
            <div className="flex space-x-3">
              <a 
                href="https://x.com/BodyBagzToken" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-ash-white hover:text-toxic-green transition-colors"
              >
                <XChaosIcon className="w-5 h-5" />
              </a>
              <a 
                href="https://t.me/BodyBagzChat" 
                target="_blank" 
                rel="noopener noreferrer"
                className="text-ash-white hover:text-toxic-green transition-colors"
              >
                <TelegramChaosIcon className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      <main className="pt-8 pb-20">
        <div className="max-w-6xl mx-auto px-6">
          {/* Game Header */}
          <div className="text-center mb-16">
            <h1 className="font-brand text-6xl md:text-7xl text-blood-red mb-6">
              RUG HUNTER
            </h1>
            <p className="text-ash-white/90 text-xl font-medium max-w-3xl mx-auto mb-8">
              Hunt down crypto ruggers in this fast-paced mobile arcade game. 
              One-thumb controls, pure chaos, villain rewards.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-8">
              <div className="flex items-center gap-2 px-4 py-2 bg-toxic-green/10 border border-toxic-green/30 rounded-lg">
                <Smartphone className="w-5 h-5 text-toxic-green" />
                <span className="text-toxic-green font-semibold">Mobile Optimized</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-glitch-purple/10 border border-glitch-purple/30 rounded-lg">
                <Zap className="w-5 h-5 text-glitch-purple" />
                <span className="text-glitch-purple font-semibold">One-Thumb Controls</span>
              </div>
              <div className="flex items-center gap-2 px-4 py-2 bg-blood-red/10 border border-blood-red/30 rounded-lg">
                <Target className="w-5 h-5 text-blood-red" />
                <span className="text-blood-red font-semibold">Chaos Points Rewards</span>
              </div>
            </div>

            <Button
              onClick={handleStartGame}
              className="bg-gradient-to-r from-blood-red to-red-600 hover:from-blood-red/80 hover:to-red-600/80 text-white font-bold text-xl px-12 py-6 rounded-lg shadow-red-glow transition-all duration-200"
              size="lg"
            >
              <GamepadIcon className="w-6 h-6 mr-3" />
              START HUNTING
            </Button>
          </div>

          {/* Game Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
            <Card className="neon-card bg-jet-black border-toxic-green">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-toxic-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Smartphone className="w-8 h-8 text-toxic-green" />
                </div>
                <h3 className="font-tech text-xl text-toxic-green mb-3">Mobile First</h3>
                <p className="text-ash-white/80">
                  Buttery smooth 60 FPS gameplay optimized for mobile devices with dynamic performance scaling.
                </p>
              </CardContent>
            </Card>

            <Card className="neon-card bg-jet-black border-glitch-purple">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-glitch-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Zap className="w-8 h-8 text-glitch-purple" />
                </div>
                <h3 className="font-tech text-xl text-glitch-purple mb-3">Intuitive Controls</h3>
                <p className="text-ash-white/80">
                  Swipe to move, tap to attack. Switch to button mode for accessibility. Low latency input with haptic feedback.
                </p>
              </CardContent>
            </Card>

            <Card className="neon-card bg-jet-black border-blood-red">
              <CardContent className="p-6 text-center">
                <div className="w-16 h-16 bg-blood-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Target className="w-8 h-8 text-blood-red" />
                </div>
                <h3 className="font-tech text-xl text-blood-red mb-3">Villain Rewards</h3>
                <p className="text-ash-white/80">
                  Earn chaos points for the leaderboard. Share your high scores and climb the villain rankings.
                </p>
              </CardContent>
            </Card>
          </div>

          {/* How to Play Instructions */}
          <Card className="neon-card bg-jet-black border-dim-gray mb-8">
            <CardContent className="p-8">
              <div className="flex justify-between items-center mb-6">
                <h2 className="font-tech text-3xl text-toxic-green">How to Play</h2>
                <Button
                  onClick={() => setShowInstructions(!showInstructions)}
                  variant="outline"
                  className="text-ash-white border-dim-gray"
                >
                  {showInstructions ? 'Hide' : 'Show'} Instructions
                </Button>
              </div>

              {showInstructions && (
                <div className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <h3 className="font-tech text-xl text-blood-red mb-4">Gesture Controls (Default)</h3>
                      <ul className="space-y-3 text-ash-white">
                        <li className="flex items-center gap-3">
                          <span className="text-toxic-green">👈👉</span>
                          <span><strong>Swipe Left/Right:</strong> Move between lanes</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="text-toxic-green">👆</span>
                          <span><strong>Swipe Up:</strong> Jump over obstacles</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="text-toxic-green">👇</span>
                          <span><strong>Swipe Down:</strong> Slide under hazards</span>
                        </li>
                        <li className="flex items-center gap-3">
                          <span className="text-blood-red">👆</span>
                          <span><strong>Tap:</strong> Attack nearby ruggers</span>
                        </li>
                      </ul>
                    </div>

                    <div>
                      <h3 className="font-tech text-xl text-glitch-purple mb-4">Scoring System</h3>
                      <ul className="space-y-3 text-ash-white">
                        <li className="flex justify-between">
                          <span>Tag Rugger:</span>
                          <span className="text-toxic-green font-bold">+10 points</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Collect Coin:</span>
                          <span className="text-yellow-400 font-bold">+1 point</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Villain Streak:</span>
                          <span className="text-glitch-purple font-bold">Multiplier bonus</span>
                        </li>
                        <li className="flex justify-between">
                          <span>Chaos Points:</span>
                          <span className="text-blood-red font-bold">Score ÷ 10 (max 50)</span>
                        </li>
                      </ul>
                    </div>
                  </div>

                  <div className="p-6 bg-blood-red/10 border border-blood-red/30 rounded-lg">
                    <h4 className="font-tech text-lg text-blood-red mb-3">Villain Strategy</h4>
                    <p className="text-ash-white">
                      Stay alive, build your streak, and hunt down as many ruggers as possible. 
                      Each successful tag without taking damage increases your villain streak multiplier. 
                      Survive longer to face tougher challenges and earn maximum chaos points!
                    </p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Leaderboard Preview */}
          <Card className="neon-card bg-jet-black border-blood-red">
            <CardContent className="p-8 text-center">
              <h2 className="font-tech text-3xl text-blood-red mb-4">Compete for Villain Status</h2>
              <p className="text-ash-white/90 text-lg mb-6">
                Your high scores contribute to the monthly chaos leaderboard. 
                Earn points, climb rankings, and prove your villain supremacy.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button
                  onClick={handleStartGame}
                  className="bg-toxic-green hover:bg-toxic-green/80 text-black font-bold"
                >
                  Start Playing
                </Button>
                <Button
                  onClick={() => window.location.href = '/leaderboard'}
                  variant="outline"
                  className="border-blood-red text-blood-red hover:bg-blood-red/10"
                >
                  View Leaderboard
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
}