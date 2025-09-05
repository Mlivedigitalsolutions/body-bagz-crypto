import { useEffect, useRef, useState } from "react";
import HeroSection from "@/components/hero-section";
import VideoShowcase from "@/components/video-showcase";
import VisionSection from "@/components/vision-section";
import TokenomicsSection from "@/components/tokenomics-section";
import RoadmapSection from "@/components/roadmap-section";
import ToolsSection from "@/components/tools-section";
import MerchSection from "@/components/merch-section";
import TradingDataSection from "@/components/trading-data-section";
import CommunitySection from "@/components/community-section";
import TradingPanel from "@/components/trading-panel";
import Footer from "@/components/footer";
import { Leaderboard } from "@/components/Leaderboard";
import { UserButton } from "@/components/UserAuth";
import { SkullIcon, TelegramChaosIcon, XChaosIcon } from "@/components/icons";
import { CompactMusicPlayer } from "@/components/CompactMusicPlayer";
import mainBrandLogo from "@assets/generated_images/Official_Body_Bagz_brand_logo_94353dbf.png";

export default function Home() {
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    <div className="bg-black text-ash-white font-body overflow-x-hidden min-h-screen">
      {/* Solid Black Background */}
      <div className="fixed inset-0 bg-black z-0"></div>

      {/* Enhanced Mobile-Optimized Navigation */}
      <nav className="relative z-50 px-4 md:px-6 py-3 md:py-4" data-testid="navigation">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <img 
              src={mainBrandLogo} 
              alt="Body Bagz Logo"
              className="w-12 h-12 object-contain"
              style={{filter: 'drop-shadow(0 0 8px rgba(231, 53, 44, 0.6))'}}
            />
            <span className="font-brand text-xl tracking-tight text-blood-red">BODY BAGZ</span>
          </div>
          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex space-x-6 xl:space-x-8">
              <a href="#vision" className="text-ash-white hover:text-toxic-green transition-colors font-semibold" data-testid="nav-vision">VISION</a>
              <a href="#tokenomics" className="text-ash-white hover:text-toxic-green transition-colors font-semibold" data-testid="nav-tokenomics">TOKENOMICS</a>
              <a href="#tools" className="text-ash-white hover:text-toxic-green transition-colors font-semibold" data-testid="nav-tools">TOOLS</a>
              <a href="#merch" className="text-ash-white hover:text-blood-red transition-colors font-semibold" data-testid="nav-merch">MERCH</a>
              <a href="#leaderboard" className="text-ash-white hover:text-blood-red transition-colors font-semibold" data-testid="nav-leaderboard">LEADERBOARD</a>
              <a href="#community" className="text-ash-white hover:text-toxic-green transition-colors font-semibold" data-testid="nav-community">COMMUNITY</a>
            </div>
            
            {/* Mobile-Optimized Trading CTAs */}
            <div className="hidden xl:flex space-x-3">
              <a
                href="https://dexscreener.com/solana/hcspcc1loaejempvs7gh6nzhyxbypmcv6dvc9kjjxeye"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-gradient-to-r from-toxic-green to-emerald-600 rounded-lg font-tech text-white text-xs xl:text-sm hover:shadow-green-glow transition-all duration-200 group"
                data-testid="nav-dexscreener"
              >
                Trade on Dexscreener ↗
              </a>
              <a
                href="https://moonshot.com?ref=hmcVBJO6br"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-gradient-to-r from-glitch-purple to-purple-600 rounded-lg font-tech text-white text-xs xl:text-sm hover:shadow-purple-glow transition-all duration-200 group"
                data-testid="nav-moonshot"
              >
                Get Moonshot ↗
              </a>
            </div>
            
            {/* User Auth */}
            <UserButton />
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden hamburger" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            
            {/* Social Links */}
            <div className="hidden lg:flex items-center space-x-3">
              <a 
                href="https://t.me/BodyBagzs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-jet-black/50 border border-dim-gray/50 hover:shadow-green-glow hover:bg-jet-black transition-all duration-200 group backdrop-blur-sm"
                data-testid="nav-telegram"
              >
                <TelegramChaosIcon className="w-5 h-5 text-toxic-green group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://twitter.com/i/communities/1960797896896602475" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-jet-black/50 border border-dim-gray/50 hover:shadow-purple-glow hover:bg-jet-black transition-all duration-200 group backdrop-blur-sm"
                data-testid="nav-x-community"
              >
                <XChaosIcon className="w-5 h-5 text-glitch-purple group-hover:scale-110 transition-transform" />
              </a>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      <div className={`mobile-menu-overlay ${mobileMenuOpen ? 'open' : ''}`} onClick={() => setMobileMenuOpen(false)}></div>
      <div className={`mobile-menu ${mobileMenuOpen ? 'open' : ''}`}>
        <div className="p-6">
          <div className="flex justify-between items-center mb-8">
            <span className="font-brand text-xl text-blood-red">MENU</span>
            <button onClick={() => setMobileMenuOpen(false)} className="text-toxic-green text-2xl">
              ×
            </button>
          </div>
          
          <nav className="space-y-6">
            <a href="#vision" className="block text-ash-white hover:text-toxic-green transition-colors font-semibold text-lg" onClick={() => setMobileMenuOpen(false)}>VISION</a>
            <a href="#tokenomics" className="block text-ash-white hover:text-toxic-green transition-colors font-semibold text-lg" onClick={() => setMobileMenuOpen(false)}>TOKENOMICS</a>
            <a href="#tools" className="block text-ash-white hover:text-toxic-green transition-colors font-semibold text-lg" onClick={() => setMobileMenuOpen(false)}>TOOLS</a>
            <a href="#merch" className="block text-ash-white hover:text-blood-red transition-colors font-semibold text-lg" onClick={() => setMobileMenuOpen(false)}>MERCH</a>
            <a href="#leaderboard" className="block text-ash-white hover:text-blood-red transition-colors font-semibold text-lg" onClick={() => setMobileMenuOpen(false)}>LEADERBOARD</a>
            <a href="#community" className="block text-ash-white hover:text-toxic-green transition-colors font-semibold text-lg" onClick={() => setMobileMenuOpen(false)}>COMMUNITY</a>
          </nav>
          
          <div className="mt-8 space-y-4">
            <a
              href="https://dexscreener.com/solana/hcspcc1loaejempvs7gh6nzhyxbypmcv6dvc9kjjxeye"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-3 bg-gradient-to-r from-toxic-green to-emerald-600 rounded-lg font-tech text-white text-center hover:shadow-green-glow transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Trade on Dexscreener ↗
            </a>
            <a
              href="https://moonshot.com?ref=hmcVBJO6br"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-3 bg-gradient-to-r from-glitch-purple to-purple-600 rounded-lg font-tech text-white text-center hover:shadow-purple-glow transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Get Moonshot ↗
            </a>
          </div>
          
          <div className="flex justify-center space-x-4 mt-8">
            <a 
              href="https://t.me/BodyBagzs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-md bg-jet-black/50 border border-dim-gray/50 hover:shadow-green-glow transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <TelegramChaosIcon className="w-6 h-6 text-toxic-green" />
            </a>
            <a 
              href="https://twitter.com/i/communities/1960797896896602475" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-md bg-jet-black/50 border border-dim-gray/50 hover:shadow-purple-glow transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              <XChaosIcon className="w-6 h-6 text-glitch-purple" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        <HeroSection titleRef={mainTitleRef} />
        
        {/* Trading Panel */}
        <TradingPanel />
        
        {/* Streamlined Introduction Section */}
        <section className="relative z-10 py-12 md:py-16 px-4 md:px-6">
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
              
              <h2 className="font-brand text-2xl md:text-3xl lg:text-4xl text-blood-red mb-4 md:mb-6 text-center">EMBRACE THE CHAOS</h2>
              <div className="prose prose-invert max-w-none text-center">
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-ash-white mb-4 md:mb-6">
                  In a world of rugs, dumps, and broken promises, <span className="text-blood-red font-semibold">BODY BAGZ</span> 
                  emerges from the shadows. We don't promise moon missions or lambo dreams.
                </p>
                <p className="text-base md:text-lg lg:text-xl leading-relaxed text-ash-white">
                  We promise <span className="text-toxic-green font-semibold">chaos</span>, 
                  <span className="text-glitch-purple font-semibold"> culture</span>, and 
                  <span className="text-blood-red font-semibold"> community</span>. 
                  The villain era isn't coming—it's here.
                </p>
              </div>
            </div>
          </div>
        </section>

        <TradingDataSection />
        <VideoShowcase />
        <VisionSection />
        <TokenomicsSection />
        <ToolsSection />
        <MerchSection />
        <RoadmapSection />
        <Leaderboard />
        <CommunitySection />
      </main>

      <Footer />
      
      {/* Compact Music Player */}
      <CompactMusicPlayer />

    </div>
  );
}
