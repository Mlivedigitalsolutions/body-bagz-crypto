export function SkullIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C8.13 2 5 5.13 5 9c0 2.38 1.19 4.47 3 5.74V17c0 .55.45 1 1 1s1-.45 1-1v-1.26c.64.16 1.31.26 2 .26s1.36-.1 2-.26V17c0 .55.45 1 1 1s1-.45 1-1v-2.26c1.81-1.27 3-3.36 3-5.74 0-3.87-3.13-7-7-7zM9 11c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1zm6 0c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
    </svg>
  );
}

export function GrimReaperIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 300 300" fill="none">
      <defs>
        <linearGradient id="reaperGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E7352C" stopOpacity="0.9"/>
          <stop offset="50%" stopColor="#0A0A0B" stopOpacity="1"/>
          <stop offset="100%" stopColor="#7A3BFF" stopOpacity="0.7"/>
        </linearGradient>
        <linearGradient id="skullGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#EDEEF0" stopOpacity="1"/>
          <stop offset="70%" stopColor="#2A2B31" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#111214" stopOpacity="1"/>
        </linearGradient>
        <filter id="glow">
          <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Sophisticated Hooded Figure */}
      <path d="M150 35 L105 85 L105 220 L125 235 L175 235 L195 220 L195 85 Z" fill="url(#reaperGrad)" stroke="#E7352C" strokeWidth="2" strokeLinejoin="bevel" filter="url(#glow)"/>
      
      {/* Premium Hood with Multiple Layers */}
      <path d="M150 35 L80 65 L80 135 L95 145 L150 105 L205 145 L220 135 L220 65 Z" fill="#0A0A0B" stroke="#E7352C" strokeWidth="2" strokeLinejoin="bevel"/>
      <path d="M150 40 L85 70 L85 130 L150 100 L215 130 L215 70 Z" fill="none" stroke="#39FF14" strokeWidth="0.8" opacity="0.6"/>
      
      {/* Sophisticated Skull with Gradient */}
      <path d="M150 95 L175 105 L175 140 L165 155 L135 155 L125 140 L125 105 Z" fill="url(#skullGrad)" stroke="#E7352C" strokeWidth="1.5" strokeLinejoin="bevel"/>
      
      {/* Detailed Eye Sockets with Depth */}
      <polygon points="135,120 145,118 143,135 133,133" fill="#0A0A0B" stroke="#E7352C" strokeWidth="0.5"/>
      <polygon points="155,118 165,120 167,133 157,135" fill="#0A0A0B" stroke="#E7352C" strokeWidth="0.5"/>
      <circle cx="139" cy="126" r="2" fill="#E7352C" opacity="0.8"/>
      <circle cx="161" cy="126" r="2" fill="#E7352C" opacity="0.8"/>
      
      {/* Nasal Cavity */}
      <polygon points="148,135 152,135 150,145" fill="#0A0A0B" stroke="#E7352C" strokeWidth="0.5"/>
      
      {/* Premium Money Bags with Details */}
      <path d="M100 165 L135 165 L140 195 L95 195 Z" fill="#111214" stroke="#39FF14" strokeWidth="2" strokeLinejoin="bevel"/>
      <path d="M165 165 L200 165 L205 195 L160 195 Z" fill="#111214" stroke="#39FF14" strokeWidth="2" strokeLinejoin="bevel"/>
      
      {/* Bag Tie Details */}
      <rect x="115" y="160" width="8" height="5" fill="#39FF14"/>
      <rect x="177" y="160" width="8" height="5" fill="#39FF14"/>
      
      {/* Premium Dollar Signs */}
      <text x="117" y="185" textAnchor="middle" fill="#39FF14" fontSize="16" fontWeight="900" fontFamily="Orbitron" filter="url(#glow)">$</text>
      <text x="182" y="185" textAnchor="middle" fill="#39FF14" fontSize="16" fontWeight="900" fontFamily="Orbitron" filter="url(#glow)">$</text>
      
      {/* Scythe Handle */}
      <rect x="195" y="100" width="3" height="120" fill="#2A2B31" stroke="#7A3BFF" strokeWidth="1"/>
      
      {/* Scythe Blade */}
      <path d="M198 85 L230 70 L240 75 L235 85 L215 95 Z" fill="#EDEEF0" stroke="#E7352C" strokeWidth="2" strokeLinejoin="bevel"/>
      <path d="M200 87 L225 75 L235 78 L220 90" fill="none" stroke="#39FF14" strokeWidth="1" opacity="0.7"/>
      
      {/* Multiple Layer Neon Rim Lighting */}
      <path d="M150 35 L80 65 L80 135 L150 105 L220 135 L220 65 Z" fill="none" stroke="#39FF14" strokeWidth="1.2" opacity="0.5"/>
      <path d="M150 35 L105 85 L105 220 L195 220 L195 85 Z" fill="none" stroke="#7A3BFF" strokeWidth="1" opacity="0.4"/>
      <path d="M150 35 L80 65 L220 65 Z" fill="none" stroke="#E7352C" strokeWidth="0.8" opacity="0.8"/>
      
      {/* Advanced Glitch Effects */}
      <rect x="75" y="80" width="15" height="2" fill="#7A3BFF" opacity="0.6"/>
      <rect x="210" y="85" width="12" height="2" fill="#39FF14" opacity="0.7"/>
      <rect x="85" y="110" width="20" height="1" fill="#E7352C" opacity="0.8"/>
      <rect x="195" y="115" width="18" height="1" fill="#7A3BFF" opacity="0.6"/>
    </svg>
  );
}

export function UrbanGritIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="buildingGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1"/>
          <stop offset="70%" stopColor="#2A2B31" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#111214" stopOpacity="1"/>
        </linearGradient>
        <filter id="urbanGlow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Sophisticated Building Silhouettes with Windows */}
      <g filter="url(#urbanGlow)">
        <polygon points="6,46 22,42 22,58 6,58" fill="url(#buildingGrad)" stroke="#39FF14" strokeWidth="1" strokeLinejoin="bevel"/>
        <rect x="10" y="48" width="2" height="2" fill="#39FF14" opacity="0.8"/>
        <rect x="14" y="52" width="2" height="2" fill="#39FF14" opacity="0.6"/>
        <rect x="18" y="46" width="2" height="2" fill="#39FF14" opacity="0.9"/>
        
        <polygon points="22,42 38,36 38,58 22,58" fill="url(#buildingGrad)" stroke="#39FF14" strokeWidth="1" strokeLinejoin="bevel"/>
        <rect x="26" y="42" width="2" height="2" fill="#39FF14" opacity="0.7"/>
        <rect x="30" y="46" width="2" height="2" fill="#39FF14" opacity="0.8"/>
        <rect x="34" y="40" width="2" height="2" fill="#39FF14" opacity="0.9"/>
        
        <polygon points="38,36 54,34 54,58 38,58" fill="url(#buildingGrad)" stroke="#39FF14" strokeWidth="1" strokeLinejoin="bevel"/>
        <rect x="42" y="40" width="2" height="2" fill="#39FF14" opacity="0.8"/>
        <rect x="46" y="44" width="2" height="2" fill="#39FF14" opacity="0.6"/>
        <rect x="50" y="38" width="2" height="2" fill="#39FF14" opacity="0.9"/>
      </g>
      
      {/* Premium Antenna Array */}
      <rect x="30" y="26" width="4" height="16" fill="currentColor" stroke="#E7352C" strokeWidth="1"/>
      <polygon points="26,24 32,20 38,24 32,28" fill="currentColor" stroke="#7A3BFF" strokeWidth="1"/>
      
      {/* Signal Waves */}
      <path d="M32 18 Q28 16 24 18" stroke="#39FF14" strokeWidth="1.5" fill="none" opacity="0.8"/>
      <path d="M32 18 Q36 16 40 18" stroke="#39FF14" strokeWidth="1.5" fill="none" opacity="0.8"/>
      <path d="M32 15 Q26 12 20 15" stroke="#7A3BFF" strokeWidth="1" fill="none" opacity="0.6"/>
      <path d="M32 15 Q38 12 44 15" stroke="#7A3BFF" strokeWidth="1" fill="none" opacity="0.6"/>
      
      {/* Ground Effect with Texture */}
      <rect x="6" y="56" width="52" height="4" fill="#2A2B31" stroke="#39FF14" strokeWidth="1" opacity="0.8"/>
      <rect x="8" y="57" width="48" height="1" fill="#39FF14" opacity="0.3"/>
    </svg>
  );
}

export function FireSkullIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <defs>
        <radialGradient id="skullRadial" cx="50%" cy="40%" r="60%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1"/>
          <stop offset="60%" stopColor="#2A2B31" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#0A0A0B" stopOpacity="1"/>
        </radialGradient>
        <linearGradient id="fireGrad" x1="0%" y1="100%" x2="0%" y2="0%">
          <stop offset="0%" stopColor="#E7352C" stopOpacity="1"/>
          <stop offset="40%" stopColor="#39FF14" stopOpacity="0.8"/>
          <stop offset="80%" stopColor="#7A3BFF" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="currentColor" stopOpacity="0.4"/>
        </linearGradient>
        <filter id="fireGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Premium Angular Skull with Depth */}
      <path d="M32 6 L52 14 L52 34 L44 44 L20 44 L12 34 L12 14 Z" fill="url(#skullRadial)" stroke="#E7352C" strokeWidth="1.5" strokeLinejoin="bevel" filter="url(#fireGlow)"/>
      
      {/* Detailed Eye Sockets with Inner Glow */}
      <polygon points="22,18 28,16 26,28 20,26" fill="#0A0A0B" stroke="#E7352C" strokeWidth="1"/>
      <polygon points="36,16 42,18 44,26 38,28" fill="#0A0A0B" stroke="#E7352C" strokeWidth="1"/>
      <circle cx="24" cy="22" r="1.5" fill="#E7352C" opacity="0.9"/>
      <circle cx="40" cy="22" r="1.5" fill="#E7352C" opacity="0.9"/>
      
      {/* Refined Nasal Structure */}
      <polygon points="29,26 35,26 32,38 30,38" fill="#0A0A0B" stroke="#E7352C" strokeWidth="0.8"/>
      
      {/* Sophisticated Chaos Fire with Multiple Layers */}
      <path d="M16 44 L20 40 L24 44 L28 38 L32 44 L36 38 L40 44 L44 40 L48 46 L44 52 L40 48 L36 52 L32 50 L28 52 L24 48 L20 52 L16 48 Z" fill="url(#fireGrad)" filter="url(#fireGlow)"/>
      
      {/* Fire Inner Details */}
      <path d="M20 42 L24 46 L28 42 L32 46 L36 42 L40 46 L44 42" stroke="#39FF14" strokeWidth="2" fill="none" opacity="0.8"/>
      <path d="M18 46 L22 50 L26 46 L30 50 L34 46 L38 50 L42 46 L46 50" stroke="#E7352C" strokeWidth="1.5" fill="none" opacity="0.9"/>
      
      {/* Premium Outer Glow */}
      <path d="M32 6 L52 14 L52 34 L44 44 L20 44 L12 34 L12 14 Z" fill="none" stroke="#7A3BFF" strokeWidth="0.8" opacity="0.4"/>
      <circle cx="32" cy="28" r="20" fill="none" stroke="#39FF14" strokeWidth="0.5" opacity="0.3"/>
    </svg>
  );
}

export function RaisedFistIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="fistGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="currentColor" stopOpacity="1"/>
          <stop offset="50%" stopColor="#2A2B31" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#111214" stopOpacity="1"/>
        </linearGradient>
        <filter id="powerGlow">
          <feGaussianBlur stdDeviation="1.5" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Premium Fist Structure with Detailed Geometry */}
      <path d="M24 12 L40 12 L42 16 L40 18 L40 50 L38 52 L26 52 L24 50 L24 18 L22 16 Z" fill="url(#fistGrad)" stroke="#7A3BFF" strokeWidth="1.5" strokeLinejoin="bevel" filter="url(#powerGlow)"/>
      
      {/* Detailed Individual Fingers */}
      <path d="M20 18 L24 16 L26 20 L26 38 L24 40 L20 38 Z" fill="url(#fistGrad)" stroke="#7A3BFF" strokeWidth="1" strokeLinejoin="bevel"/>
      <path d="M40 16 L44 18 L44 38 L40 40 L38 38 L38 20 Z" fill="url(#fistGrad)" stroke="#7A3BFF" strokeWidth="1" strokeLinejoin="bevel"/>
      <path d="M16 22 L20 18 L22 22 L22 38 L20 42 L16 40 Z" fill="url(#fistGrad)" stroke="#7A3BFF" strokeWidth="1" strokeLinejoin="bevel"/>
      <path d="M44 18 L48 22 L48 40 L44 42 L42 38 L42 22 Z" fill="url(#fistGrad)" stroke="#7A3BFF" strokeWidth="1" strokeLinejoin="bevel"/>
      
      {/* Sophisticated Thumb */}
      <path d="M22 10 L32 8 L34 12 L32 18 L28 20 L24 16 Z" fill="url(#fistGrad)" stroke="#7A3BFF" strokeWidth="1" strokeLinejoin="bevel"/>
      
      {/* Knuckle Details */}
      <rect x="26" y="16" width="12" height="2" rx="1" fill="#2A2B31" stroke="#E7352C" strokeWidth="0.5"/>
      <circle cx="28" cy="17" r="1" fill="#E7352C" opacity="0.6"/>
      <circle cx="32" cy="17" r="1" fill="#E7352C" opacity="0.6"/>
      <circle cx="36" cy="17" r="1" fill="#E7352C" opacity="0.6"/>
      
      {/* Premium Power/Energy Emanation */}
      <path d="M8 26 L16 24 L14 28 L10 30" stroke="#39FF14" strokeWidth="2" fill="none" opacity="0.9" strokeLinecap="round"/>
      <path d="M48 24 L56 26 L54 30 L50 28" stroke="#39FF14" strokeWidth="2" fill="none" opacity="0.9" strokeLinecap="round"/>
      <path d="M10 32 L18 30 L16 34 L12 36" stroke="#E7352C" strokeWidth="1.5" fill="none" opacity="0.8" strokeLinecap="round"/>
      <path d="M46 30 L54 32 L52 36 L48 34" stroke="#E7352C" strokeWidth="1.5" fill="none" opacity="0.8" strokeLinecap="round"/>
      
      {/* Lightning/Energy Bolts */}
      <path d="M12 20 L16 18 L14 22 L18 20 L16 24" stroke="#7A3BFF" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round"/>
      <path d="M48 18 L52 20 L50 24 L54 22 L52 26" stroke="#7A3BFF" strokeWidth="1.5" fill="none" opacity="0.7" strokeLinecap="round"/>
      
      {/* Outer Aura */}
      <circle cx="32" cy="30" r="28" fill="none" stroke="#7A3BFF" strokeWidth="0.5" opacity="0.3"/>
    </svg>
  );
}

export function ChainLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="chainGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#39FF14" stopOpacity="1"/>
          <stop offset="50%" stopColor="#2A2B31" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#0A0A0B" stopOpacity="1"/>
        </linearGradient>
        <linearGradient id="chainHighlight" x1="0%" y1="0%" x2="100%" y2="50%">
          <stop offset="0%" stopColor="#39FF14" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
        <filter id="chainGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Premium 3D Chain Links with Depth */}
      <g filter="url(#chainGlow)">
        {/* Left Chain Link - 3D perspective */}
        <ellipse cx="20" cy="32" rx="12" ry="16" fill="none" stroke="url(#chainGrad)" strokeWidth="6" strokeLinejoin="round"/>
        <ellipse cx="20" cy="32" rx="12" ry="16" fill="none" stroke="#0A0A0B" strokeWidth="3"/>
        <ellipse cx="18" cy="30" rx="8" ry="12" fill="none" stroke="url(#chainHighlight)" strokeWidth="2" opacity="0.8"/>
        
        {/* Right Chain Link - 3D perspective */}
        <ellipse cx="44" cy="32" rx="12" ry="16" fill="none" stroke="url(#chainGrad)" strokeWidth="6" strokeLinejoin="round"/>
        <ellipse cx="44" cy="32" rx="12" ry="16" fill="none" stroke="#0A0A0B" strokeWidth="3"/>
        <ellipse cx="42" cy="30" rx="8" ry="12" fill="none" stroke="url(#chainHighlight)" strokeWidth="2" opacity="0.8"/>
        
        {/* Connection Highlighting */}
        <path d="M32 24 L32 40" stroke="#39FF14" strokeWidth="4" opacity="0.6" strokeLinecap="round"/>
        <path d="M30 26 L30 38" stroke="#E7352C" strokeWidth="2" opacity="0.8" strokeLinecap="round"/>
        
        {/* 3D Shadow Effects */}
        <ellipse cx="22" cy="34" rx="10" ry="14" fill="none" stroke="#111214" strokeWidth="2" opacity="0.4"/>
        <ellipse cx="46" cy="34" rx="10" ry="14" fill="none" stroke="#111214" strokeWidth="2" opacity="0.4"/>
        
        {/* Energy Sparks */}
        <circle cx="20" cy="18" r="2" fill="#39FF14" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="44" cy="46" r="1.5" fill="#E7352C" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.2;0.7" dur="1.5s" repeatCount="indefinite"/>
        </circle>
      </g>
      
      {/* Outer Power Ring */}
      <circle cx="32" cy="32" r="28" fill="none" stroke="#39FF14" strokeWidth="0.5" opacity="0.3"/>
    </svg>
  );
}

export function BodyBagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <defs>
        <linearGradient id="bagGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#E7352C" stopOpacity="1"/>
          <stop offset="40%" stopColor="#111214" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#0A0A0B" stopOpacity="1"/>
        </linearGradient>
        <linearGradient id="bagHighlight" x1="0%" y1="0%" x2="70%" y2="30%">
          <stop offset="0%" stopColor="#E7352C" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="transparent"/>
        </linearGradient>
        <radialGradient id="bagShadow" cx="50%" cy="70%" r="60%">
          <stop offset="0%" stopColor="#111214" stopOpacity="0.6"/>
          <stop offset="100%" stopColor="transparent"/>
        </radialGradient>
        <filter id="bagGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Premium 3D Body Bag with Perspective */}
      <g filter="url(#bagGlow)">
        {/* Main Bag Structure with 3D depth */}
        <path d="M12 18 L52 18 L50 50 L14 50 Z" fill="url(#bagGrad)" stroke="#E7352C" strokeWidth="2" strokeLinejoin="bevel"/>
        
        {/* Bag Top/Closure with zipper detail */}
        <path d="M12 18 L52 18 L48 14 L16 14 Z" fill="url(#bagHighlight)" stroke="#E7352C" strokeWidth="2" strokeLinejoin="bevel"/>
        
        {/* 3D Side panels for depth */}
        <path d="M50 18 L52 20 L50 50 L48 48" fill="#111214" stroke="#2A2B31" strokeWidth="1" opacity="0.8"/>
        <path d="M14 18 L12 20 L14 50 L16 48" fill="#2A2B31" stroke="#E7352C" strokeWidth="1" opacity="0.6"/>
        
        {/* Zipper Details - Premium finish */}
        <rect x="30" y="12" width="4" height="8" fill="#EDEEF0" stroke="#E7352C" strokeWidth="1" rx="2"/>
        <circle cx="32" cy="16" r="1" fill="#E7352C"/>
        
        {/* Zipper track */}
        <path d="M16 14 L48 14" stroke="#EDEEF0" strokeWidth="2" strokeDasharray="2,1"/>
        
        {/* Body Bag handles - 3D effect */}
        <ellipse cx="20" cy="12" rx="3" ry="2" fill="#2A2B31" stroke="#E7352C" strokeWidth="1.5"/>
        <ellipse cx="44" cy="12" rx="3" ry="2" fill="#2A2B31" stroke="#E7352C" strokeWidth="1.5"/>
        
        {/* Premium Dollar symbols with glow */}
        <text x="25" y="38" textAnchor="middle" fill="#39FF14" fontSize="14" fontWeight="900" fontFamily="Orbitron" filter="url(#bagGlow)">$</text>
        <text x="39" y="38" textAnchor="middle" fill="#39FF14" fontSize="14" fontWeight="900" fontFamily="Orbitron" filter="url(#bagGlow)">$</text>
        
        {/* Bag texture lines for realism */}
        <path d="M16 25 L48 25" stroke="#2A2B31" strokeWidth="1" opacity="0.6"/>
        <path d="M16 35 L48 35" stroke="#2A2B31" strokeWidth="1" opacity="0.6"/>
        <path d="M16 45 L48 45" stroke="#2A2B31" strokeWidth="1" opacity="0.6"/>
        
        {/* 3D shadow underneath */}
        <ellipse cx="32" cy="52" rx="18" ry="6" fill="url(#bagShadow)"/>
        
        {/* Energy aura effects */}
        <circle cx="20" cy="30" r="1.5" fill="#E7352C" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite"/>
        </circle>
        <circle cx="44" cy="40" r="1" fill="#39FF14" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="1.8s" repeatCount="indefinite"/>
        </circle>
      </g>
      
      {/* Outer Power Ring */}
      <circle cx="32" cy="32" r="28" fill="none" stroke="#E7352C" strokeWidth="0.5" opacity="0.3"/>
    </svg>
  );
}

export function GasMaskIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <defs>
        <radialGradient id="maskGrad" cx="50%" cy="40%" r="80%">
          <stop offset="0%" stopColor="#7A3BFF" stopOpacity="1"/>
          <stop offset="60%" stopColor="#2A2B31" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#0A0A0B" stopOpacity="1"/>
        </radialGradient>
        <linearGradient id="lensGrad" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#39FF14" stopOpacity="0.9"/>
          <stop offset="50%" stopColor="#E7352C" stopOpacity="0.7"/>
          <stop offset="100%" stopColor="#7A3BFF" stopOpacity="0.8"/>
        </linearGradient>
        <filter id="maskGlow">
          <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Premium 3D Gas Mask Structure */}
      <g filter="url(#maskGlow)">
        {/* Main mask body with 3D perspective */}
        <path d="M32 8 L48 16 L50 32 L48 48 L32 52 L16 48 L14 32 L16 16 Z" fill="url(#maskGrad)" stroke="#7A3BFF" strokeWidth="2" strokeLinejoin="bevel"/>
        
        {/* 3D depth panel */}
        <path d="M32 10 L46 18 L46 46 L32 50 L18 46 L18 18 Z" fill="#111214" stroke="#2A2B31" strokeWidth="1" opacity="0.8"/>
        
        {/* Premium Eye Lenses with gradient reflections */}
        <circle cx="24" cy="28" r="8" fill="#0A0A0B" stroke="#EDEEF0" strokeWidth="2"/>
        <circle cx="40" cy="28" r="8" fill="#0A0A0B" stroke="#EDEEF0" strokeWidth="2"/>
        
        {/* Lens inner glow */}
        <circle cx="24" cy="28" r="6" fill="url(#lensGrad)" opacity="0.8"/>
        <circle cx="40" cy="28" r="6" fill="url(#lensGrad)" opacity="0.8"/>
        
        {/* Lens reflections for 3D effect */}
        <ellipse cx="22" cy="26" rx="3" ry="4" fill="#39FF14" opacity="0.6"/>
        <ellipse cx="38" cy="26" rx="3" ry="4" fill="#39FF14" opacity="0.6"/>
        
        {/* Center breathing apparatus - highly detailed */}
        <ellipse cx="32" cy="42" rx="8" ry="6" fill="#2A2B31" stroke="#7A3BFF" strokeWidth="2"/>
        <ellipse cx="32" cy="42" rx="6" ry="4" fill="#111214" stroke="#E7352C" strokeWidth="1"/>
        
        {/* Filter details */}
        <rect x="28" y="40" width="8" height="4" fill="#39FF14" stroke="#EDEEF0" strokeWidth="1" rx="2"/>
        <rect x="30" y="41" width="4" height="2" fill="#EDEEF0" rx="1"/>
        
        {/* Side filter canisters - 3D perspective */}
        <ellipse cx="10" cy="36" rx="6" ry="8" fill="#2A2B31" stroke="#7A3BFF" strokeWidth="2"/>
        <ellipse cx="54" cy="36" rx="6" ry="8" fill="#2A2B31" stroke="#7A3BFF" strokeWidth="2"/>
        
        {/* Canister details */}
        <rect x="7" y="32" width="6" height="8" fill="#111214" stroke="#E7352C" strokeWidth="1" rx="3"/>
        <rect x="51" y="32" width="6" height="8" fill="#111214" stroke="#E7352C" strokeWidth="1" rx="3"/>
        
        {/* Premium warning symbols */}
        <text x="10" y="38" textAnchor="middle" fill="#E7352C" fontSize="8" fontWeight="900">!</text>
        <text x="54" y="38" textAnchor="middle" fill="#E7352C" fontSize="8" fontWeight="900">!</text>
        
        {/* Head strap connectors */}
        <rect x="4" y="20" width="4" height="6" fill="#2A2B31" stroke="#7A3BFF" strokeWidth="1" rx="2"/>
        <rect x="56" y="20" width="4" height="6" fill="#2A2B31" stroke="#7A3BFF" strokeWidth="1" rx="2"/>
        
        {/* Mask seal rim for realism */}
        <path d="M16 16 L48 16 L50 32 L48 48 L16 48 L14 32 Z" fill="none" stroke="#39FF14" strokeWidth="1" opacity="0.4"/>
        
        {/* Energy particles */}
        <circle cx="18" cy="20" r="1" fill="#7A3BFF" opacity="0.8">
          <animate attributeName="opacity" values="0.8;0.3;0.8" dur="2.5s" repeatCount="indefinite"/>
        </circle>
        <circle cx="46" cy="50" r="1.5" fill="#39FF14" opacity="0.7">
          <animate attributeName="opacity" values="0.7;0.2;0.7" dur="2s" repeatCount="indefinite"/>
        </circle>
      </g>
      
      {/* Outer Power Ring */}
      <circle cx="32" cy="32" r="28" fill="none" stroke="#7A3BFF" strokeWidth="0.5" opacity="0.3"/>
    </svg>
  );
}

export function TelegramChaosIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <defs>
        {/* Epic 3D Telegram Base Gradient */}
        <radialGradient id="telegram3D" cx="25%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9"/>
          <stop offset="15%" stopColor="#39FF14" stopOpacity="1"/>
          <stop offset="60%" stopColor="#0A0A0B" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#000000" stopOpacity="1"/>
        </radialGradient>
        
        {/* 3D Paper Plane Gradient */}
        <linearGradient id="plane3D" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9"/>
          <stop offset="30%" stopColor="#EDEEF0" stopOpacity="1"/>
          <stop offset="70%" stopColor="#718096" stopOpacity="1"/>
          <stop offset="100%" stopColor="#2D3748" stopOpacity="1"/>
        </linearGradient>
        
        {/* Epic 3D Depth Filter */}
        <filter id="telegram3DDepth" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="4" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.9"/>
          <feDropShadow dx="-2" dy="-2" stdDeviation="3" floodColor="#FFFFFF" floodOpacity="0.4"/>
        </filter>
        
        {/* Hyper-Realistic Glow */}
        <filter id="telegramHyperGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Epic 3D Circular Base */}
      <circle cx="32" cy="32" r="28" fill="url(#telegram3D)" filter="url(#telegram3DDepth)" stroke="#39FF14" strokeWidth="3"/>
      <circle cx="32" cy="32" r="24" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.3"/>
      <circle cx="32" cy="32" r="20" fill="none" stroke="#39FF14" strokeWidth="1" opacity="0.6"/>
      
      {/* Hyper-Realistic 3D Paper Plane */}
      <g filter="url(#telegram3DDepth)">
        <path d="M44 20 L18 30 L26 32 L32 26 L40 36 L42 32 Z" fill="url(#plane3D)" stroke="#39FF14" strokeWidth="2" strokeLinejoin="round"/>
        <path d="M26 32 L32 38 L40 36" fill="url(#plane3D)" stroke="#FFFFFF" strokeWidth="1.5" opacity="0.8"/>
        
        {/* 3D Wing Details */}
        <path d="M32 26 L40 36" stroke="#FFFFFF" strokeWidth="2" opacity="0.6"/>
        <path d="M26 32 L32 26" stroke="#39FF14" strokeWidth="2" opacity="0.8"/>
      </g>
      
      {/* Epic Message Trail with 3D Effect */}
      <circle cx="22" cy="26" r="2" fill="#39FF14" opacity="0.9" filter="url(#telegramHyperGlow)"/>
      <circle cx="24" cy="24" r="1.5" fill="#39FF14" opacity="0.7" filter="url(#telegramHyperGlow)"/>
      <circle cx="26" cy="22" r="1" fill="#39FF14" opacity="0.5" filter="url(#telegramHyperGlow)"/>
      <circle cx="20" cy="24" r="1" fill="#FFFFFF" opacity="0.8"/>
      <circle cx="22" cy="22" r="0.8" fill="#FFFFFF" opacity="0.6"/>
      
      {/* 3D Chaos Glitch Matrix */}
      <rect x="12" y="16" width="10" height="2" rx="1" fill="#E7352C" opacity="0.9" filter="url(#telegramHyperGlow)"/>
      <rect x="44" y="44" width="8" height="2" rx="1" fill="#7A3BFF" opacity="0.8" filter="url(#telegramHyperGlow)"/>
      <rect x="50" y="18" width="6" height="2" rx="1" fill="#39FF14" opacity="1" filter="url(#telegramHyperGlow)"/>
      <rect x="8" y="42" width="7" height="2" rx="1" fill="#E7352C" opacity="0.7" filter="url(#telegramHyperGlow)"/>
      
      {/* Epic Power Ring with 3D Depth */}
      <circle cx="32" cy="32" r="30" fill="none" stroke="#39FF14" strokeWidth="1" opacity="0.5" filter="url(#telegramHyperGlow)"/>
      <circle cx="32" cy="32" r="32" fill="none" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.3"/>
    </svg>
  );
}

export function XChaosIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      <defs>
        {/* Epic 3D X Base Gradient */}
        <radialGradient id="x3D" cx="25%" cy="20%" r="90%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9"/>
          <stop offset="15%" stopColor="#7A3BFF" stopOpacity="1"/>
          <stop offset="60%" stopColor="#0A0A0B" stopOpacity="0.8"/>
          <stop offset="100%" stopColor="#000000" stopOpacity="1"/>
        </radialGradient>
        
        {/* 3D X Symbol Gradient */}
        <linearGradient id="xSymbol3D" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.8"/>
          <stop offset="30%" stopColor="#A78BFA" stopOpacity="1"/>
          <stop offset="70%" stopColor="#7A3BFF" stopOpacity="1"/>
          <stop offset="100%" stopColor="#4C1D95" stopOpacity="1"/>
        </linearGradient>
        
        {/* Epic 3D Depth Filter */}
        <filter id="x3DDepth" x="-50%" y="-50%" width="200%" height="200%">
          <feDropShadow dx="4" dy="8" stdDeviation="6" floodColor="#000000" floodOpacity="0.9"/>
          <feDropShadow dx="-2" dy="-2" stdDeviation="3" floodColor="#FFFFFF" floodOpacity="0.4"/>
        </filter>
        
        {/* Hyper-Realistic Glow */}
        <filter id="xHyperGlow" x="-100%" y="-100%" width="300%" height="300%">
          <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
          <feMerge>
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Epic 3D Circular Base */}
      <circle cx="32" cy="32" r="28" fill="url(#x3D)" filter="url(#x3DDepth)" stroke="#7A3BFF" strokeWidth="3"/>
      <circle cx="32" cy="32" r="24" fill="none" stroke="#FFFFFF" strokeWidth="1" opacity="0.3"/>
      <circle cx="32" cy="32" r="20" fill="none" stroke="#7A3BFF" strokeWidth="1" opacity="0.6"/>
      
      {/* Hyper-Realistic 3D X Symbol */}
      <g filter="url(#x3DDepth)">
        <path d="M18 18 L28 18 L32 22 L36 18 L46 18 L40 24 L46 30 L46 40 L36 40 L32 36 L28 40 L18 40 L18 30 L24 24 Z" 
              fill="url(#xSymbol3D)" stroke="#7A3BFF" strokeWidth="2" strokeLinejoin="round"/>
        
        {/* 3D X Inner Details with Depth */}
        <path d="M22 22 L32 32 L42 22" stroke="#FFFFFF" strokeWidth="3" opacity="0.7" strokeLinecap="round"/>
        <path d="M22 42 L32 32 L42 42" stroke="#FFFFFF" strokeWidth="3" opacity="0.7" strokeLinecap="round"/>
        <path d="M24 24 L32 32 L40 24" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round"/>
        <path d="M24 40 L32 32 L40 40" stroke="#A78BFA" strokeWidth="2" strokeLinecap="round"/>
      </g>
      
      {/* Epic Chaos Energy Core with 3D Effect */}
      <circle cx="32" cy="32" r="5" fill="#7A3BFF" opacity="0.6"/>
      <circle cx="32" cy="32" r="3" fill="#7A3BFF" filter="url(#xHyperGlow)"/>
      <circle cx="30" cy="30" r="2" fill="#FFFFFF" opacity="0.9"/>
      
      {/* 3D Chaos Glitch Matrix */}
      <rect x="10" y="36" width="12" height="2" rx="1" fill="#39FF14" opacity="0.9" filter="url(#xHyperGlow)"/>
      <rect x="44" y="20" width="8" height="2" rx="1" fill="#E7352C" opacity="1" filter="url(#xHyperGlow)"/>
      <rect x="50" y="42" width="10" height="2" rx="1" fill="#7A3BFF" opacity="0.8" filter="url(#xHyperGlow)"/>
      <rect x="6" y="24" width="9" height="2" rx="1" fill="#39FF14" opacity="0.7" filter="url(#xHyperGlow)"/>
      
      {/* Epic Power Ring with 3D Depth */}
      <circle cx="32" cy="32" r="30" fill="none" stroke="#7A3BFF" strokeWidth="1" opacity="0.5" filter="url(#xHyperGlow)"/>
      <circle cx="32" cy="32" r="32" fill="none" stroke="#FFFFFF" strokeWidth="0.5" opacity="0.3"/>
      
      {/* Additional 3D Energy Rings */}
      <circle cx="32" cy="32" r="26" fill="none" stroke="#A78BFA" strokeWidth="0.5" opacity="0.4"/>
    </svg>
  );
}

export function BarcodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 48" fill="none">
      <defs>
        <linearGradient id="barcodeGrad" x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#E7352C" stopOpacity="1"/>
          <stop offset="33%" stopColor="#39FF14" stopOpacity="0.8"/>
          <stop offset="66%" stopColor="#7A3BFF" stopOpacity="0.9"/>
          <stop offset="100%" stopColor="#E7352C" stopOpacity="1"/>
        </linearGradient>
        <filter id="barcodeGlow">
          <feGaussianBlur stdDeviation="1" result="coloredBlur"/>
          <feMerge> 
            <feMergeNode in="coloredBlur"/>
            <feMergeNode in="SourceGraphic"/>
          </feMerge>
        </filter>
      </defs>
      
      {/* Premium Barcode Pattern with Gradient */}
      <g filter="url(#barcodeGlow)">
        <rect x="0" y="4" width="4" height="40" fill="url(#barcodeGrad)"/>
        <rect x="8" y="6" width="2" height="36" fill="#E7352C"/>
        <rect x="16" y="2" width="6" height="44" fill="#39FF14"/>
        <rect x="28" y="8" width="2" height="32" fill="#E7352C"/>
        <rect x="36" y="4" width="4" height="40" fill="#7A3BFF"/>
        <rect x="48" y="6" width="2" height="36" fill="#39FF14"/>
        <rect x="56" y="0" width="8" height="48" fill="#E7352C"/>
        <rect x="72" y="5" width="2" height="38" fill="#7A3BFF"/>
        <rect x="80" y="3" width="4" height="42" fill="#39FF14"/>
        <rect x="92" y="7" width="6" height="34" fill="#E7352C"/>
        <rect x="104" y="6" width="2" height="36" fill="#7A3BFF"/>
        <rect x="112" y="4" width="4" height="40" fill="#39FF14"/>
        <rect x="124" y="8" width="2" height="32" fill="#E7352C"/>
        <rect x="132" y="1" width="8" height="46" fill="#7A3BFF"/>
        <rect x="148" y="6" width="2" height="36" fill="#39FF14"/>
        <rect x="156" y="4" width="4" height="40" fill="#E7352C"/>
        <rect x="168" y="3" width="6" height="42" fill="#7A3BFF"/>
        <rect x="180" y="7" width="2" height="34" fill="#39FF14"/>
        <rect x="188" y="5" width="4" height="38" fill="#E7352C"/>
        <rect x="200" y="6" width="2" height="36" fill="#7A3BFF"/>
        <rect x="208" y="2" width="8" height="44" fill="#39FF14"/>
        <rect x="224" y="6" width="2" height="36" fill="#E7352C"/>
        <rect x="232" y="4" width="4" height="40" fill="#7A3BFF"/>
        <rect x="244" y="3" width="6" height="42" fill="#39FF14"/>
        <rect x="252" y="5" width="4" height="38" fill="#E7352C"/>
      </g>
      
      {/* Scanning Laser Effect */}
      <rect x="0" y="22" width="256" height="2" fill="#39FF14" opacity="0.3">
        <animate attributeName="opacity" values="0.3;0.9;0.3" dur="2s" repeatCount="indefinite"/>
      </rect>
    </svg>
  );
}
