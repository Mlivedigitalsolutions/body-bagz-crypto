import { useState } from "react";
import { Copy, ExternalLink } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

const CONTRACT_ADDRESS = "7eyYetAuD84SFfANFKmhUDqpTgGfJUQExVUZxhNBmoon";
const DEXSCREENER_URL = "https://dexscreener.com/solana/hcspcc1loaejempvs7gh6nzhyxbypmcv6dvc9kjjxeye";
const MOONSHOT_REF_URL = "https://moonshot.com?ref=hmcVBJO6br";

export default function TradingPanel() {
  const [isCopied, setIsCopied] = useState(false);
  const { toast } = useToast();

  const handleCopyContract = async () => {
    try {
      await navigator.clipboard.writeText(CONTRACT_ADDRESS);
      setIsCopied(true);
      
      // Track analytics event (lightweight)
      if (typeof window !== 'undefined') {
        console.log('Analytics event: copy_ca');
      }
      
      toast({
        title: "Copied!",
        description: "Contract address copied to clipboard",
        variant: "default",
      });
      
      setTimeout(() => setIsCopied(false), 2000);
    } catch (err) {
      toast({
        title: "Copy Failed",
        description: "Failed to copy contract address",
        variant: "destructive",
      });
    }
  };

  return (
    <section className="relative z-10 py-16 px-6">
      <div className="max-w-4xl mx-auto">
        <div className="neon-card p-8 md:p-12 rounded-xl border-2 border-blood-red/20 bg-gradient-to-br from-jet-black/90 to-onyx/90 backdrop-blur-sm">
          <div className="text-center mb-8">
            <h2 className="font-brand text-3xl md:text-4xl text-blood-red mb-4 tracking-wide">
              HOW TO BUY / TRADE
            </h2>
            <p className="text-ash-white/80 text-lg">
              Ready to join the villain army? Here's everything you need to get started.
            </p>
          </div>

          {/* Contract Address Section */}
          <div className="mb-8">
            <h3 className="font-tech text-xl text-toxic-green mb-4 text-center">Contract Address</h3>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 p-4 bg-jet-black/50 rounded-lg border border-dim-gray/30">
              <div className="font-mono text-sm text-ash-white break-all text-center sm:text-left">
                {CONTRACT_ADDRESS}
              </div>
              <button
                onClick={handleCopyContract}
                className={`inline-flex items-center px-4 py-2 rounded-lg font-tech text-sm transition-all duration-200 ${
                  isCopied
                    ? 'bg-toxic-green text-jet-black'
                    : 'bg-blood-red hover:bg-blood-red/80 text-white hover:shadow-red-glow'
                }`}
                data-testid="copy-contract-address"
              >
                <Copy className="w-4 h-4 mr-2" />
                {isCopied ? 'COPIED!' : 'COPY'}
              </button>
            </div>
          </div>

          {/* Trading Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-6">
            <a
              href={DEXSCREENER_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-toxic-green to-emerald-600 rounded-lg font-tech text-white hover:shadow-green-glow transition-all duration-200 group text-lg"
              data-testid="dexscreener-trade-button"
            >
              <ExternalLink className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              VIEW CHART / TRADE ↗
            </a>
            <a
              href={MOONSHOT_REF_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-glitch-purple to-purple-600 rounded-lg font-tech text-white hover:shadow-purple-glow transition-all duration-200 group text-lg"
              data-testid="moonshot-referral-button"
            >
              <ExternalLink className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" />
              GET MOONSHOT (REFERRAL) ↗
            </a>
          </div>

          {/* Helper Text */}
          <div className="text-center">
            <p className="text-sm text-ash-white/60 italic">
              Using the Moonshot link supports the Chaos Treasury 🖤
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}