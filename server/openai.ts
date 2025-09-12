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
    "street villain with LED face tattoos forming skull patterns and chrome augmentations with pulsing red accents",
    "nano-tech chaos warrior with liquid metal face morphing between skull and human forms with glowing neural pathways",
    "cybernetic necromancer with floating digital souls and bone-white chrome plating etched with circuit patterns",
    "quantum villain with phase-shifting appearance between dimensions showing multiple skull overlays in neon colors",
    "bio-mechanical death angel with organic-tech hybrid wings and pulsing red heartlight visible through chest cavity",
    "holo-masked street overlord with constantly shifting skull projections and toxic green data streams from eye ports",
    "neural-linked crypto phantom with exposed brain interface cables and floating cryptocurrency symbols around head",
    "steampunk-cyber hybrid villain with brass skull mask and steam vents emitting toxic green mist from joints",
    "void-touched chaos agent with reality-distorting aura and skull face that phases in and out of existence",
    "techno-shaman death priest with tribal skull paint that glows with circuit patterns and floating digital runes",
    "chrome samurai villain with skull-faced demon mask and katana hilts glowing with blood-red energy cores",
    "cyber-witch chaos queen with floating skull familiars and toxic green flame emanating from skeletal finger tips",
    "digital vampire lord with fanged skull grin and blood-red data streams flowing from bite mark neck ports",
    "mecha-pilot death knight with skull-shaped helmet HUD and robotic arms showing internal glowing mechanisms",
    "quantum-hacker villain with skull made of pure code and reality-breaking glitch effects around facial features",
    "bio-punk death merchant with living skull tattoos that move across skin and glowing organ tubes visible through chest",
    "cyber-demon overlord with horned skull mask and molten metal veins pulsing with toxic green energy throughout body",
    "neural-jack street prophet with skull-shaped brain interface and prophecy code streams flowing from third eye socket",
    "techno-lich crypto king with ancient skull crown made of circuit boards and soul-energy batteries powering eye glow",
    "cyber-pirate death captain with skull and crossbones hologram above head and mechanical parrot with laser eyes",
    "quantum-assassin shadow walker with skull face that flickers between dimensions and void-black energy tendrils",
    "bio-mechanical demon spawn with skull emerging from chest cavity and toxic green acid dripping from metal fangs",
    "digital necromancer villain with army of floating pixel skulls and death-code streaming from fingertip neural links",
    "chrome-punk death dealer with skull-shaped chrome face and toxic waste containers integrated into shoulder armor",
    "cyber-grim reaper with traditional scythe upgraded with laser blade and skull face scanning for crypto wallet targets",
    "techno-barbarian chaos lord with tribal skull war paint and cybernetic rage implants glowing red in temples",
    "void-space villain with skull floating in dark matter and reality tears showing toxic green energy dimensions beyond",
    "bio-cyber symbiote with alien skull parasite and host body showing mechanical infection spreading through veins",
    "quantum-terrorist crypto anarchist with bomb-timer skull display and explosive nano-tech visible in bloodstream",
    "neural-vampire data thief with skull-shaped data storage implant and victim's memories flowing as green code streams",
    "chrome-knight death paladin with skull heraldry and holy symbols corrupted into circuit patterns across armor plating"
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

  const prompt = `MASTERPIECE CREATION: Generate an absolutely stunning, museum-quality BODY BAGZ villain-era cyberpunk profile picture that surpasses all expectations: ${randomStyle} set against ${randomEnvironment}. 

ELITE BRAND COLOR MASTERY: ${randomColor}. Each color must be perfectly balanced with professional color grading, cinematic contrast ratios, and premium metallic accents that catch light realistically.

SUPREME ARTISTIC DIRECTION: 
• Photography: Shot with Phase One XF camera system, 150mm lens, f/1.4 aperture for razor-sharp subject isolation
• Lighting: Three-point cinematic lighting setup with key light, rim light, and atmospheric fill - professional studio quality
• Composition: Rule of thirds with dynamic leading lines, perfect facial positioning, and compelling eye contact
• Depth: Multilayered composition with foreground, midground, and background elements creating incredible visual depth

TECHNICAL EXCELLENCE BEYOND INDUSTRY STANDARDS:
• Resolution: 16K ultra-high definition with pixel-perfect clarity and zero compression artifacts  
• Rendering: Octane Render quality with physically accurate materials, subsurface scattering, and global illumination
• Textures: Micro-detail surface textures - every pore, scar, metal reflection, and fabric fiber rendered with obsessive precision
• Effects: Real-time ray tracing with accurate light bounce, caustics, and volumetric fog simulation

ADVANCED VISUAL PHENOMENA:
• Particle Systems: Floating digital debris, sparks, and energy motes with realistic physics simulation
• Atmospheric Effects: Volumetric lighting beams cutting through smoke/mist with god-ray penetration
• Glitch Aesthetics: Datamoshing, chromatic aberration, and digital noise that enhances rather than detracts
• Energy Fields: Pulsing bio-luminescent elements, plasma streams, and holographic projections with depth

CHARACTER PSYCHOLOGY & PRESENCE:
• Facial Expression: Calculating intelligence mixed with barely contained violence - the look of someone who owns the streets
• Body Language: Confident, predatory stance that commands respect and instills fear
• Aura: Tangible sense of power and danger radiating from the character
• Details: Battle scars, tech modifications, and wear patterns that tell a story of survival and dominance

BRAND IDENTITY SUPREMACY: This character must be the definitive embodiment of BODY BAGZ - a crypto villain so compelling that viewers immediately understand this represents the apex predator of the digital underground. Street-smart, technologically superior, aesthetically flawless, and undeniably dangerous. Every pixel must scream "I AM THE FUTURE OF CRYPTO WARFARE."

ARTISTIC INSPIRATION: Combine the best elements of Blade Runner 2049 cinematography, Ghost in the Shell character design, Cyberpunk 2077 environmental storytelling, and Fashion Week editorial photography. The result should be gallery-worthy art that happens to be a profile picture.`;

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
      max_completion_tokens: 100,
      temperature: 1.0, // gpt-5 only supports default temperature
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
  
  const prompt = `ULTIMATE MEME MASTERY: Create a museum-quality, viral-worthy cyberpunk meme that dominates social media feeds for Body Bagz ($BAGZ) cryptocurrency:

MEME TEXT INTEGRATION:
TOP TEXT: "${topText}" - Positioned with perfect typography hierarchy, bold impact font with premium 3D extrusion effects
BOTTOM TEXT: "${bottomText}" - Complementary positioning with dynamic text effects and perfect readability

CINEMATIC VISUAL FOUNDATION: ${selectedTheme}

ELITE ARTISTIC EXECUTION:
• Photography Style: Shot with RED Komodo 6K camera, anamorphic lenses for cinematic aspect ratio, professional color science
• Lighting Design: Dramatic three-point lighting with atmospheric haze, rim lighting creating character separation from background
• Composition: Dynamic rule of thirds with leading lines drawing eye to text, perfect visual balance between image and typography
• Depth of Field: Shallow focus with beautiful bokeh creating text prominence while maintaining environmental context

SUPREME TEXT DESIGN:
• Typography: Impact font family with custom kerning, 3D beveled edges with realistic lighting simulation
• Outline System: Multi-layer stroke effects - inner white core, middle black outline, outer neon glow matching brand colors
• Effects: Subtle drop shadows with realistic distance, slight perspective distortion for dynamic energy
• Readability: High contrast ratios ensuring text pops even on mobile screens, optimized for all social media platforms

ADVANCED VISUAL PHENOMENA:
• Color Mastery: Toxic green (#39FF14), blood red (#E7352C), glitch purple (#7A3BFF) with professional color grading
• Particle Effects: Digital glitch artifacts, floating data streams, atmospheric volumetric lighting
• Surface Details: Realistic material properties - wet streets reflecting neon, metallic surfaces with accurate reflections
• Atmospheric Elements: Smoke, mist, and haze with realistic light scattering and volumetric properties

MEME PSYCHOLOGY & VIRAL POTENTIAL:
• Visual Hook: Instant attention-grabbing composition that stops scroll behavior
• Emotional Impact: Perfect balance of humor, relatability, and BODY BAGZ brand power
• Shareability Factor: Composition optimized for maximum engagement across all social platforms
• Cultural Relevance: Taps into current crypto culture while establishing BODY BAGZ as the dominant meme force

BRAND INTEGRATION PERFECTION:
Subtle but unmistakable BODY BAGZ branding woven into the environment - neon signs, holographic displays, skull motifs that enhance rather than distract from the meme's core message. The image should be so compelling that people share it for the visual quality alone, while the text delivers the viral crypto message.

TECHNICAL SUPREMACY: 16K resolution with zero compression artifacts, HDR color space, professional post-processing effects that make this meme stand out in any feed. This should be the meme that other meme creators study to understand what premium quality looks like.`;

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
      max_completion_tokens: 80,
      temperature: 1.0, // gpt-5 only supports default temperature
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