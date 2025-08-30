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
      {/* Hooded Figure */}
      <path d="M150 50 L120 100 L120 200 L180 200 L180 100 Z" fill="#111214" stroke="#E7352C" strokeWidth="2"/>
      {/* Hood */}
      <path d="M150 50 L100 80 L100 120 L150 100 L200 120 L200 80 Z" fill="#0A0A0B" stroke="#E7352C" strokeWidth="2"/>
      {/* Skull Face */}
      <circle cx="150" cy="120" r="20" fill="#EDEEF0" stroke="#E7352C" strokeWidth="1"/>
      {/* Eye Sockets */}
      <circle cx="145" cy="115" r="3" fill="#0A0A0B"/>
      <circle cx="155" cy="115" r="3" fill="#0A0A0B"/>
      {/* Money Bags */}
      <circle cx="120" cy="180" r="15" fill="#2A2B31" stroke="#39FF14" strokeWidth="2"/>
      <circle cx="180" cy="180" r="15" fill="#2A2B31" stroke="#39FF14" strokeWidth="2"/>
      {/* Dollar Signs */}
      <text x="120" y="185" textAnchor="middle" fill="#39FF14" fontSize="12" fontWeight="bold">$</text>
      <text x="180" y="185" textAnchor="middle" fill="#39FF14" fontSize="12" fontWeight="bold">$</text>
      {/* Glitch Effect Lines */}
      <line x1="100" y1="90" x2="120" y2="85" stroke="#7A3BFF" strokeWidth="1" opacity="0.7"/>
      <line x1="180" y1="85" x2="200" y2="90" stroke="#7A3BFF" strokeWidth="1" opacity="0.7"/>
    </svg>
  );
}

export function UrbanGritIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor">
      <path d="M8 48h48v8H8zM16 40h32v8H16zM24 32h16v8H24zM20 24h24v8H20zM12 16h40v8H12z"/>
      <rect x="28" y="8" width="8" height="8" fill="currentColor"/>
    </svg>
  );
}

export function FireSkullIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor">
      <circle cx="32" cy="24" r="16"/>
      <circle cx="28" cy="20" r="2" fill="#0A0A0B"/>
      <circle cx="36" cy="20" r="2" fill="#0A0A0B"/>
      <rect x="30" y="26" width="4" height="4" fill="#0A0A0B"/>
      <path d="M20 40l4 4 4-4 4 4 4-4 4 4 4-4v8H20z"/>
    </svg>
  );
}

export function RaisedFistIcon({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 64 64" fill="currentColor">
      <rect x="28" y="16" width="8" height="32"/>
      <rect x="24" y="20" width="4" height="16"/>
      <rect x="36" y="20" width="4" height="16"/>
      <rect x="20" y="24" width="4" height="12"/>
      <rect x="40" y="24" width="4" height="12"/>
      <rect x="26" y="14" width="12" height="6"/>
      {/* Glitch lines */}
      <line x1="16" y1="30" x2="20" y2="28" stroke="#39FF14" strokeWidth="2"/>
      <line x1="44" y1="28" x2="48" y2="30" stroke="#39FF14" strokeWidth="2"/>
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
