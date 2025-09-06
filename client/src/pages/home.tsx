import { useEffect, useRef, useState } from "react";
import HeroSection from "@/components/hero-section";
import VideoShowcase from "@/components/video-showcase";
import VisionSection from "@/components/vision-section";
import TokensSection from "@/components/tokens-section";
import RoadmapSection from "@/components/roadmap-section";
import TradingDataSection from "@/components/trading-data-section";
import CommunitySection from "@/components/community-section";
import Footer from "@/components/footer";
import { UserButton } from "@/components/UserAuth";
import { SkullIcon, TelegramChaosIcon, XChaosIcon } from "@/components/icons";
import { TrophyIcon } from "lucide-react";
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
              <a href="#tokens" className="text-ash-white hover:text-toxic-green transition-colors font-semibold" data-testid="nav-tokens">TOKENS</a>
              <a href="/tools" className="text-ash-white hover:text-toxic-green transition-colors font-semibold" data-testid="nav-tools">CHAOS TOOLS</a>
              <a href="/merch" className="text-ash-white hover:text-blood-red transition-colors font-semibold" data-testid="nav-merch">MERCH</a>
              <a href="/leaderboard" className="text-ash-white hover:text-blood-red transition-colors font-semibold" data-testid="nav-leaderboard">LEADERBOARD</a>
              <a href="#community" className="text-ash-white hover:text-toxic-green transition-colors font-semibold" data-testid="nav-community">COMMUNITY</a>
            </div>
            
            {/* Dual Token Quick Actions */}
            <div className="hidden xl:flex space-x-3">
              <a
                href="https://dexscreener.com/solana/hcspcc1loaejempvs7gh6nzhyxbypmcv6dvc9kjjxeye"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-gradient-to-r from-toxic-green to-emerald-600 rounded-lg font-tech text-white text-xs xl:text-sm hover:shadow-green-glow transition-all duration-200 group"
                data-testid="nav-moonshot-chart"
                onClick={() => {
                  if ((window as any).gtag) {
                    (window as any).gtag('event', 'open_moonshot_dex', {
                      event_category: 'navigation',
                      event_label: 'header_quick_action'
                    });
                  }
                }}
              >
                Moonshot Chart ↗
              </a>
              <a
                href="https://dexscreener.com/solana/hg4pxoq8cxyhdfbkx3ehwevvbwtlyemgccryvpkqia8p"
                target="_blank"
                rel="noopener noreferrer"
                className="px-3 py-2 bg-gradient-to-r from-blood-red to-red-600 rounded-lg font-tech text-white text-xs xl:text-sm hover:shadow-red-glow transition-all duration-200 group"
                data-testid="nav-pumpfun-chart"
                onClick={() => {
                  if ((window as any).gtag) {
                    (window as any).gtag('event', 'open_pumpfun_dex', {
                      event_category: 'navigation',
                      event_label: 'header_quick_action'
                    });
                  }
                }}
              >
                Pump.fun Chart ↗
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
            <a href="#tokens" className="block text-ash-white hover:text-toxic-green transition-colors font-semibold text-lg" onClick={() => setMobileMenuOpen(false)}>TOKENS</a>
            <a href="/tools" className="block text-ash-white hover:text-toxic-green transition-colors font-semibold text-lg" onClick={() => setMobileMenuOpen(false)}>CHAOS TOOLS</a>
            <a href="/merch" className="block text-ash-white hover:text-blood-red transition-colors font-semibold text-lg" onClick={() => setMobileMenuOpen(false)}>MERCH</a>
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
              Moonshot Chart ↗
            </a>
            <a
              href="https://dexscreener.com/solana/hg4pxoq8cxyhdfbkx3ehwevvbwtlyemgccryvpkqia8p"
              target="_blank"
              rel="noopener noreferrer"
              className="block w-full px-4 py-3 bg-gradient-to-r from-blood-red to-red-600 rounded-lg font-tech text-white text-center hover:shadow-red-glow transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
            >
              Pump.fun Chart ↗
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
        <VisionSection />
        <TokensSection />
        <VideoShowcase />
        <RoadmapSection />
        {/* Leaderboard Preview */}
        <section id="leaderboard" className="relative z-10 py-20 px-6">
          <div className="max-w-6xl mx-auto text-center">
            <h2 className="font-brand text-4xl md:text-5xl text-blood-red mb-6" data-testid="leaderboard-preview-title">
              CHAOS LEADERBOARD
            </h2>
            <p className="text-ash-white/90 text-lg font-medium mb-8">
              Compete for monthly rewards. Top performers earn up to <span className="text-toxic-green font-bold">10,000 $BAGZ tokens</span>
            </p>
            
            <div className="neon-card p-8 rounded-xl hover:shadow-red-glow transition-all duration-200 max-w-2xl mx-auto">
              <div className="flex items-center justify-center mb-6">
                <TrophyIcon className="w-12 h-12 text-blood-red mr-4" />
                <div className="text-left">
                  <h3 className="font-tech text-2xl text-blood-red mb-2">Monthly Competition</h3>
                  <p className="text-ash-white">Earn points by creating content, sharing tweets, and engaging with the community.</p>
                </div>
              </div>
              
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
                <div className="text-center">
                  <div className="text-toxic-green font-bold text-lg">6 pts</div>
                  <div className="text-ash-white/80 text-sm">Share Tweet</div>
                </div>
                <div className="text-center">
                  <div className="text-blood-red font-bold text-lg">5 pts</div>
                  <div className="text-ash-white/80 text-sm">Generate Tweet</div>
                </div>
                <div className="text-center">
                  <div className="text-glitch-purple font-bold text-lg">4 pts</div>
                  <div className="text-ash-white/80 text-sm">Create Meme</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-400 font-bold text-lg">3 pts</div>
                  <div className="text-ash-white/80 text-sm">Download PFP</div>
                </div>
              </div>
              
              <a 
                href="/leaderboard"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blood-red to-red-600 rounded-lg font-tech text-white hover:shadow-red-glow transition-all duration-200 text-lg"
                data-testid="view-full-leaderboard"
              >
                View Full Leaderboard →
              </a>
            </div>
          </div>
        </section>
        <CommunitySection />
      </main>

      <Footer />
      
      {/* Compact Music Player */}
      <CompactMusicPlayer />

    </div>
  );
}
