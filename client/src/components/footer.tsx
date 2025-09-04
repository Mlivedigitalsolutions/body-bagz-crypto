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
            href="https://x.com/VillianEra187?t=Xq9Kf5CebPVProLewyRu5g&s=09" 
            target="_blank" 
            rel="noopener noreferrer"
            className="p-3 rounded-lg bg-jet-black border border-dim-gray hover:shadow-red-glow transition-all duration-200 group"
            data-testid="footer-x-official"
          >
            <XChaosIcon className="w-6 h-6 text-blood-red group-hover:scale-110 transition-transform" />
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
        
        {/* Whitepaper Download */}
        <div className="mb-8 flex flex-col sm:flex-row gap-4 justify-center">
          <a 
            href="/api/whitepaper/html" 
            target="_blank"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-blood-red to-glitch-purple rounded-lg font-tech text-white hover:shadow-red-glow transition-all duration-200 group"
            data-testid="footer-whitepaper-html"
          >
            <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M4 4a2 2 0 012-2h4.586A2 2 0 0112 2.586L15.414 6A2 2 0 0116 7.414V16a2 2 0 01-2 2H6a2 2 0 01-2-2V4zm2 6a1 1 0 011-1h6a1 1 0 110 2H7a1 1 0 01-1-1zm1 3a1 1 0 100 2h6a1 1 0 100-2H7z" clipRule="evenodd" />
            </svg>
            VIEW WHITEPAPER
          </a>
          <a 
            href="/api/whitepaper/download" 
            target="_blank"
            className="inline-flex items-center px-6 py-3 bg-gradient-to-r from-toxic-green to-blood-red rounded-lg font-tech text-white hover:shadow-green-glow transition-all duration-200 group"
            data-testid="footer-whitepaper-download"
          >
            <svg className="w-5 h-5 mr-2 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
              <path fillRule="evenodd" d="M6 2a2 2 0 00-2 2v12a2 2 0 002 2h8a2 2 0 002-2V7.414A2 2 0 0015.414 6L12 2.586A2 2 0 0010.586 2H6zm5 6a1 1 0 10-2 0v3.586l-1.293-1.293a1 1 0 10-1.414 1.414l3 3a1 1 0 001.414 0l3-3a1 1 0 00-1.414-1.414L11 11.586V8z" clipRule="evenodd" />
            </svg>
            DOWNLOAD PDF
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
