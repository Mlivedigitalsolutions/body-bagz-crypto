import type { Express } from "express";
import { createServer, type Server } from "http";
import { ImageGenerator } from "./imageGenerator";

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

  // Enhanced PFP Generator API - Creates real downloadable images
  app.post("/api/generate-pfp", async (req, res) => {
    try {
      const { prompt, name } = req.body;
      
      if (!name) {
        return res.status(400).json({ error: 'Name is required' });
      }

      // Determine style based on prompt keywords
      let style: 'cyberpunk' | 'villain' | 'chaos' | 'shadow' = 'cyberpunk';
      if (prompt?.toLowerCase().includes('villain')) style = 'villain';
      else if (prompt?.toLowerCase().includes('chaos')) style = 'chaos';
      else if (prompt?.toLowerCase().includes('shadow')) style = 'shadow';

      // Generate enhanced SVG with better styling
      const imageUrl = await ImageGenerator.generatePFP({
        name: name.split(' ')[0] || 'BAGZ',
        style,
        size: 512
      });
      
      res.json({ imageUrl });
    } catch (error) {
      console.error('Error generating PFP:', error);
      res.status(500).json({ error: 'Failed to generate PFP' });
    }
  });

  // Enhanced Meme Generator API - Creates actual downloadable memes
  app.post("/api/generate-meme", async (req, res) => {
    try {
      const { topText, bottomText } = req.body;
      
      if (!topText && !bottomText) {
        return res.status(400).json({ error: 'At least one text field is required' });
      }

      // Generate enhanced meme with cyberpunk styling
      const imageUrl = await ImageGenerator.generateMeme({
        topText: topText || '',
        bottomText: bottomText || '',
        size: { width: 800, height: 600 }
      });
      
      res.json({ imageUrl });
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

  const httpServer = createServer(app);
  return httpServer;
}
