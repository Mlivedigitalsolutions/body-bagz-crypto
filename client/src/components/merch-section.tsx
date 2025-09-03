import minimalistLogo from "@assets/generated_images/Minimalist_Body_Bagz_geometric_logo_73557739.png";

export default function MerchSection() {
  return (
    <section className="relative z-10 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-brand text-4xl md:text-5xl text-blood-red mb-16" data-testid="merch-title">
          VILLAIN GEAR
        </h2>
        
        <div className="neon-card p-12 rounded-xl relative overflow-hidden" data-testid="merch-preview">
          <div className="relative">
            {/* Enhanced Hoodie Mockup */}
            <div className="w-64 h-80 mx-auto bg-jet-black rounded-xl p-8 relative shadow-red-glow border border-dim-gray">
              <div className="text-center mt-12">
                <div className="font-brand text-2xl text-blood-red mb-2 tracking-tighter" style={{textShadow: '0 0 10px rgba(231, 53, 44, 0.5)'}}>BODY</div>
                <div className="font-brand text-2xl text-blood-red tracking-tighter" style={{textShadow: '0 0 10px rgba(231, 53, 44, 0.5)'}}>BAGZ</div>
                <div className="w-16 h-1 bg-toxic-green mx-auto mt-2 shadow-green-glow"></div>
                {/* Subtle Green Overspray Effect */}
                <div className="absolute top-16 right-6 w-8 h-8 bg-toxic-green opacity-10 rounded-full blur-sm"></div>
              </div>
              
              {/* Body Bagz Minimalist Logo Overlay */}
              <div className="absolute inset-0 bg-jet-black bg-opacity-95 flex items-center justify-center rounded-xl border border-dim-gray">
                <div className="text-center">
                  <img 
                    src={minimalistLogo} 
                    alt="Body Bagz Minimalist Logo"
                    className="w-24 h-24 mx-auto mb-2 object-contain"
                    style={{filter: 'drop-shadow(0 0 10px rgba(57, 255, 20, 0.5))'}}
                  />
                  <div className="font-brand text-2xl text-toxic-green animate-flicker tracking-wider">COMING</div>
                  <div className="font-brand text-2xl text-ash-white tracking-wider">SOON</div>
                  {/* Enhanced Scanline Effect */}
                  <div className="scanline-overlay w-full h-1 mt-4 rounded"></div>
                </div>
              </div>
            </div>
            
            <p className="text-ash-white text-xl mt-8 mb-4 font-bold tracking-wide">EXCLUSIVE STREETWEAR COLLECTION</p>
            <p className="text-dim-gray font-medium">Premium hoodies, tees, and accessories for the chaos collective</p>
          </div>
        </div>
      </div>
    </section>
  );
}
