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
      {/* Enhanced Hooded Figure - Sleek and Angular */}
      <path d="M150 45 L115 95 L115 210 L185 210 L185 95 Z" fill="#0A0A0B" stroke="#E7352C" strokeWidth="1.5" strokeLinejoin="miter"/>
      {/* Angular Hood */}
      <path d="M150 45 L90 75 L90 125 L150 95 L210 125 L210 75 Z" fill="#0A0A0B" stroke="#E7352C" strokeWidth="1.5" strokeLinejoin="miter"/>
      {/* Skull Face - More Angular */}
      <polygon points="150,100 165,110 165,130 150,140 135,130 135,110" fill="#EDEEF0" stroke="#E7352C" strokeWidth="1"/>
      {/* Sharp Eye Sockets */}
      <polygon points="142,115 148,115 145,125" fill="#0A0A0B"/>
      <polygon points="152,115 158,115 155,125" fill="#0A0A0B"/>
      {/* Angular Money Bags */}
      <polygon points="110,170 130,170 135,190 105,190" fill="#111214" stroke="#39FF14" strokeWidth="1.5"/>
      <polygon points="170,170 190,170 195,190 165,190" fill="#111214" stroke="#39FF14" strokeWidth="1.5"/>
      {/* Dollar Signs */}
      <text x="120" y="185" textAnchor="middle" fill="#39FF14" fontSize="14" fontWeight="bold" fontFamily="Orbitron">$</text>
      <text x="180" y="185" textAnchor="middle" fill="#39FF14" fontSize="14" fontWeight="bold" fontFamily="Orbitron">$</text>
      {/* Neon Rim Lighting */}
      <path d="M150 45 L90 75 L90 125 L150 95 L210 125 L210 75 Z" fill="none" stroke="#39FF14" strokeWidth="0.5" opacity="0.6"/>
      <path d="M150 45 L115 95 L115 210 L185 210 L185 95 Z" fill="none" stroke="#7A3BFF" strokeWidth="0.5" opacity="0.4"/>
      {/* Glitch Effect Lines */}
      <line x1="85" y1="85" x2="110" y2="80" stroke="#7A3BFF" strokeWidth="1" opacity="0.8"/>
      <line x1="190" y1="80" x2="215" y2="85" stroke="#7A3BFF" strokeWidth="1" opacity="0.8"/>
      <line x1="95" y1="100" x2="120" y2="95" stroke="#39FF14" strokeWidth="1" opacity="0.6"/>
      <line x1="180" y1="95" x2="205" y2="100" stroke="#39FF14" strokeWidth="1" opacity="0.6"/>
    </svg>
  );
}

export function UrbanGritIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* Angular Building Silhouettes */}
      <polygon points="8,48 20,45 20,56 8,56" fill="currentColor" stroke="#39FF14" strokeWidth="0.5" opacity="0.8"/>
      <polygon points="20,45 32,40 32,56 20,56" fill="currentColor" stroke="#39FF14" strokeWidth="0.5" opacity="0.8"/>
      <polygon points="32,40 44,38 44,56 32,56" fill="currentColor" stroke="#39FF14" strokeWidth="0.5" opacity="0.8"/>
      <polygon points="44,38 56,42 56,56 44,56" fill="currentColor" stroke="#39FF14" strokeWidth="0.5" opacity="0.8"/>
      {/* Antenna/Signal */}
      <rect x="30" y="30" width="4" height="12" fill="currentColor"/>
      <polygon points="28,28 32,25 36,28 32,32" fill="currentColor"/>
      {/* Neon Rim Light */}
      <rect x="8" y="48" width="48" height="8" fill="none" stroke="#39FF14" strokeWidth="0.5" opacity="0.4"/>
    </svg>
  );
}

export function FireSkullIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* Angular Skull */}
      <polygon points="32,8 48,16 48,32 40,40 24,40 16,32 16,16" fill="currentColor"/>
      {/* Sharp Eye Sockets */}
      <polygon points="24,20 30,18 28,28 22,26" fill="#0A0A0B"/>
      <polygon points="34,18 40,20 42,26 36,28" fill="#0A0A0B"/>
      {/* Angular Nasal Cavity */}
      <polygon points="30,28 34,28 32,36" fill="#0A0A0B"/>
      {/* Fire/Chaos Effect */}
      <polygon points="18,42 22,38 26,42 30,38 34,42 38,38 42,42 46,38 50,44 46,48 18,48" fill="currentColor"/>
      {/* Neon Rim Light */}
      <polygon points="32,8 48,16 48,32 40,40 24,40 16,32 16,16" fill="none" stroke="#E7352C" strokeWidth="1" opacity="0.6"/>
      <path d="M18,42 L50,44" stroke="#7A3BFF" strokeWidth="1" opacity="0.8"/>
    </svg>
  );
}

export function RaisedFistIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="none">
      {/* Angular Fist Structure */}
      <polygon points="26,14 38,14 38,18 36,20 36,48 28,48 28,20 26,18" fill="currentColor"/>
      {/* Fingers */}
      <polygon points="22,20 26,18 26,36 22,38" fill="currentColor"/>
      <polygon points="38,18 42,20 42,38 38,36" fill="currentColor"/>
      <polygon points="18,24 22,20 22,36 18,40" fill="currentColor"/>
      <polygon points="42,20 46,24 46,40 42,36" fill="currentColor"/>
      {/* Thumb */}
      <polygon points="24,12 30,10 32,16 26,18" fill="currentColor"/>
      {/* Neon Rim Lighting */}
      <polygon points="26,14 38,14 38,48 28,48 28,18 26,18" fill="none" stroke="#7A3BFF" strokeWidth="1" opacity="0.6"/>
      {/* Power/Energy Lines */}
      <line x1="12" y1="28" x2="18" y2="26" stroke="#39FF14" strokeWidth="1.5" opacity="0.8"/>
      <line x1="46" y1="26" x2="52" y2="28" stroke="#39FF14" strokeWidth="1.5" opacity="0.8"/>
      <line x1="14" y1="34" x2="20" y2="32" stroke="#E7352C" strokeWidth="1" opacity="0.7"/>
      <line x1="44" y1="32" x2="50" y2="34" stroke="#E7352C" strokeWidth="1" opacity="0.7"/>
    </svg>
  );
}

export function ChainLinkIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M3.9 12c0-1.71 1.39-3.1 3.1-3.1h4V7H7c-2.76 0-5 2.24-5 5s2.24 5 5 5h4v-1.9H7c-1.71 0-3.1-1.39-3.1-3.1zM8 13h8v-2H8v2zm9-6h-4v1.9h4c1.71 0 3.1 1.39 3.1 3.1s-1.39 3.1-3.1 3.1h-4V17h4c2.76 0 5-2.24 5-5s-2.24-5-5-5z"/>
    </svg>
  );
}

export function BodyBagIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M20 6h-2.18c.11-.31.18-.65.18-1a2.996 2.996 0 0 0-5.5-1.65l-.5.67-.5-.68C10.96 2.54 10.05 2 9 2 7.34 2 6 3.34 6 5c0 .35.07.69.18 1H4c-1.11 0-2 .89-2 2v11c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V8c0-1.11-.89-2-2-2z"/>
    </svg>
  );
}

export function GasMaskIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z"/>
    </svg>
  );
}

export function TelegramChaosIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor">
      <path d="M32 8C18.7 8 8 18.7 8 32s10.7 24 24 24 24-10.7 24-24S45.3 8 32 8zm8.9 16.9l-3.6 17c-.3 1.4-1 1.7-2.1 1.1L30 38.7l-2.6 2.5c-.3.3-.5.5-.9.5l.3-4.4 8.3-7.5c.4-.3-.1-.5-.5-.2l-10.3 6.5-4.4-1.4c-1-.3-1-.9.2-1.4l17.1-6.6c.8-.4 1.5.2 1.2 1.2z"/>
      {/* Glitch lines */}
      <line x1="20" y1="20" x2="25" y2="18" stroke="#E7352C" strokeWidth="2" opacity="0.7"/>
      <line x1="44" y1="44" x2="39" y2="46" stroke="#7A3BFF" strokeWidth="2" opacity="0.7"/>
    </svg>
  );
}

export function XChaosIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor">
      <path d="M32 8C18.7 8 8 18.7 8 32s10.7 24 24 24 24-10.7 24-24S45.3 8 32 8zm8 20l-8 8-8-8 2.8-2.8L32 30.4l5.2-5.2L40 28zm-8 4l8 8H24l8-8z"/>
      {/* Glitch lines */}
      <line x1="16" y1="40" x2="20" y2="36" stroke="#39FF14" strokeWidth="2" opacity="0.7"/>
      <line x1="48" y1="24" x2="44" y2="28" stroke="#E7352C" strokeWidth="2" opacity="0.7"/>
    </svg>
  );
}

export function BarcodeIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 256 48" fill="none">
      <rect x="0" y="0" width="4" height="48" fill="#E7352C"/>
      <rect x="8" y="0" width="2" height="48" fill="#E7352C"/>
      <rect x="16" y="0" width="6" height="48" fill="#E7352C"/>
      <rect x="28" y="0" width="2" height="48" fill="#E7352C"/>
      <rect x="36" y="0" width="4" height="48" fill="#E7352C"/>
      <rect x="48" y="0" width="2" height="48" fill="#E7352C"/>
      <rect x="56" y="0" width="8" height="48" fill="#E7352C"/>
      <rect x="72" y="0" width="2" height="48" fill="#E7352C"/>
      <rect x="80" y="0" width="4" height="48" fill="#E7352C"/>
      <rect x="92" y="0" width="6" height="48" fill="#E7352C"/>
      <rect x="104" y="0" width="2" height="48" fill="#E7352C"/>
      <rect x="112" y="0" width="4" height="48" fill="#E7352C"/>
      <rect x="124" y="0" width="2" height="48" fill="#E7352C"/>
      <rect x="132" y="0" width="8" height="48" fill="#E7352C"/>
      <rect x="148" y="0" width="2" height="48" fill="#E7352C"/>
      <rect x="156" y="0" width="4" height="48" fill="#E7352C"/>
      <rect x="168" y="0" width="6" height="48" fill="#E7352C"/>
      <rect x="180" y="0" width="2" height="48" fill="#E7352C"/>
      <rect x="188" y="0" width="4" height="48" fill="#E7352C"/>
      <rect x="200" y="0" width="2" height="48" fill="#E7352C"/>
      <rect x="208" y="0" width="8" height="48" fill="#E7352C"/>
      <rect x="224" y="0" width="2" height="48" fill="#E7352C"/>
      <rect x="232" y="0" width="4" height="48" fill="#E7352C"/>
      <rect x="244" y="0" width="6" height="48" fill="#E7352C"/>
      <rect x="252" y="0" width="4" height="48" fill="#E7352C"/>
    </svg>
  );
}
