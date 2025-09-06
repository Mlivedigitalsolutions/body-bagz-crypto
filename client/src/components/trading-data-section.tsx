import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";

interface TradingData {
  price: string;
  marketCap: string;
  volume: string;
  priceChange: string;
  marketCapChange: string;
  volumeChange: string;
}

export default function TradingDataSection() {
  const CONTRACT_ADDRESS = "7eyYetAuD84SFfANFKmhUDqpTgGfJUQExVUZxhNBmoon";
  
  // Fetch live trading data from our backend API
  const { data: liveData, isLoading, error } = useQuery({
    queryKey: ["/api/trading-data"],
    refetchInterval: 60000, // Refetch every minute
    retry: 2,
    staleTime: 30000, // Keep data fresh for 30 seconds
  });

  const tradingData = liveData ? {
    price: liveData.price?.startsWith('Loading') ? liveData.price : `$${liveData.price}`,
    marketCap: liveData.marketCap?.startsWith('Loading') ? liveData.marketCap : `$${liveData.marketCap}`,
    volume: liveData.volume?.startsWith('Loading') ? liveData.volume : `$${liveData.volume}`,
    priceChange: liveData.priceChange || "0.00%",
    marketCapChange: liveData.marketCapChange || "0.00%",
    volumeChange: liveData.volumeChange || "0.00%"
  } : {
    price: "Loading...",
    marketCap: "Loading...",
    volume: "Loading...",
    priceChange: "Loading...",
    marketCapChange: "Loading...",
    volumeChange: "Loading..."
  };

  return (
    <section className="relative z-10 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-brand text-4xl md:text-5xl text-center text-blood-red mb-8" data-testid="trading-title">
          TRADING DATA
        </h2>
        
        {/* Live Trading Info */}
        <div className="bg-dim-gray/20 border border-toxic-green/30 rounded-lg p-4 max-w-3xl mx-auto mb-12">
          <p className="text-ash-white text-center">
            <strong className="text-toxic-green">✅ LIVE on Solana:</strong> 
            <span className="font-mono text-ash-white ml-2">7eyYetAuD84SFfANFKmhUDqpTgGfJUQExVUZxhNBmoon</span>
          </p>
          <p className="text-ash-white text-sm text-center mt-2">
            {isLoading ? "🔄 Fetching live trading data..." : error ? "⚠️ Data temporarily unavailable - check DexScreener for live charts" : "📊 Live data from DexScreener - updates every minute"}
          </p>
        </div>
        
        <div className="neon-card interactive-glow p-8 rounded-xl" data-testid="trading-data-card">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Price */}
            <div className="text-center">
              <h3 className="font-tech text-lg text-dim-gray mb-2 tracking-wide">PRICE</h3>
              <div className={`font-mono text-3xl font-bold ${isLoading ? 'animate-pulse text-dim-gray' : 'text-toxic-green'}`} data-testid="price-value" style={{textShadow: isLoading ? 'none' : '0 0 10px rgba(57, 255, 20, 0.3)'}}>{tradingData.price}</div>
              <div className={`text-sm font-semibold ${tradingData.priceChange?.startsWith('+') ? 'text-toxic-green' : tradingData.priceChange?.startsWith('-') ? 'text-blood-red' : 'text-dim-gray'}`}>{tradingData.priceChange}</div>
            </div>
            
            {/* Market Cap */}
            <div className="text-center">
              <h3 className="font-tech text-lg text-dim-gray mb-2 tracking-wide">MARKET CAP</h3>
              <div className={`font-mono text-3xl font-bold ${isLoading ? 'animate-pulse text-dim-gray' : 'text-ash-white'}`} data-testid="market-cap-value">{tradingData.marketCap}</div>
              <div className={`text-sm font-semibold ${tradingData.marketCapChange?.startsWith('+') ? 'text-toxic-green' : tradingData.marketCapChange?.startsWith('-') ? 'text-blood-red' : 'text-dim-gray'}`}>{tradingData.marketCapChange}</div>
            </div>
            
            {/* Volume */}
            <div className="text-center">
              <h3 className="font-tech text-lg text-dim-gray mb-2 tracking-wide">24H VOLUME</h3>
              <div className={`font-mono text-3xl font-bold ${isLoading ? 'animate-pulse text-dim-gray' : 'text-glitch-purple'}`} data-testid="volume-value" style={{textShadow: isLoading ? 'none' : '0 0 10px rgba(122, 59, 255, 0.3)'}}>{tradingData.volume}</div>
              <div className={`text-sm font-semibold ${tradingData.volumeChange?.startsWith('+') ? 'text-toxic-green' : tradingData.volumeChange?.startsWith('-') ? 'text-blood-red' : 'text-dim-gray'}`}>{tradingData.volumeChange}</div>
            </div>
          </div>
          
          {/* Dual Chart Integration with Tech Effects */}
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Moonshot Chart */}
            <div className="bg-jet-black rounded-lg border border-toxic-green/30 h-64 flex items-center justify-center relative overflow-hidden" data-testid="moonshot-chart-placeholder">
              <div className="tech-scanline-overlay"></div>
              <div className="holographic-overlay"></div>
              <div className="absolute inset-0 grid-overlay opacity-20"></div>
              <div className="text-center relative z-10">
                <div className="font-tech text-toxic-green mb-2 text-lg tracking-widest">🪦 MOONSHOT CHART</div>
                <div className="text-dim-gray text-sm font-medium mb-4">Flagship Token - Live on DexScreener</div>
                <a 
                  href="https://dexscreener.com/solana/hcspcc1loaejempvs7gh6nzhyxbypmcv6dvc9kjjxeye" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-toxic-green to-emerald-600 rounded-lg font-tech text-white text-sm hover:shadow-green-glow transition-all duration-200"
                  onClick={() => {
                    if ((window as any).gtag) {
                      (window as any).gtag('event', 'open_moonshot_dex', {
                        event_category: 'trading_data',
                        event_label: 'chart_view'
                      });
                    }
                  }}
                >
                  VIEW MOONSHOT CHART ↗
                </a>
                <div className="scanline-overlay w-32 h-1 mx-auto mt-4 rounded bg-toxic-green/30"></div>
              </div>
            </div>

            {/* Pump.fun Chart */}
            <div className="bg-jet-black rounded-lg border border-blood-red/30 h-64 flex items-center justify-center relative overflow-hidden" data-testid="pumpfun-chart-placeholder">
              <div className="tech-scanline-overlay"></div>
              <div className="holographic-overlay"></div>
              <div className="absolute inset-0 grid-overlay opacity-20"></div>
              <div className="text-center relative z-10">
                <div className="font-tech text-blood-red mb-2 text-lg tracking-widest">🔥 PUMP.FUN CHART</div>
                <div className="text-dim-gray text-sm font-medium mb-4">Chaos Pit - Live on DexScreener</div>
                <a 
                  href="https://dexscreener.com/solana/hg4pxoq8cxyhdfbkx3ehwevvbwtlyemgccryvpkqia8p" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-blood-red to-red-600 rounded-lg font-tech text-white text-sm hover:shadow-red-glow transition-all duration-200"
                  onClick={() => {
                    if ((window as any).gtag) {
                      (window as any).gtag('event', 'open_pumpfun_dex', {
                        event_category: 'trading_data',
                        event_label: 'chart_view'
                      });
                    }
                  }}
                >
                  VIEW PUMP.FUN CHART ↗
                </a>
                <div className="scanline-overlay w-32 h-1 mx-auto mt-4 rounded bg-blood-red/30"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
