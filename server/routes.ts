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
  app.post("/api/generate-pfp", (req, res) => {
    const pfpVariants = [
      "Hooded Chaos Reaper #1337",
      "Glitch Cat Villain #420",
      "Prepper Skull Lord #666",
      "Shadow Bag Keeper #999",
      "Digital Grim #2024",
      "Neon Phantom #3333",
      "Cyber Reaper #5555",
      "Dark Collector #7777"
    ];
    
    const randomPfp = pfpVariants[Math.floor(Math.random() * pfpVariants.length)];
    res.json({ pfp: randomPfp });
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
