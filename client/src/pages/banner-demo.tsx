import { DexScreenerBanner } from '@/components/DexScreenerBanner';

export function BannerDemo() {
  return (
    <div className="min-h-screen bg-black p-8 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold text-toxic-green">
          🔥 DEXSCREENER ANIMATED BANNER 🔥
        </h1>
        <p className="text-ash-white text-lg">
          Fucking awesome banner ready for enhanced token listing!
        </p>
      </div>

      {/* Main Banner */}
      <div className="max-w-6xl mx-auto">
        <DexScreenerBanner />
      </div>

      {/* Usage Instructions */}
      <div className="max-w-4xl mx-auto space-y-6">
        <div className="neon-card p-6">
          <h2 className="text-2xl font-bold text-blood-red mb-4">
            📋 DexScreener Implementation Guide
          </h2>
          <div className="space-y-4 text-ash-white">
            <div className="p-4 bg-dim-gray/50 rounded-lg">
              <h3 className="text-toxic-green font-bold mb-2">✅ Perfect Banner Specs:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Dimensions: 1200x300px (4:1 aspect ratio)</li>
                <li>• Format: Animated (convert this to GIF/MP4)</li>
                <li>• File Size: Under 5MB for best performance</li>
                <li>• Content: Token branding, price, key metrics</li>
              </ul>
            </div>

            <div className="p-4 bg-dim-gray/50 rounded-lg">
              <h3 className="text-blood-red font-bold mb-2">🎬 Animation Features:</h3>
              <ul className="space-y-1 text-sm">
                <li>• Matrix rain background effect</li>
                <li>• Glitch pulses every 3 seconds</li>
                <li>• Animated borders and neon glows</li>
                <li>• Live price display (mockup)</li>
                <li>• Villain mode indicator</li>
                <li>• Circuit pattern overlays</li>
              </ul>
            </div>

            <div className="p-4 bg-dim-gray/50 rounded-lg">
              <h3 className="text-glitch-purple font-bold mb-2">🚀 Next Steps:</h3>
              <ol className="space-y-1 text-sm list-decimal list-inside">
                <li>Screen record this banner in action</li>
                <li>Convert to high-quality GIF (tools like Ezgif.com)</li>
                <li>Upload to DexScreener enhanced listing</li>
                <li>Update with real contract address & metrics</li>
              </ol>
            </div>
          </div>
        </div>

        {/* Banner Preview Sizes */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="neon-card p-4">
            <h3 className="text-toxic-green font-bold mb-3">Mobile Preview</h3>
            <div className="transform scale-50 origin-top-left">
              <DexScreenerBanner />
            </div>
          </div>

          <div className="neon-card p-4">
            <h3 className="text-blood-red font-bold mb-3">Stats</h3>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>Villain Level:</span>
                <span className="text-toxic-green">MAXIMUM</span>
              </div>
              <div className="flex justify-between">
                <span>Chaos Factor:</span>
                <span className="text-blood-red">100%</span>
              </div>
              <div className="flex justify-between">
                <span>Epic Rating:</span>
                <span className="text-glitch-purple">🔥🔥🔥🔥🔥</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}