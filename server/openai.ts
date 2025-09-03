import OpenAI from "openai";

if (!process.env.OPENAI_API_KEY) {
  throw new Error("OPENAI_API_KEY environment variable is required");
}

// the newest OpenAI model is "gpt-4o" which was released August 7, 2025. do not change this unless explicitly requested by the user
const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });

// Generate unique cyberpunk PFP using DALL-E 3
export async function generateCyberpunkPFP(): Promise<string> {
  // BODY BAGZ VILLAIN ERA - Epic PFP Styles
  const villainEraStyles = [
    "cyberpunk skull-masked villain with glowing blood-red eyes and toxic green circuit tattoos across metallic face plates",
    "hooded death reaper with floating holographic 'BAGZ' symbols and neon skeletal hands emerging from shadows",
    "chrome-armored street emperor with LED skull insignia pulsing on chest armor and digital smoke effects",
    "cybernetic villain lord with translucent face revealing internal circuitry and floating toxic green data streams",
    "augmented chaos operative with visible blood-red neural cables and metallic skull face plate with neon cracks",
    "digital phantom assassin with glitching skeletal features and purple neon energy radiating from eye sockets",
    "tech-enhanced death commander with stealth armor displaying animated skull logos and plasma weapon holsters",
    "matrix villain with VR skull mask and flowing code streams forming 'BODY BAGZ' text in background",
    "cyberpunk reaper with translucent hood revealing glowing skull underneath and toxic green neural interface ports",
    "street villain with LED face tattoos forming skull patterns and chrome augmentations with pulsing red accents"
  ];

  // BODY BAGZ Brand Environments
  const villainEnvironments = [
    "dark post-apocalyptic cityscape with towering 'BODY BAGZ' neon signs reflecting off rain-soaked streets",
    "underground villain lair with server racks displaying skull logos and toxic green holographic interfaces",
    "futuristic death arena with blood-red laser grids and floating 'VILLAIN ERA' text in neon",
    "abandoned cyberpunk district with flickering skull-shaped neon signs and purple atmospheric lighting",
    "high-tech command center with floating holographic skulls and 'BAGZ' branding on every surface",
    "neon-lit villain hideout with chrome walls displaying animated skull patterns and toxic green mist"
  ];

  // BODY BAGZ Signature Colors (matching the epic banner)
  const brandColors = [
    "blood red (#E7352C) and toxic green (#39FF14) with jet black shadows and chrome silver metallic highlights",
    "glitch purple (#7A3BFF) and blood red (#E7352C) with deep black backgrounds and ash white accent details",
    "toxic green (#39FF14) and jet black (#0A0A0B) with blood red energy effects and chrome metallic surfaces",
    "blood red plasma and toxic green neon with deep purple shadows and bright silver chrome reflections",
    "cyberpunk purple and blood red themes with toxic green circuit patterns and metallic gunmetal details",
    "villain-era blood red and toxic green with glitch purple accents and chrome silver highlighting"
  ];

  const randomStyle = villainEraStyles[Math.floor(Math.random() * villainEraStyles.length)];
  const randomEnvironment = villainEnvironments[Math.floor(Math.random() * villainEnvironments.length)];
  const randomColor = brandColors[Math.floor(Math.random() * brandColors.length)];

  const prompt = `Create an epic BODY BAGZ villain-era cyberpunk profile picture: ${randomStyle} set against ${randomEnvironment}. 

Brand Color Palette: ${randomColor}. 

Style Requirements: Professional digital art, cinematic lighting, 4K ultra-high definition, dramatic shadows, neon glow effects, metallic textures, detailed facial features, villain aesthetic, post-apocalyptic cyberpunk, premium quality, square composition optimized for profile picture use.

Additional Effects: Subtle skull motifs integrated into design, glitch distortion effects, neon underglow, chrome reflections, atmospheric haze, depth of field, photorealistic rendering.

Brand Identity: This should embody the BODY BAGZ "villain era" - dark, powerful, and unmistakably cyberpunk with skull/reaper themes.`;

  try {
    const response = await openai.images.generate({
      model: "dall-e-3",
      prompt: prompt,
      n: 1,
      size: "1024x1024",
      quality: "hd",
      style: "vivid"
    });

    return response.data?.[0]?.url || '';
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