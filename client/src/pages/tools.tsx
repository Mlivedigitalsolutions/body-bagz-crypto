import { useEffect } from "react";
import ToolsSection from "@/components/tools-section";
import Footer from "@/components/footer";
import { UserButton } from "@/components/UserAuth";
import { CompactMusicPlayer } from "@/components/CompactMusicPlayer";
import mainBrandLogo from "@assets/generated_images/Official_Body_Bagz_brand_logo_94353dbf.png";

export default function ToolsPage() {
  useEffect(() => {
    // Scroll to top when page loads
    window.scrollTo(0, 0);
  }, []);

  return (
    <div className="bg-black text-ash-white font-body overflow-x-hidden min-h-screen">
      {/* Solid Black Background */}
      <div className="fixed inset-0 bg-black z-0"></div>

      {/* Navigation */}
      <nav className="relative z-50 px-4 md:px-6 py-3 md:py-4" data-testid="tools-navigation">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-4">
            <a href="/" className="flex items-center space-x-4">
              <img 
                src={mainBrandLogo} 
                alt="Body Bagz Logo"
                className="w-12 h-12 object-contain"
                style={{filter: 'drop-shadow(0 0 8px rgba(231, 53, 44, 0.6))'}}
              />
              <span className="font-brand text-xl tracking-tight text-blood-red">BODY BAGZ</span>
            </a>
          </div>
          
          <div className="flex items-center space-x-6">
            <div className="hidden lg:flex space-x-6 xl:space-x-8">
              <a href="/" className="text-ash-white hover:text-toxic-green transition-colors font-semibold">HOME</a>
              <a href="/tools" className="text-toxic-green font-semibold">CHAOS TOOLS</a>
              <a href="/merch" className="text-ash-white hover:text-blood-red transition-colors font-semibold">MERCH</a>
            </div>
            
            {/* User Auth */}
            <UserButton />
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main>
        <ToolsSection />
      </main>

      <Footer />
      
      {/* Compact Music Player */}
      <CompactMusicPlayer />
    </div>
  );
}