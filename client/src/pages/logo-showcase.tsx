// Using direct URLs since the logos are in attached_assets/generated_images/
const mainLogoUrl = '/api/static/Official_Body_Bagz_brand_logo_94353dbf.png';
const geometricLogoUrl = '/api/static/Minimalist_Body_Bagz_geometric_logo_73557739.png';
const premiumLogoUrl = '/api/static/Premium_Body_Bagz_emblem_crest_ccd25379.png';

export function LogoShowcase() {
  return (
    <div className="min-h-screen bg-black p-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-6xl font-bold bg-gradient-to-r from-toxic-green via-blood-red to-glitch-purple bg-clip-text text-transparent">
          🔥 OFFICIAL BODY BAGZ LOGOS 🔥
        </h1>
        <p className="text-ash-white text-xl max-w-3xl mx-auto">
          Three epic logo variations designed for maximum villain impact across all your branding needs
        </p>
      </div>

      {/* Logo Grid */}
      <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-3 gap-8">
        
        {/* Main Brand Logo */}
        <div className="neon-card p-8 space-y-6 text-center">
          <div className="bg-gradient-to-br from-dim-gray/30 to-black/50 p-8 rounded-xl border border-toxic-green/20">
            <img 
              src={mainLogoUrl} 
              alt="Official Body Bagz Logo" 
              className="w-full h-64 object-contain mx-auto"
            />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-toxic-green">Main Brand Logo</h2>
            <p className="text-ash-white">
              The flagship cyberpunk skull with VR goggles and circuit patterns. Perfect for:
            </p>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>🌐 Website headers</li>
              <li>📱 App splash screens</li>
              <li>🎨 Marketing materials</li>
              <li>👕 Main merchandise</li>
              <li>📊 Presentations</li>
            </ul>
            <div className="pt-4">
              <span className="inline-flex items-center bg-toxic-green/10 border border-toxic-green/30 px-4 py-2 rounded-full text-toxic-green text-sm font-semibold">
                PRIMARY BRAND MARK
              </span>
            </div>
          </div>
        </div>

        {/* Geometric Logo */}
        <div className="neon-card p-8 space-y-6 text-center">
          <div className="bg-gradient-to-br from-dim-gray/30 to-black/50 p-8 rounded-xl border border-blood-red/20">
            <img 
              src={geometricLogoUrl} 
              alt="Geometric Body Bagz Logo" 
              className="w-full h-64 object-contain mx-auto"
            />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-blood-red">Minimalist Icon</h2>
            <p className="text-ash-white">
              Clean geometric skull design optimized for small sizes. Perfect for:
            </p>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>📱 App icons</li>
              <li>🔗 Social media profiles</li>
              <li>🏷️ Product tags</li>
              <li>💳 Wallet interfaces</li>
              <li>🔗 Favicon</li>
            </ul>
            <div className="pt-4">
              <span className="inline-flex items-center bg-blood-red/10 border border-blood-red/30 px-4 py-2 rounded-full text-blood-red text-sm font-semibold">
                ICON VARIANT
              </span>
            </div>
          </div>
        </div>

        {/* Premium Emblem */}
        <div className="neon-card p-8 space-y-6 text-center">
          <div className="bg-gradient-to-br from-dim-gray/30 to-black/50 p-8 rounded-xl border border-glitch-purple/20">
            <img 
              src={premiumLogoUrl} 
              alt="Premium Body Bagz Emblem" 
              className="w-full h-64 object-contain mx-auto"
            />
          </div>
          <div className="space-y-3">
            <h2 className="text-3xl font-bold text-glitch-purple">Royal Emblem</h2>
            <p className="text-ash-white">
              Ornate crest for premium branding and official use. Perfect for:
            </p>
            <ul className="text-sm text-gray-300 space-y-1">
              <li>👑 Premium merchandise</li>
              <li>📄 Official documents</li>
              <li>🏆 Awards & certificates</li>
              <li>💎 Luxury collectibles</li>
              <li>🎖️ VIP member badges</li>
            </ul>
            <div className="pt-4">
              <span className="inline-flex items-center bg-glitch-purple/10 border border-glitch-purple/30 px-4 py-2 rounded-full text-glitch-purple text-sm font-semibold">
                PREMIUM EDITION
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* Usage Guidelines */}
      <div className="max-w-5xl mx-auto space-y-8">
        <div className="neon-card p-8">
          <h2 className="text-4xl font-bold text-center mb-8 bg-gradient-to-r from-toxic-green to-blood-red bg-clip-text text-transparent">
            🎨 Brand Usage Guidelines
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-toxic-green">✅ Do's</h3>
              <ul className="space-y-2 text-ash-white">
                <li>• Use on contrasting backgrounds for maximum impact</li>
                <li>• Maintain proper proportions when scaling</li>
                <li>• Use high-resolution versions for print</li>
                <li>• Keep adequate clear space around logo</li>
                <li>• Use original color palette when possible</li>
              </ul>
            </div>
            
            <div className="space-y-4">
              <h3 className="text-2xl font-bold text-blood-red">❌ Don'ts</h3>
              <ul className="space-y-2 text-ash-white">
                <li>• Don't stretch or distort the proportions</li>
                <li>• Don't use on busy backgrounds</li>
                <li>• Don't change colors without approval</li>
                <li>• Don't add effects or modifications</li>
                <li>• Don't use low-resolution versions</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Download Info */}
        <div className="neon-card p-6 text-center">
          <h3 className="text-2xl font-bold text-glitch-purple mb-4">📁 Download Your Logos</h3>
          <p className="text-ash-white mb-4">
            All logo files are available in the <code className="bg-dim-gray px-2 py-1 rounded">attached_assets/generated_images/</code> folder
          </p>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
            <div className="bg-dim-gray/30 p-3 rounded">
              <div className="font-bold text-toxic-green">Main Logo:</div>
              <div className="text-gray-300 font-mono text-xs">Official_Body_Bagz_brand_logo_94353dbf.png</div>
            </div>
            <div className="bg-dim-gray/30 p-3 rounded">
              <div className="font-bold text-blood-red">Icon Logo:</div>
              <div className="text-gray-300 font-mono text-xs">Minimalist_Body_Bagz_geometric_logo_73557739.png</div>
            </div>
            <div className="bg-dim-gray/30 p-3 rounded">
              <div className="font-bold text-glitch-purple">Premium Logo:</div>
              <div className="text-gray-300 font-mono text-xs">Premium_Body_Bagz_emblem_crest_ccd25379.png</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}