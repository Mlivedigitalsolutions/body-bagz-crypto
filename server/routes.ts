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

// Generate high-quality cyberpunk villain PFP that matches Body Bagz brand
function generateCyberpunkVillainPFP(): string {
  const villainTypes = [
    'death-reaper', 'shadow-assassin', 'cyber-hunter', 'neon-phantom', 
    'chaos-lord', 'street-villain', 'dark-commander', 'toxic-warlord',
    'blood-operative', 'void-enforcer', 'cyber-demon', 'skull-emperor'
  ];
  
  const designTypes = ['angular-helmet', 'visor-mask', 'cyber-skull', 'tech-armor', 'stealth-hood'];
  const backgroundColors = ['0A0A0A', '111214', '1A1A1A', '0D0D0D'];
  const primaryColors = ['E7352C', '39FF14', '7A3BFF', 'FF0040', '00FF88'];
  const metalColors = ['4A5568', '2D3748', '718096', 'A0AEC0'];
  
  const villainType = villainTypes[Math.floor(Math.random() * villainTypes.length)];
  const designType = designTypes[Math.floor(Math.random() * designTypes.length)];
  const bgColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
  const primaryColor = primaryColors[Math.floor(Math.random() * primaryColors.length)];
  const metalColor = metalColors[Math.floor(Math.random() * metalColors.length)];
  const timestamp = Date.now();
  const uniqueSeed = `${villainType}-${timestamp}`;
  
  let svgContent = '';
  
  if (designType === 'angular-helmet') {
    svgContent = `
      <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="helmetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#${metalColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:#${bgColor};stop-opacity:1" />
          </linearGradient>
          <linearGradient id="visorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#${primaryColor};stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:#000000;stop-opacity:0.8" />
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
        <rect width="300" height="300" fill="#${bgColor}"/>
        
        <!-- Main helmet structure -->
        <polygon points="150,50 200,90 200,140 180,160 150,170 120,160 100,140 100,90" 
                 fill="url(#helmetGrad)" stroke="#${primaryColor}" stroke-width="2"/>
        
        <!-- Angular visor -->
        <polygon points="120,100 180,100 175,130 125,130" 
                 fill="url(#visorGrad)" filter="url(#glow)"/>
        
        <!-- Side panels -->
        <rect x="85" y="110" width="15" height="40" fill="#${metalColor}" opacity="0.8"/>
        <rect x="200" y="110" width="15" height="40" fill="#${metalColor}" opacity="0.8"/>
        
        <!-- Tech details -->
        <circle cx="110" cy="120" r="4" fill="#${primaryColor}" opacity="0.7"/>
        <circle cx="190" cy="120" r="4" fill="#${primaryColor}" opacity="0.7"/>
        
        <!-- Neck armor -->
        <rect x="130" y="170" width="40" height="20" rx="5" fill="#${metalColor}"/>
        
        <!-- Circuit patterns -->
        <line x1="100" y1="95" x2="120" y2="95" stroke="#${primaryColor}" stroke-width="1" opacity="0.6"/>
        <line x1="180" y1="95" x2="200" y2="95" stroke="#${primaryColor}" stroke-width="1" opacity="0.6"/>
        <line x1="140" y1="75" x2="160" y2="75" stroke="#${primaryColor}" stroke-width="2" opacity="0.8"/>
        
        <!-- Villain identifier -->
        <rect x="140" y="140" width="20" height="4" fill="#${primaryColor}" opacity="0.9"/>
      </svg>
    `;
  } else if (designType === 'visor-mask') {
    svgContent = `
      <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="maskGrad" cx="50%" cy="50%" r="50%">
            <stop offset="0%" style="stop-color:#${metalColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:#${bgColor};stop-opacity:1" />
          </radialGradient>
          <linearGradient id="visorShine" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#${primaryColor};stop-opacity:0.1" />
            <stop offset="50%" style="stop-color:#${primaryColor};stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#${primaryColor};stop-opacity:0.1" />
          </linearGradient>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Background -->
        <rect width="300" height="300" fill="#${bgColor}"/>
        
        <!-- Main mask base -->
        <ellipse cx="150" cy="130" rx="70" ry="55" fill="url(#maskGrad)" stroke="#${metalColor}" stroke-width="3"/>
        
        <!-- Wraparound visor -->
        <ellipse cx="150" cy="120" rx="60" ry="25" fill="#000000" opacity="0.9"/>
        <ellipse cx="150" cy="120" rx="60" ry="25" fill="url(#visorShine)" filter="url(#neonGlow)"/>
        
        <!-- Side vents -->
        <rect x="70" y="115" width="20" height="5" rx="2" fill="#${primaryColor}" opacity="0.8"/>
        <rect x="70" y="125" width="20" height="5" rx="2" fill="#${primaryColor}" opacity="0.8"/>
        <rect x="210" y="115" width="20" height="5" rx="2" fill="#${primaryColor}" opacity="0.8"/>
        <rect x="210" y="125" width="20" height="5" rx="2" fill="#${primaryColor}" opacity="0.8"/>
        
        <!-- Central HUD element -->
        <circle cx="150" cy="120" r="8" fill="#${primaryColor}" opacity="0.3"/>
        <circle cx="150" cy="120" r="4" fill="#${primaryColor}" opacity="0.9"/>
        
        <!-- Jaw piece -->
        <path d="M 120 150 Q 150 170 180 150 L 175 160 Q 150 180 125 160 Z" 
              fill="#${metalColor}" stroke="#${primaryColor}" stroke-width="1"/>
        
        <!-- Tech indicators -->
        <rect x="100" y="100" width="8" height="3" fill="#${primaryColor}" opacity="0.7"/>
        <rect x="192" y="100" width="8" height="3" fill="#${primaryColor}" opacity="0.7"/>
        
        <!-- Power lines -->
        <line x1="120" y1="90" x2="130" y2="95" stroke="#${primaryColor}" stroke-width="2" opacity="0.6"/>
        <line x1="170" y1="95" x2="180" y2="90" stroke="#${primaryColor}" stroke-width="2" opacity="0.6"/>
      </svg>
    `;
  } else if (designType === 'cyber-skull') {
    svgContent = `
      <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="skullGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" style="stop-color:#${metalColor};stop-opacity:1" />
            <stop offset="100%" style="stop-color:#${bgColor};stop-opacity:1" />
          </radialGradient>
          <filter id="redGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Background -->
        <rect width="300" height="300" fill="#${bgColor}"/>
        
        <!-- Skull base -->
        <path d="M 150 60 Q 200 70 210 120 Q 210 160 180 180 L 150 190 L 120 180 Q 90 160 90 120 Q 100 70 150 60 Z" 
              fill="url(#skullGrad)" stroke="#${metalColor}" stroke-width="2"/>
        
        <!-- Eye sockets with glow -->
        <ellipse cx="125" cy="110" rx="15" ry="18" fill="#000000"/>
        <ellipse cx="175" cy="110" rx="15" ry="18" fill="#000000"/>
        <ellipse cx="125" cy="110" rx="8" ry="10" fill="#${primaryColor}" filter="url(#redGlow)"/>
        <ellipse cx="175" cy="110" rx="8" ry="10" fill="#${primaryColor}" filter="url(#redGlow)"/>
        
        <!-- Nasal cavity -->
        <polygon points="150,125 140,140 150,155 160,140" fill="#000000"/>
        <rect x="148" y="130" width="4" height="20" fill="#${primaryColor}" opacity="0.6"/>
        
        <!-- Jaw mechanism -->
        <path d="M 130 160 Q 150 175 170 160 L 175 170 Q 150 185 125 170 Z" 
              fill="#${metalColor}" stroke="#${primaryColor}" stroke-width="1"/>
        
        <!-- Tech implants -->
        <rect x="105" y="95" width="12" height="8" rx="2" fill="#${primaryColor}" opacity="0.8"/>
        <rect x="183" y="95" width="12" height="8" rx="2" fill="#${primaryColor}" opacity="0.8"/>
        
        <!-- Circuit lines on forehead -->
        <path d="M 130 80 Q 150 75 170 80" stroke="#${primaryColor}" stroke-width="2" fill="none" opacity="0.7"/>
        <circle cx="140" cy="78" r="2" fill="#${primaryColor}"/>
        <circle cx="160" cy="78" r="2" fill="#${primaryColor}"/>
        
        <!-- Jaw teeth/vents -->
        <rect x="140" y="172" width="4" height="8" fill="#${primaryColor}" opacity="0.6"/>
        <rect x="150" y="172" width="4" height="8" fill="#${primaryColor}" opacity="0.6"/>
        <rect x="156" y="172" width="4" height="8" fill="#${primaryColor}" opacity="0.6"/>
      </svg>
    `;
  } else if (designType === 'tech-armor') {
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
  } else { // stealth-hood
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
