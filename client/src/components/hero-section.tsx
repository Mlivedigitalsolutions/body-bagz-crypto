import { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { GrimReaperIcon } from "@/components/icons";

interface HeroSectionProps {
  titleRef: RefObject<HTMLHeadingElement>;
}

export default function HeroSection({ titleRef }: HeroSectionProps) {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-6 overflow-hidden">
      {/* Enhanced Fog Background */}
      <div className="absolute inset-0 z-0">
        <div className="fog-layer w-full h-full animate-fog"></div>
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-blood-red opacity-5 rounded-full blur-3xl animate-pulse-glow"></div>
        <div className="absolute bottom-1/3 right-1/4 w-80 h-80 bg-toxic-green opacity-3 rounded-full blur-3xl animate-pulse-glow" style={{animationDelay: '1s'}}></div>
      </div>
      
      <div className="max-w-7xl mx-auto text-center relative z-10">
        {/* Enhanced Central Grim Reaper SVG */}
        <div className="mb-8 flex justify-center">
          <div className="relative animate-pulse-glow">
            <GrimReaperIcon className="w-64 h-64 md:w-80 md:h-80 drop-shadow-2xl" />
          </div>
        </div>

        {/* Main Title */}
        <h1 
          ref={titleRef}
          className="font-brand text-6xl md:text-8xl lg:text-9xl mb-4 relative glitch-text font-black tracking-tighter enhanced-heading" 
          data-text="BODY BAGZ"
          data-testid="main-title"
        >
          BODY BAGZ
        </h1>
        
        {/* Tagline */}
        <p className="font-brand text-2xl md:text-3xl lg:text-4xl mb-2 font-black tracking-tight text-primary">
          <span className="animate-flicker enhanced-text" data-testid="hero-tagline">ZIP IT. STACK IT. OWN IT.</span>
        </p>
        <p className="font-tech text-lg md:text-xl mb-12 tracking-widest font-medium" data-testid="hero-subtitle">
          THE VILLAIN ERA HAS BEGUN
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button 
            className="cyber-button px-8 py-4 text-ash-white font-bold text-lg tracking-wide"
            data-testid="button-buy-bagz"
          >
            BUY $BAGZ
          </Button>
          <Button 
            variant="outline"
            className="bg-transparent border-2 border-toxic-green text-toxic-green hover:bg-toxic-green hover:text-jet-black px-8 py-4 rounded-full font-bold text-lg transition-all duration-150 hover:shadow-green-glow hover:scale-102"
            data-testid="button-view-chart"
          >
            VIEW CHART
          </Button>
        </div>
      </div>
    </section>
  );
}
