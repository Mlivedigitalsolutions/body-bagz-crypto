import { useEffect } from "react";
import Footer from "@/components/footer";
import { UserButton } from "@/components/UserAuth";
import mainBrandLogo from "@assets/generated_images/Official_Body_Bagz_brand_logo_94353dbf.png";
import { Users, MessageSquare, Heart, Zap, Crown, Shield } from "lucide-react";
import { TelegramChaosIcon, XChaosIcon } from "@/components/icons";

export default function CommunityPage() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black text-ash-white font-body overflow-x-hidden min-h-screen">
      {/* Solid Black Background */}
      <div className="fixed inset-0 bg-black z-0"></div>

      {/* Navigation */}
      <nav className="relative z-50 px-4 md:px-6 py-3 md:py-4" data-testid="community-navigation">
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
              <a href="/community" className="text-toxic-green font-semibold">COMMUNITY</a>
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
            <h1 className="font-brand text-4xl md:text-6xl text-blood-red mb-6" data-testid="community-title">
              VILLAIN COLLECTIVE
            </h1>
            <h2 className="font-tech text-2xl md:text-3xl text-toxic-green mb-8">
              WHERE CHAOS UNITES
            </h2>
            <div className="w-32 h-1 bg-gradient-to-r from-blood-red to-toxic-green mx-auto"></div>
          </div>

          {/* Community Stats */}
          <div className="grid md:grid-cols-3 gap-8 mb-12">
            <div className="neon-card p-8 rounded-xl text-center">
              <Users className="w-12 h-12 text-toxic-green mx-auto mb-4" />
              <h3 className="font-brand text-3xl text-toxic-green mb-2">50K+</h3>
              <p className="text-ash-white">Active Villains</p>
            </div>
            
            <div className="neon-card p-8 rounded-xl text-center">
              <MessageSquare className="w-12 h-12 text-blood-red mx-auto mb-4" />
              <h3 className="font-brand text-3xl text-blood-red mb-2">1M+</h3>
              <p className="text-ash-white">Chaos Messages</p>
            </div>
            
            <div className="neon-card p-8 rounded-xl text-center">
              <Heart className="w-12 h-12 text-glitch-purple mx-auto mb-4" />
              <h3 className="font-brand text-3xl text-glitch-purple mb-2">100%</h3>
              <p className="text-ash-white">Villain Energy</p>
            </div>
          </div>

          {/* Community Channels */}
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            
            {/* Telegram Community */}
            <div className="neon-card p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <TelegramChaosIcon className="w-8 h-8 text-blue-400 mr-4" />
                <h3 className="font-tech text-xl text-blue-400">Telegram Raiders</h3>
              </div>
              <p className="text-ash-white mb-6">
                Join our main Telegram channel for real-time chaos coordination, alpha calls, and community raids. This is where the magic happens.
              </p>
              <button className="cyber-button px-6 py-3 text-ash-white font-bold">
                JOIN TELEGRAM
              </button>
            </div>

            {/* Twitter Community */}
            <div className="neon-card p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <XChaosIcon className="w-8 h-8 text-ash-white mr-4" />
                <h3 className="font-tech text-xl text-ash-white">X (Twitter) Army</h3>
              </div>
              <p className="text-ash-white mb-6">
                Follow our X account for memes, announcements, and coordinated social raids. Help us spread the villain message across the web.
              </p>
              <button className="cyber-button px-6 py-3 text-ash-white font-bold">
                FOLLOW ON X
              </button>
            </div>

          </div>

          {/* Community Features */}
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 mb-12">
            
            <div className="neon-card p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <Crown className="w-8 h-8 text-yellow-400 mr-4" />
                <h3 className="font-tech text-xl text-yellow-400">Leaderboards</h3>
              </div>
              <p className="text-ash-white">
                Compete with fellow villains for the top spots on our community leaderboards. Earn rewards and eternal glory.
              </p>
            </div>

            <div className="neon-card p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <Zap className="w-8 h-8 text-toxic-green mr-4" />
                <h3 className="font-tech text-xl text-toxic-green">Raid Coordination</h3>
              </div>
              <p className="text-ash-white">
                Organize and participate in coordinated community events, social raids, and viral campaigns.
              </p>
            </div>

            <div className="neon-card p-8 rounded-xl">
              <div className="flex items-center mb-4">
                <Shield className="w-8 h-8 text-blood-red mr-4" />
                <h3 className="font-tech text-xl text-blood-red">Exclusive Access</h3>
              </div>
              <p className="text-ash-white">
                Get early access to new features, alpha information, and exclusive community events for active members.
              </p>
            </div>

          </div>

          {/* Call to Action */}
          <div className="neon-card p-12 rounded-xl text-center">
            <div className="mb-6">
              <Users className="w-16 h-16 text-toxic-green mx-auto mb-4" />
              <h3 className="font-brand text-3xl text-toxic-green mb-4">JOIN THE VILLAIN MOVEMENT</h3>
            </div>
            <p className="text-lg text-ash-white mb-8">
              Ready to embrace your villain era? Connect with thousands of like-minded rebels who are building something bigger than traditional crypto.
            </p>
            <div className="flex justify-center space-x-6">
              <button className="cyber-button px-8 py-4 text-ash-white font-bold text-lg">
                JOIN TELEGRAM
              </button>
              <button className="cyber-button px-8 py-4 text-ash-white font-bold text-lg">
                FOLLOW ON X
              </button>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
}