import { BarcodeIcon, TelegramChaosIcon, XChaosIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="relative z-10 py-16 px-6 border-t border-dim-gray">
      <div className="max-w-4xl mx-auto text-center">
        {/* Custom Barcode SVG */}
        <div className="flex justify-center mb-8">
          <BarcodeIcon className="w-64 h-12" />
        </div>
        
        <div className="font-brand text-2xl text-blood-red mb-4">BODY BAGZ</div>
        <div className="font-tech text-toxic-green mb-6">THE VILLAIN ERA HAS BEGUN</div>
        
        {/* Social Links */}
        <div className="flex justify-center space-x-6 mb-8">
          <a 
            href="https://t.me/BodyBagzs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-jet-black border border-dim-gray hover:shadow-green-glow transition-all duration-200 group"
            data-testid="footer-telegram"
          >
            <TelegramChaosIcon className="w-6 h-6 text-toxic-green group-hover:scale-110 transition-transform" />
          </a>
          <a 
            href="https://twitter.com/i/communities/1960797896896602475" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-jet-black border border-dim-gray hover:shadow-purple-glow transition-all duration-200 group"
            data-testid="footer-x-community"
          >
            <XChaosIcon className="w-6 h-6 text-glitch-purple group-hover:scale-110 transition-transform" />
          </a>
        </div>
        
        <div className="space-y-4 text-ash-white/80 text-sm max-w-2xl mx-auto">
          <p>
            <strong className="text-ash-white">DISCLAIMER:</strong> $BAGZ is a meme token created for entertainment purposes. 
            This is not financial advice. Invest responsibly and only what you can afford to lose.
          </p>
          <p className="text-xs">
            Not financial advice. Powered by chaos. Built by degenerates, for degenerates.
          </p>
        </div>
        
        <div className="mt-8 pt-8 border-t border-dim-gray text-center">
          <p className="text-ash-white/70 text-sm">© 2024 Body Bagz. All rights reserved to the chaos collective.</p>
        </div>
      </div>
    </footer>
  );
}
