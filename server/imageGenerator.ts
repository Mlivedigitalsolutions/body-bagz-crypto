// Enhanced image generation using SVG with premium styling

export interface PFPOptions {
  name: string;
  style: 'cyberpunk' | 'villain' | 'chaos' | 'shadow';
  size: number;
}

export interface MemeOptions {
  topText: string;
  bottomText: string;
  templateImage?: string;
  size: { width: number; height: number };
}

export class ImageGenerator {
  static async generatePFP(options: PFPOptions): Promise<string> {
    const { name, style, size } = options;
    
    // Define colors based on style
    const styleColors = {
      cyberpunk: { primary: '#7A3BFF', secondary: '#39FF14', accent: '#E7352C' },
      villain: { primary: '#E7352C', secondary: '#7A3BFF', accent: '#39FF14' },
      chaos: { primary: '#39FF14', secondary: '#E7352C', accent: '#7A3BFF' },
      shadow: { primary: '#2A2B31', secondary: '#EDEEF0', accent: '#E7352C' }
    };
    
    const colors = styleColors[style];
    
    const svg = `
      <svg width="${size}" height="${size}" viewBox="0 0 ${size} ${size}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bg" cx="50%" cy="30%" r="80%">
            <stop offset="0%" stop-color="${colors.primary}" stop-opacity="0.9"/>
            <stop offset="50%" stop-color="#0A0A0B" stop-opacity="1"/>
            <stop offset="100%" stop-color="#2A2B31" stop-opacity="1"/>
          </radialGradient>
          <linearGradient id="hood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="${colors.primary}" stop-opacity="0.9"/>
            <stop offset="50%" stop-color="#0A0A0B" stop-opacity="1"/>
            <stop offset="100%" stop-color="${colors.secondary}" stop-opacity="0.7"/>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="${colors.accent}" stroke-width="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        
        <!-- Background -->
        <rect width="${size}" height="${size}" fill="url(#bg)"/>
        <rect width="${size}" height="${size}" fill="url(#grid)"/>
        
        <!-- Hooded Figure Body -->
        <path d="M${size/2} ${size*0.2} L${size*0.3} ${size*0.35} L${size*0.3} ${size*0.85} L${size*0.7} ${size*0.85} L${size*0.7} ${size*0.35} Z" 
              fill="url(#hood)" stroke="${colors.primary}" stroke-width="4" filter="url(#glow)"/>
        
        <!-- Hood -->
        <path d="M${size/2} ${size*0.2} L${size*0.25} ${size*0.3} L${size*0.25} ${size*0.55} L${size/2} ${size*0.43} L${size*0.75} ${size*0.55} L${size*0.75} ${size*0.3} Z" 
              fill="#0A0A0B" stroke="${colors.secondary}" stroke-width="3"/>
        
        <!-- Face/Mask Area -->
        <ellipse cx="${size/2}" cy="${size*0.5}" rx="${size*0.12}" ry="${size*0.15}" 
                 fill="#2A2B31" stroke="#EDEEF0" stroke-width="3"/>
        
        <!-- Glowing Eyes -->
        <circle cx="${size*0.46}" cy="${size*0.47}" r="${size*0.025}" fill="${colors.secondary}" filter="url(#glow)"/>
        <circle cx="${size*0.54}" cy="${size*0.47}" r="${size*0.025}" fill="${colors.secondary}" filter="url(#glow)"/>
        <circle cx="${size*0.46}" cy="${size*0.47}" r="${size*0.012}" fill="#EDEEF0"/>
        <circle cx="${size*0.54}" cy="${size*0.47}" r="${size*0.012}" fill="#EDEEF0"/>
        
        <!-- Respirator/Filter -->
        <rect x="${size*0.47}" y="${size*0.53}" width="${size*0.06}" height="${size*0.04}" rx="${size*0.02}" 
              fill="${colors.primary}" stroke="${colors.secondary}" stroke-width="2"/>
        <rect x="${size*0.485}" y="${size*0.535}" width="${size*0.01}" height="${size*0.02}" fill="${colors.secondary}"/>
        <rect x="${size*0.505}" y="${size*0.535}" width="${size*0.01}" height="${size*0.02}" fill="${colors.secondary}"/>
        
        <!-- Chest Detail -->
        <rect x="${size*0.4}" y="${size*0.65}" width="${size*0.2}" height="${size*0.15}" rx="${size*0.03}" 
              fill="${colors.primary}" stroke="${colors.accent}" stroke-width="2" opacity="0.8"/>
        <text x="${size/2}" y="${size*0.735}" text-anchor="middle" fill="${colors.secondary}" 
              font-family="monospace" font-size="${size*0.03}" font-weight="bold">$BAGZ</text>
        
        <!-- Glitch Effects -->
        <rect x="${size*0.15}" y="${size*0.4}" width="${size*0.12}" height="${size*0.012}" fill="${colors.secondary}" opacity="0.8"/>
        <rect x="${size*0.73}" y="${size*0.45}" width="${size*0.09}" height="${size*0.012}" fill="${colors.accent}" opacity="0.9"/>
        <rect x="${size*0.2}" y="${size*0.62}" width="${size*0.1}" height="${size*0.008}" fill="${colors.primary}" opacity="0.7"/>
        
        <!-- Data Streams -->
        <rect x="${size*0.04}" y="${size*0.3}" width="${size*0.006}" height="${size*0.4}" fill="${colors.secondary}" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </rect>
        <rect x="${size*0.955}" y="${size*0.35}" width="${size*0.006}" height="${size*0.3}" fill="${colors.accent}" opacity="0.7">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite"/>
        </rect>
        
        <!-- Name Text -->
        <text x="${size/2}" y="${size*0.92}" text-anchor="middle" fill="#EDEEF0" 
              font-family="Arial, sans-serif" font-size="${size*0.035}" font-weight="bold" opacity="0.9">
          ${name.toUpperCase()}
        </text>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  }

  static async generateMeme(options: MemeOptions): Promise<string> {
    const { topText, bottomText, size } = options;
    
    const svg = `
      <svg width="${size.width}" height="${size.height}" viewBox="0 0 ${size.width} ${size.height}" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="memeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#2A2B31" stop-opacity="1"/>
            <stop offset="50%" stop-color="#0A0A0B" stop-opacity="1"/>
            <stop offset="100%" stop-color="#111214" stop-opacity="1"/>
          </linearGradient>
          <filter id="textGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          <pattern id="scanlines" width="2" height="4" patternUnits="userSpaceOnUse">
            <rect width="2" height="2" fill="rgba(57, 255, 20, 0.05)"/>
            <rect y="2" width="2" height="2" fill="transparent"/>
          </pattern>
        </defs>
        
        <!-- Background -->
        <rect width="${size.width}" height="${size.height}" fill="url(#memeGrad)"/>
        <rect width="${size.width}" height="${size.height}" fill="url(#scanlines)"/>
        
        <!-- Central Logo Area -->
        <rect x="${size.width*0.25}" y="${size.height*0.35}" width="${size.width*0.5}" height="${size.height*0.3}" 
              fill="rgba(122, 59, 255, 0.1)" stroke="#7A3BFF" stroke-width="2" rx="20"/>
        
        <!-- Body Bagz Logo -->
        <text x="${size.width/2}" y="${size.height/2}" text-anchor="middle" fill="#7A3BFF" 
              font-family="Arial Black, sans-serif" font-size="${size.width*0.08}" font-weight="900" 
              filter="url(#textGlow)">BODY BAGZ</text>
        
        <!-- $BAGZ subtitle -->
        <text x="${size.width/2}" y="${size.height*0.58}" text-anchor="middle" fill="#39FF14" 
              font-family="monospace" font-size="${size.width*0.04}" font-weight="bold">$BAGZ</text>
        
        ${topText ? `
        <!-- Top Text -->
        <text x="${size.width/2}" y="${size.height*0.12}" text-anchor="middle" fill="#EDEEF0" 
              font-family="Arial Black, sans-serif" font-size="${size.width*0.06}" font-weight="900" 
              stroke="#0A0A0B" stroke-width="3" filter="url(#textGlow)">${topText.toUpperCase()}</text>
        ` : ''}
        
        ${bottomText ? `
        <!-- Bottom Text -->
        <text x="${size.width/2}" y="${size.height*0.9}" text-anchor="middle" fill="#EDEEF0" 
              font-family="Arial Black, sans-serif" font-size="${size.width*0.06}" font-weight="900" 
              stroke="#0A0A0B" stroke-width="3" filter="url(#textGlow)">${bottomText.toUpperCase()}</text>
        ` : ''}
        
        <!-- Cyberpunk Effects -->
        <rect x="0" y="${size.height*0.2}" width="${size.width}" height="2" fill="rgba(231, 53, 44, 0.6)"/>
        <rect x="0" y="${size.height*0.8}" width="${size.width}" height="2" fill="rgba(57, 255, 20, 0.6)"/>
        
        <!-- Corner Details -->
        <rect x="10" y="10" width="40" height="4" fill="#E7352C" opacity="0.8"/>
        <rect x="${size.width-50}" y="10" width="40" height="4" fill="#39FF14" opacity="0.8"/>
        <rect x="10" y="${size.height-14}" width="40" height="4" fill="#7A3BFF" opacity="0.8"/>
        <rect x="${size.width-50}" y="${size.height-14}" width="40" height="4" fill="#E7352C" opacity="0.8"/>
      </svg>
    `;
    
    return `data:image/svg+xml;base64,${Buffer.from(svg).toString('base64')}`;
  }

  private static drawGrid(ctx: CanvasRenderingContext2D, size: number) {
    ctx.strokeStyle = 'rgba(231, 53, 44, 0.1)';
    ctx.lineWidth = 1;
    
    const gridSize = 32;
    for (let x = 0; x <= size; x += gridSize) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, size);
      ctx.stroke();
    }
    
    for (let y = 0; y <= size; y += gridSize) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size, y);
      ctx.stroke();
    }
  }

  private static drawHoodedFigure(ctx: CanvasRenderingContext2D, size: number, style: string) {
    const centerX = size / 2;
    const centerY = size / 2;
    
    // Hood
    ctx.fillStyle = '#0A0A0B';
    ctx.strokeStyle = style === 'cyberpunk' ? '#7A3BFF' : style === 'villain' ? '#E7352C' : '#39FF14';
    ctx.lineWidth = 3;
    
    ctx.beginPath();
    ctx.moveTo(centerX, size * 0.2);
    ctx.lineTo(size * 0.25, size * 0.35);
    ctx.lineTo(size * 0.25, size * 0.55);
    ctx.lineTo(centerX, size * 0.43);
    ctx.lineTo(size * 0.75, size * 0.55);
    ctx.lineTo(size * 0.75, size * 0.35);
    ctx.closePath();
    ctx.fill();
    ctx.stroke();

    // Body
    ctx.fillStyle = style === 'cyberpunk' ? '#7A3BFF' : style === 'villain' ? '#E7352C' : '#39FF14';
    ctx.globalAlpha = 0.8;
    ctx.fillRect(size * 0.3, size * 0.45, size * 0.4, size * 0.4);
    ctx.globalAlpha = 1;

    // Face mask
    ctx.fillStyle = '#2A2B31';
    ctx.strokeStyle = '#EDEEF0';
    ctx.lineWidth = 2;
    ctx.fillRect(size * 0.4, size * 0.35, size * 0.2, size * 0.15);
    ctx.strokeRect(size * 0.4, size * 0.35, size * 0.2, size * 0.15);

    // Eyes
    ctx.fillStyle = style === 'cyberpunk' ? '#7A3BFF' : style === 'villain' ? '#E7352C' : '#39FF14';
    ctx.beginPath();
    ctx.arc(size * 0.45, size * 0.4, size * 0.02, 0, 2 * Math.PI);
    ctx.fill();
    ctx.beginPath();
    ctx.arc(size * 0.55, size * 0.4, size * 0.02, 0, 2 * Math.PI);
    ctx.fill();

    // Respirator
    ctx.fillStyle = '#39FF14';
    ctx.fillRect(size * 0.47, size * 0.45, size * 0.06, size * 0.03);
  }

  private static drawGlitchEffects(ctx: CanvasRenderingContext2D, size: number, style: string) {
    // Random glitch lines
    const colors = ['#39FF14', '#E7352C', '#7A3BFF'];
    
    for (let i = 0; i < 5; i++) {
      ctx.fillStyle = colors[Math.floor(Math.random() * colors.length)];
      ctx.globalAlpha = 0.7;
      ctx.fillRect(
        Math.random() * size * 0.8,
        Math.random() * size,
        Math.random() * 60 + 20,
        2 + Math.random() * 4
      );
    }
    
    ctx.globalAlpha = 1;
  }

  private static drawName(ctx: CanvasRenderingContext2D, size: number, name: string) {
    ctx.fillStyle = '#EDEEF0';
    ctx.font = `${size * 0.06}px Arial, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add text shadow
    ctx.shadowColor = 'rgba(10, 10, 11, 0.8)';
    ctx.shadowBlur = 4;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 2;
    
    ctx.fillText(name, size / 2, size * 0.9);
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
    ctx.shadowOffsetX = 0;
    ctx.shadowOffsetY = 0;
  }

  private static drawBodyBagzLogo(ctx: CanvasRenderingContext2D, size: { width: number; height: number }) {
    ctx.fillStyle = 'rgba(122, 59, 255, 0.8)';
    ctx.font = `${size.width * 0.08}px Arial Black, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    
    // Add glow effect
    ctx.shadowColor = '#7A3BFF';
    ctx.shadowBlur = 20;
    
    ctx.fillText('BODY BAGZ', size.width / 2, size.height / 2);
    
    // Reset shadow
    ctx.shadowColor = 'transparent';
    ctx.shadowBlur = 0;
  }

  private static drawMemeText(
    ctx: CanvasRenderingContext2D, 
    text: string, 
    width: number, 
    y: number, 
    size: { width: number; height: number }
  ) {
    ctx.fillStyle = '#EDEEF0';
    ctx.strokeStyle = '#0A0A0B';
    ctx.font = `bold ${size.width * 0.08}px Arial Black, sans-serif`;
    ctx.textAlign = 'center';
    ctx.textBaseline = 'middle';
    ctx.lineWidth = 3;
    
    // Draw text outline
    ctx.strokeText(text, width / 2, y);
    // Draw text fill
    ctx.fillText(text, width / 2, y);
  }

  private static drawCyberpunkEffects(ctx: CanvasRenderingContext2D, size: { width: number; height: number }) {
    // Add scanning lines
    ctx.strokeStyle = 'rgba(57, 255, 20, 0.3)';
    ctx.lineWidth = 1;
    
    for (let i = 0; i < 10; i++) {
      const y = (i * size.height) / 10;
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(size.width, y);
      ctx.stroke();
    }
    
    // Add corner effects
    const gradient = ctx.createRadialGradient(0, 0, 0, 0, 0, 100);
    gradient.addColorStop(0, 'rgba(231, 53, 44, 0.4)');
    gradient.addColorStop(1, 'transparent');
    
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, 100, 100);
  }
}