import { BarcodeIcon } from "@/components/icons";

export default function Footer() {
  return (
    <footer className="relative z-10 py-16 px-6 border-t border-dim-gray">
      <div className="max-w-4xl mx-auto text-center">
        {/* Custom Barcode SVG */}
        <div className="flex justify-center mb-8">
          <BarcodeIcon className="w-64 h-12" />
        </div>
        
        <div className="font-brand text-2xl text-blood-red mb-4">BODY BAGZ</div>
        <div className="font-tech text-toxic-green mb-8">THE VILLAIN ERA HAS BEGUN</div>
        
        <div className="space-y-4 text-dim-gray text-sm max-w-2xl mx-auto">
          <p>
            <strong className="text-ash-white">DISCLAIMER:</strong> $BAGZ is a meme token created for entertainment purposes. 
            This is not financial advice. Invest responsibly and only what you can afford to lose.
          </p>
          <p className="text-xs">
            Not financial advice. Powered by chaos. Built by degenerates, for degenerates.
          </p>
        </div>
        
        <div className="mt-8 pt-8 border-t border-dim-gray text-center">
          <p className="text-dim-gray text-sm">© 2024 Body Bagz. All rights reserved to the chaos collective.</p>
        </div>
      </div>
    </footer>
  );
}
