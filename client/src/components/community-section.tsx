import { TelegramChaosIcon, XChaosIcon } from "@/components/icons";

export default function CommunitySection() {
  return (
    <section id="community" className="relative z-10 py-12 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-brand text-2xl md:text-3xl text-blood-red mb-8" data-testid="community-title">
          JOIN THE CHAOS
        </h2>
        
        <div className="flex flex-col sm:flex-row gap-4 max-w-4xl mx-auto">
          {/* Enhanced Telegram */}
          <a 
            href="https://t.me/BodyBagzs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="neon-card p-4 rounded-lg hover:shadow-green-glow transition-all duration-200 group relative overflow-hidden flex-1"
            data-testid="link-telegram"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-toxic-green opacity-5 rounded-full blur-xl"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-3">
                <div className="p-2 rounded bg-jet-black border border-dim-gray group-hover:shadow-green-glow transition-all duration-200">
                  <TelegramChaosIcon className="w-8 h-8 text-toxic-green group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <h3 className="font-tech text-lg text-toxic-green mb-2 tracking-wide font-semibold">TELEGRAM</h3>
              <p className="text-ash-white font-medium leading-relaxed">Join the underground. Real-time chaos coordination.</p>
            </div>
          </a>

          {/* Official X Page */}
          <a 
            href="https://x.com/VillianEra187?t=Xq9Kf5CebPVProLewyRu5g&s=09" 
            target="_blank" 
            rel="noopener noreferrer"
            className="neon-card p-4 rounded-lg hover:shadow-red-glow transition-all duration-200 group relative overflow-hidden flex-1"
            data-testid="link-x-official"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-blood-red opacity-5 rounded-full blur-xl"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-3">
                <div className="p-2 rounded bg-jet-black border border-dim-gray group-hover:shadow-red-glow transition-all duration-200">
                  <XChaosIcon className="w-8 h-8 text-blood-red group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <h3 className="font-tech text-lg text-blood-red mb-2 tracking-wide font-semibold">OFFICIAL X</h3>
              <p className="text-ash-white font-medium leading-relaxed">The villain headquarters. Official updates and chaos.</p>
            </div>
          </a>

          {/* Enhanced X Community */}
          <a 
            href="https://twitter.com/i/communities/1960797896896602475" 
            target="_blank" 
            rel="noopener noreferrer"
            className="neon-card p-4 rounded-lg hover:shadow-purple-glow transition-all duration-200 group relative overflow-hidden flex-1"
            data-testid="link-x-community"
          >
            <div className="absolute top-0 right-0 w-16 h-16 bg-glitch-purple opacity-5 rounded-full blur-xl"></div>
            <div className="relative z-10">
              <div className="flex justify-center mb-3">
                <div className="p-2 rounded bg-jet-black border border-dim-gray group-hover:shadow-purple-glow transition-all duration-200">
                  <XChaosIcon className="w-8 h-8 text-glitch-purple group-hover:scale-110 transition-transform" />
                </div>
              </div>
              <h3 className="font-tech text-lg text-glitch-purple mb-2 tracking-wide font-semibold">X COMMUNITY</h3>
              <p className="text-ash-white font-medium leading-relaxed">Spread the chaos. Meme warfare HQ.</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
}
