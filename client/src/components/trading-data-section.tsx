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
    price: "$0.00042",
    marketCap: "$2.1M",
    volume: "$847K",
    priceChange: "+24.7%",
    marketCapChange: "+18.3%",
    volumeChange: "+67.2%"
  });

  useEffect(() => {
    // Simulate real-time data updates
    const interval = setInterval(() => {
      const priceChange = (Math.random() - 0.5) * 0.00001;
      const currentPrice = parseFloat(tradingData.price.replace('$', ''));
      const newPrice = Math.max(0, currentPrice + priceChange);
      
      setTradingData(prev => ({
        ...prev,
        price: `$${newPrice.toFixed(6)}`
      }));
    }, 5000);

    return () => clearInterval(interval);
  }, [tradingData.price]);

  return (
    <section className="relative z-10 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-brand text-4xl md:text-5xl text-center text-blood-red mb-16" data-testid="trading-title">
          LIVE DATA
        </h2>
        
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
          
          {/* Enhanced Chart Placeholder */}
          <div className="bg-jet-black rounded-lg border border-dim-gray h-64 flex items-center justify-center relative overflow-hidden" data-testid="chart-placeholder">
            <div className="absolute inset-0 grid-overlay opacity-20"></div>
            <div className="text-center relative z-10">
              <div className="font-tech text-toxic-green mb-2 text-lg tracking-widest">DEXSCREENER CHART</div>
              <div className="text-dim-gray text-sm font-medium">Chart integration ready for launch</div>
              <div className="scanline-overlay w-32 h-1 mx-auto mt-4 rounded"></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
