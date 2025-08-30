import { TelegramChaosIcon, XChaosIcon } from "@/components/icons";

export default function CommunitySection() {
  return (
    <section id="community" className="relative z-10 py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="font-brand text-4xl md:text-5xl text-blood-red mb-16" data-testid="community-title">
          JOIN THE CHAOS
        </h2>
        
        <div className="grid md:grid-cols-2 gap-8">
          {/* Telegram */}
          <a 
            href="https://t.me/BodyBagzs" 
            target="_blank" 
            rel="noopener noreferrer"
            className="neon-card p-8 rounded-2xl hover:shadow-green-glow transition-all duration-300 group"
            data-testid="link-telegram"
          >
            <div className="flex justify-center mb-6">
              <TelegramChaosIcon className="w-16 h-16 text-toxic-green group-hover:animate-pulse" />
            </div>
            <h3 className="font-tech text-xl text-toxic-green mb-4">TELEGRAM</h3>
            <p className="text-dim-gray">Join the underground. Real-time chaos coordination.</p>
          </a>

          {/* X Community */}
          <a 
            href="https://twitter.com/i/communities/1960797896896602475" 
            target="_blank" 
            rel="noopener noreferrer"
            className="neon-card p-8 rounded-2xl hover:shadow-purple-glow transition-all duration-300 group"
            data-testid="link-x-community"
          >
            <div className="flex justify-center mb-6">
              <XChaosIcon className="w-16 h-16 text-glitch-purple group-hover:animate-pulse" />
            </div>
            <h3 className="font-tech text-xl text-glitch-purple">X COMMUNITY</h3>
            <p className="text-dim-gray">Spread the chaos. Meme warfare HQ.</p>
          </a>
        </div>
      </div>
    </section>
  );
}
