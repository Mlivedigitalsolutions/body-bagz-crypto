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
        
        <div className="neon-card p-8 rounded-2xl" data-testid="trading-data-card">
          <div className="grid md:grid-cols-3 gap-8 mb-8">
            {/* Price */}
            <div className="text-center">
              <h3 className="font-tech text-lg text-dim-gray mb-2">PRICE</h3>
              <div className="font-mono text-2xl text-toxic-green" data-testid="price-value">{tradingData.price}</div>
              <div className="text-sm text-blood-red">{tradingData.priceChange}</div>
            </div>
            
            {/* Market Cap */}
            <div className="text-center">
              <h3 className="font-tech text-lg text-dim-gray mb-2">MARKET CAP</h3>
              <div className="font-mono text-2xl text-ash-white" data-testid="market-cap-value">{tradingData.marketCap}</div>
              <div className="text-sm text-toxic-green">{tradingData.marketCapChange}</div>
            </div>
            
            {/* Volume */}
            <div className="text-center">
              <h3 className="font-tech text-lg text-dim-gray mb-2">24H VOLUME</h3>
              <div className="font-mono text-2xl text-glitch-purple" data-testid="volume-value">{tradingData.volume}</div>
              <div className="text-sm text-blood-red">{tradingData.volumeChange}</div>
            </div>
          </div>
          
          {/* Chart Placeholder */}
          <div className="bg-jet-black rounded border border-dim-gray h-64 flex items-center justify-center" data-testid="chart-placeholder">
            <div className="text-center">
              <div className="font-tech text-toxic-green mb-2">DexScreener Chart</div>
              <div className="text-dim-gray text-sm">Chart integration ready for launch</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
