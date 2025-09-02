import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

// the newest OpenAI model is "gpt-4o" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Generate unique cyberpunk PFP using DALL-E 3
export async function generateCyberpunkPFP(): Promise<string> {
  const cyberpunkStyles = [
    "neon-lit street samurai with glowing cybernetic implants",
    "hooded hacker with holographic displays floating around them",
    "chrome-armed netrunner in a dark alley with neon reflections",
    "cyberpunk warrior with glowing red eyes and metallic face plate",
    "futuristic mercenary with LED tattoos and neural interface cables",
    "digital ghost with translucent features and data streams",
    "augmented human with visible circuit patterns under synthetic skin",
    "tech-enhanced assassin with stealth optical camouflage",
    "cybernetic soldier with plasma weapon and armor plating",
    "matrix runner with VR goggles and flowing digital code"
  ];

  const environments = [
    "dark cyberpunk city with towering neon skyscrapers",
    "rain-soaked streets with holographic advertisements",
    "underground tech facility with server racks and monitors",
    "futuristic nightclub with laser lights and smoke",
    "abandoned industrial district with flickering neon signs",
    "high-tech laboratory with floating holographic interfaces"
  ];

  const colors = [
    "toxic green and electric blue accents",
    "blood red and jet black theme",
    "purple neon and chrome silver highlights",
    "orange plasma and deep black shadows",
    "cyan blue and metallic gold details",
    "magenta pink and gunmetal gray tones"
  ];

  const randomStyle = cyberpunkStyles[Math.floor(Math.random() * cyberpunkStyles.length)];
  const randomEnvironment = environments[Math.floor(Math.random() * environments.length)];
  const randomColor = colors[Math.floor(Math.random() * colors.length)];

  const prompt = `Create a high-quality cyberpunk profile picture: ${randomStyle} set against ${randomEnvironment}. Color palette: ${randomColor}. Style: dark, gritty, futuristic, professional digital art, detailed facial features, dramatic lighting, 4K quality, square composition suitable for profile picture`;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
      style: "vivid"
    });

    return response.data[0].url!;
  } catch (error) {
    console.error('Error generating cyberpunk PFP:', error);
    throw new Error('Failed to generate cyberpunk PFP');
  }
}

// Generate creative bullish tweets with hashtags
export async function generateBullishTweet(): Promise<string> {
  const prompt = `Create a creative, bullish cryptocurrency tweet about Body Bagz ($BAGZ) token. The tweet should be:
  - Bullish and energetic about $BAGZ potential
  - Include cyberpunk/villain era themes
  - Mention chaos, street culture, or underground vibes
  - Be under 280 characters
  - Include 3-5 relevant hashtags
  - Sound authentic and engaging
  - Avoid being overly promotional
  
  Examples of tone: "The streets don't sleep and neither does $BAGZ", "Villain era activated", "Chaos is profitable"
  
  Respond with ONLY the tweet text, no quotes or extra text.`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 100,
      temperature: 0.9, // High creativity
    });

    return response.choices[0].message.content?.trim() || "The streets chose $BAGZ for a reason 🔥 Villain era never ends #BAGZ #CryptoVillain #StreetSmart #ChaosProfit #UndergroundGains";
  } catch (error) {
    console.error('Error generating bullish tweet:', error);
    throw new Error('Failed to generate bullish tweet');
  }
}

// Generate meme text suggestions
export async function generateMemeText(): Promise<{ topText: string; bottomText: string }> {
  const prompt = `Create funny, bullish meme text for Body Bagz ($BAGZ) cryptocurrency. Generate:
  - Top text: Setup/situation (2-8 words)
  - Bottom text: Punchline related to $BAGZ or crypto (2-8 words)
  
  Theme should be cyberpunk, villain era, street culture, or crypto humor. Make it punchy and memeable.
  
  Examples:
  Top: "WHEN YOU HOLD $BAGZ"
  Bottom: "VILLAIN MODE ACTIVATED"
  
  Respond in JSON format: {"topText": "...", "bottomText": "..."}`;

  try {
    const response = await openai.chat.completions.create({
      model: "gpt-4o",
      messages: [{ role: "user", content: prompt }],
      max_tokens: 80,
      temperature: 0.8,
      response_format: { type: "json_object" }
    });

    const result = JSON.parse(response.choices[0].message.content || '{"topText": "HODLING $BAGZ", "bottomText": "VILLAIN ERA ACTIVATED"}');
    return {
      topText: result.topText || "HODLING $BAGZ",
      bottomText: result.bottomText || "VILLAIN ERA ACTIVATED"
    };
  } catch (error) {
    console.error('Error generating meme text:', error);
    return {
      topText: "HODLING $BAGZ",
      bottomText: "VILLAIN ERA ACTIVATED"
    };
  }
}