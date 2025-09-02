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
        
        // Enhanced fallback with unique cyberpunk styling
        const styles = ['bottts', 'bottts-neutral', 'identicon'];
        const colors = ['dc2626', '16a34a', '7c3aed', 'f59e0b', 'ec4899', '06b6d4', 'f97316'];
        const seeds = ['cyberpunk', 'neon', 'villain', 'chaos', 'street', 'matrix', 'ghost', 'rebel', 'shadow', 'tech'];
        
        const randomStyle = styles[Math.floor(Math.random() * styles.length)];
        const randomColor = colors[Math.floor(Math.random() * colors.length)];
        const timestamp = Date.now();
        const randomSeed = seeds[Math.floor(Math.random() * seeds.length)] + timestamp;
        
        imageUrl = `https://api.dicebear.com/7.x/${randomStyle}/svg?seed=${randomSeed}&backgroundColor=0a0a0b&primaryColor=${randomColor}&scale=85&translateY=5`;
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
  app.post("/api/users/register", registrationLimiter, validateRegistration, async (req, res) => {
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
  app.post("/api/admin/generate-rewards/:monthYear", async (req, res) => {
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
