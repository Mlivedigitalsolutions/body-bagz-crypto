import { useState } from "react";
import { Copy, Check } from "lucide-react";

// Token data
const MOONSHOT_CA = "7eyYetAuD84SFfANFKmhUDqpTgGfJUQExVUZxhNBmoon";
const MOONSHOT_DEX = "https://dexscreener.com/solana/hcspcc1loaejempvs7gh6nzhyxbypmcv6dvc9kjjxeye";
const PUMPFUN_CA = "6sw8wayQp769fAHrJxo6brH9D8BwghYHRSnZ1xeHpump";
const PUMPFUN_DEX = "https://dexscreener.com/solana/hg4pxoq8cxyhdfbkx3ehwevvbwtlyemgccryvpkqia8p";

export default function TokensSection() {
  const [copiedAddress, setCopiedAddress] = useState<string | null>(null);

  const copyToClipboard = async (text: string, type: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setCopiedAddress(type);
      setTimeout(() => setCopiedAddress(null), 2000);
    } catch (err) {
      console.error('Failed to copy text: ', err);
    }
  };

  const handleAnalytics = (eventName: string, label: string) => {
    if ((window as any).gtag) {
      (window as any).gtag('event', eventName, {
        event_category: 'tokens',
        event_label: label
      });
    }
  };

  return (
    <section id="tokens" className="relative z-10 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-brand text-4xl md:text-5xl text-center text-blood-red mb-16" data-testid="tokens-title">
          DUAL TOKEN ECOSYSTEM
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-8 max-w-7xl mx-auto">
          {/* Moonshot Token */}
          <div className="neon-card p-8 rounded-xl hover:shadow-green-glow transition-all duration-200 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-toxic-green opacity-5 rounded-full blur-xl"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-4">🪦</span>
                <div>
                  <h3 className="font-tech text-2xl text-toxic-green mb-2 tracking-wide font-bold">
                    Moonshot $BAGZ — The Throne
                  </h3>
                  <p className="text-ash-white font-medium leading-relaxed">
                    Our flagship token. Locked liquidity. Long-term power play for the Villain Era.
                  </p>
                </div>
              </div>
              
              {/* Contract Address */}
              <div className="bg-jet-black border border-dim-gray rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <p className="text-dim-gray text-sm mb-1">Contract Address:</p>
                    <p className="font-mono text-ash-white text-sm break-all">
                      {MOONSHOT_CA}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(MOONSHOT_CA, 'moonshot')}
                    className="p-2 hover:bg-dim-gray/30 rounded-lg transition-colors"
                    data-testid="copy-moonshot-contract"
                    aria-label="Copy Moonshot contract address"
                  >
                    {copiedAddress === 'moonshot' ? (
                      <Check className="w-5 h-5 text-toxic-green" />
                    ) : (
                      <Copy className="w-5 h-5 text-dim-gray hover:text-toxic-green" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Tokenomics Preview */}
              <div className="space-y-3">
                <h4 className="font-tech text-toxic-green text-sm tracking-wide">FLAGSHIP TOKEN FEATURES</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-dim-gray">Liquidity:</span>
                    <span className="text-ash-white font-semibold">Locked</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dim-gray">Supply:</span>
                    <span className="text-ash-white font-semibold">Fixed</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dim-gray">Ownership:</span>
                    <span className="text-ash-white font-semibold">Renounced</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dim-gray">Focus:</span>
                    <span className="text-ash-white font-semibold">Long-term</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Pump.fun Token */}
          <div className="neon-card p-8 rounded-xl hover:shadow-red-glow transition-all duration-200 group relative overflow-hidden">
            <div className="absolute top-0 right-0 w-20 h-20 bg-blood-red opacity-5 rounded-full blur-xl"></div>
            <div className="relative z-10">
              <div className="flex items-center mb-6">
                <span className="text-3xl mr-4">🔥</span>
                <div>
                  <h3 className="font-tech text-2xl text-blood-red mb-2 tracking-wide font-bold">
                    Pump.fun $BAGZ — The Chaos Pit
                  </h3>
                  <p className="text-ash-white font-medium leading-relaxed">
                    Degen arena + staking rewards. Built for chaos, memes, and fast moves.
                  </p>
                </div>
              </div>
              
              {/* Contract Address */}
              <div className="bg-jet-black border border-dim-gray rounded-lg p-4 mb-6">
                <div className="flex items-center justify-between">
                  <div className="flex-1 mr-4">
                    <p className="text-dim-gray text-sm mb-1">Contract Address:</p>
                    <p className="font-mono text-ash-white text-sm break-all">
                      {PUMPFUN_CA}
                    </p>
                  </div>
                  <button
                    onClick={() => copyToClipboard(PUMPFUN_CA, 'pumpfun')}
                    className="p-2 hover:bg-dim-gray/30 rounded-lg transition-colors"
                    data-testid="copy-pumpfun-contract"
                    aria-label="Copy Pump.fun contract address"
                  >
                    {copiedAddress === 'pumpfun' ? (
                      <Check className="w-5 h-5 text-blood-red" />
                    ) : (
                      <Copy className="w-5 h-5 text-dim-gray hover:text-blood-red" />
                    )}
                  </button>
                </div>
              </div>
              
              {/* Tokenomics Preview */}
              <div className="space-y-3">
                <h4 className="font-tech text-blood-red text-sm tracking-wide">CHAOS PIT FEATURES</h4>
                <div className="grid grid-cols-2 gap-3 text-sm">
                  <div className="flex justify-between">
                    <span className="text-dim-gray">Type:</span>
                    <span className="text-ash-white font-semibold">Degen</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dim-gray">Rewards:</span>
                    <span className="text-ash-white font-semibold">Staking</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dim-gray">Speed:</span>
                    <span className="text-ash-white font-semibold">Fast moves</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-dim-gray">Focus:</span>
                    <span className="text-ash-white font-semibold">Memes</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}