import { useEffect } from "react";
import Footer from "@/components/footer";
import { UserButton } from "@/components/UserAuth";
import mainBrandLogo from "@assets/generated_images/Official_Body_Bagz_brand_logo_94353dbf.png";
import { Gamepad2, Trophy, Zap, Target, Users, Star } from "lucide-react";

export default function GamingPage() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black text-ash-white font-body overflow-x-hidden min-h-screen">
      {/* Solid Black Background */}
      <div className="fixed inset-0 bg-black z-0"></div>

      {/* Navigation */}
      <nav className="relative z-50 px-4 md:px-6 py-3 md:py-4" data-testid="gaming-navigation">
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
              <a href="/tools" className="text-ash-white hover:text-toxic-green transition-colors font-semibold">CHAOS TOOLS</a>
              <a href="/gaming" className="text-toxic-green font-semibold">GAMING</a>
            </div>
            
            {/* User Auth */}
            <UserButton />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 py-12 px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-brand text-4xl md:text-6xl text-blood-red mb-6" data-testid="gaming-title">
              VILLAIN GAMING HUB
            </h1>
            <h2 className="font-tech text-2xl md:text-3xl text-toxic-green mb-8">
              WHERE CHAOS MEETS COMPETITION
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blood-red to-toxic-green mx-auto"></div>
          </div>

          {/* Gaming Features Grid */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            
            {/* Game Card 1 */}
            <div className="neon-card p-8 rounded-xl" data-testid="game-card">
              <div className="flex items-center mb-4">
                <Gamepad2 className="w-8 h-8 text-toxic-green mr-4" />
                <h3 className="font-tech text-xl text-toxic-green">Battle Royale Tournaments</h3>
              </div>
              <p className="text-ash-white mb-4">
                Join epic gaming tournaments and compete for $BAGZ rewards. Winners take all in our villain-era gaming competitions.
              </p>
              <div className="flex items-center space-x-2">
                <Trophy className="w-4 h-4 text-yellow-400" />
                <span className="text-sm text-yellow-400">Prize Pool: 10,000 $BAGZ</span>
              </div>
            </div>

            {/* Game Card 2 */}
            <div className="neon-card p-8 rounded-xl" data-testid="game-card">
              <div className="flex items-center mb-4">
                <Target className="w-8 h-8 text-blood-red mr-4" />
                <h3 className="font-tech text-xl text-blood-red">NFT Gaming Arena</h3>
              </div>
              <p className="text-ash-white mb-4">
                Battle with your Body Bagz NFTs in our custom gaming arena. Stake, compete, and dominate the leaderboards.
              </p>
              <div className="flex items-center space-x-2">
                <Star className="w-4 h-4 text-glitch-purple" />
                <span className="text-sm text-glitch-purple">NFT Powered</span>
              </div>
            </div>

            {/* Game Card 3 */}
            <div className="neon-card p-8 rounded-xl" data-testid="game-card">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-glitch-purple mr-4" />
                <h3 className="font-tech text-xl text-glitch-purple">Crypto Raids</h3>
              </div>
              <p className="text-ash-white mb-4">
                Coordinate gaming raids and community events. Team up with fellow villains for maximum chaos and rewards.
              </p>
              <div className="flex items-center space-x-2">
                <Users className="w-4 h-4 text-toxic-green" />
                <span className="text-sm text-toxic-green">Community Events</span>
              </div>
            </div>

          </div>

          {/* Coming Soon Section */}
          <div className="neon-card p-12 rounded-xl text-center">
            <div className="mb-6">
              <Gamepad2 className="w-16 h-16 text-toxic-green mx-auto mb-4" />
              <h3 className="font-brand text-3xl text-toxic-green mb-4">GAMING REVOLUTION INCOMING</h3>
            </div>
            <p className="text-lg text-ash-white mb-6">
              The ultimate gaming experience is being forged in the depths of chaos. Get ready for next-level gaming integration with $BAGZ rewards.
            </p>
            <div className="flex justify-center space-x-4">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-toxic-green rounded-full animate-pulse"></div>
                <span className="text-toxic-green font-semibold">P2E Gaming</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blood-red rounded-full animate-pulse" style={{animationDelay: '0.5s'}}></div>
                <span className="text-blood-red font-semibold">NFT Integration</span>
              </div>
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-glitch-purple rounded-full animate-pulse" style={{animationDelay: '1s'}}></div>
                <span className="text-glitch-purple font-semibold">Tournament System</span>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}