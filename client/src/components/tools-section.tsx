import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChainLinkIcon, BodyBagIcon, GasMaskIcon } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import pfpHeaderImg from "@assets/generated_images/Cyberpunk_PFP_Generator_header_fad9f426.png";
import tweetHeaderImg from "@assets/generated_images/Cyberpunk_Tweet_Generator_header_85711bc6.png";
import memeHeaderImg from "@assets/generated_images/Cyberpunk_Meme_Creator_header_95968e4a.png";

const bullishTweets = [
  "Just bagged another mil in $BAGZ. The villain era hits different when you're stacking chaos. NFA but this rocket's fueled by pure degeneracy.",
  "While you're sleeping, $BAGZ holders are building an empire in the shadows. The chaos collective never rests.",
  "$BAGZ isn't just a token, it's a movement. For the culture, for the chaos, for the people who refuse to conform.",
  "Zipped up another bag today. $BAGZ community growing stronger while the market bleeds. This is how villains win.",
  "The street chose $BAGZ. Underground vibes, premium gains. If you know, you know."
];

const pfpVariants = [
  "Chrome Assassin Elite #KRVN-001",
  "Neural Android Mk-VII #SYNT-888", 
  "Skull Overlord Prime #DOOM-666",
  "Cyber Samurai Legend #BLADE-777",
  "Death Commander Alpha #REAP-999"
];

const pfpPrompts = [
  "Ultra-detailed cyberpunk assassin profile portrait: hooded figure with intricate chrome facial implants, asymmetrical LED eye augmentations glowing toxic green and blood red, weathered tactical face mask with breathing apparatus, multiple facial piercings, holographic tattoos on visible neck, dark military-grade hood with fiber optic threading, atmospheric volumetric lighting, photorealistic digital art, 8K quality, cinematic depth of field",
  "Masterpiece cyberpunk android portrait: sleek humanoid with exposed chrome skull sections, one organic eye and one holographic scanner eye, intricate neural interface ports along jawline, liquid metal face paint patterns, neon data streams flowing across synthetic skin, high-tech collar with pulsing circuits, studio lighting with neon rim lighting, hyperrealistic 3D render",
  "Premium villain overlord portrait: intimidating figure with ornate skull mask featuring glowing runes, luxurious dark hood with golden threading, multiple cybernetic jaw enhancements, glowing chest piece visible, ornate shoulder armor with pulsing energy cores, atmospheric smoke effects, dramatic chiaroscuro lighting, museum-quality digital painting",
  "Elite street samurai profile: battle-scarred warrior with half-face cybernetic reconstruction, glowing katana reflection in augmented eye, traditional oni mask merged with high-tech elements, ceremonial hood with digital prayer beads, holographic money symbols floating around figure, neo-Tokyo neon background blur, professional portrait photography style",
  "Legendary cyber-reaper commander: imposing figure with biomechanical skull fusion, multiple glowing eye sensors, ornate death mask with circuit patterns, flowing digital energy cape, advanced weapon systems integrated into armor, particle effects around figure, dramatic low-angle perspective, AAA game cinematic quality"
];

export default function ToolsSection() {
  const [generatedTweet, setGeneratedTweet] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [currentPfp, setCurrentPfp] = useState(pfpVariants[0]);
  const [generatedPfpImage, setGeneratedPfpImage] = useState("");
  const [generatedMemeImage, setGeneratedMemeImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isGeneratingPfp, setIsGeneratingPfp] = useState(false);
  const [isGeneratingMeme, setIsGeneratingMeme] = useState(false);
  const [isGeneratingTweet, setIsGeneratingTweet] = useState(false);
  const { toast } = useToast();
  const { user, trackAction } = useUser();

  const generateTweet = async () => {
    setIsGeneratingTweet(true);
    try {
      const response = await fetch('/api/generate-tweet', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          userId: user?.id
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setGeneratedTweet(data.tweet);
        toast({
          title: "Tweet Generated!",
          description: user ? `Ready to share on X (+5 chaos points!)` : "Ready to share on X",
        });
      } else {
        // Fallback to client-side generation
        const randomTweet = bullishTweets[Math.floor(Math.random() * bullishTweets.length)];
        setGeneratedTweet(randomTweet);
        toast({
          title: "Tweet Generated!",
          description: "Ready to share on X",
        });
      }
    } catch (error) {
      // Fallback to client-side generation
      const randomTweet = bullishTweets[Math.floor(Math.random() * bullishTweets.length)];
      setGeneratedTweet(randomTweet);
      toast({
        title: "Tweet Generated!",
        description: "Ready to share on X",
      });
    } finally {
      setIsGeneratingTweet(false);
    }
  };

  const shareToTwitter = async () => {
    const hashtags = "BodyBagz,BAGZ,CryptoVillains,ChaosToken";
    const tweetText = encodeURIComponent(generatedTweet);
    const twitterUrl = `https://twitter.com/intent/tweet?text=${tweetText}&hashtags=${hashtags}`;
    
    // Better mobile detection and handling
    if (navigator.share && /Android|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent)) {
      navigator.share({
        title: 'Body Bagz Chaos Tweet',
        text: generatedTweet + " #BodyBagz #BAGZ #CryptoVillains",
        url: window.location.href
      }).then(async () => {
        if (user) {
          try {
            await trackAction('tweet');
          } catch (error) {
            console.error('Failed to track share action:', error);
          }
        }
        toast({
          title: "Shared!",
          description: user ? "Chaos spread successfully (+6 points!)" : "Chaos spread successfully",
        });
      }).catch(() => {
        // Fallback to Twitter if native sharing fails
        window.open(twitterUrl, '_blank');
      });
    } else {
      window.open(twitterUrl, '_blank', 'width=550,height=420');
      // Track share action for desktop
      if (user) {
        try {
          await trackAction('tweet');
        } catch (error) {
          console.error('Failed to track share action:', error);
        }
      }
      toast({
        title: "Opening Twitter!",
        description: user ? "Share the chaos with the world (+6 points!)" : "Share the chaos with the world",
      });
    }
  };
  
  const copyTweet = async () => {
    if (generatedTweet) {
      try {
        await navigator.clipboard.writeText(generatedTweet + " #BodyBagz #BAGZ #CryptoVillains");
        toast({
          title: "Copied!",
          description: "Tweet copied to clipboard",
        });
      } catch (error) {
        // Fallback for older browsers
        const textArea = document.createElement('textarea');
        textArea.value = generatedTweet + " #BodyBagz #BAGZ #CryptoVillains";
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        toast({
          title: "Copied!",
          description: "Tweet copied to clipboard",
        });
      }
    }
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setUploadedImage(file);
      toast({
        title: "Image Uploaded!",
        description: "Ready to create your custom meme",
      });
    }
  };

  const downloadImage = (imageUrl: string, filename: string) => {
    const link = document.createElement('a');
    link.href = imageUrl;
    link.download = filename;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    toast({
      title: "Download Started!",
      description: "Your image is downloading",
    });
  };

  const generateMeme = async () => {
    if (!topText && !bottomText && !uploadedImage) {
      toast({
        title: "Add content!",
        description: "Add text or upload an image for your meme",
        variant: "destructive"
      });
      return;
    }
    
    setIsGeneratingMeme(true);
    
    try {
      let baseImageData = null;
      if (uploadedImage) {
        const reader = new FileReader();
        baseImageData = await new Promise((resolve) => {
          reader.onload = () => resolve(reader.result);
          reader.readAsDataURL(uploadedImage);
        });
      }
      
      const response = await fetch('/api/generate-meme', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          topText,
          bottomText,
          baseImage: baseImageData,
          userId: user?.id
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setGeneratedMemeImage(data.imageUrl);
        toast({
          title: "Meme Created!",
          description: user ? "Your chaos meme is ready to download (+4 points!)" : "Your chaos meme is ready to download",
        });
      } else {
        throw new Error('Failed to generate meme');
      }
    } catch (error) {
      toast({
        title: "Generation Error",
        description: "Failed to generate meme. Try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingMeme(false);
    }
  };

  const generatePfp = async () => {
    setIsGeneratingPfp(true);
    const randomIndex = Math.floor(Math.random() * pfpVariants.length);
    const randomPfp = pfpVariants[randomIndex];
    const randomPrompt = pfpPrompts[randomIndex];
    
    setCurrentPfp(randomPfp);
    
    try {
      const response = await fetch('/api/generate-pfp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ 
          prompt: randomPrompt,
          name: randomPfp,
          userId: user?.id
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setGeneratedPfpImage(data.imageUrl);
        toast({
          title: "PFP Generated!",
          description: user ? "Your villain profile is ready to download (+3 points!)" : "Your villain profile is ready to download",
        });
      } else {
        throw new Error('Failed to generate PFP');
      }
    } catch (error) {
      toast({
        title: "Generation Error",
        description: "Failed to generate PFP. Try again.",
        variant: "destructive"
      });
    } finally {
      setIsGeneratingPfp(false);
    }
  };
  
  const downloadPfp = () => {
    if (generatedPfpImage) {
      const link = document.createElement('a');
      link.href = generatedPfpImage;
      link.download = `${currentPfp.replace(/[^a-zA-Z0-9]/g, '_')}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Downloaded!",
        description: "Your villain PFP is saved",
      });
    }
  };
  
  const downloadMeme = () => {
    if (generatedMemeImage) {
      const link = document.createElement('a');
      link.href = generatedMemeImage;
      link.download = `Body_Bagz_Meme_${Date.now()}.png`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      toast({
        title: "Downloaded!",
        description: "Your meme is saved",
      });
    }
  };

  return (
    <section id="tools" className="relative z-10 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-brand text-4xl md:text-5xl text-center text-blood-red mb-16" data-testid="tools-title">
          CHAOS TOOLS
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Premium Tweet Generator */}
          <div className="neon-card p-8 rounded-xl group" data-testid="tweet-generator">
            <div className="relative mb-6 overflow-hidden rounded-lg">
              <img 
                src={tweetHeaderImg} 
                alt="Cyberpunk Tweet Generator" 
                className="w-full h-32 object-cover border border-toxic-green/30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-toxic-green/20 to-transparent"></div>
            </div>
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-lg bg-jet-black border border-dim-gray group-hover:shadow-green-glow transition-all duration-200">
                <ChainLinkIcon className="w-8 h-8 text-toxic-green" />
              </div>
              <h3 className="font-tech text-xl text-toxic-green ml-4 tracking-wide font-semibold">TWEET GENERATOR</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-jet-black p-6 rounded-lg border border-dim-gray min-h-[140px] relative overflow-hidden">
                <div className="absolute top-0 right-0 w-8 h-8 bg-toxic-green opacity-5 rounded-full blur-md"></div>
                <p className="text-ash-white text-sm leading-relaxed font-medium relative z-10" data-testid="generated-tweet">
                  {generatedTweet || "Click below to generate a bullish tweet..."}
                </p>
              </div>
              <div className="space-y-3">
                <Button 
                  className="cyber-button w-full py-4 text-ash-white font-bold tracking-wide" 
                  onClick={generateTweet}
                  disabled={isGeneratingTweet}
                  data-testid="button-generate-tweet"
                >
                  {isGeneratingTweet ? "GENERATING..." : "GENERATE CHAOS"}
                </Button>
                {generatedTweet && (
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button 
                      className="w-full py-4 bg-gradient-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-bold tracking-wide rounded-lg transition-all duration-200 border border-blue-500"
                      onClick={shareToTwitter}
                      data-testid="button-share-twitter"
                    >
                      🐦 SHARE
                    </Button>
                    <Button 
                      className="w-full py-4 bg-gradient-to-r from-gray-600 to-gray-700 hover:from-gray-700 hover:to-gray-800 text-white font-bold tracking-wide rounded-lg transition-all duration-200 border border-gray-500"
                      onClick={copyTweet}
                      data-testid="button-copy-tweet"
                    >
                      📋 COPY
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Premium Meme Factory */}
          <div className="neon-card p-8 rounded-xl group" data-testid="meme-generator">
            <div className="relative mb-6 overflow-hidden rounded-lg">
              <img 
                src={memeHeaderImg} 
                alt="Cyberpunk Meme Creator" 
                className="w-full h-32 object-cover border border-blood-red/30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-blood-red/20 to-transparent"></div>
            </div>
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-lg bg-jet-black border border-dim-gray group-hover:shadow-red-glow transition-all duration-200">
                <BodyBagIcon className="w-8 h-8 text-blood-red" />
              </div>
              <h3 className="font-tech text-xl text-blood-red ml-4 tracking-wide font-semibold">MEME FACTORY</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-jet-black p-6 rounded-lg border border-dim-gray text-center">
                <div className="w-full h-36 bg-gradient-to-br from-dim-gray to-jet-black rounded-lg flex items-center justify-center mb-4 relative border border-blood-red border-opacity-30 overflow-hidden">
                  {generatedMemeImage ? (
                    <img 
                      src={generatedMemeImage} 
                      alt="Generated meme"
                      className="w-full h-full object-cover rounded-lg"
                      data-testid="generated-meme-image"
                    />
                  ) : (
                    <>
                      {/* Premium Template Background */}
                      <div className="absolute inset-0 bg-gradient-to-br from-blood-red/10 to-transparent rounded-lg"></div>
                      <div className="absolute top-2 right-2 w-4 h-4 bg-blood-red opacity-20 rounded-full blur-sm"></div>
                      
                      <span className="text-ash-white text-sm font-semibold tracking-wide relative z-10">BODY BAGZ MEME TEMPLATE</span>
                      {topText && (
                        <div className="absolute top-3 left-3 right-3 text-ash-white font-black text-sm tracking-wide" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                          {topText}
                        </div>
                      )}
                      {bottomText && (
                        <div className="absolute bottom-3 left-3 right-3 text-ash-white font-black text-sm tracking-wide" style={{textShadow: '2px 2px 4px rgba(0,0,0,0.8)'}}>
                          {bottomText}
                        </div>
                      )}
                    </>
                  )}
                </div>
                <Input 
                  type="text" 
                  placeholder="Top text..." 
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  className="cyber-input w-full px-4 py-3 text-ash-white placeholder-dim-gray rounded-lg mb-3 font-medium" 
                  data-testid="input-meme-top-text"
                />
                <Input 
                  type="text" 
                  placeholder="Bottom text..." 
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  className="cyber-input w-full px-4 py-3 text-ash-white placeholder-dim-gray rounded-lg mb-3 font-medium" 
                  data-testid="input-meme-bottom-text"
                />
                <div className="relative">
                  <input 
                    type="file" 
                    accept="image/*"
                    onChange={handleImageUpload}
                    className="hidden" 
                    id="meme-image-upload"
                  />
                  <Button 
                    type="button"
                    onClick={() => document.getElementById('meme-image-upload')?.click()}
                    className="w-full py-3 bg-gradient-to-r from-toxic-green/20 to-toxic-green/10 hover:from-toxic-green/30 hover:to-toxic-green/20 text-toxic-green border border-toxic-green/30 font-bold tracking-wide rounded-lg transition-all duration-200"
                    data-testid="button-upload-image"
                  >
                    📂 {uploadedImage ? uploadedImage.name : 'UPLOAD BASE IMAGE (OPTIONAL)'}
                  </Button>
                  {uploadedImage && (
                    <Button 
                      type="button"
                      onClick={() => setUploadedImage(null)}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2 w-6 h-6 bg-blood-red hover:bg-blood-red/80 text-white rounded-full text-xs font-bold"
                    >
                      ×
                    </Button>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <Button 
                  className="cyber-button w-full py-4 text-ash-white font-bold tracking-wide" 
                  onClick={generateMeme}
                  disabled={isGeneratingMeme}
                  data-testid="button-create-meme"
                >
                  {isGeneratingMeme ? "CREATING..." : "CREATE MEME"}
                </Button>
                {generatedMemeImage && (
                  <Button 
                    className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold tracking-wide rounded-lg transition-all duration-200 border border-purple-500"
                    onClick={downloadMeme}
                    data-testid="button-download-meme"
                  >
                    📥 DOWNLOAD MEME
                  </Button>
                )}
              </div>
            </div>
          </div>

          {/* Premium PFP Chaos */}
          <div className="neon-card p-8 rounded-xl group" data-testid="pfp-generator">
            <div className="relative mb-6 overflow-hidden rounded-lg">
              <img 
                src={pfpHeaderImg} 
                alt="Cyberpunk PFP Generator" 
                className="w-full h-32 object-cover border border-glitch-purple/30"
              />
              <div className="absolute inset-0 bg-gradient-to-r from-glitch-purple/20 to-transparent"></div>
            </div>
            <div className="flex items-center mb-6">
              <div className="p-3 rounded-lg bg-jet-black border border-dim-gray group-hover:shadow-purple-glow transition-all duration-200">
                <GasMaskIcon className="w-8 h-8 text-glitch-purple" />
              </div>
              <h3 className="font-tech text-xl text-glitch-purple ml-4 tracking-wide font-semibold">PFP CHAOS</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-jet-black p-6 rounded-lg border border-dim-gray">
                <div className="w-36 h-36 mx-auto bg-gradient-to-br from-glitch-purple/20 to-jet-black rounded-lg flex items-center justify-center mb-4 border border-glitch-purple border-opacity-30 relative overflow-hidden">
                  {generatedPfpImage ? (
                    <img 
                      src={generatedPfpImage} 
                      alt={currentPfp}
                      className="w-full h-full object-cover rounded-lg"
                      data-testid="generated-pfp-image"
                    />
                  ) : (
                    <>
                      {/* Premium PFP Preview */}
                      <div className="absolute inset-0 bg-gradient-to-br from-glitch-purple/10 to-transparent"></div>
                      <svg className="w-24 h-24 text-glitch-purple relative z-10" viewBox="0 0 64 64" fill="none">
                        <defs>
                          <linearGradient id="pfpGrad" x1="0%" y1="0%" x2="100%" y2="100%">
                            <stop offset="0%" stopColor="#7A3BFF" stopOpacity="1"/>
                            <stop offset="50%" stopColor="#2A2B31" stopOpacity="0.9"/>
                            <stop offset="100%" stopColor="#0A0A0B" stopOpacity="1"/>
                          </linearGradient>
                        </defs>
                        {/* Hooded Figure Head */}
                        <path d="M32 8 L48 12 L48 28 L44 32 L20 32 L16 28 L16 12 Z" fill="url(#pfpGrad)" stroke="#7A3BFF" strokeWidth="1.5"/>
                        {/* Hood */}
                        <path d="M32 8 L52 16 L52 24 L32 20 L12 24 L12 16 Z" fill="#0A0A0B" stroke="#7A3BFF" strokeWidth="1"/>
                        {/* Mask/Face */}
                        <rect x="24" y="20" width="16" height="12" rx="2" fill="#2A2B31" stroke="#EDEEF0" strokeWidth="1"/>
                        {/* Eye Lenses */}
                        <circle cx="28" cy="24" r="2" fill="#7A3BFF" opacity="0.8"/>
                        <circle cx="36" cy="24" r="2" fill="#7A3BFF" opacity="0.8"/>
                        {/* Filter */}
                        <rect x="30" y="28" width="4" height="2" fill="#39FF14" rx="1"/>
                        {/* Body/Cloak */}
                        <path d="M20 32 L44 32 L42 48 L22 48 Z" fill="url(#pfpGrad)" stroke="#7A3BFF" strokeWidth="1"/>
                        {/* Glitch Effects */}
                        <rect x="18" y="26" width="6" height="1" fill="#39FF14" opacity="0.7"/>
                        <rect x="40" y="30" width="4" height="1" fill="#E7352C" opacity="0.8"/>
                      </svg>
                      <div className="absolute bottom-1 right-1 w-2 h-2 bg-glitch-purple rounded-full animate-pulse"></div>
                    </>
                  )}
                </div>
                <p className="text-center text-dim-gray text-sm font-medium tracking-wide mb-4" data-testid="current-pfp">{currentPfp}</p>
              </div>
              <div className="space-y-3">
                <Button 
                  className="cyber-button w-full py-4 text-ash-white font-bold tracking-wide" 
                  onClick={generatePfp}
                  disabled={isGeneratingPfp}
                  data-testid="button-generate-pfp"
                >
                  {isGeneratingPfp ? "GENERATING..." : "GENERATE PFP"}
                </Button>
                {generatedPfpImage && (
                  <Button 
                    className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold tracking-wide rounded-lg transition-all duration-200 border border-green-500"
                    onClick={downloadPfp}
                    data-testid="button-download-pfp"
                  >
                    📥 DOWNLOAD PFP
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
