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

  const prompt = `Create an ultra-high-quality BODY BAGZ villain-era cyberpunk profile picture with premium digital art aesthetics: ${randomStyle} set against ${randomEnvironment}. 

Brand Color Palette: ${randomColor}. 

Advanced Style Requirements: Hyperrealistic digital art, cinematic studio lighting with dramatic rim lighting, 8K ultra-high definition resolution, deep contrast shadows with neon rim lighting, premium metallic textures with chrome reflections, ultra-detailed facial features with cyberpunk augmentations, villain aesthetic with streetwear elements, post-apocalyptic cyberpunk atmosphere, professional character design quality, perfect square composition optimized for profile picture use.

Premium Visual Effects: Integrated skull motifs with glowing neon edges, advanced glitch distortion effects with digital artifacts, toxic green and blood red neon underglow, chrome and metallic surface reflections, atmospheric volumetric haze with particle effects, shallow depth of field with bokeh background blur, photorealistic rendering with ray-traced lighting, subtle animated elements suggesting motion.

Brand Identity Focus: This must embody the BODY BAGZ "villain era" - dark, powerful, menacing, and unmistakably cyberpunk with prominent skull/reaper/death themes. The character should look like a premium crypto villain ready to dominate the digital underground. High-fashion streetwear meets cyberpunk technology.`;

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
      model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
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
// Generate high-quality AI meme images 
export async function generateCyberpunkMeme(topText: string, bottomText: string, theme?: string): Promise<string> {
  const memeThemes = [
    "cyberpunk city street with neon signs and rain-soaked asphalt, dramatic lighting with toxic green and blood red neon reflections",
    "post-apocalyptic trading floor with holographic crypto charts and digital skulls floating in the background",
    "underground villain lair with server racks and glowing 'BAGZ' logos on screens, atmospheric smoke and lighting",
    "futuristic crypto exchange with floating holographic dollar signs and villain-themed decorations",
    "dark alleyway with neon graffiti and cyberpunk atmosphere, perfect for street-level crypto villain vibes",
    "high-tech command center with multiple screens showing crypto data and skull motifs throughout"
  ];

  const selectedTheme = theme || memeThemes[Math.floor(Math.random() * memeThemes.length)];
  
  const prompt = `Create a high-quality cyberpunk meme image for Body Bagz ($BAGZ) cryptocurrency with the following text elements:

TOP TEXT: "${topText}"
BOTTOM TEXT: "${bottomText}"

Visual Setting: ${selectedTheme}

Style Requirements: 
- Premium digital art quality with cinematic lighting
- Classic meme format with bold, outlined text at top and bottom
- Text should be clearly readable with strong contrast (white text with black outline)
- Cyberpunk aesthetic with toxic green (#39FF14), blood red (#E7352C), and glitch purple (#7A3BFF) color scheme
- Villain era theme with subtle skull or underground motifs
- Professional meme composition optimized for social media sharing
- Dark background with neon accent lighting
- Sharp, clean graphics suitable for viral content

Brand Identity: This should capture the BODY BAGZ villain era aesthetic - dark, powerful, and street-smart crypto vibes. The image should look like premium content that crypto communities would share.`;

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
    console.error('Error generating cyberpunk meme:', error);
    throw new Error('Failed to generate cyberpunk meme');
  }
}

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
      model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
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