import { RefObject } from "react";
import { Button } from "@/components/ui/button";
import heroBanner from "../assets/hero-banner.png";

interface HeroSectionProps {
  titleRef: RefObject<HTMLHeadingElement>;
}

export default function HeroSection({ titleRef }: HeroSectionProps) {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Premium 3D Background Effects */}
      <div className="absolute inset-0 z-0">
        <div className="fog-layer w-full h-full animate-fog"></div>
        
        {/* Enhanced Multi-Layer Orbs */}
        <div className="absolute top-1/4 left-1/5 w-[500px] h-[500px] bg-blood-red opacity-8 rounded-full blur-[100px] animate-pulse-glow premium-orb"></div>
        <div className="absolute bottom-1/4 right-1/5 w-[400px] h-[400px] bg-toxic-green opacity-6 rounded-full blur-[80px] animate-pulse-glow premium-orb" style={{animationDelay: '1s'}}></div>
        <div className="absolute top-1/2 left-1/2 w-[300px] h-[300px] bg-glitch-purple opacity-4 rounded-full blur-[60px] animate-pulse-glow premium-orb transform -translate-x-1/2 -translate-y-1/2" style={{animationDelay: '2s'}}></div>
        
        {/* Premium Grid Matrix Effect */}
        <div className="absolute inset-0 premium-grid-matrix opacity-20"></div>
        
        {/* 3D Depth Layers */}
        <div className="absolute inset-0 premium-depth-layer-1"></div>
        <div className="absolute inset-0 premium-depth-layer-2"></div>
        <div className="absolute inset-0 premium-depth-layer-3"></div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* EPIC CYBERPUNK HERO BANNER */}
        <div className="mb-8 flex justify-center">
          <div className="relative animate-pulse-glow premium-banner-container">
            <div className="w-full max-w-4xl rounded-2xl overflow-hidden neon-card premium-3d-frame">
              <img 
                src={heroBanner}
                alt="Body Bagz - Villain Era Cyberpunk Crypto"
                className="w-full h-auto object-cover premium-banner-effect"
                data-testid="hero-banner"
              />
            </div>
            {/* Epic 3D Frame Enhancement */}
            <div className="absolute inset-0 premium-banner-overlay"></div>
            <div className="absolute -inset-4 premium-banner-glow rounded-3xl"></div>
          </div>
        </div>

        {/* Enhanced Tagline - Banner says it all! */}
        <div className="relative z-20 mb-6">
          <div className="bg-jet-black/80 backdrop-blur-lg rounded-2xl px-8 py-4 border border-blood-red/30 neon-card inline-block">
            <p className="font-brand text-lg md:text-xl font-bold text-toxic-green tracking-widest"
               data-testid="enhanced-tagline">
              THE ULTIMATE CYBERPUNK CRYPTO TOKEN
            </p>
          </div>
        </div>
        
        {/* Tagline */}
        <p className="font-brand text-2xl md:text-3xl lg:text-4xl mb-2 font-black tracking-tight text-primary">
          <span className="animate-flicker enhanced-text" data-testid="hero-tagline">ZIP IT. STACK IT. OWN IT.</span>
        </p>
        <p className="font-tech text-lg md:text-xl mb-12 tracking-widest font-medium" data-testid="hero-subtitle">
          THE VILLAIN ERA HAS BEGUN
        </p>

        {/* Premium 3D CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center premium-button-group">
          <Button 
            className="cyber-button px-8 py-4 text-ash-white font-bold text-lg tracking-wide premium-primary-button"
            data-testid="button-buy-bagz"
          >
            BUY $BAGZ
          </Button>
          <Button 
            variant="outline"
            className="premium-secondary-button bg-transparent border-2 border-toxic-green text-toxic-green hover:bg-toxic-green hover:text-jet-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-300"
            data-testid="button-view-chart"
          >
            VIEW CHART
          </Button>
        </div>
      </div>
    </section>
  );
}
