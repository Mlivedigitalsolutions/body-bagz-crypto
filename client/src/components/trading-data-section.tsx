import { useState, useEffect } from "react";

interface TradingData {
  price: string;
  marketCap: string;
  volume: string;
  priceChange: string;
  marketCapChange: string;
  volumeChange: string;
}

export default function TradingDataSection() {
  const [tradingData, setTradingData] = useState<TradingData>({
    price: "TBA",
    marketCap: "TBA",
    volume: "TBA",
    priceChange: "TBA",
    marketCapChange: "TBA",
    volumeChange: "TBA"
  });

  useEffect(() => {
    // Future: Real-time data integration will be added here
    // Currently displaying TBA until official trading launch
  }, []);

  return (
    <section className="relative z-10 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-brand text-4xl md:text-5xl text-center text-blood-red mb-8" data-testid="trading-title">
          TRADING DATA
        </h2>
        
        {/* Live Trading Disclaimer */}
        <div className="bg-dim-gray/20 border border-blood-red/30 rounded-lg p-4 max-w-3xl mx-auto mb-12">
          <p className="text-ash-white/80 text-center">
            <strong className="text-blood-red">Contract Address:</strong> 
            <span className="font-mono text-toxic-green ml-2">7eyYetAuD84SFfANFKmhUDqpTgGfJUQExVUZxhNBmoon</span>
          </p>
          <p className="text-ash-white/60 text-sm text-center mt-2">
            Live trading data will populate once $BAGZ is officially listed. 
            Visit DexScreener for real-time charts and trading.
          </p>
        </div>
        
        <div className="neon-card p-8 rounded-xl" data-testid="trading-data-card">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Price */}
            <div className="text-center">
              <h3 className="font-tech text-lg text-dim-gray mb-2 tracking-wide">PRICE</h3>
              <div className="font-mono text-3xl text-toxic-green font-bold" data-testid="price-value" style={{textShadow: '0 0 10px rgba(57, 255, 20, 0.3)'}}>{tradingData.price}</div>
              <div className="text-sm text-blood-red font-semibold">{tradingData.priceChange}</div>
            </div>
            
            {/* Market Cap */}
            <div className="text-center">
              <h3 className="font-tech text-lg text-dim-gray mb-2 tracking-wide">MARKET CAP</h3>
              <div className="font-mono text-3xl text-ash-white font-bold" data-testid="market-cap-value">{tradingData.marketCap}</div>
              <div className="text-sm text-toxic-green font-semibold">{tradingData.marketCapChange}</div>
            </div>
            
            {/* Volume */}
            <div className="text-center">
              <h3 className="font-tech text-lg text-dim-gray mb-2 tracking-wide">24H VOLUME</h3>
              <div className="font-mono text-3xl text-glitch-purple font-bold" data-testid="volume-value" style={{textShadow: '0 0 10px rgba(122, 59, 255, 0.3)'}}>{tradingData.volume}</div>
              <div className="text-sm text-blood-red font-semibold">{tradingData.volumeChange}</div>
            </div>
          </div>
          
          {/* Live Chart Integration */}
          <div className="bg-jet-black rounded-lg border border-dim-gray h-64 flex items-center justify-center relative overflow-hidden" data-testid="chart-placeholder">
            <div className="absolute inset-0 grid-overlay opacity-20"></div>
            <div className="text-center relative z-10">
              <div className="font-tech text-toxic-green mb-2 text-lg tracking-widest">LIVE CHART</div>
              <div className="text-dim-gray text-sm font-medium mb-4">Available on DexScreener post-launch</div>
              <a 
                href="https://dexscreener.com/solana/hcspcc1loaejempvs7gh6nzhyxbypmcv6dvc9kjjxeye" 
                target="_blank" 
                rel="noopener noreferrer"
                className="inline-flex items-center px-6 py-2 bg-gradient-to-r from-toxic-green to-emerald-600 rounded-lg font-tech text-white text-sm hover:shadow-green-glow transition-all duration-200"
              >
                VIEW ON DEXSCREENER ↗
              </a>
              <div className="scanline-overlay w-32 h-1 mx-auto mt-4 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
