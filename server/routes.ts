import type { Express, Request, Response } from "express";
import { createServer, type Server } from "http";
import compression from "compression";
import { ImageGenerator } from "./imageGenerator";
import { storage } from "./storage";
import { insertUserSchema, insertLeaderboardEntrySchema } from "@shared/schema";
import { generateCyberpunkPFP, generateBullishTweet, generateMemeText } from "./openai";
import { 
  generalLimiter, 
  strictLimiter, 
  registrationLimiter, 
  securityMiddleware,
  validateRegistration,
  validateActionTracking,
  errorLogger,
  errorHandler
} from "./middleware/security";
import { cacheMiddleware, clearLeaderboardCache } from "./middleware/cache";

// Generate epic 3D cyberpunk villain PFP that matches Body Bagz brand
function generateCyberpunkVillainPFP(): string {
  const villainTypes = [
    'death-reaper', 'shadow-assassin', 'cyber-hunter', 'neon-phantom', 
    'chaos-lord', 'street-villain', 'dark-commander', 'toxic-warlord',
    'blood-operative', 'void-enforcer', 'cyber-demon', 'skull-emperor'
  ];
  
  const designTypes = ['epic-helmet', 'dimensional-mask', '3d-skull', 'power-armor', 'shadow-hood'];
  const backgroundColors = ['0A0A0A', '111214', '1A1A1A', '0D0D0D'];
  const primaryColors = ['E7352C', '39FF14', '7A3BFF', 'FF0040', '00FF88'];
  const metalColors = ['4A5568', '2D3748', '718096', 'A0AEC0'];
  const highlightColors = ['FFFFFF', 'F7FAFC', 'EDF2F7', 'E2E8F0'];
  
  const villainType = villainTypes[Math.floor(Math.random() * villainTypes.length)];
  const designType = designTypes[Math.floor(Math.random() * designTypes.length)];
  const bgColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
  const primaryColor = primaryColors[Math.floor(Math.random() * primaryColors.length)];
  const metalColor = metalColors[Math.floor(Math.random() * metalColors.length)];
  const highlightColor = highlightColors[Math.floor(Math.random() * highlightColors.length)];
  const timestamp = Date.now();
  const uniqueSeed = `${villainType}-${timestamp}`;
  
  let svgContent = '';
  
  if (designType === 'epic-helmet') {
    svgContent = `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- 3D Helmet Gradients -->
          <radialGradient id="helmet3D" cx="35%" cy="25%" r="80%">
            <stop offset="0%" style="stop-color:#${highlightColor};stop-opacity:0.8" />
            <stop offset="30%" style="stop-color:#${metalColor};stop-opacity:1" />
            <stop offset="70%" style="stop-color:#${bgColor};stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
          </radialGradient>
          
          <!-- Epic Visor with Depth -->
          <linearGradient id="visor3D" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#${highlightColor};stop-opacity:0.3" />
            <stop offset="20%" style="stop-color:#${primaryColor};stop-opacity:0.9" />
            <stop offset="80%" style="stop-color:#000000;stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:#${primaryColor};stop-opacity:0.4" />
          </linearGradient>
          
          <!-- 3D Shadow Filter -->
          <filter id="depth3D" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="3" dy="6" stdDeviation="4" flood-color="#000000" flood-opacity="0.8"/>
            <feDropShadow dx="-2" dy="-2" stdDeviation="2" flood-color="#${highlightColor}" flood-opacity="0.3"/>
          </filter>
          
          <!-- Epic Glow Effect -->
          <filter id="epicGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Dramatic Background with Depth -->
        <rect width="400" height="400" fill="#${bgColor}"/>
        <ellipse cx="200" cy="200" rx="150" ry="150" fill="#000000" opacity="0.3"/>
        
        <!-- Main 3D Helmet Structure -->
        <path d="M 200 60 Q 270 75 280 150 Q 280 190 250 220 L 200 240 L 150 220 Q 120 190 120 150 Q 130 75 200 60 Z" 
              fill="url(#helmet3D)" filter="url(#depth3D)" stroke="#${metalColor}" stroke-width="3"/>
        
        <!-- Epic Angular Visor with 3D Depth -->
        <path d="M 140 130 Q 200 115 260 130 Q 255 165 200 170 Q 145 165 140 130 Z" 
              fill="url(#visor3D)" filter="url(#epicGlow)"/>
        
        <!-- 3D Side Armor Panels -->
        <ellipse cx="110" cy="160" rx="20" ry="50" fill="#${metalColor}" opacity="0.9" filter="url(#depth3D)"/>
        <ellipse cx="290" cy="160" rx="20" ry="50" fill="#${metalColor}" opacity="0.9" filter="url(#depth3D)"/>
        
        <!-- Epic Tech Details with Highlights -->
        <circle cx="130" cy="140" r="8" fill="#${primaryColor}" opacity="0.9" filter="url(#epicGlow)"/>
        <circle cx="270" cy="140" r="8" fill="#${primaryColor}" opacity="0.9" filter="url(#epicGlow)"/>
        <circle cx="128" cy="137" r="3" fill="#${highlightColor}" opacity="0.8"/>
        <circle cx="268" cy="137" r="3" fill="#${highlightColor}" opacity="0.8"/>
        
        <!-- 3D Neck Guard -->
        <ellipse cx="200" cy="240" rx="40" ry="15" fill="#${metalColor}" filter="url(#depth3D)"/>
        <ellipse cx="200" cy="237" rx="35" ry="12" fill="#${highlightColor}" opacity="0.2"/>
        
        <!-- Epic Circuit Patterns -->
        <path d="M 120 100 Q 200 90 280 100" stroke="#${primaryColor}" stroke-width="3" opacity="0.8" filter="url(#epicGlow)"/>
        <circle cx="200" cy="95" r="4" fill="#${primaryColor}" filter="url(#epicGlow)"/>
        
        <!-- Villain Power Core -->
        <circle cx="200" cy="150" r="12" fill="#${primaryColor}" opacity="0.4"/>
        <circle cx="200" cy="150" r="6" fill="#${primaryColor}" filter="url(#epicGlow)"/>
        <circle cx="198" cy="147" r="3" fill="#${highlightColor}" opacity="0.9"/>
      </svg>
    `;
  } else if (designType === 'dimensional-mask') {
    svgContent = `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Epic 3D Mask Gradient -->
          <radialGradient id="mask3D" cx="30%" cy="30%" r="90%">
            <stop offset="0%" style="stop-color:#${highlightColor};stop-opacity:0.9" />
            <stop offset="25%" style="stop-color:#${metalColor};stop-opacity:1" />
            <stop offset="75%" style="stop-color:#${bgColor};stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
          </radialGradient>
          
          <!-- Dimensional Visor with Epic Shine -->
          <linearGradient id="dimensionalVisor" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#${highlightColor};stop-opacity:0.4" />
            <stop offset="30%" style="stop-color:#${primaryColor};stop-opacity:1" />
            <stop offset="70%" style="stop-color:#000000;stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:#${primaryColor};stop-opacity:0.6" />
          </linearGradient>
          
          <!-- Epic 3D Filter -->
          <filter id="epic3D" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="4" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.9"/>
            <feDropShadow dx="-3" dy="-3" stdDeviation="3" flood-color="#${highlightColor}" flood-opacity="0.4"/>
          </filter>
          
          <!-- Dimensional Glow -->
          <filter id="dimensionalGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Epic Background -->
        <rect width="400" height="400" fill="#${bgColor}"/>
        <ellipse cx="200" cy="200" rx="180" ry="180" fill="#000000" opacity="0.4"/>
        
        <!-- Main 3D Mask Structure -->
        <ellipse cx="200" cy="180" rx="90" ry="70" fill="url(#mask3D)" filter="url(#epic3D)" stroke="#${metalColor}" stroke-width="4"/>
        
        <!-- Epic Dimensional Visor -->
        <ellipse cx="200" cy="170" rx="75" ry="30" fill="url(#dimensionalVisor)" filter="url(#dimensionalGlow)"/>
        <ellipse cx="200" cy="168" rx="70" ry="25" fill="#${highlightColor}" opacity="0.1"/>
        
        <!-- 3D Side Vents -->
        <ellipse cx="90" cy="170" rx="12" ry="8" fill="#${primaryColor}" opacity="0.9" filter="url(#dimensionalGlow)"/>
        <ellipse cx="90" cy="185" rx="12" ry="8" fill="#${primaryColor}" opacity="0.9" filter="url(#dimensionalGlow)"/>
        <ellipse cx="310" cy="170" rx="12" ry="8" fill="#${primaryColor}" opacity="0.9" filter="url(#dimensionalGlow)"/>
        <ellipse cx="310" cy="185" rx="12" ry="8" fill="#${primaryColor}" opacity="0.9" filter="url(#dimensionalGlow)"/>
        
        <!-- Epic Central HUD -->
        <circle cx="200" cy="170" r="15" fill="#${primaryColor}" opacity="0.3"/>
        <circle cx="200" cy="170" r="8" fill="#${primaryColor}" filter="url(#dimensionalGlow)"/>
        <circle cx="197" cy="167" r="4" fill="#${highlightColor}" opacity="0.9"/>
        
        <!-- 3D Jaw Mechanism -->
        <path d="M 140 210 Q 200 235 260 210 Q 255 225 200 240 Q 145 225 140 210 Z" 
              fill="#${metalColor}" filter="url(#epic3D)" stroke="#${primaryColor}" stroke-width="2"/>
        <path d="M 150 215 Q 200 225 250 215" stroke="#${highlightColor}" stroke-width="2" opacity="0.6"/>
        
        <!-- Epic Tech Panels -->
        <rect x="120" y="140" width="15" height="8" rx="4" fill="#${primaryColor}" opacity="0.8" filter="url(#dimensionalGlow)"/>
        <rect x="265" y="140" width="15" height="8" rx="4" fill="#${primaryColor}" opacity="0.8" filter="url(#dimensionalGlow)"/>
        
        <!-- 3D Power Conduits -->
        <path d="M 130 120 Q 150 115 170 120" stroke="#${primaryColor}" stroke-width="3" opacity="0.8" filter="url(#dimensionalGlow)"/>
        <path d="M 230 120 Q 250 115 270 120" stroke="#${primaryColor}" stroke-width="3" opacity="0.8" filter="url(#dimensionalGlow)"/>
      </svg>
    `;
  } else if (designType === '3d-skull') {
    svgContent = `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Epic 3D Skull Gradient -->
          <radialGradient id="skull3D" cx="35%" cy="20%" r="85%">
            <stop offset="0%" style="stop-color:#${highlightColor};stop-opacity:0.7" />
            <stop offset="20%" style="stop-color:#${metalColor};stop-opacity:1" />
            <stop offset="60%" style="stop-color:#${bgColor};stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
          </radialGradient>
          
          <!-- Death Glow Effect -->
          <filter id="deathGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <!-- Epic 3D Depth -->
          <filter id="skull3DDepth" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="5" dy="10" stdDeviation="8" flood-color="#000000" flood-opacity="0.9"/>
            <feDropShadow dx="-4" dy="-4" stdDeviation="4" flood-color="#${highlightColor}" flood-opacity="0.3"/>
          </filter>
        </defs>
        
        <!-- Epic Death Background -->
        <rect width="400" height="400" fill="#${bgColor}"/>
        <ellipse cx="200" cy="200" rx="160" ry="160" fill="#000000" opacity="0.5"/>
        
        <!-- Main 3D Skull Structure -->
        <path d="M 200 70 Q 270 85 285 160 Q 285 220 250 250 L 200 270 L 150 250 Q 115 220 115 160 Q 130 85 200 70 Z" 
              fill="url(#skull3D)" filter="url(#skull3DDepth)" stroke="#${metalColor}" stroke-width="4"/>
        
        <!-- Epic Eye Sockets with 3D Depth -->
        <ellipse cx="170" cy="150" rx="25" ry="30" fill="#000000" filter="url(#skull3DDepth)"/>
        <ellipse cx="230" cy="150" rx="25" ry="30" fill="#000000" filter="url(#skull3DDepth)"/>
        <ellipse cx="170" cy="150" rx="15" ry="20" fill="#${primaryColor}" filter="url(#deathGlow)"/>
        <ellipse cx="230" cy="150" rx="15" ry="20" fill="#${primaryColor}" filter="url(#deathGlow)"/>
        <ellipse cx="168" cy="145" rx="8" ry="10" fill="#${highlightColor}" opacity="0.8"/>
        <ellipse cx="228" cy="145" rx="8" ry="10" fill="#${highlightColor}" opacity="0.8"/>
        
        <!-- 3D Nasal Cavity -->
        <path d="M 200 170 L 185 190 L 200 220 L 215 190 Z" fill="#000000" filter="url(#skull3DDepth)"/>
        <rect x="196" y="180" width="8" height="30" fill="#${primaryColor}" opacity="0.6" filter="url(#deathGlow)"/>
        
        <!-- Epic Jaw Mechanism -->
        <path d="M 160 230 Q 200 260 240 230 Q 235 245 200 270 Q 165 245 160 230 Z" 
              fill="#${metalColor}" filter="url(#skull3DDepth)" stroke="#${primaryColor}" stroke-width="3"/>
        <path d="M 170 235 Q 200 250 230 235" stroke="#${highlightColor}" stroke-width="3" opacity="0.6"/>
        
        <!-- 3D Tech Implants -->
        <rect x="130" y="120" width="20" height="15" rx="4" fill="#${primaryColor}" opacity="0.9" filter="url(#deathGlow)"/>
        <rect x="250" y="120" width="20" height="15" rx="4" fill="#${primaryColor}" opacity="0.9" filter="url(#deathGlow)"/>
        <rect x="133" y="123" width="14" height="9" rx="2" fill="#${highlightColor}" opacity="0.4"/>
        <rect x="253" y="123" width="14" height="9" rx="2" fill="#${highlightColor}" opacity="0.4"/>
        
        <!-- Epic Circuit Crown -->
        <path d="M 150 90 Q 200 80 250 90" stroke="#${primaryColor}" stroke-width="4" opacity="0.9" filter="url(#deathGlow)"/>
        <circle cx="170" cy="88" r="5" fill="#${primaryColor}" filter="url(#deathGlow)"/>
        <circle cx="200" cy="85" r="6" fill="#${primaryColor}" filter="url(#deathGlow)"/>
        <circle cx="230" cy="88" r="5" fill="#${primaryColor}" filter="url(#deathGlow)"/>
        <circle cx="168" cy="85" r="2" fill="#${highlightColor}" opacity="0.9"/>
        <circle cx="197" cy="82" r="3" fill="#${highlightColor}" opacity="0.9"/>
        <circle cx="227" cy="85" r="2" fill="#${highlightColor}" opacity="0.9"/>
        
        <!-- Death Vents -->
        <rect x="180" y="255" width="8" height="15" fill="#${primaryColor}" opacity="0.8" filter="url(#deathGlow)"/>
        <rect x="195" y="255" width="8" height="15" fill="#${primaryColor}" opacity="0.8" filter="url(#deathGlow)"/>
        <rect x="210" y="255" width="8" height="15" fill="#${primaryColor}" opacity="0.8" filter="url(#deathGlow)"/>
      </svg>
    `;
  } else if (designType === 'power-armor') {
    svgContent = `
      <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="armorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#${metalColor};stop-opacity:1" />
            <stop offset="50%" style="stop-color:#${bgColor};stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#${metalColor};stop-opacity:1" />
          </linearGradient>
          <filter id="techGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Background -->
        <rect width="300" height="300" fill="#${bgColor}"/>
        
        <!-- Main armor helmet -->
        <rect x="100" y="70" width="100" height="90" rx="20" fill="url(#armorGrad)" stroke="#${primaryColor}" stroke-width="2"/>
        
        <!-- Face plate -->
        <rect x="110" y="90" width="80" height="50" rx="10" fill="#000000" opacity="0.9"/>
        
        <!-- HUD visor strips -->
        <rect x="115" y="100" width="70" height="6" fill="#${primaryColor}" opacity="0.8" filter="url(#techGlow)"/>
        <rect x="115" y="115" width="70" height="4" fill="#${primaryColor}" opacity="0.6"/>
        <rect x="115" y="125" width="70" height="4" fill="#${primaryColor}" opacity="0.6"/>
        
        <!-- Side armor plates -->
        <rect x="80" y="95" width="20" height="35" rx="5" fill="#${metalColor}"/>
        <rect x="200" y="95" width="20" height="35" rx="5" fill="#${metalColor}"/>
        
        <!-- Shoulder connections -->
        <circle cx="90" cy="145" r="12" fill="#${metalColor}" stroke="#${primaryColor}" stroke-width="2"/>
        <circle cx="210" cy="145" r="12" fill="#${metalColor}" stroke="#${primaryColor}" stroke-width="2"/>
        
        <!-- Central power core -->
        <circle cx="150" cy="115" r="6" fill="#${primaryColor}" opacity="0.3"/>
        <circle cx="150" cy="115" r="3" fill="#${primaryColor}" filter="url(#techGlow)"/>
        
        <!-- Tech panels -->
        <rect x="85" y="110" width="8" height="15" fill="#${primaryColor}" opacity="0.7"/>
        <rect x="207" y="110" width="8" height="15" fill="#${primaryColor}" opacity="0.7"/>
        
        <!-- Neck guard -->
        <rect x="125" y="160" width="50" height="15" rx="7" fill="#${metalColor}"/>
        
        <!-- Data lines -->
        <line x1="110" y1="80" x2="130" y2="85" stroke="#${primaryColor}" stroke-width="2" opacity="0.6"/>
        <line x1="170" y1="85" x2="190" y2="80" stroke="#${primaryColor}" stroke-width="2" opacity="0.6"/>
        
        <!-- Status indicators -->
        <rect x="180" y="105" width="3" height="3" fill="#${primaryColor}" opacity="0.9"/>
        <rect x="180" y="112" width="3" height="3" fill="#${primaryColor}" opacity="0.7"/>
        <rect x="180" y="119" width="3" height="3" fill="#${primaryColor}" opacity="0.5"/>
      </svg>
    `;
  } else { // shadow-hood
    svgContent = `
      <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="hoodGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" style="stop-color:#${metalColor};stop-opacity:0.9" />
            <stop offset="70%" style="stop-color:#${bgColor};stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
          </radialGradient>
          <filter id="shadowGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Background -->
        <rect width="300" height="300" fill="#${bgColor}"/>
        
        <!-- Hood outline -->
        <path d="M 150 40 Q 220 60 230 130 Q 230 170 200 190 L 150 200 L 100 190 Q 70 170 70 130 Q 80 60 150 40 Z" 
              fill="url(#hoodGrad)" stroke="#${primaryColor}" stroke-width="1" opacity="0.9"/>
        
        <!-- Inner shadow -->
        <ellipse cx="150" cy="120" rx="50" ry="60" fill="#000000" opacity="0.7"/>
        
        <!-- Glowing eyes -->
        <ellipse cx="130" cy="110" rx="8" ry="12" fill="#${primaryColor}" filter="url(#shadowGlow)"/>
        <ellipse cx="170" cy="110" rx="8" ry="12" fill="#${primaryColor}" filter="url(#shadowGlow)"/>
        
        <!-- Face covering -->
        <path d="M 120 130 Q 150 145 180 130 Q 175 150 150 155 Q 125 150 120 130 Z" 
              fill="#${metalColor}" opacity="0.6"/>
        
        <!-- Hood tech details -->
        <rect x="85" y="100" width="15" height="4" fill="#${primaryColor}" opacity="0.7"/>
        <rect x="200" y="100" width="15" height="4" fill="#${primaryColor}" opacity="0.7"/>
        
        <!-- Seam lines -->
        <path d="M 110 70 Q 150 65 190 70" stroke="#${primaryColor}" stroke-width="1" opacity="0.5"/>
        <path d="M 100 100 Q 150 95 200 100" stroke="#${primaryColor}" stroke-width="1" opacity="0.4"/>
        
        <!-- Neck piece -->
        <rect x="135" y="180" width="30" height="20" rx="5" fill="#${metalColor}"/>
        
        <!-- Power cells -->
        <circle cx="105" cy="140" r="4" fill="#${primaryColor}" opacity="0.8"/>
        <circle cx="195" cy="140" r="4" fill="#${primaryColor}" opacity="0.8"/>
        
        <!-- Breathing apparatus -->
        <ellipse cx="150" cy="140" rx="12" ry="8" fill="#${metalColor}" stroke="#${primaryColor}" stroke-width="1"/>
        <rect x="147" y="137" width="6" height="6" fill="#${primaryColor}" opacity="0.6"/>
      </svg>
    `;
  }
  
  // Convert to data URL
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
  return dataUrl;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Trust proxy for rate limiting
  app.set('trust proxy', 1);
  
  // Apply security middleware
  app.use(compression());
  app.use(securityMiddleware);
  app.use(generalLimiter);
  app.use(errorLogger);
  
  // AI-powered Tweet Generator API with rate limiting and caching
  app.post("/api/generate-tweet", strictLimiter, cacheMiddleware('tweets', 300), async (req, res) => {
    try {
      const { userId } = req.body;
      
      let tweet;
      // Try AI generation first
      try {
        tweet = await generateBullishTweet();
      } catch (aiError) {
        console.error('AI tweet generation failed, using fallback:', aiError);
        // Enhanced fallback tweets with more variety and hashtags
        const bullishTweets = [
          "The streets chose $BAGZ for a reason 🔥 Villain era never ends #BAGZ #CryptoVillain #StreetSmart #ChaosProfit #UndergroundGains",
          "Underground movement going mainstream 📈 $BAGZ holders eating good tonight #BAGZ #VillainEra #CyberGains #UndergroundKing #StreetCode",
          "When chaos becomes profitable, you know it's $BAGZ season ⚡💀 #BAGZ #ChaosEconomy #StreetCode #VillainMode #CryptoRebel",
          "Cyberpunk aesthetic, real world gains 🖤💚 $BAGZ revolutionizing the game #BAGZ #CyberStreet #FutureWealth #NeonProfit #TechRebel",
          "Body bags stacking, portfolio packing 💰 $BAGZ community built different #BAGZ #VillainGains #StreetSmart #ChaosMode #UndergroundWins",
          "The algorithm chose violence, we chose $BAGZ 🏴‍☠️ #BAGZ #DigitalVillain #CryptoAnarchy #StreetWins #ChaosTheory"
        ];
        tweet = bullishTweets[Math.floor(Math.random() * bullishTweets.length)];
      }
      
      // Track tweet generation action if userId provided
      if (userId) {
        try {
          const now = new Date();
          const estDate = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
          const monthYear = `${estDate.getFullYear()}-${String(estDate.getMonth() + 1).padStart(2, '0')}`;
          
          await storage.addLeaderboardEntry({
            userId,
            actionType: 'tweet',
            points: 5,
            monthYear
          });
        } catch (trackError) {
          console.error('Error tracking tweet action:', trackError);
        }
      }
      
      res.json({ tweet });
    } catch (error) {
      console.error('Error generating tweet:', error);
      res.status(500).json({ error: 'Failed to generate tweet' });
    }
  });

  // AI-powered PFP Generator API - Creates unique cyberpunk images
  app.post("/api/generate-pfp", strictLimiter, async (req, res) => {
    try {
      const { prompt, name, userId } = req.body;
      
      let imageUrl;
      // Try AI generation first
      try {
        imageUrl = await generateCyberpunkPFP();
      } catch (aiError) {
        console.error('AI PFP generation failed, using fallback:', aiError);
        
        // Body Bagz cyberpunk villain PFP fallback  
        imageUrl = generateCyberpunkVillainPFP();
        console.log('Generated custom cyberpunk villain PFP');
      }
      
      // Track PFP download action if userId provided
      if (userId) {
        try {
          const now = new Date();
          const estDate = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
          const monthYear = `${estDate.getFullYear()}-${String(estDate.getMonth() + 1).padStart(2, '0')}`;
          
          await storage.addLeaderboardEntry({
            userId,
            actionType: 'pfp_download',
            points: 3,
            monthYear
          });
        } catch (trackError) {
          console.error('Error tracking PFP action:', trackError);
        }
      }
      
      // Return both the image URL and download information
      res.json({ 
        imageUrl,
        downloadUrl: imageUrl,
        filename: `bagz_pfp_${Date.now()}.png`
      });
    } catch (error) {
      console.error('Error generating PFP:', error);
      res.status(500).json({ error: 'Failed to generate PFP' });
    }
  });

  // AI-enhanced Meme Generator API - Creates actual downloadable memes
  app.post("/api/generate-meme", generalLimiter, async (req, res) => {
    try {
      const { topText, bottomText, userId, baseImage } = req.body;
      
      let memeText = { topText: topText || '', bottomText: bottomText || '' };
      
      // If no text provided, use AI to generate it
      if (!topText && !bottomText) {
        try {
          memeText = await generateMemeText();
        } catch (aiError) {
          console.error('AI meme text generation failed, using fallback:', aiError);
          const fallbackTexts = [
            { topText: "WHEN YOU HOLD $BAGZ", bottomText: "VILLAIN MODE ACTIVATED" },
            { topText: "CHAOS IS PROFITABLE", bottomText: "$BAGZ DELIVERING" },
            { topText: "UNDERGROUND MOVEMENT", bottomText: "MAINSTREAM GAINS" },
            { topText: "CYBERPUNK VIBES", bottomText: "REAL WORLD PROFITS" }
          ];
          memeText = fallbackTexts[Math.floor(Math.random() * fallbackTexts.length)];
        }
      }

      const imageUrl = await ImageGenerator.generateMeme({
        topText: memeText.topText,
        bottomText: memeText.bottomText,
        size: { width: 800, height: 600 },
        baseImage
      });
      
      // Track meme creation action if userId provided
      if (userId) {
        try {
          const now = new Date();
          const estDate = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
          const monthYear = `${estDate.getFullYear()}-${String(estDate.getMonth() + 1).padStart(2, '0')}`;
          
          await storage.addLeaderboardEntry({
            userId,
            actionType: 'meme_creation',
            points: 4,
            monthYear
          });
        } catch (trackError) {
          console.error('Error tracking meme action:', trackError);
        }
      }
      
      // Return both the image URL and download information
      res.json({ 
        imageUrl,
        downloadUrl: imageUrl,
        filename: `bagz_meme_${Date.now()}.png`
      });
    } catch (error) {
      console.error('Error generating meme:', error);
      res.status(500).json({ error: 'Failed to generate meme' });
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

  // === LEADERBOARD SYSTEM APIs ===
  
  // User registration/profile management
  app.post("/api/users/register", registrationLimiter, validateRegistration, async (req: Request, res: Response) => {
    try {
      const validData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(validData.username);
      
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
      
      const user = await storage.createUser(validData);
      res.json({ user: { id: user.id, username: user.username, xUsername: user.xUsername, telegramUsername: user.telegramUsername, solanaWallet: user.solanaWallet } });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({ error: "Invalid registration data" });
    }
  });
  
  app.get("/api/users/:username", async (req, res) => {
    try {
      const user = await storage.getUserByUsername(req.params.username);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ user: { id: user.id, username: user.username, xUsername: user.xUsername, telegramUsername: user.telegramUsername, solanaWallet: user.solanaWallet } });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });
  
  app.put("/api/users/:id/profile", async (req, res) => {
    try {
      const { xUsername, telegramUsername, solanaWallet } = req.body;
      const user = await storage.updateUser(req.params.id, {
        xUsername,
        telegramUsername,
        solanaWallet
      });
      res.json({ user: { id: user.id, username: user.username, xUsername: user.xUsername, telegramUsername: user.telegramUsername, solanaWallet: user.solanaWallet } });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });
  
  // Saved content endpoints
  app.post("/api/users/:userId/content", strictLimiter, async (req, res) => {
    try {
      const { userId } = req.params;
      const { contentType, title, content, metadata } = req.body;
      
      if (!contentType || !title || !content) {
        return res.status(400).json({ error: "contentType, title, and content are required" });
      }
      
      const savedItem = await storage.saveContent({
        userId,
        contentType,
        title,
        content,
        metadata: metadata || {},
        isFavorite: false
      });
      
      res.json({ savedContent: savedItem });
    } catch (error) {
      console.error('Error saving content:', error);
      res.status(500).json({ error: "Failed to save content" });
    }
  });
  
  app.get("/api/users/:userId/content", async (req, res) => {
    try {
      const { userId } = req.params;
      const { type, favorites } = req.query;
      
      let content;
      if (favorites === 'true') {
        content = await storage.getUserFavorites(userId);
      } else {
        content = await storage.getUserSavedContent(userId, type as string);
      }
      
      res.json({ content });
    } catch (error) {
      console.error('Error fetching user content:', error);
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });
  
  app.patch("/api/users/:userId/content/:contentId/favorite", async (req, res) => {
    try {
      const { contentId } = req.params;
      const { isFavorite } = req.body;
      
      const updated = await storage.toggleContentFavorite(contentId, isFavorite);
      res.json({ savedContent: updated });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      res.status(500).json({ error: "Failed to update favorite status" });
    }
  });
  
  app.delete("/api/users/:userId/content/:contentId", async (req, res) => {
    try {
      const { userId, contentId } = req.params;
      
      await storage.deleteUserContent(contentId, userId);
      res.json({ message: "Content deleted successfully" });
    } catch (error) {
      console.error('Error deleting content:', error);
      res.status(500).json({ error: "Failed to delete content" });
    }
  });
  
  // User preferences endpoints
  app.get("/api/users/:userId/preferences", async (req, res) => {
    try {
      const { userId } = req.params;
      
      let preferences = await storage.getUserPreferences(userId);
      
      // Create default preferences if none exist
      if (!preferences) {
        preferences = await storage.createUserPreferences({
          userId,
          autoSaveContent: true,
          defaultPfpStyle: "cyberpunk",
          preferredTweetTone: "bullish",
          notifications: {
            newContent: true,
            leaderboard: true,
            rewards: true
          },
          theme: "cyberpunk"
        });
      }
      
      res.json({ preferences });
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      res.status(500).json({ error: "Failed to fetch preferences" });
    }
  });
  
  app.put("/api/users/:userId/preferences", async (req, res) => {
    try {
      const { userId } = req.params;
      const updates = req.body;
      
      const preferences = await storage.updateUserPreferences(userId, updates);
      res.json({ preferences });
    } catch (error) {
      console.error('Error updating user preferences:', error);
      res.status(500).json({ error: "Failed to update preferences" });
    }
  });
  
  // Action tracking endpoints
  app.post("/api/actions/track", strictLimiter, validateActionTracking, async (req: Request, res: Response) => {
    try {
      const { userId, actionType } = req.body;
      
      if (!userId || !actionType) {
        return res.status(400).json({ error: "userId and actionType are required" });
      }
      
      // Get current month-year in EST
      const now = new Date();
      const estDate = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
      const monthYear = `${estDate.getFullYear()}-${String(estDate.getMonth() + 1).padStart(2, '0')}`;
      
      // Set points based on action type
      const pointsMap: Record<string, number> = {
        'tweet': 5,
        'pfp_download': 3, 
        'meme_creation': 4,
        'meme_share': 6
      };
      
      const points = pointsMap[actionType] || 1;
      
      const entry = await storage.addLeaderboardEntry({
        userId,
        actionType,
        points,
        monthYear
      });
      
      res.json({ entry, points });
    } catch (error) {
      console.error('Error tracking action:', error);
      res.status(500).json({ error: "Failed to track action" });
    }
  });
  
  // Leaderboard endpoints
  app.get("/api/leaderboard", cacheMiddleware('leaderboard', 30), async (req, res) => {
    try {
      // Get current month-year in EST or from query
      const now = new Date();
      const estDate = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
      const currentMonthYear = `${estDate.getFullYear()}-${String(estDate.getMonth() + 1).padStart(2, '0')}`;
      const monthYear = (req.query.month as string) || currentMonthYear;
      
      const leaderboard = await storage.getLeaderboard(monthYear);
      res.json({ leaderboard, monthYear });
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });
  
  app.get("/api/users/:userId/stats", async (req, res) => {
    try {
      const { userId } = req.params;
      const now = new Date();
      const estDate = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
      const currentMonthYear = `${estDate.getFullYear()}-${String(estDate.getMonth() + 1).padStart(2, '0')}`;
      const monthYear = (req.query.month as string) || currentMonthYear;
      
      const stats = await storage.getUserMonthlyStats(userId, monthYear);
      res.json({ stats, monthYear });
    } catch (error) {
      console.error('Error fetching user stats:', error);
      res.status(500).json({ error: "Failed to fetch user stats" });
    }
  });
  
  // Monthly rewards endpoint
  app.get("/api/rewards/:monthYear", async (req, res) => {
    try {
      const { monthYear } = req.params;
      const rewards = await storage.getMonthlyRewards(monthYear);
      res.json({ rewards });
    } catch (error) {
      console.error('Error fetching rewards:', error);
      res.status(500).json({ error: "Failed to fetch rewards" });
    }
  });
  
  app.get("/api/users/:userId/rewards", async (req, res) => {
    try {
      const { userId } = req.params;
      const rewards = await storage.getUserRewards(userId);
      res.json({ rewards });
    } catch (error) {
      console.error('Error fetching user rewards:', error);
      res.status(500).json({ error: "Failed to fetch user rewards" });
    }
  });
  
  // Generate monthly rewards (manual trigger for now - could be automated)
  app.post("/api/admin/generate-rewards/:monthYear", async (req: Request, res: Response) => {
    try {
      const { monthYear } = req.params;
      
      // Get leaderboard for the month
      const leaderboard = await storage.getLeaderboard(monthYear);
      
      if (leaderboard.length === 0) {
        return res.json({ message: "No participants for this month" });
      }
      
      // Check if rewards already exist for this month
      const existingRewards = await storage.getMonthlyRewards(monthYear);
      if (existingRewards.length > 0) {
        return res.status(400).json({ error: "Rewards already generated for this month" });
      }
      
      // Define reward structure
      const rewardStructure = [
        { position: 1, tokens: 5000 },
        { position: 2, tokens: 3000 },
        { position: 3, tokens: 2000 },
        { position: 4, tokens: 1000 },
        { position: 5, tokens: 1000 },
        { position: 6, tokens: 1000 },
        { position: 7, tokens: 1000 },
        { position: 8, tokens: 1000 },
        { position: 9, tokens: 1000 },
        { position: 10, tokens: 1000 },
      ];
      
      // Generate rewards for top 10
      const generatedRewards = [];
      for (const reward of rewardStructure) {
        if (leaderboard[reward.position - 1]) {
          const entry = leaderboard[reward.position - 1];
          const monthlyReward = await storage.createMonthlyReward({
            userId: entry.user.id,
            monthYear,
            position: reward.position,
            tokenReward: reward.tokens
          });
          generatedRewards.push({ ...monthlyReward, user: entry.user });
        }
      }
      
      res.json({ 
        message: `Generated ${generatedRewards.length} rewards for ${monthYear}`,
        rewards: generatedRewards 
      });
    } catch (error) {
      console.error('Error generating rewards:', error);
      res.status(500).json({ error: "Failed to generate rewards" });
    }
  });
  
  // Analytics endpoint for privacy-focused tracking
  app.post("/api/analytics", async (req: Request, res: Response) => {
    try {
      const { events } = req.body;
      
      // In production, you might want to store these events
      // For now, we'll just log them for development
      if (process.env.NODE_ENV === 'development' && events && events.length > 0) {
        console.log('Analytics events received:', events.length);
        events.forEach((event: any) => {
          console.log(`[Analytics] ${event.event}:`, event.properties);
        });
      }
      
      res.json({ received: events?.length || 0 });
    } catch (error) {
      console.error('Analytics error:', error);
      res.status(200).json({ received: 0 }); // Always return success for analytics
    }
  });
  
  // Get current month info and check if new month (for frontend to show reset notification)
  app.get("/api/month-info", async (req, res) => {
    try {
      const now = new Date();
      const estDate = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
      const currentMonthYear = `${estDate.getFullYear()}-${String(estDate.getMonth() + 1).padStart(2, '0')}`;
      const isFirstOfMonth = estDate.getDate() === 1;
      
      // Get last month for comparison
      const lastMonth = new Date(estDate.getFullYear(), estDate.getMonth() - 1, 1);
      const lastMonthYear = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
      
      res.json({
        currentMonthYear,
        lastMonthYear,
        isFirstOfMonth,
        currentDate: estDate.toISOString(),
        nextResetDate: new Date(estDate.getFullYear(), estDate.getMonth() + 1, 1).toISOString()
      });
    } catch (error) {
      console.error('Error fetching month info:', error);
      res.status(500).json({ error: "Failed to fetch month info" });
    }
  });

  // Add error handler at the end
  app.use(errorHandler);
  
  const httpServer = createServer(app);
  return httpServer;
}
