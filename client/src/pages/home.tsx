import { useEffect, useRef, useState } from "react";
import { Link } from "wouter";
import { useQuery } from "@tanstack/react-query";
import HeroSection from "@/components/hero-section";
import VideoShowcase from "@/components/video-showcase";
import VisionSection from "@/components/vision-section";
import TokensSection from "@/components/tokens-section";
import roadmapBanner from "@assets/generated_images/Cyberpunk_roadmap_banner_b0b661f9.png";
import TradingDataSection from "@/components/trading-data-section";
import CommunitySection from "@/components/community-section";
import Footer from "@/components/footer";
import { UserButton } from "@/components/UserAuth";
import { SkullIcon, TelegramChaosIcon, XChaosIcon } from "@/components/icons";
import { TrophyIcon, Users } from "lucide-react";
import { CompactMusicPlayer } from "@/components/CompactMusicPlayer";
import mainBrandLogo from "@assets/generated_images/Official_Body_Bagz_brand_logo_94353dbf.png";

export default function Home() {
  const mainTitleRef = useRef<HTMLHeadingElement>(null);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  // Fetch user count
  const { data: userCountData } = useQuery({
    queryKey: ["/api/user-count"],
    refetchInterval: 60000, // Refresh every minute
    retry: 1,
  });

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
              <a href="/stake" className="text-ash-white hover:text-glitch-purple transition-colors font-semibold" data-testid="nav-stake">STAKE</a>
              <a href="/music" className="text-ash-white hover:text-toxic-green transition-colors font-semibold" data-testid="nav-music">
                <span>🎵</span> MUSIC
              </a>
              <a href="/tools" className="text-ash-white hover:text-toxic-green transition-colors font-semibold" data-testid="nav-tools">CHAOS TOOLS</a>
              <a href="/merch" className="text-ash-white hover:text-blood-red transition-colors font-semibold" data-testid="nav-merch">MERCH</a>
              <Link href="/leaderboard" className="text-ash-white hover:text-blood-red transition-colors font-semibold" data-testid="nav-leaderboard">LEADERBOARD</Link>
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
            
            {/* User Count Display */}
            <div className="hidden md:flex items-center space-x-2 bg-jet-black/50 border border-dim-gray/50 rounded-md px-3 py-2 backdrop-blur-sm">
              <Users className="w-4 h-4 text-toxic-green" />
              <span className="text-ash-white text-sm font-medium">
                {(userCountData as any)?.userCount || 0} Users
              </span>
            </div>

            {/* User Auth */}
            <UserButton />
            
            {/* Mobile Menu Button */}
            <button 
              className="lg:hidden hamburger" 
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              data-testid="mobile-menu-toggle"
              aria-label={mobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={mobileMenuOpen}
            >
              <span></span>
              <span></span>
              <span></span>
            </button>
            
            {/* Social Links */}
            <div className="hidden lg:flex items-center space-x-2 xl:space-x-3">
              <a 
                href="https://www.youtube.com/@BodyBagzOfficial" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-jet-black/50 border border-dim-gray/50 hover:shadow-red-glow hover:bg-jet-black transition-all duration-200 group backdrop-blur-sm"
                data-testid="nav-youtube"
                title="YouTube Channel"
              >
                <span className="text-red-500 group-hover:scale-110 transition-transform text-lg">📺</span>
              </a>
              <a 
                href="https://www.instagram.com/bodybagzofficial?igsh=MThlcXYwaW5yd3V2Yw==" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-jet-black/50 border border-dim-gray/50 hover:shadow-pink-glow hover:bg-jet-black transition-all duration-200 group backdrop-blur-sm"
                data-testid="nav-instagram"
                title="Instagram Page"
              >
                <span className="text-pink-500 group-hover:scale-110 transition-transform text-lg">📸</span>
              </a>
              <a 
                href="https://www.tiktok.com/@bodybagzofficial?_t=ZP-8zY3pODNues&_r=1" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-jet-black/50 border border-dim-gray/50 hover:shadow-purple-glow hover:bg-jet-black transition-all duration-200 group backdrop-blur-sm"
                data-testid="nav-tiktok"
                title="TikTok Account"
              >
                <span className="text-purple-500 group-hover:scale-110 transition-transform text-lg">📱</span>
              </a>
              <a 
                href="https://t.me/BodyBagzs" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-jet-black/50 border border-dim-gray/50 hover:shadow-green-glow hover:bg-jet-black transition-all duration-200 group backdrop-blur-sm"
                data-testid="nav-telegram"
                title="Telegram Community"
              >
                <TelegramChaosIcon className="w-5 h-5 text-toxic-green group-hover:scale-110 transition-transform" />
              </a>
              <a 
                href="https://twitter.com/i/communities/1960797896896602475" 
                target="_blank" 
                rel="noopener noreferrer"
                className="p-2 rounded-md bg-jet-black/50 border border-dim-gray/50 hover:shadow-purple-glow hover:bg-jet-black transition-all duration-200 group backdrop-blur-sm"
                data-testid="nav-x-community"
                title="X/Twitter Community"
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
            <a href="/stake" className="block text-ash-white hover:text-glitch-purple transition-colors font-semibold text-lg" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-nav-stake">STAKE</a>
            <a href="/music" className="block text-ash-white hover:text-toxic-green transition-colors font-semibold text-lg" onClick={() => setMobileMenuOpen(false)} data-testid="mobile-nav-music">
              <span>🎵</span> MUSIC
            </a>
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
          
          <div className="flex justify-center space-x-3 mt-8">
            <a 
              href="https://www.youtube.com/@BodyBagzOfficial" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-md bg-jet-black/50 border border-dim-gray/50 hover:shadow-red-glow transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
              title="YouTube"
            >
              <span className="text-red-500 text-xl">📺</span>
            </a>
            <a 
              href="https://www.instagram.com/bodybagzofficial?igsh=MThlcXYwaW5yd3V2Yw==" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-md bg-jet-black/50 border border-dim-gray/50 hover:shadow-pink-glow transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
              title="Instagram"
            >
              <span className="text-pink-500 text-xl">📸</span>
            </a>
            <a 
              href="https://www.tiktok.com/@bodybagzofficial?_t=ZP-8zY3pODNues&_r=1" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-md bg-jet-black/50 border border-dim-gray/50 hover:shadow-purple-glow transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
              title="TikTok"
            >
              <span className="text-purple-500 text-xl">📱</span>
            </a>
            <a 
              href="https://t.me/BodyBagzs" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-md bg-jet-black/50 border border-dim-gray/50 hover:shadow-green-glow transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
              title="Telegram"
            >
              <TelegramChaosIcon className="w-6 h-6 text-toxic-green" />
            </a>
            <a 
              href="https://twitter.com/i/communities/1960797896896602475" 
              target="_blank" 
              rel="noopener noreferrer"
              className="p-3 rounded-md bg-jet-black/50 border border-dim-gray/50 hover:shadow-purple-glow transition-all duration-200"
              onClick={() => setMobileMenuOpen(false)}
              title="X Community"
            >
              <XChaosIcon className="w-6 h-6 text-glitch-purple" />
            </a>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <main>
        <HeroSection titleRef={mainTitleRef} />
        
        {/* Genesis Staking Pool Announcement */}
        <section className="relative z-10 py-8 px-4 md:px-6">
          <div className="max-w-6xl mx-auto">
            <div className="bg-gradient-to-r from-blood-red/10 via-glitch-purple/10 to-toxic-green/10 border border-blood-red/30 rounded-xl p-6 md:p-8 backdrop-blur-sm">
              <div className="flex flex-col md:flex-row items-center justify-between gap-6">
                <div className="text-center md:text-left">
                  <div className="flex items-center justify-center md:justify-start gap-2 mb-2">
                    <span className="text-2xl">⚡</span>
                    <h3 className="font-brand text-xl md:text-2xl text-blood-red">Genesis Villain Pool</h3>
                    <span className="bg-toxic-green/20 border border-toxic-green/50 text-toxic-green text-xs font-tech px-2 py-1 rounded-full">
                      LIVE
                    </span>
                  </div>
                  <p className="text-ash-white/80 text-sm md:text-base">
                    Stake Moonshot $BAGZ → Earn Pump.fun $BAGZ | 0.75% daily rewards for 15-day locks
                  </p>
                  <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-3 text-xs text-ash-white/60">
                    <span>200K $BAGZ funded</span>
                    <span>•</span>
                    <span>10K minimum stake</span>
                    <span>•</span>
                    <span>~11.25% total return</span>
                  </div>
                </div>
                <div className="flex flex-col sm:flex-row gap-3">
                  <a
                    href="/stake"
                    className="px-6 py-3 bg-gradient-to-r from-blood-red to-glitch-purple hover:from-blood-red/80 hover:to-glitch-purple/80 text-white font-tech rounded-lg transition-all duration-200 hover:shadow-red-glow text-center"
                    data-testid="home-stake-cta"
                  >
                    🚀 Start Staking
                  </a>
                  <a
                    href="/stake"
                    className="px-6 py-3 bg-jet-black/60 border border-dim-gray hover:border-toxic-green text-ash-white hover:text-toxic-green font-tech rounded-lg transition-all duration-200 text-center"
                    data-testid="home-stake-info"
                  >
                    Learn More
                  </a>
                </div>
              </div>
            </div>
          </div>
        </section>
        
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
        {/* Roadmap Banner */}
        <section className="relative z-10 py-12 px-6">
          <div className="max-w-4xl mx-auto">
            <a 
              href="/roadmap" 
              className="block neon-card rounded-xl overflow-hidden hover:shadow-red-glow transition-all duration-300 group"
              data-testid="roadmap-banner-link"
            >
              <img 
                src={roadmapBanner} 
                alt="Body Bagz Roadmap - Click to view full roadmap"
                className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
              />
            </a>
          </div>
        </section>
        {/* Leaderboard Preview */}
        <section id="leaderboard" className="relative z-10 py-12 px-6">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="font-brand text-3xl md:text-4xl text-blood-red mb-4" data-testid="leaderboard-preview-title">
              Monthly Competition
            </h2>
            <p className="text-ash-white/90 text-base font-medium mb-6">
              Earn points by creating content, sharing tweets, and engaging with the community.
            </p>
            
            <div className="neon-card p-6 rounded-xl hover:shadow-red-glow transition-all duration-200 max-w-xl mx-auto">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-6">
                <div className="text-center">
                  <div className="text-toxic-green font-bold text-base">6 pts</div>
                  <div className="text-ash-white/80 text-xs">Share Tweet</div>
                </div>
                <div className="text-center">
                  <div className="text-blood-red font-bold text-base">5 pts</div>
                  <div className="text-ash-white/80 text-xs">Generate Tweet</div>
                </div>
                <div className="text-center">
                  <div className="text-glitch-purple font-bold text-base">4 pts</div>
                  <div className="text-ash-white/80 text-xs">Create Meme</div>
                </div>
                <div className="text-center">
                  <div className="text-yellow-400 font-bold text-base">3 pts</div>
                  <div className="text-ash-white/80 text-xs">Download PFP</div>
                </div>
              </div>
              
              <Link 
                href="/leaderboard"
                className="inline-flex items-center justify-center px-8 py-4 bg-gradient-to-r from-blood-red to-red-600 rounded-lg font-tech text-white hover:shadow-red-glow transition-all duration-200 text-lg"
                data-testid="view-full-leaderboard"
              >
                View Full Leaderboard →
              </Link>
            </div>
          </div>
        </section>
        <CommunitySection />
      </main>

      <Footer />
      

    </div>
  );
}
