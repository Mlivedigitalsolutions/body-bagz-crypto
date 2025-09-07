import { useAuth } from "@/hooks/useAuth";
import { Button } from "@/components/ui/button";
import { TelegramChaosIcon, XChaosIcon } from "@/components/icons";
import { TrophyIcon, Zap, Target, Users, Gamepad2 } from "lucide-react";

export default function Mission() {
  const { isAuthenticated } = useAuth();

  return (
    <div className="bg-black text-ash-white font-body overflow-x-hidden min-h-screen">
      {/* Solid Black Background */}
      <div className="fixed inset-0 bg-black z-0"></div>

      {/* Navigation */}
      <nav className="relative z-50 px-4 md:px-6 py-3 md:py-4" data-testid="mission-navigation">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <a href="/" className="flex items-center space-x-4">
            <span className="font-brand text-xl tracking-tight text-blood-red">BODY BAGZ</span>
          </a>
          <div className="flex items-center space-x-4">
            <a href="/" className="text-ash-white hover:text-toxic-green transition-colors font-semibold">Back to Home</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="relative z-10 py-12 px-4 md:px-6">
        <div className="max-w-4xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-16">
            <h1 className="font-brand text-4xl md:text-6xl text-blood-red mb-6" data-testid="mission-title">
              WHY WE EXIST
            </h1>
            <h2 className="font-tech text-2xl md:text-3xl text-toxic-green mb-8">
              THE VILLAIN ERA MANIFESTO
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blood-red to-toxic-green mx-auto"></div>
          </div>

          {/* Mission Statement */}
          <div className="neon-card p-8 md:p-12 rounded-xl mb-12">
            <div className="flex items-center mb-6">
              <Target className="w-8 h-8 text-toxic-green mr-4" />
              <h3 className="font-tech text-2xl text-toxic-green">Our Mission</h3>
            </div>
            <p className="text-lg md:text-xl leading-relaxed text-ash-white mb-6">
              Give Gen Z the tools, culture, and power to fight rigged systems while building real value together.
            </p>
            <p className="text-base md:text-lg leading-relaxed text-dim-enhanced">
              We're not here to make promises about moon missions or guaranteed returns. We're here to build a movement that gives power back to the people who deserve it—the overlooked, the underground, the ones who know the system is broken and are ready to break it back.
            </p>
          </div>

          {/* Dual Token Thesis */}
          <div className="neon-card p-8 md:p-12 rounded-xl mb-12">
            <div className="flex items-center mb-6">
              <Zap className="w-8 h-8 text-glitch-purple mr-4" />
              <h3 className="font-tech text-2xl text-glitch-purple">Dual Token Thesis</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-8">
              <div className="border border-toxic-green/30 rounded-lg p-6 bg-toxic-green/5">
                <h4 className="font-tech text-xl text-toxic-green mb-4">🏛️ Moonshot Token</h4>
                <p className="text-blood-red font-semibold mb-2">Villain Era - Stability & Structure</p>
                <ul className="text-ash-white space-y-2">
                  <li>• Foundation of our ecosystem</li>
                  <li>• Primary staking token</li>
                  <li>• Governance and voting rights</li>
                  <li>• Merchandise payment system</li>
                  <li>• Long-term value accumulation</li>
                </ul>
              </div>
              
              <div className="border border-blood-red/30 rounded-lg p-6 bg-blood-red/5">
                <h4 className="font-tech text-xl text-blood-red mb-4">⚡ Pump.fun Token</h4>
                <p className="text-glitch-purple font-semibold mb-2">Chaos Energy - Volatility & Rewards</p>
                <ul className="text-ash-white space-y-2">
                  <li>• Raw meme energy token</li>
                  <li>• Staking reward distribution</li>
                  <li>• Trading and speculation</li>
                  <li>• Community challenges</li>
                  <li>• Viral growth mechanics</li>
                </ul>
              </div>
            </div>
            
            <div className="mt-8 p-6 bg-jet-black/50 rounded-lg border border-dim-gray/30">
              <p className="text-ash-white text-center">
                <span className="text-toxic-green font-bold">Villain Era</span> provides the structure, 
                <span className="text-blood-red font-bold"> Chaos Energy</span> fuels the movement. 
                Together, they create a self-balancing economy that rewards both diamond hands and active traders.
              </p>
            </div>
          </div>

          {/* Values Section */}
          <div className="grid md:grid-cols-3 gap-6 mb-12">
            <div className="neon-card p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-toxic-green/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-6 h-6 text-toxic-green" />
              </div>
              <h4 className="font-tech text-lg text-toxic-green mb-3">FOR THE CULTURE</h4>
              <p className="text-dim-enhanced text-sm">
                Street-born and community-driven. We represent the underground and give voice to the overlooked.
              </p>
            </div>
            
            <div className="neon-card p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-blood-red/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="w-6 h-6 text-blood-red" />
              </div>
              <h4 className="font-tech text-lg text-blood-red mb-3">FOR THE CHAOS</h4>
              <p className="text-dim-enhanced text-sm">
                Disruption is our language. Order is overrated. Chaos breeds innovation and breaks stagnant systems.
              </p>
            </div>
            
            <div className="neon-card p-6 rounded-xl text-center">
              <div className="w-12 h-12 bg-glitch-purple/20 rounded-full flex items-center justify-center mx-auto mb-4">
                <Target className="w-6 h-6 text-glitch-purple" />
              </div>
              <h4 className="font-tech text-lg text-glitch-purple mb-3">FOR THE PEOPLE</h4>
              <p className="text-dim-enhanced text-sm">
                Power to the holders. Built by the community, owned by the community. Real value, real ownership.
              </p>
            </div>
          </div>

          {/* Call to Action */}
          <div className="neon-card p-8 md:p-12 rounded-xl text-center">
            <h3 className="font-tech text-2xl text-blood-red mb-6">Join the Movement</h3>
            <p className="text-ash-white mb-8 text-lg">
              Ready to embrace the villain era? Here's how you can start building with us:
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
              <a 
                href="https://t.me/BodyBagzs"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-toxic-green to-emerald-600 rounded-lg font-tech text-white hover:shadow-green-glow transition-all duration-200"
                data-testid="join-telegram-cta"
              >
                <TelegramChaosIcon className="w-5 h-5 mr-2" />
                Join Telegram
              </a>
              
              <a 
                href="/tools"
                className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-blood-red to-red-600 rounded-lg font-tech text-white hover:shadow-red-glow transition-all duration-200"
                data-testid="use-tools-cta"
              >
                <Zap className="w-5 h-5 mr-2" />
                Use Tweet Generator
              </a>
              
              <a 
                href="/leaderboard"
                className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-glitch-purple to-purple-600 rounded-lg font-tech text-white hover:shadow-purple-glow transition-all duration-200"
                data-testid="view-leaderboard-cta"
              >
                <TrophyIcon className="w-5 h-5 mr-2" />
                View Leaderboard
              </a>
              
              <a 
                href="/meetups"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center justify-center px-6 py-4 bg-gradient-to-r from-yellow-600 to-yellow-500 rounded-lg font-tech text-white hover:shadow-yellow-glow transition-all duration-200"
                data-testid="meetups-cta"
              >
                <Users className="w-5 h-5 mr-2" />
                Join Meetups
              </a>
            </div>
          </div>

          {/* Roadmap 2026 */}
          <div className="neon-card p-8 md:p-12 rounded-xl mt-12">
            <div className="flex items-center mb-6">
              <Gamepad2 className="w-8 h-8 text-yellow-400 mr-4" />
              <h3 className="font-tech text-2xl text-yellow-400">Roadmap 2026</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-4">
                <div className="border-l-4 border-toxic-green pl-4">
                  <h4 className="font-tech text-lg text-toxic-green">Q1 2026: Staking Launch</h4>
                  <p className="text-ash-white text-sm">Moonshot staking pools go live. Earn Pump.fun token rewards for locking up Villain Era tokens.</p>
                </div>
                
                <div className="border-l-4 border-blood-red pl-4">
                  <h4 className="font-tech text-lg text-blood-red">Q2 2026: Merch Integration</h4>
                  <p className="text-ash-white text-sm">Official merch store accepts both tokens. Ski masks, motorcycle vests, and villain gear available.</p>
                </div>
              </div>
              
              <div className="space-y-4">
                <div className="border-l-4 border-glitch-purple pl-4">
                  <h4 className="font-tech text-lg text-glitch-purple">Q3 2026: NFT Drops</h4>
                  <p className="text-ash-white text-sm">PFP generator gets randomized NFT drops with real utility and marketplace integration.</p>
                </div>
                
                <div className="border-l-4 border-yellow-400 pl-4">
                  <h4 className="font-tech text-lg text-yellow-400">Q4 2026: Rug Hunter P2E</h4>
                  <p className="text-ash-white text-sm">Play-to-earn game development begins. Hunt rugs, earn tokens, climb leaderboards.</p>
                </div>
              </div>
            </div>
          </div>

        </div>
      </main>

      {/* Footer */}
      <footer className="relative z-10 py-8 border-t border-dim-gray/30">
        <div className="max-w-4xl mx-auto text-center px-4">
          <p className="text-dim-enhanced mb-4">
            The villain era isn't coming—it's here. Own it.
          </p>
          <div className="flex justify-center space-x-6">
            <a 
              href="https://t.me/BodyBagzs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-toxic-green hover:text-ash-white transition-colors"
            >
              Telegram
            </a>
            <a 
              href="https://twitter.com/i/communities/1960797896896602475" 
              target="_blank" 
              rel="noopener noreferrer"
              className="text-glitch-purple hover:text-ash-white transition-colors"
            >
              X Community
            </a>
            <a 
              href="/"
              className="text-blood-red hover:text-ash-white transition-colors"
            >
              Back to Main Site
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}