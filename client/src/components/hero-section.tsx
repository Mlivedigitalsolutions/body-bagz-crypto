import { RefObject } from "react";
import { Button } from "@/components/ui/button";
import { GrimReaperIcon } from "@/components/icons";

interface HeroSectionProps {
  titleRef: RefObject<HTMLHeadingElement>;
}

export default function HeroSection({ titleRef }: HeroSectionProps) {
  return (
    <section className="relative z-10 min-h-screen flex items-center justify-center px-6">
      <div className="max-w-7xl mx-auto text-center">
        {/* Central Grim Reaper SVG */}
        <div className="mb-8 flex justify-center">
          <GrimReaperIcon className="w-64 h-64 md:w-80 md:h-80" />
        </div>

        {/* Main Title */}
        <h1 
          ref={titleRef}
          className="font-brand text-6xl md:text-8xl lg:text-9xl text-blood-red mb-4 relative glitch-text" 
          data-text="BODY BAGZ"
          data-testid="main-title"
        >
          BODY BAGZ
        </h1>
        
        {/* Tagline */}
        <p className="font-brand text-2xl md:text-3xl lg:text-4xl text-ash-white mb-2">
          <span className="animate-flicker">ZIP IT. STACK IT. OWN IT.</span>
        </p>
        <p className="font-tech text-lg md:text-xl text-toxic-green mb-12 tracking-wide">
          THE VILLAIN ERA HAS BEGUN
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-6 justify-center">
          <Button 
            className="cyber-button px-8 py-4 rounded-full text-ash-white font-semibold text-lg hover:shadow-red-glow hover:border-toxic-green hover:-translate-y-0.5 transition-all"
            data-testid="button-buy-bagz"
          >
            BUY $BAGZ
          </Button>
          <Button 
            variant="outline"
            className="border-2 border-toxic-green text-toxic-green hover:bg-toxic-green hover:text-jet-black px-8 py-4 rounded-full font-semibold text-lg transition-all duration-300"
            data-testid="button-view-chart"
          >
            VIEW CHART
          </Button>
        </div>
      </div>
    </section>
  );
}
