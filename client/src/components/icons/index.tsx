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
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      {/* Simplified chain links for cross-device compatibility */}
      <path d="M9 7.5C9 6.12 7.88 5 6.5 5S4 6.12 4 7.5 5.12 10 6.5 10c.18 0 .35-.02.52-.06L8.04 11H9c1.38 0 2.5-1.12 2.5-2.5S10.38 7.5 9 7.5zM6.5 8.5C5.95 8.5 5.5 8.05 5.5 7.5S5.95 6.5 6.5 6.5 7.5 6.95 7.5 7.5 7.05 8.5 6.5 8.5z"/>
      <path d="M15 16.5c0-1.38-1.12-2.5-2.5-2.5-.18 0-.35.02-.52.06L10.96 13H10c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5 2.5-1.12 2.5-2.5zM10 17c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
      <path d="M17.5 14c-1.38 0-2.5 1.12-2.5 2.5s1.12 2.5 2.5 2.5S20 17.88 20 16.5 18.88 14 17.5 14zM17.5 17.5c-.55 0-1-.45-1-1s.45-1 1-1 1 .45 1 1-.45 1-1 1z"/>
      <path d="M8.96 11h1.08c.28 0 .5-.22.5-.5s-.22-.5-.5-.5H8.96l1.52-1.06c.02-.17.02-.34 0-.51L8.96 11z" opacity="0.7"/>
      <path d="M13.04 13h1.08c.28 0 .5.22.5.5s-.22.5-.5.5h-1.08l-1.52 1.06c-.02.17-.02.34 0 .51L13.04 13z" opacity="0.7"/>
    </svg>
  );
}

export function BodyBagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      {/* Simplified money bag design for cross-device compatibility */}
      <path d="M12 2C8.5 2 6 4.5 6 8v2c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8c0-3.5-2.5-6-6-6z" opacity="0.8"/>
      <path d="M8 10v8c0 2.2 1.8 4 4 4s4-1.8 4-4v-8c0-.6-.4-1-1-1H9c-.6 0-1 .4-1 1z"/>
      <path d="M10 7h4c.6 0 1-.4 1-1s-.4-1-1-1h-4c-.6 0-1 .4-1 1s.4 1 1 1z" opacity="0.6"/>
      <circle cx="10" cy="15" r="1.5" fill="currentColor" opacity="0.9"/>
      <circle cx="14" cy="15" r="1.5" fill="currentColor" opacity="0.9"/>
      <path d="M10 14h1v2h-1zM13 14h1v2h-1z" opacity="0.7"/>
    </svg>
  );
}

export function GasMaskIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      {/* Simplified gas mask design for cross-device compatibility */}
      <path d="M12 2C8.7 2 6 4.7 6 8v6c0 1.1.9 2 2 2h8c1.1 0 2-.9 2-2V8c0-3.3-2.7-6-6-6z" opacity="0.9"/>
      <circle cx="9" cy="10" r="2" fill="currentColor" opacity="0.8"/>
      <circle cx="15" cy="10" r="2" fill="currentColor" opacity="0.8"/>
      <circle cx="9" cy="10" r="1" fill="currentColor" opacity="0.6"/>
      <circle cx="15" cy="10" r="1" fill="currentColor" opacity="0.6"/>
      <rect x="10" y="13" width="4" height="3" rx="2" fill="currentColor" opacity="0.7"/>
      <circle cx="4" cy="12" r="2" fill="currentColor" opacity="0.6"/>
      <circle cx="20" cy="12" r="2" fill="currentColor" opacity="0.6"/>
      <path d="M6 14v4c0 2.2 1.8 4 4 4h4c2.2 0 4-1.8 4-4v-4" stroke="currentColor" strokeWidth="1" fill="none" opacity="0.5"/>
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
