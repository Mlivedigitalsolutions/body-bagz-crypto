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
    if (window.gtag) {
      window.gtag('event', eventName, {
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
              
              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href={MOONSHOT_DEX}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-toxic-green/20 to-emerald-600/20 border border-toxic-green rounded-lg font-tech text-toxic-green hover:shadow-green-glow transition-all duration-200 group"
                  data-testid="moonshot-chart-btn"
                  onClick={() => handleAnalytics('open_moonshot_dex', 'view_chart')}
                >
                  <span className="mr-2">📊</span>
                  View Chart ↗
                </a>
                <a
                  href={`${MOONSHOT_DEX}#trade`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-toxic-green to-emerald-600 rounded-lg font-tech text-white hover:shadow-green-glow transition-all duration-200"
                  data-testid="moonshot-buy-btn"
                  onClick={() => handleAnalytics('buy_moonshot', 'dex_trade')}
                >
                  <span className="mr-2">💀</span>
                  Buy on Dex ↗
                </a>
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
              
              {/* Action Buttons */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <a
                  href={PUMPFUN_DEX}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blood-red/20 to-red-600/20 border border-blood-red rounded-lg font-tech text-blood-red hover:shadow-red-glow transition-all duration-200 group"
                  data-testid="pumpfun-chart-btn"
                  onClick={() => handleAnalytics('open_pumpfun_dex', 'view_chart')}
                >
                  <span className="mr-2">📊</span>
                  View Chart ↗
                </a>
                <a
                  href={`${PUMPFUN_DEX}#trade`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blood-red to-red-600 rounded-lg font-tech text-white hover:shadow-red-glow transition-all duration-200"
                  data-testid="pumpfun-buy-btn"
                  onClick={() => handleAnalytics('buy_pumpfun', 'dex_trade')}
                >
                  <span className="mr-2">💀</span>
                  Buy on Dex ↗
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}