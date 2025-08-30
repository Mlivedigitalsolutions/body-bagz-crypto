import type { Express } from "express";
import { createServer, type Server } from "http";

export async function registerRoutes(app: Express): Promise<Server> {
  // Tweet Generator API
  app.post("/api/generate-tweet", (req, res) => {
    const bullishTweets = [
      "Just bagged another mil in $BAGZ 💀 The villain era hits different when you're stacking chaos. NFA but this rocket's fueled by pure degeneracy 🚀",
      "While you're sleeping, $BAGZ holders are building an empire in the shadows. The chaos collective never rests 👤",
      "$BAGZ isn't just a token, it's a movement. For the culture, for the chaos, for the people who refuse to conform 🔥",
      "Zipped up another bag today. $BAGZ community growing stronger while the market bleeds. This is how villains win 💪",
      "The street chose $BAGZ. Underground vibes, premium gains. If you know, you know 🖤"
    ];
    
    const randomTweet = bullishTweets[Math.floor(Math.random() * bullishTweets.length)];
    res.json({ tweet: randomTweet });
  });

  // PFP Generator API
  app.post("/api/generate-pfp", async (req, res) => {
    try {
      const { prompt, name } = req.body;
      
      if (!prompt || !name) {
        return res.status(400).json({ error: 'Prompt and name are required' });
      }

      // Generate a unique cyberpunk PFP as SVG that can be downloaded
      const pfpSvg = `<svg width="512" height="512" viewBox="0 0 512 512" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="bgGrad" cx="50%" cy="30%" r="80%">
            <stop offset="0%" stop-color="#7A3BFF" stop-opacity="0.9"/>
            <stop offset="50%" stop-color="#0A0A0B" stop-opacity="1"/>
            <stop offset="100%" stop-color="#2A2B31" stop-opacity="1"/>
          </radialGradient>
          <linearGradient id="hoodGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stop-color="#E7352C" stop-opacity="0.9"/>
            <stop offset="50%" stop-color="#0A0A0B" stop-opacity="1"/>
            <stop offset="100%" stop-color="#39FF14" stop-opacity="0.7"/>
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Background -->
        <rect width="512" height="512" fill="url(#bgGrad)"/>
        
        <!-- Grid Pattern -->
        <defs>
          <pattern id="grid" width="32" height="32" patternUnits="userSpaceOnUse">
            <path d="M 32 0 L 0 0 0 32" fill="none" stroke="#E7352C" stroke-width="0.5" opacity="0.3"/>
          </pattern>
        </defs>
        <rect width="512" height="512" fill="url(#grid)"/>
        
        <!-- Hooded Figure Body -->
        <path d="M256 100 L150 180 L150 450 L362 450 L362 180 Z" fill="url(#hoodGrad)" stroke="#E7352C" stroke-width="4" filter="url(#glow)"/>
        
        <!-- Hood -->
        <path d="M256 100 L120 150 L120 280 L256 220 L392 280 L392 150 Z" fill="#0A0A0B" stroke="#39FF14" stroke-width="3"/>
        
        <!-- Inner Hood Shadow -->
        <path d="M256 110 L140 160 L140 260 L256 210 L372 260 L372 160 Z" fill="#111214" opacity="0.8"/>
        
        <!-- Face/Mask Area -->
        <ellipse cx="256" cy="250" rx="60" ry="80" fill="#2A2B31" stroke="#EDEEF0" stroke-width="3"/>
        
        <!-- Glowing Eyes -->
        <circle cx="235" cy="235" r="12" fill="#39FF14" filter="url(#glow)"/>
        <circle cx="277" cy="235" r="12" fill="#39FF14" filter="url(#glow)"/>
        <circle cx="235" cy="235" r="6" fill="#EDEEF0"/>
        <circle cx="277" cy="235" r="6" fill="#EDEEF0"/>
        
        <!-- Respirator/Filter -->
        <rect x="236" y="270" width="40" height="20" rx="10" fill="#7A3BFF" stroke="#39FF14" stroke-width="2"/>
        <rect x="246" y="275" width="6" height="10" fill="#39FF14"/>
        <rect x="260" y="275" width="6" height="10" fill="#39FF14"/>
        
        <!-- Chest Armor/Detail -->
        <rect x="200" y="350" width="112" height="80" rx="15" fill="#7A3BFF" stroke="#E7352C" stroke-width="2" opacity="0.8"/>
        <text x="256" y="395" text-anchor="middle" fill="#39FF14" font-family="monospace" font-size="16" font-weight="bold">$BAGZ</text>
        
        <!-- Shoulder Pads -->
        <polygon points="150,200 180,180 200,220 170,240" fill="#E7352C" stroke="#39FF14" stroke-width="2"/>
        <polygon points="362,200 332,180 312,220 342,240" fill="#E7352C" stroke="#39FF14" stroke-width="2"/>
        
        <!-- Glitch Effects -->
        <rect x="80" y="200" width="60" height="6" fill="#39FF14" opacity="0.8"/>
        <rect x="372" y="230" width="45" height="6" fill="#E7352C" opacity="0.9"/>
        <rect x="100" y="320" width="50" height="4" fill="#7A3BFF" opacity="0.7"/>
        <rect x="362" y="350" width="40" height="4" fill="#39FF14" opacity="0.6"/>
        
        <!-- Data Streams -->
        <rect x="20" y="150" width="3" height="200" fill="#39FF14" opacity="0.6">
          <animate attributeName="opacity" values="0.6;1;0.6" dur="2s" repeatCount="indefinite"/>
        </rect>
        <rect x="489" y="180" width="3" height="150" fill="#E7352C" opacity="0.7">
          <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite"/>
        </rect>
        
        <!-- ID Text -->
        <text x="256" y="490" text-anchor="middle" fill="#EDEEF0" font-family="monospace" font-size="14" font-weight="bold" opacity="0.8">${name.toUpperCase()}</text>
      </svg>`;
      
      // Convert SVG to base64 data URL
      const imageUrl = `data:image/svg+xml;base64,${Buffer.from(pfpSvg).toString('base64')}`;
      
      res.json({ imageUrl });
    } catch (error) {
      console.error('Error generating PFP:', error);
      res.status(500).json({ error: 'Failed to generate PFP' });
    }
  });

  // Trading Data API (Mock for now - replace with real DexScreener integration)
  app.get("/api/trading-data", (req, res) => {
    // Generate realistic fluctuating data
    const basePrice = 0.00042;
    const priceVariation = (Math.random() - 0.5) * 0.00001;
    const price = Math.max(0, basePrice + priceVariation);
    
    const data = {
      price: price.toFixed(6),
      marketCap: "2.1M",
      volume: "847K",
      priceChange: "+24.7%",
      marketCapChange: "+18.3%",
      volumeChange: "+67.2%",
      timestamp: new Date().toISOString()
    };
    
    res.json(data);
  });

  const httpServer = createServer(app);
  return httpServer;
}
