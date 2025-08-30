export default function MerchSection() {
  return (
    <section className="relative z-10 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-brand text-4xl md:text-5xl text-blood-red mb-16" data-testid="merch-title">
          VILLAIN GEAR
        </h2>
        
        <div className="neon-card p-12 rounded-2xl relative overflow-hidden" data-testid="merch-preview">
          <div className="relative">
            {/* Sample Hoodie Mockup */}
            <div className="w-64 h-80 mx-auto bg-gradient-to-b from-dim-gray to-jet-black rounded-xl p-8 relative shadow-red-glow">
              <div className="text-center mt-12">
                <div className="font-brand text-2xl text-blood-red mb-2">BODY</div>
                <div className="font-brand text-2xl text-blood-red">BAGZ</div>
                <div className="w-16 h-1 bg-toxic-green mx-auto mt-2"></div>
              </div>
              
              {/* Coming Soon Overlay */}
              <div className="absolute inset-0 bg-jet-black bg-opacity-90 flex items-center justify-center rounded-xl">
                <div className="text-center">
                  <div className="font-brand text-3xl text-toxic-green mb-2 animate-flicker">COMING</div>
                  <div className="font-brand text-3xl text-ash-white">SOON</div>
                  {/* Scanline Effect */}
                  <div className="w-full h-0.5 bg-gradient-to-r from-transparent via-toxic-green to-transparent mt-4 animate-pulse"></div>
                </div>
              </div>
            </div>
            
            <p className="text-ash-white text-xl mt-8 mb-4">EXCLUSIVE STREETWEAR COLLECTION</p>
            <p className="text-dim-gray">Premium hoodies, tees, and accessories for the chaos collective</p>
          </div>
        </div>
      </div>
    </section>
  );
}
