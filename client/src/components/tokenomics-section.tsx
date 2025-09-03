interface TokenomicsItem {
  key: string;
  color: string;
  title: string;
  text: string;
  icon: () => JSX.Element;
  alt: string;
}

// Epic SVG Icons with unique IDs
const VillainArmyIcon = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <defs>
      <radialGradient id="armyGlow1" cx="50%" cy="30%" r="70%">
        <stop offset="0%" stopColor="#39FF14" stopOpacity="1" />
        <stop offset="100%" stopColor="#1A7A09" stopOpacity="0.8" />
      </radialGradient>
      <filter id="neonGlow1">
        <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
        <feMerge>
          <feMergeNode in="coloredBlur"/>
          <feMergeNode in="SourceGraphic"/>
        </feMerge>
      </filter>
    </defs>
    <path d="M24 4L28 12L36 10L32 18L40 20L32 28L36 36L28 34L24 42L20 34L12 36L16 28L8 20L16 18L12 10L20 12Z" 
          fill="url(#armyGlow1)" stroke="#39FF14" strokeWidth="1.5" filter="url(#neonGlow1)"/>
    <circle cx="24" cy="24" r="6" fill="#0A0A0B" stroke="#39FF14" strokeWidth="2"/>
    <path d="M20 20L28 28M28 20L20 28" stroke="#39FF14" strokeWidth="2"/>
  </svg>
);

const ChaosTreasuryIcon = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <defs>
      <linearGradient id="vaultGrad2" x1="0%" y1="0%" x2="100%" y2="100%">
        <stop offset="0%" stopColor="#7A3BFF" stopOpacity="1" />
        <stop offset="100%" stopColor="#4A1A8C" stopOpacity="0.9" />
      </linearGradient>
    </defs>
    <rect x="8" y="16" width="32" height="20" rx="4" fill="url(#vaultGrad2)" stroke="#7A3BFF" strokeWidth="2"/>
    <rect x="12" y="20" width="24" height="12" fill="#0A0A0B" stroke="#7A3BFF" strokeWidth="1"/>
    <circle cx="30" cy="26" r="3" fill="#7A3BFF" stroke="#FFFFFF" strokeWidth="1"/>
    <path d="M8 16L24 8L40 16" stroke="#7A3BFF" strokeWidth="2" fill="none"/>
    <circle cx="16" cy="12" r="2" fill="#7A3BFF"/>
    <circle cx="32" cy="12" r="2" fill="#7A3BFF"/>
  </svg>
);

const ArchitectsIcon = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <defs>
      <radialGradient id="gearGlow3" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#A0AEC0" stopOpacity="1" />
        <stop offset="100%" stopColor="#4A5568" stopOpacity="0.8" />
      </radialGradient>
    </defs>
    <path d="M24 6L27 12L33 9L30 15L36 18L30 21L33 27L27 24L24 30L21 24L15 27L18 21L12 18L18 15L15 9L21 12Z" 
          fill="url(#gearGlow3)" stroke="#A0AEC0" strokeWidth="2"/>
    <circle cx="24" cy="18" r="8" fill="#0A0A0B" stroke="#A0AEC0" strokeWidth="2"/>
    <circle cx="24" cy="18" r="4" fill="#A0AEC0"/>
    <path d="M20 32L28 32L26 38L22 38Z" fill="url(#gearGlow3)" stroke="#A0AEC0" strokeWidth="1.5"/>
  </svg>
);

const UnseenShadowsIcon = () => (
  <svg viewBox="0 0 48 48" className="w-8 h-8">
    <defs>
      <radialGradient id="eyeGlow4" cx="50%" cy="40%" r="80%">
        <stop offset="0%" stopColor="#E7352C" stopOpacity="1" />
        <stop offset="100%" stopColor="#8B1A1A" stopOpacity="0.9" />
      </radialGradient>
    </defs>
    <ellipse cx="24" cy="24" rx="18" ry="12" fill="url(#eyeGlow4)" stroke="#E7352C" strokeWidth="2"/>
    <circle cx="24" cy="24" r="8" fill="#0A0A0B" stroke="#E7352C" strokeWidth="1.5"/>
    <circle cx="24" cy="24" r="4" fill="#E7352C"/>
    <path d="M12 16C12 16 18 12 24 12C30 12 36 16 36 16" stroke="#E7352C" strokeWidth="2" fill="none"/>
    <path d="M12 32C12 32 18 36 24 36C30 36 36 32 36 32" stroke="#E7352C" strokeWidth="2" fill="none"/>
  </svg>
);

const tokenomicsData: TokenomicsItem[] = [
  {
    key: "army",
    color: "#39FF14",
    title: "Villain Army — 40%",
    text: "Rewards, raids, and meme bounties powering the streets.",
    icon: VillainArmyIcon,
    alt: "Villain Army icon"
  },
  {
    key: "treasury",
    color: "#7A3BFF",
    title: "Chaos Treasury — 30%",
    text: "Marketing, KOL alliances, boosts, and expansion firepower.",
    icon: ChaosTreasuryIcon,
    alt: "Chaos Treasury icon"
  },
  {
    key: "architects",
    color: "#A0AEC0",
    title: "Architects of Evil — 20%",
    text: "Core builders and mods — vested to prove we're here to stay.",
    icon: ArchitectsIcon,
    alt: "Architects of Evil icon"
  },
  {
    key: "shadows",
    color: "#E7352C", 
    title: "Unseen Shadows — 10%",
    text: "Strategic reserve for buybacks, floor defense, and ops when the streets demand it.",
    icon: UnseenShadowsIcon,
    alt: "Unseen Shadows icon"
  }
];

export default function TokenomicsSection() {
  return (
    <section id="tokenomics" className="relative z-10 py-20 px-6" aria-label="Tokenomics — Blueprint of the Villain Era">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-brand text-4xl md:text-5xl text-center text-blood-red mb-16 tracking-wide font-black" data-testid="tokenomics-title">
          ⚡ TOKENOMICS — BLUEPRINT OF THE VILLAIN ERA
        </h2>
        
        {/* 2x2 Glow Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-12">
          {tokenomicsData.map((item) => (
            <article 
              key={item.key}
              className="flex items-center gap-6 p-6 rounded-xl bg-gradient-to-br from-jet-black via-onyx to-jet-black border border-dim-gray/40 hover:border-ash-white/30 transition-all duration-300 hover:translate-y-[-4px] neon-card group"
              style={{
                boxShadow: `0 0 24px 0 ${item.color}30, inset 0 0 12px rgba(255,255,255,0.05)`,
              }}
              data-testid={`tokenomics-card-${item.key}`}
            >
              <div 
                className="min-w-[60px] min-h-[60px] rounded-xl flex items-center justify-center bg-jet-black/70 border border-dim-gray/40 group-hover:border-ash-white/50 transition-all duration-300 backdrop-blur-sm"
                style={{
                  boxShadow: `0 0 20px 0 ${item.color}40, inset 0 0 8px rgba(255,255,255,0.1)`
                }}
              >
                <item.icon />
              </div>
              <div className="flex-1">
                <h3 
                  className="font-brand text-lg font-black text-white mb-3 tracking-wide uppercase leading-tight"
                  style={{ textShadow: `0 0 12px ${item.color}60` }}
                >
                  {item.title}
                </h3>
                <p className="text-ash-white text-sm leading-relaxed opacity-85 font-medium">
                  {item.text}
                </p>
              </div>
            </article>
          ))}
        </div>
        
        {/* Disclaimer */}
        <p className="text-center text-dim-gray text-sm opacity-75 mt-12 font-medium max-w-2xl mx-auto leading-relaxed">
          <strong className="text-ash-white">Disclaimer:</strong> Community-driven meme project. Allocations may evolve to serve growth. Not financial advice.
        </p>
      </div>
    </section>
  );
}
