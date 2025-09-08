import { useState, useEffect } from "react";
import { Link } from "wouter";
import { ChevronLeft } from "lucide-react";
import analytics from "@/lib/analytics";

export default function StakePage() {
  const [embedError, setEmbedError] = useState(false);

  useEffect(() => {
    // Track page view
    analytics.track('page_view', {
      page: '/stake',
      title: 'Stake $BAGZ | Body Bagz'
    });

    // Set document title and meta
    document.title = "Stake $BAGZ | Body Bagz";
    
    // Update meta description
    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Stake your Moonshot $BAGZ in the Genesis Villain Pool. 15-day lock, ~0.75% daily rewards. Join the Villain Era.');
    }

    // Update canonical URL
    const canonical = document.querySelector('link[rel="canonical"]');
    if (canonical) {
      canonical.setAttribute('href', 'https://bodybagz.org/stake');
    }
  }, []);

  const handleStakeCTA = (location: string) => {
    analytics.track('stake_cta_click', {
      location: location
    });
    window.open('https://stake.smithii.io/bagz', '_blank', 'noopener');
  };

  const handleIframeError = () => {
    setEmbedError(true);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-jet-black via-onyx to-jet-black">
      {/* Cyberpunk grid background */}
      <div className="fixed inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(34, 197, 94, 0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(34, 197, 94, 0.1) 1px, transparent 1px)',
          backgroundSize: '40px 40px'
        }}></div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-4 md:px-6 py-4 border-b border-dim-gray">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center space-x-2 text-ash-white hover:text-toxic-green transition-colors"
            data-testid="nav-back-home"
          >
            <ChevronLeft className="w-5 h-5" />
            <span className="font-tech">Back to Base</span>
          </Link>
          
          <div className="font-brand text-xl text-blood-red">STAKE $BAGZ</div>
        </div>
      </nav>

      <div className="relative z-10 px-4 md:px-6 py-8 md:py-12">
        <div className="max-w-6xl mx-auto">
          
          {/* Hero Section */}
          <div className="text-center mb-12">
            <h1 className="font-brand text-4xl md:text-6xl lg:text-7xl text-transparent bg-clip-text bg-gradient-to-r from-blood-red via-glitch-purple to-toxic-green mb-4 tracking-tight">
              Stake $BAGZ
            </h1>
            <div className="font-tech text-xl md:text-2xl text-toxic-green mb-2">
              Genesis Villain Pool
            </div>
            <div className="text-ash-white/80 max-w-2xl mx-auto">
              Lock your Moonshot $BAGZ and earn Pump.fun $BAGZ rewards. Join the chaos collective and amplify your villain energy.
            </div>
          </div>

          {/* Stats Grid */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12 max-w-4xl mx-auto">
            <div className="bg-jet-black/50 border border-toxic-green/20 rounded-lg p-4 text-center">
              <div className="text-toxic-green font-tech text-lg font-bold">200K</div>
              <div className="text-ash-white/70 text-sm">Rewards Funded</div>
            </div>
            <div className="bg-jet-black/50 border border-blood-red/20 rounded-lg p-4 text-center">
              <div className="text-blood-red font-tech text-lg font-bold">15 Days</div>
              <div className="text-ash-white/70 text-sm">Lock Duration</div>
            </div>
            <div className="bg-jet-black/50 border border-glitch-purple/20 rounded-lg p-4 text-center">
              <div className="text-glitch-purple font-tech text-lg font-bold">0.75%</div>
              <div className="text-ash-white/70 text-sm">Daily Rate</div>
            </div>
            <div className="bg-jet-black/50 border border-ash-white/20 rounded-lg p-4 text-center">
              <div className="text-ash-white font-tech text-lg font-bold">10K</div>
              <div className="text-ash-white/70 text-sm">Min Stake</div>
            </div>
          </div>

          {/* Main Staking Interface */}
          <div className="bg-jet-black/80 border border-dim-gray rounded-xl p-6 md:p-8 backdrop-blur-sm">
            {!embedError ? (
              <div className="relative">
                <iframe
                  src="https://stake.smithii.io/bagz"
                  className="w-full h-[600px] md:h-[700px] rounded-lg border border-dim-gray"
                  title="Body Bagz Staking Interface"
                  onError={handleIframeError}
                  sandbox="allow-scripts allow-same-origin allow-forms"
                  data-testid="staking-iframe"
                />
                <div className="absolute top-2 right-2">
                  <div className="bg-toxic-green/20 border border-toxic-green/50 rounded-full px-3 py-1 text-xs text-toxic-green font-tech">
                    LIVE
                  </div>
                </div>
              </div>
            ) : (
              <div className="text-center py-16">
                <div className="bg-gradient-to-r from-blood-red/10 to-glitch-purple/10 border border-blood-red/30 rounded-xl p-8 max-w-md mx-auto">
                  <div className="text-4xl mb-4">⚡</div>
                  <h3 className="font-brand text-xl text-blood-red mb-4">
                    Genesis Villain Pool
                  </h3>
                  <div className="space-y-3 text-ash-white/80 text-sm mb-6">
                    <div>• Stake Moonshot $BAGZ → Earn Pump.fun $BAGZ</div>
                    <div>• 0.75% daily rewards (~11.25% total)</div>
                    <div>• 15-day lock period</div>
                    <div>• 10,000 minimum stake</div>
                  </div>
                  
                  <div className="space-y-3">
                    <button
                      onClick={() => handleStakeCTA('stake_page_primary')}
                      className="w-full bg-gradient-to-r from-blood-red to-glitch-purple hover:from-blood-red/80 hover:to-glitch-purple/80 text-white font-tech py-3 px-6 rounded-lg transition-all duration-200 hover:shadow-red-glow"
                      data-testid="stake-cta-primary"
                    >
                      Stake Now ⚡
                    </button>
                    
                    <button
                      onClick={() => handleStakeCTA('stake_page_secondary')}
                      className="w-full bg-jet-black border border-dim-gray hover:border-toxic-green text-ash-white hover:text-toxic-green font-tech py-3 px-6 rounded-lg transition-all duration-200"
                      data-testid="stake-cta-secondary"
                    >
                      View on Smithii ↗
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Key Features */}
          <div className="mt-12 grid md:grid-cols-3 gap-6">
            <div className="bg-jet-black/60 border border-toxic-green/20 rounded-xl p-6">
              <div className="text-toxic-green text-2xl mb-3">🔒</div>
              <h3 className="font-tech text-lg text-toxic-green mb-2">Secure Lock</h3>
              <p className="text-ash-white/70 text-sm">
                Your Moonshot $BAGZ are securely locked for 15 days. No early withdrawals - commitment to the villain era.
              </p>
            </div>
            
            <div className="bg-jet-black/60 border border-blood-red/20 rounded-xl p-6">
              <div className="text-blood-red text-2xl mb-3">⚡</div>
              <h3 className="font-tech text-lg text-blood-red mb-2">Daily Rewards</h3>
              <p className="text-ash-white/70 text-sm">
                Earn 0.75% daily in Pump.fun $BAGZ tokens. Amplify your chaos energy and grow your bag.
              </p>
            </div>
            
            <div className="bg-jet-black/60 border border-glitch-purple/20 rounded-xl p-6">
              <div className="text-glitch-purple text-2xl mb-3">👥</div>
              <h3 className="font-tech text-lg text-glitch-purple mb-2">Community Pool</h3>
              <p className="text-ash-white/70 text-sm">
                Join fellow villains in the Genesis Pool. First of many staking opportunities in the Body Bagz ecosystem.
              </p>
            </div>
          </div>

          {/* Disclaimer */}
          <div className="mt-12 text-center">
            <div className="bg-jet-black/40 border border-dim-gray/50 rounded-lg p-4 max-w-2xl mx-auto">
              <p className="text-ash-white/60 text-sm">
                <strong>Not financial advice.</strong> Always DYOR. Staking involves risk. Only stake what you can afford to lock for 15 days.
              </p>
            </div>
          </div>

        </div>
      </div>

      {/* Cyberpunk decorative elements */}
      <div className="fixed top-1/4 left-4 w-2 h-32 bg-gradient-to-b from-toxic-green to-transparent opacity-20 animate-pulse"></div>
      <div className="fixed bottom-1/4 right-4 w-2 h-32 bg-gradient-to-t from-blood-red to-transparent opacity-20 animate-pulse"></div>
    </div>
  );
}