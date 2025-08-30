import { useEffect, useRef } from "react";
import HeroSection from "@/components/hero-section";
import VideoShowcase from "@/components/video-showcase";
import VisionSection from "@/components/vision-section";
import TokenomicsSection from "@/components/tokenomics-section";
import RoadmapSection from "@/components/roadmap-section";
import ToolsSection from "@/components/tools-section";
import MerchSection from "@/components/merch-section";
import TradingDataSection from "@/components/trading-data-section";
import CommunitySection from "@/components/community-section";
import Footer from "@/components/footer";
import { SkullIcon } from "@/components/icons";

export default function Home() {
  const mainTitleRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    // Glitch effect on scroll
    const observerOptions = {
      threshold: 0.1,
      rootMargin: '0px 0px -100px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = entry.target as HTMLElement;
          target.style.opacity = '1';
          target.style.transform = 'translateY(0)';
        }
      });
    }, observerOptions);

    // Observe all cards for scroll animations
    document.querySelectorAll('.neon-card').forEach(card => {
      const element = card as HTMLElement;
      element.style.opacity = '0';
      element.style.transform = 'translateY(20px)';
      element.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
      observer.observe(element);
    });

    // Add hover glitch effect to main title
    const mainTitle = mainTitleRef.current;
    if (mainTitle) {
      const handleMouseEnter = () => {
        mainTitle.classList.add('animate-glitch');
      };
      
      const handleAnimationEnd = () => {
        mainTitle.classList.remove('animate-glitch');
      };

      mainTitle.addEventListener('mouseenter', handleMouseEnter);
      mainTitle.addEventListener('animationend', handleAnimationEnd);

      return () => {
        mainTitle.removeEventListener('mouseenter', handleMouseEnter);
        mainTitle.removeEventListener('animationend', handleAnimationEnd);
      };
    }

    return () => observer.disconnect();
  }, []);

  return (
    <div className="bg-jet-black text-ash-white font-body overflow-x-hidden">
      {/* Enhanced Animated Background */}
      <div className="fixed inset-0 z-0 grid-overlay">
        <div className="absolute inset-0 fog-layer animate-fog"></div>
        <div className="absolute inset-0">
          <div className="w-96 h-96 bg-blood-red opacity-8 rounded-full blur-3xl absolute top-1/4 left-1/4 animate-pulse-glow"></div>
          <div className="w-80 h-80 bg-toxic-green opacity-4 rounded-full blur-3xl absolute top-3/4 right-1/4 animate-pulse-glow" style={{animationDelay: '1.5s'}}></div>
          <div className="w-72 h-72 bg-glitch-purple opacity-3 rounded-full blur-3xl absolute bottom-1/4 left-1/3 animate-pulse-glow" style={{animationDelay: '3s'}}></div>
        </div>
      </div>

      {/* Navigation */}
      <nav className="relative z-50 px-6 py-4" data-testid="navigation">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <SkullIcon className="w-8 h-8 text-blood-red" />
            <span className="font-brand text-xl tracking-tight text-blood-red">BODY BAGZ</span>
          </div>
          <div className="hidden md:flex space-x-8">
            <a href="#vision" className="text-dim-gray hover:text-toxic-green transition-colors" data-testid="nav-vision">VISION</a>
            <a href="#tokenomics" className="text-dim-gray hover:text-toxic-green transition-colors" data-testid="nav-tokenomics">TOKENOMICS</a>
            <a href="#tools" className="text-dim-gray hover:text-toxic-green transition-colors" data-testid="nav-tools">TOOLS</a>
            <a href="#community" className="text-dim-gray hover:text-toxic-green transition-colors" data-testid="nav-community">COMMUNITY</a>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <HeroSection titleRef={mainTitleRef} />
        
        {/* Introduction Section */}
        <section className="relative z-10 py-20 px-6">
          <div className="max-w-4xl mx-auto">
            <div className="neon-card p-8 md:p-12 rounded-xl">
              {/* Custom Zipper Divider SVG */}
              <div className="flex justify-center mb-8">
                <svg className="w-64 h-8" viewBox="0 0 256 32" fill="none">
                  <rect x="0" y="14" width="256" height="4" fill="#2A2B31"/>
                  <rect x="10" y="12" width="6" height="8" fill="#E7352C"/>
                  <rect x="30" y="12" width="6" height="8" fill="#E7352C"/>
                  <rect x="50" y="12" width="6" height="8" fill="#E7352C"/>
                  <rect x="70" y="12" width="6" height="8" fill="#E7352C"/>
                  <rect x="90" y="12" width="6" height="8" fill="#E7352C"/>
                  <rect x="110" y="12" width="6" height="8" fill="#E7352C"/>
                  <rect x="130" y="12" width="6" height="8" fill="#E7352C"/>
                  <rect x="150" y="12" width="6" height="8" fill="#E7352C"/>
                  <rect x="170" y="12" width="6" height="8" fill="#E7352C"/>
                  <rect x="190" y="12" width="6" height="8" fill="#E7352C"/>
                  <rect x="210" y="12" width="6" height="8" fill="#E7352C"/>
                  <rect x="230" y="12" width="6" height="8" fill="#E7352C"/>
                </svg>
              </div>
              
              <h2 className="font-brand text-3xl md:text-4xl text-blood-red mb-6 text-center">EMBRACE THE CHAOS</h2>
              <div className="prose prose-invert max-w-none text-center">
                <p className="text-lg md:text-xl leading-relaxed text-ash-white mb-6">
                  In a world of rugs, dumps, and broken promises, <span className="text-blood-red font-semibold">BODY BAGZ</span> 
                  emerges from the shadows. We don't promise moon missions or lambo dreams.
                </p>
                <p className="text-lg md:text-xl leading-relaxed text-ash-white">
                  We promise <span className="text-toxic-green font-semibold">chaos</span>, 
                  <span className="text-glitch-purple font-semibold"> culture</span>, and 
                  <span className="text-blood-red font-semibold"> community</span>. 
                  The villain era isn't coming—it's here.
                </p>
              </div>
            </div>
          </div>
        </section>

        <VideoShowcase />
        <VisionSection />
        <TokenomicsSection />
        <RoadmapSection />
        <ToolsSection />
        <MerchSection />
        <TradingDataSection />
        <CommunitySection />
      </main>

      <Footer />
    </div>
  );
}
