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
import { Leaderboard } from "@/components/Leaderboard";
import { UserButton } from "@/components/UserAuth";
import { SkullIcon, TelegramChaosIcon, XChaosIcon } from "@/components/icons";
import { MusicPlayer } from "@/components/MusicPlayer";

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
          <div className="flex items-center space-x-6">
            <div className="hidden md:flex space-x-8">
              <a href="#media" className="text-dim-gray hover:text-blood-red transition-colors" data-testid="nav-media">MEDIA</a>
              <a href="#vision" className="text-dim-gray hover:text-toxic-green transition-colors" data-testid="nav-vision">VISION</a>
              <a href="#tokenomics" className="text-dim-gray hover:text-toxic-green transition-colors" data-testid="nav-tokenomics">TOKENOMICS</a>
              <a href="#tools" className="text-dim-gray hover:text-toxic-green transition-colors" data-testid="nav-tools">TOOLS</a>
              <a href="#leaderboard" className="text-dim-gray hover:text-blood-red transition-colors" data-testid="nav-leaderboard">LEADERBOARD</a>
              <a href="#community" className="text-dim-gray hover:text-toxic-green transition-colors" data-testid="nav-community">COMMUNITY</a>
            </div>
            
            {/* User Auth */}
            <UserButton />
            
            {/* Social Links */}
            <div className="flex items-center space-x-3">
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
        
        {/* Official Media Section */}
        <section id="media" className="relative z-10 py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="font-brand text-4xl md:text-6xl text-blood-red mb-4 cyberpunk-glow">
                OFFICIAL MEDIA
              </h2>
              <p className="text-dim-gray text-lg md:text-xl max-w-3xl mx-auto">
                Immerse yourself in the <span className="text-toxic-green">villain soundscape</span>. 
                Premium tracks engineered for the <span className="text-blood-red">chaos economy</span>.
              </p>
            </div>
            
            <div className="grid lg:grid-cols-2 gap-8 items-start">
              {/* Music Player */}
              <div className="space-y-6">
                <div className="neon-card p-2">
                  <MusicPlayer autoPlay={true} className="w-full" />
                </div>
                
                {/* Music Info */}
                <div className="neon-card p-6">
                  <h3 className="font-brand text-2xl text-toxic-green mb-4 cyberpunk-glow">
                    🎵 VILLAIN SOUNDTRACK
                  </h3>
                  <div className="space-y-3 text-dim-gray">
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-blood-red rounded-full"></span>
                      <strong className="text-ash-white">Auto-Play:</strong> Villain Mode starts automatically
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-toxic-green rounded-full"></span>
                      <strong className="text-ash-white">Quality:</strong> High-fidelity cyberpunk audio
                    </p>
                    <p className="flex items-center gap-2">
                      <span className="w-2 h-2 bg-glitch-purple rounded-full"></span>
                      <strong className="text-ash-white">Playlist:</strong> 5 exclusive villain-themed tracks
                    </p>
                  </div>
                </div>
              </div>
              
              {/* Media Features */}
              <div className="space-y-6">
                <div className="neon-card p-6">
                  <h3 className="font-brand text-2xl text-blood-red mb-4 cyberpunk-glow">
                    🔊 AUDIO FEATURES
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div className="bg-jet-black/50 p-4 rounded-lg border border-toxic-green/30">
                      <div className="text-toxic-green font-bold text-lg cyberpunk-glow">AUTO-PLAY</div>
                      <div className="text-dim-gray text-sm">Villain Mode starts on site entry</div>
                    </div>
                    <div className="bg-jet-black/50 p-4 rounded-lg border border-blood-red/30">
                      <div className="text-blood-red font-bold text-lg cyberpunk-glow">MUTE CONTROL</div>
                      <div className="text-dim-gray text-sm">One-click audio control</div>
                    </div>
                    <div className="bg-jet-black/50 p-4 rounded-lg border border-glitch-purple/30">
                      <div className="text-glitch-purple font-bold text-lg cyberpunk-glow">TRACK SKIP</div>
                      <div className="text-dim-gray text-sm">Navigate full playlist</div>
                    </div>
                    <div className="bg-jet-black/50 p-4 rounded-lg border border-ash-white/30">
                      <div className="text-ash-white font-bold text-lg cyberpunk-glow">PROGRESS BAR</div>
                      <div className="text-dim-gray text-sm">Interactive seek control</div>
                    </div>
                  </div>
                </div>
                
                <div className="neon-card p-6">
                  <h3 className="font-brand text-2xl text-toxic-green mb-4 cyberpunk-glow">
                    🎼 TRACK LIST
                  </h3>
                  <div className="space-y-3">
                    <div className="flex items-center gap-3 p-3 bg-blood-red/10 rounded-lg border border-blood-red/30">
                      <div className="w-3 h-3 bg-blood-red rounded-full animate-pulse"></div>
                      <div>
                        <div className="text-ash-white font-semibold">Villain Mode</div>
                        <div className="text-dim-gray text-sm">The anthem of chaos</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-toxic-green/10 rounded-lg border border-toxic-green/30">
                      <div className="w-3 h-3 bg-toxic-green rounded-full"></div>
                      <div>
                        <div className="text-ash-white font-semibold">Cyber Throne Series</div>
                        <div className="text-dim-gray text-sm">2 tracks of digital dominance</div>
                      </div>
                    </div>
                    <div className="flex items-center gap-3 p-3 bg-glitch-purple/10 rounded-lg border border-glitch-purple/30">
                      <div className="w-3 h-3 bg-glitch-purple rounded-full"></div>
                      <div>
                        <div className="text-ash-white font-semibold">Villain Era Series</div>
                        <div className="text-dim-gray text-sm">2 tracks defining the movement</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
        
        <VisionSection />
        <TokenomicsSection />
        <RoadmapSection />
        <ToolsSection />
        <Leaderboard />
        <MerchSection />
        <TradingDataSection />
        <CommunitySection />
      </main>

      <Footer />
    </div>
  );
}
