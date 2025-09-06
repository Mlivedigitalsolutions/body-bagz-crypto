import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface TokenData {
  price: string;
  marketCap: string;
  volume: string;
  priceChange: string;
  marketCapChange: string;
  volumeChange: string;
  liquidity: string;
  timestamp: string;
}

interface TradingData {
  moonshot: TokenData;
  pumpfun: TokenData;
}

export default function TradingDataSection() {
  // Fetch live trading data from our backend API
  const { data: liveData, isLoading, error } = useQuery({
    queryKey: ["/api/trading-data"],
    refetchInterval: 60000, // Refetch every minute
    retry: 2,
    staleTime: 30000, // Keep data fresh for 30 seconds
  });

  const formatTokenDisplay = (tokenData: TokenData | undefined) => {
    if (!tokenData) {
      return {
        price: "Loading...",
        marketCap: "Loading...",
        volume: "Loading...",
        priceChange: "Loading...",
        marketCapChange: "Loading...",
        volumeChange: "Loading..."
      };
    }
    
    return {
      price: tokenData.price?.startsWith('Loading') ? tokenData.price : `$${tokenData.price}`,
      marketCap: tokenData.marketCap?.startsWith('Loading') ? tokenData.marketCap : `$${tokenData.marketCap}`,
      volume: tokenData.volume?.startsWith('Loading') ? tokenData.volume : `$${tokenData.volume}`,
      priceChange: tokenData.priceChange || "0.00%",
      marketCapChange: tokenData.marketCapChange || "0.00%",
      volumeChange: tokenData.volumeChange || "0.00%"
    };
  };

  const moonshotData = formatTokenDisplay(liveData?.moonshot);
  const pumpfunData = formatTokenDisplay(liveData?.pumpfun);

  return (
    <section className="relative z-10 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-brand text-4xl md:text-5xl text-center text-blood-red mb-8" data-testid="trading-title">
          TRADING DATA
        </h2>
        
        {/* Live Trading Info */}
        <div className="bg-dim-gray/20 border border-toxic-green/30 rounded-lg p-4 max-w-4xl mx-auto mb-12">
          <p className="text-ash-white text-center">
            <strong className="text-toxic-green">✅ LIVE DUAL TOKEN DATA</strong>
          </p>
          <div className="flex flex-col md:flex-row gap-4 mt-2 text-xs">
            <div className="flex-1 text-center">
              <span className="text-toxic-green font-semibold">Moonshot:</span>
              <span className="font-mono text-ash-white ml-2">7eyYetAuD...moon</span>
            </div>
            <div className="flex-1 text-center">
              <span className="text-blood-red font-semibold">Pump.fun:</span>
              <span className="font-mono text-ash-white ml-2">6sw8wayQ...pump</span>
            </div>
          </div>
          <p className="text-ash-white text-sm text-center mt-2">
            {isLoading ? "🔄 Fetching live data from both tokens..." : error ? "⚠️ Data temporarily unavailable - check DexScreener for live charts" : "📊 Live data from DexScreener - updates every minute"}
          </p>
        </div>
        
        {/* Dual Token Trading Data */}
        <div className="grid lg:grid-cols-2 gap-8 mb-8">
          {/* Moonshot Token Data */}
          <div className="neon-card p-6 rounded-xl border border-toxic-green/30" data-testid="moonshot-trading-data">
            <h3 className="font-tech text-xl text-toxic-green mb-6 text-center tracking-wide font-bold">🪦 MOONSHOT $BAGZ</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <h4 className="font-tech text-sm text-dim-gray mb-2">PRICE</h4>
                <div className={`font-mono text-xl font-bold ${isLoading ? 'animate-pulse text-dim-gray' : 'text-toxic-green'}`} style={{textShadow: isLoading ? 'none' : '0 0 8px rgba(57, 255, 20, 0.3)'}}>{moonshotData.price}</div>
                <div className={`text-xs font-semibold ${moonshotData.priceChange?.startsWith('+') ? 'text-toxic-green' : moonshotData.priceChange?.startsWith('-') ? 'text-blood-red' : 'text-dim-gray'}`}>{moonshotData.priceChange}</div>
              </div>
              <div className="text-center">
                <h4 className="font-tech text-sm text-dim-gray mb-2">MARKET CAP</h4>
                <div className={`font-mono text-xl font-bold ${isLoading ? 'animate-pulse text-dim-gray' : 'text-ash-white'}`}>{moonshotData.marketCap}</div>
                <div className={`text-xs font-semibold ${moonshotData.marketCapChange?.startsWith('+') ? 'text-toxic-green' : moonshotData.marketCapChange?.startsWith('-') ? 'text-blood-red' : 'text-dim-gray'}`}>{moonshotData.marketCapChange}</div>
              </div>
              <div className="text-center">
                <h4 className="font-tech text-sm text-dim-gray mb-2">24H VOLUME</h4>
                <div className={`font-mono text-xl font-bold ${isLoading ? 'animate-pulse text-dim-gray' : 'text-glitch-purple'}`} style={{textShadow: isLoading ? 'none' : '0 0 8px rgba(122, 59, 255, 0.3)'}}>{moonshotData.volume}</div>
                <div className={`text-xs font-semibold ${moonshotData.volumeChange?.startsWith('+') ? 'text-toxic-green' : moonshotData.volumeChange?.startsWith('-') ? 'text-blood-red' : 'text-dim-gray'}`}>{moonshotData.volumeChange}</div>
              </div>
            </div>
          </div>

          {/* Pump.fun Token Data */}
          <div className="neon-card p-6 rounded-xl border border-blood-red/30" data-testid="pumpfun-trading-data">
            <h3 className="font-tech text-xl text-blood-red mb-6 text-center tracking-wide font-bold">🔥 PUMP.FUN $BAGZ</h3>
            <div className="grid grid-cols-3 gap-4">
              <div className="text-center">
                <h4 className="font-tech text-sm text-dim-gray mb-2">PRICE</h4>
                <div className={`font-mono text-xl font-bold ${isLoading ? 'animate-pulse text-dim-gray' : 'text-blood-red'}`} style={{textShadow: isLoading ? 'none' : '0 0 8px rgba(231, 53, 44, 0.3)'}}>{pumpfunData.price}</div>
                <div className={`text-xs font-semibold ${pumpfunData.priceChange?.startsWith('+') ? 'text-toxic-green' : pumpfunData.priceChange?.startsWith('-') ? 'text-blood-red' : 'text-dim-gray'}`}>{pumpfunData.priceChange}</div>
              </div>
              <div className="text-center">
                <h4 className="font-tech text-sm text-dim-gray mb-2">MARKET CAP</h4>
                <div className={`font-mono text-xl font-bold ${isLoading ? 'animate-pulse text-dim-gray' : 'text-ash-white'}`}>{pumpfunData.marketCap}</div>
                <div className={`text-xs font-semibold ${pumpfunData.marketCapChange?.startsWith('+') ? 'text-toxic-green' : pumpfunData.marketCapChange?.startsWith('-') ? 'text-blood-red' : 'text-dim-gray'}`}>{pumpfunData.marketCapChange}</div>
              </div>
              <div className="text-center">
                <h4 className="font-tech text-sm text-dim-gray mb-2">24H VOLUME</h4>
                <div className={`font-mono text-xl font-bold ${isLoading ? 'animate-pulse text-dim-gray' : 'text-glitch-purple'}`} style={{textShadow: isLoading ? 'none' : '0 0 8px rgba(122, 59, 255, 0.3)'}}>{pumpfunData.volume}</div>
                <div className={`text-xs font-semibold ${pumpfunData.volumeChange?.startsWith('+') ? 'text-toxic-green' : pumpfunData.volumeChange?.startsWith('-') ? 'text-blood-red' : 'text-dim-gray'}`}>{pumpfunData.volumeChange}</div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Combined Chart Links */}
        <div className="neon-card p-6 rounded-xl">
          <h3 className="font-tech text-lg text-center text-ash-white mb-4 tracking-wide">LIVE CHARTS & TRADING</h3>
          <div className="grid md:grid-cols-2 gap-4">
            <a 
              href="https://dexscreener.com/solana/hcspcc1loaejempvs7gh6nzhyxbypmcv6dvc9kjjxeye" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-toxic-green to-emerald-600 rounded-lg font-tech text-white hover:shadow-green-glow transition-all duration-200 group"
              onClick={() => {
                if ((window as any).gtag) {
                  (window as any).gtag('event', 'open_moonshot_dex', {
                    event_category: 'trading_data',
                    event_label: 'chart_view'
                  });
                }
              }}
            >
              🪦 MOONSHOT CHART ↗
            </a>
            <a 
              href="https://dexscreener.com/solana/hg4pxoq8cxyhdfbkx3ehwevvbwtlyemgccryvpkqia8p" 
              target="_blank" 
              rel="noopener noreferrer"
              className="flex items-center justify-center px-6 py-3 bg-gradient-to-r from-blood-red to-red-600 rounded-lg font-tech text-white hover:shadow-red-glow transition-all duration-200 group"
              onClick={() => {
                if ((window as any).gtag) {
                  (window as any).gtag('event', 'open_pumpfun_dex', {
                    event_category: 'trading_data',
                    event_label: 'chart_view'
                  });
                }
              }}
            >
              🔥 PUMP.FUN CHART ↗
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
