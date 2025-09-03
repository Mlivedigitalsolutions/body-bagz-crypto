import { useEffect, useState } from 'react';

export function DexScreenerBanner() {
  const [glitchActive, setGlitchActive] = useState(false);

  useEffect(() => {
    const glitchInterval = setInterval(() => {
      setGlitchActive(true);
      setTimeout(() => setGlitchActive(false), 200);
    }, 3000);

    return () => clearInterval(glitchInterval);
  }, []);

  return (
    <div className="relative w-full h-[300px] bg-gradient-to-r from-black via-gray-900 to-black overflow-hidden border border-toxic-green/20">
      {/* Background Matrix Effect */}
      <div className="absolute inset-0 opacity-20">
        <div className="matrix-rain h-full w-full"></div>
      </div>
      
      {/* Circuit Pattern Overlay */}
      <div className="absolute inset-0 opacity-30">
        <svg className="w-full h-full" viewBox="0 0 1200 300">
          <defs>
            <pattern id="circuit" x="0" y="0" width="60" height="60" patternUnits="userSpaceOnUse">
              <path d="M30,0 L30,15 L45,15 L45,45 L15,45 L15,30 L0,30" 
                    stroke="currentColor" strokeWidth="1" fill="none" className="text-toxic-green/40"/>
              <circle cx="30" cy="15" r="2" fill="currentColor" className="text-toxic-green/60"/>
              <circle cx="45" cy="45" r="2" fill="currentColor" className="text-toxic-green/60"/>
            </pattern>
          </defs>
          <rect width="100%" height="100%" fill="url(#circuit)"/>
        </svg>
      </div>

      {/* Main Content */}
      <div className="relative z-10 flex items-center justify-between h-full px-12">
        
        {/* Left Side - Logo & Branding */}
        <div className="flex items-center space-x-6">
          {/* Animated Skull Logo */}
          <div className={`relative transition-all duration-200 ${glitchActive ? 'animate-pulse scale-105' : ''}`}>
            <div className="w-24 h-24 bg-gradient-to-br from-toxic-green to-blood-red rounded-full flex items-center justify-center border-2 border-toxic-green shadow-neon-green">
              <div className="text-4xl">💀</div>
            </div>
            {/* Glowing Ring Effect */}
            <div className="absolute inset-0 rounded-full border-2 border-toxic-green animate-ping opacity-75"></div>
          </div>

          {/* Token Info */}
          <div className="space-y-2">
            <h1 className={`text-6xl font-bold bg-gradient-to-r from-toxic-green via-white to-blood-red bg-clip-text text-transparent transition-all duration-200 ${glitchActive ? 'animate-pulse' : ''}`}>
              BODY BAGZ
            </h1>
            <div className="flex items-center space-x-4">
              <span className="text-2xl font-mono text-toxic-green border border-toxic-green/30 px-4 py-1 rounded bg-toxic-green/10">
                $BAGZ
              </span>
              <div className="h-6 w-px bg-toxic-green/50"></div>
              <span className="text-xl text-gray-300 font-light">Villain Era Crypto</span>
            </div>
          </div>
        </div>

        {/* Right Side - Call to Action & Effects */}
        <div className="text-right space-y-4">
          {/* Animated Price Display */}
          <div className="bg-black/80 border border-toxic-green/30 rounded-lg p-4 backdrop-blur-sm">
            <div className="text-toxic-green text-sm uppercase tracking-wider">Live Price</div>
            <div className="text-3xl font-mono text-white">$0.00042</div>
            <div className="text-green-400 text-sm">+1,247% 🚀</div>
          </div>

          {/* Villain Mode Badge */}
          <div className="inline-flex items-center space-x-2 bg-gradient-to-r from-blood-red/20 to-toxic-green/20 border border-blood-red/50 rounded-full px-6 py-2">
            <span className="w-2 h-2 bg-blood-red rounded-full animate-pulse"></span>
            <span className="text-white font-semibold">VILLAIN MODE ACTIVE</span>
          </div>

          {/* Chaos Metrics */}
          <div className="flex space-x-4 text-xs">
            <div className="text-center">
              <div className="text-toxic-green font-bold">CHAOS</div>
              <div className="text-white">MAX</div>
            </div>
            <div className="text-center">
              <div className="text-blood-red font-bold">HOLDERS</div>
              <div className="text-white">13.3K</div>
            </div>
            <div className="text-center">
              <div className="text-glitch-purple font-bold">VOLUME</div>
              <div className="text-white">$2.1M</div>
            </div>
          </div>
        </div>
      </div>

      {/* Animated Border Effects */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top Border Animation */}
        <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-toxic-green to-transparent animate-pulse"></div>
        {/* Bottom Border Animation */}
        <div className="absolute bottom-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-blood-red to-transparent animate-pulse"></div>
        
        {/* Corner Glitch Effects */}
        <div className={`absolute top-0 right-0 w-20 h-20 bg-toxic-green/10 transition-opacity duration-200 ${glitchActive ? 'opacity-100' : 'opacity-0'}`}></div>
        <div className={`absolute bottom-0 left-0 w-20 h-20 bg-blood-red/10 transition-opacity duration-200 ${glitchActive ? 'opacity-100' : 'opacity-0'}`}></div>
      </div>

      {/* Glitch Overlay */}
      {glitchActive && (
        <div className="absolute inset-0 bg-gradient-to-r from-toxic-green/5 to-blood-red/5 mix-blend-screen animate-pulse"></div>
      )}
    </div>
  );
}