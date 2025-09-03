import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChainLinkIcon, BodyBagIcon, GasMaskIcon } from "@/components/icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { apiRequest } from "@/lib/queryClient";
import { Save } from "lucide-react";
import pfpHeaderImg from "@assets/generated_images/Cyberpunk_PFP_Generator_header_fad9f426.png";
import tweetHeaderImg from "@assets/generated_images/Cyberpunk_Tweet_Generator_header_85711bc6.png";
import memeHeaderImg from "@assets/generated_images/Cyberpunk_Meme_Creator_header_95968e4a.png";
import epicSkullImg from "@assets/generated_images/Epic_BODY_BAGZ_skull_branding_6dcb9ad5.png";

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

const memeTemplates = {
  'cyberpunk-grid': {
    name: 'Cyberpunk Grid',
    icon: '🏢',
    generate: (topText: string, bottomText: string, centerText?: string) => `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <pattern id="grid" width="20" height="20" patternUnits="userSpaceOnUse">
            <path d="M 20 0 L 0 0 0 20" fill="none" stroke="#39FF14" stroke-width="0.5" opacity="0.3"/>
          </pattern>
          <linearGradient id="cityGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#7A3BFF;stop-opacity:0.8" />
            <stop offset="50%" style="stop-color:#0A0A0A;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#E7352C;stop-opacity:0.9" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <rect width="400" height="300" fill="url(#cityGrad)"/>
        <rect width="400" height="300" fill="url(#grid)"/>
        <rect x="50" y="80" width="80" height="120" fill="#1A1A1A" stroke="#39FF14" stroke-width="1" opacity="0.8"/>
        <rect x="150" y="60" width="100" height="140" fill="#1A1A1A" stroke="#E7352C" stroke-width="1" opacity="0.8"/>
        <rect x="270" y="90" width="70" height="110" fill="#1A1A1A" stroke="#7A3BFF" stroke-width="1" opacity="0.8"/>
        <rect x="10" y="120" width="30" height="80" fill="#2A2B31" stroke="#39FF14" stroke-width="0.5" opacity="0.6"/>
        <rect x="360" y="110" width="30" height="90" fill="#2A2B31" stroke="#E7352C" stroke-width="0.5" opacity="0.6"/>
        ${topText ? `<text x="200" y="40" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="18" font-weight="bold" fill="#EDEEF0" filter="url(#glow)">${topText.toUpperCase()}</text>` : ''}
        ${centerText ? `<text x="200" y="155" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="14" font-weight="bold" fill="#39FF14" filter="url(#glow)">${centerText.toUpperCase()}</text>` : ''}
        ${bottomText ? `<text x="200" y="280" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="18" font-weight="bold" fill="#EDEEF0" filter="url(#glow)">${bottomText.toUpperCase()}</text>` : ''}
        <text x="20" y="285" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#E7352C" opacity="0.8">BODY BAGZ</text>
      </svg>
    `
  },
  'villain-portrait': {
    name: 'Villain Portrait', 
    icon: '💀',
    generate: (topText: string, bottomText: string, centerText?: string) => `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="skullGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" style="stop-color:#2A2B31;stop-opacity:0.9" />
            <stop offset="70%" style="stop-color:#0A0A0A;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
          </radialGradient>
          <filter id="redGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <rect width="400" height="300" fill="url(#skullGrad)"/>
        <ellipse cx="200" cy="150" rx="80" ry="90" fill="#1A1A1A" stroke="#E7352C" stroke-width="2" opacity="0.9"/>
        <ellipse cx="180" cy="130" rx="12" ry="18" fill="#000000" stroke="#E7352C" stroke-width="1"/>
        <ellipse cx="220" cy="130" rx="12" ry="18" fill="#000000" stroke="#E7352C" stroke-width="1"/>
        <circle cx="180" cy="135" r="3" fill="#E7352C" filter="url(#redGlow)"/>
        <circle cx="220" cy="135" r="3" fill="#E7352C" filter="url(#redGlow)"/>
        <polygon points="195,155 205,155 200,170" fill="#000000" stroke="#E7352C" stroke-width="1"/>
        <path d="M 180 180 Q 200 195 220 180" stroke="#E7352C" stroke-width="2" fill="none"/>
        <rect x="170" y="200" width="60" height="20" rx="10" fill="#2A2B31" stroke="#39FF14" stroke-width="1"/>
        <text x="200" y="212" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#39FF14">BODY BAGZ</text>
        ${topText ? `<text x="200" y="35" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="16" font-weight="bold" fill="#EDEEF0" filter="url(#redGlow)">${topText.toUpperCase()}</text>` : ''}
        ${centerText ? `<text x="200" y="270" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="12" font-weight="bold" fill="#39FF14" filter="url(#redGlow)">${centerText.toUpperCase()}</text>` : ''}
        ${bottomText ? `<text x="200" y="290" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="16" font-weight="bold" fill="#EDEEF0" filter="url(#redGlow)">${bottomText.toUpperCase()}</text>` : ''}
      </svg>
    `
  },
  'chaos-explosion': {
    name: 'Chaos Explosion',
    icon: '💥', 
    generate: (topText: string, bottomText: string, centerText?: string) => `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="explosionGrad" cx="50%" cy="50%" r="60%">
            <stop offset="0%" style="stop-color:#E7352C;stop-opacity:0.9" />
            <stop offset="30%" style="stop-color:#7A3BFF;stop-opacity:0.8" />
            <stop offset="70%" style="stop-color:#39FF14;stop-opacity:0.6" />
            <stop offset="100%" style="stop-color:#0A0A0A;stop-opacity:1" />
          </radialGradient>
          <filter id="chaos">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <rect width="400" height="300" fill="#0A0A0A"/>
        <circle cx="200" cy="150" r="100" fill="url(#explosionGrad)" filter="url(#chaos)"/>
        <polygon points="200,50 210,80 240,70 220,100 250,110 215,130 230,160 200,145 170,160 185,130 150,110 180,100 160,70 190,80" fill="#E7352C" opacity="0.8"/>
        <polygon points="200,80 205,95 220,90 210,105 225,110 207,120 215,135 200,127 185,135 193,120 175,110 190,105 180,90 195,95" fill="#39FF14" opacity="0.9"/>
        <circle cx="160" cy="120" r="8" fill="#7A3BFF" opacity="0.7" filter="url(#chaos)"/>
        <circle cx="240" cy="180" r="6" fill="#E7352C" opacity="0.8" filter="url(#chaos)"/>
        <circle cx="180" cy="200" r="4" fill="#39FF14" opacity="0.9" filter="url(#chaos)"/>
        <circle cx="220" cy="100" r="5" fill="#7A3BFF" opacity="0.7" filter="url(#chaos)"/>
        ${topText ? `<text x="200" y="30" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="18" font-weight="bold" fill="#EDEEF0" filter="url(#chaos)">${topText.toUpperCase()}</text>` : ''}
        ${centerText ? `<text x="200" y="155" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="14" font-weight="bold" fill="#EDEEF0" filter="url(#chaos)">${centerText.toUpperCase()}</text>` : ''}
        ${bottomText ? `<text x="200" y="285" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="18" font-weight="bold" fill="#EDEEF0" filter="url(#chaos)">${bottomText.toUpperCase()}</text>` : ''}
        <text x="350" y="290" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#E7352C" opacity="0.8">BODY BAGZ</text>
      </svg>
    `
  },
  'neon-street': {
    name: 'Neon Street',
    icon: '🌃',
    generate: (topText: string, bottomText: string, centerText?: string) => `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="streetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#2A2B31;stop-opacity:1" />
            <stop offset="50%" style="stop-color:#0A0A0A;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1A1A1A;stop-opacity:1" />
          </linearGradient>
          <filter id="neonGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <rect width="400" height="300" fill="url(#streetGrad)"/>
        <rect x="0" y="200" width="400" height="100" fill="#1A1A1A" stroke="#39FF14" stroke-width="1" opacity="0.8"/>
        <rect x="20" y="180" width="8" height="20" fill="#E7352C" filter="url(#neonGlow)"/>
        <rect x="50" y="170" width="6" height="30" fill="#39FF14" filter="url(#neonGlow)"/>
        <rect x="80" y="185" width="10" height="15" fill="#7A3BFF" filter="url(#neonGlow)"/>
        <rect x="320" y="175" width="8" height="25" fill="#E7352C" filter="url(#neonGlow)"/>
        <rect x="350" y="180" width="6" height="20" fill="#39FF14" filter="url(#neonGlow)"/>
        <rect x="370" y="170" width="10" height="30" fill="#7A3BFF" filter="url(#neonGlow)"/>
        <ellipse cx="200" cy="220" rx="60" ry="8" fill="#39FF14" opacity="0.3" filter="url(#neonGlow)"/>
        <rect x="160" y="230" width="80" height="30" rx="15" fill="#2A2B31" stroke="#E7352C" stroke-width="2" filter="url(#neonGlow)"/>
        <text x="200" y="250" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" font-weight="bold" fill="#E7352C">BODY BAGZ</text>
        ${topText ? `<text x="200" y="40" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="20" font-weight="bold" fill="#39FF14" filter="url(#neonGlow)">${topText.toUpperCase()}</text>` : ''}
        ${centerText ? `<text x="200" y="120" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="16" font-weight="bold" fill="#EDEEF0" filter="url(#neonGlow)">${centerText.toUpperCase()}</text>` : ''}
        ${bottomText ? `<text x="200" y="290" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="18" font-weight="bold" fill="#7A3BFF" filter="url(#neonGlow)">${bottomText.toUpperCase()}</text>` : ''}
      </svg>
    `
  },
  'glitch-matrix': {
    name: 'Glitch Matrix',
    icon: '👾',
    generate: (topText: string, bottomText: string, centerText?: string) => `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="glitch">
            <feOffset in="SourceGraphic" dx="2" dy="0" result="red"/>
            <feOffset in="SourceGraphic" dx="-2" dy="0" result="blue"/>
            <feFlood flood-color="#E7352C" result="redFlood"/>
            <feFlood flood-color="#39FF14" result="blueFlood"/>
            <feComposite in="redFlood" in2="red" operator="in" result="redChannel"/>
            <feComposite in="blueFlood" in2="blue" operator="in" result="blueChannel"/>
            <feMerge><feMergeNode in="redChannel"/><feMergeNode in="blueChannel"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <pattern id="matrix" width="10" height="10" patternUnits="userSpaceOnUse">
            <rect width="10" height="10" fill="#0A0A0A"/>
            <text x="5" y="8" text-anchor="middle" font-family="monospace" font-size="6" fill="#39FF14" opacity="0.6">1</text>
          </pattern>
        </defs>
        <rect width="400" height="300" fill="#0A0A0A"/>
        <rect width="400" height="300" fill="url(#matrix)" opacity="0.3"/>
        <rect x="50" y="50" width="300" height="200" fill="#1A1A1A" stroke="#E7352C" stroke-width="2" opacity="0.8"/>
        <rect x="60" y="80" width="280" height="2" fill="#39FF14" opacity="0.7"/>
        <rect x="60" y="120" width="280" height="2" fill="#7A3BFF" opacity="0.7"/>
        <rect x="60" y="160" width="280" height="2" fill="#E7352C" opacity="0.7"/>
        <rect x="60" y="200" width="280" height="2" fill="#39FF14" opacity="0.7"/>
        <circle cx="100" cy="130" r="3" fill="#E7352C" filter="url(#glitch)"/>
        <circle cx="300" cy="170" r="3" fill="#39FF14" filter="url(#glitch)"/>
        <rect x="170" y="240" width="60" height="15" rx="7" fill="#2A2B31" stroke="#7A3BFF" stroke-width="1"/>
        <text x="200" y="250" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#7A3BFF">BODY BAGZ</text>
        ${topText ? `<text x="200" y="35" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold" fill="#39FF14" filter="url(#glitch)">${topText.toUpperCase()}</text>` : ''}
        ${centerText ? `<text x="200" y="155" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" fill="#EDEEF0" filter="url(#glitch)">${centerText.toUpperCase()}</text>` : ''}
        ${bottomText ? `<text x="200" y="285" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold" fill="#E7352C" filter="url(#glitch)">${bottomText.toUpperCase()}</text>` : ''}
      </svg>
    `
  }
};

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
  const [centerText, setCenterText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState('cyberpunk-grid');
  const [textPosition, setTextPosition] = useState('standard');
  const [textStyle, setTextStyle] = useState('bold');
  const [currentPfp, setCurrentPfp] = useState(pfpVariants[0]);
  const [generatedPfpImage, setGeneratedPfpImage] = useState("");
  const [generatedMemeImage, setGeneratedMemeImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isGeneratingPfp, setIsGeneratingPfp] = useState(false);
  const [isGeneratingMeme, setIsGeneratingMeme] = useState(false);
  const [isGeneratingTweet, setIsGeneratingTweet] = useState(false);
  const [isSavingContent, setIsSavingContent] = useState(false);
  const { toast } = useToast();
  const { user, trackAction } = useUser();

  const saveContent = async (contentType: 'tweet' | 'meme' | 'pfp', title: string, content: string, metadata?: any) => {
    if (!user) {
      toast({
        title: "Login Required",
        description: "Please log in to save your generated content",
        variant: "destructive"
      });
      return;
    }

    setIsSavingContent(true);
    try {
      await apiRequest("POST", `/api/users/${user.id}/content`, {
        contentType,
        title,
        content,
        metadata
      });
      
      toast({
        title: "Content Saved!",
        description: `Your ${contentType} has been saved to your vault`,
      });
    } catch (error) {
      toast({
        title: "Save Failed",
        description: "Failed to save content. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSavingContent(false);
    }
  };

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
    if (!topText && !bottomText && !centerText && !uploadedImage) {
      toast({
        title: "Add content!",
        description: "Add text or upload an image for your meme",
        variant: "destructive"
      });
      return;
    }
    
    setIsGeneratingMeme(true);
    
    try {
      // Generate SVG meme using selected template
      const template = memeTemplates[selectedTemplate as keyof typeof memeTemplates];
      const svgContent = template.generate(topText, bottomText, centerText);
      
      // Convert SVG to data URL
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      // Create canvas to convert SVG to PNG for better compatibility
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      const img = new Image();
      
      img.onload = () => {
        canvas.width = 400;
        canvas.height = 300;
        ctx?.drawImage(img, 0, 0);
        
        const pngDataUrl = canvas.toDataURL('image/png');
        setGeneratedMemeImage(pngDataUrl);
        URL.revokeObjectURL(svgUrl);
        
        toast({
          title: "Meme Created!",
          description: user ? "Your chaos meme is ready to download (+4 points!)" : "Your chaos meme is ready to download",
        });
        
        if (user) {
          trackAction('meme_generated');
        }
      };
      
      img.onerror = () => {
        // Fallback: use SVG data URL directly
        const svgDataUrl = `data:image/svg+xml;base64,${btoa(svgContent)}`;
        setGeneratedMemeImage(svgDataUrl);
        URL.revokeObjectURL(svgUrl);
        
        toast({
          title: "Meme Created!",
          description: user ? "Your chaos meme is ready to download (+4 points!)" : "Your chaos meme is ready to download",
        });
        
        if (user) {
          trackAction('meme_generated');
        }
      };
      
      img.src = svgUrl;
      
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
        {/* EPIC BODY BAGZ SKULL BRANDING */}
        <div className="mb-12 flex justify-center">
          <div className="relative animate-pulse-glow">
            <div className="w-full max-w-2xl rounded-2xl overflow-hidden neon-card border border-blood-red/30">
              <img 
                src={epicSkullImg}
                alt="Body Bagz Epic Skull - Villain Era Branding"
                className="w-full h-auto object-cover"
                data-testid="epic-skull-banner"
              />
            </div>
            {/* Epic glow effects */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blood-red/20 via-toxic-green/20 to-glitch-purple/20 rounded-3xl blur-lg -z-10"></div>
          </div>
        </div>

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
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
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
                    <Button 
                      className="w-full py-4 bg-gradient-to-r from-toxic-green/60 to-toxic-green/70 hover:from-toxic-green/70 hover:to-toxic-green/80 text-white font-bold tracking-wide rounded-lg transition-all duration-200 border border-toxic-green/50"
                      onClick={() => saveContent('tweet', `Tweet ${Date.now()}`, generatedTweet)}
                      disabled={isSavingContent}
                      data-testid="button-save-tweet"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      {isSavingContent ? 'SAVING...' : 'SAVE'}
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
                <div className="w-full h-48 bg-gradient-to-br from-dim-gray to-jet-black rounded-lg flex items-center justify-center mb-4 relative border border-blood-red border-opacity-30 overflow-hidden">
                  {generatedMemeImage ? (
                    <img 
                      src={generatedMemeImage} 
                      alt="Generated meme"
                      className="w-full h-full object-contain rounded-lg"
                      data-testid="generated-meme-image"
                    />
                  ) : (
                    <div 
                      className="w-full h-full flex items-center justify-center rounded-lg"
                      dangerouslySetInnerHTML={{
                        __html: memeTemplates[selectedTemplate as keyof typeof memeTemplates]?.generate(
                          topText || 'TOP TEXT',
                          bottomText || 'BOTTOM TEXT', 
                          centerText || ''
                        ) || ''
                      }}
                      data-testid="meme-preview"
                    />
                  )}
                </div>
                {/* Template Selection */}
                <div className="mb-4">
                  <label className="text-ash-white text-sm font-semibold mb-2 block">MEME TEMPLATE</label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger className="cyber-input w-full text-ash-white" data-testid="select-meme-template">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-jet-black border border-dim-gray">
                      {Object.entries(memeTemplates).map(([key, template]) => (
                        <SelectItem key={key} value={key} className="text-ash-white hover:bg-dim-gray focus:bg-dim-gray">
                          {template.icon} {template.name}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Text Inputs */}
                <div className="grid grid-cols-1 gap-3 mb-4">
                  <Input 
                    type="text" 
                    placeholder="Top text..." 
                    value={topText}
                    onChange={(e) => setTopText(e.target.value)}
                    className="cyber-input w-full px-4 py-3 text-ash-white placeholder-dim-gray rounded-lg font-medium" 
                    data-testid="input-meme-top-text"
                  />
                  <Input 
                    type="text" 
                    placeholder="Center text (optional)..." 
                    value={centerText}
                    onChange={(e) => setCenterText(e.target.value)}
                    className="cyber-input w-full px-4 py-3 text-ash-white placeholder-dim-gray rounded-lg font-medium" 
                    data-testid="input-meme-center-text"
                  />
                  <Input 
                    type="text" 
                    placeholder="Bottom text..." 
                    value={bottomText}
                    onChange={(e) => setBottomText(e.target.value)}
                    className="cyber-input w-full px-4 py-3 text-ash-white placeholder-dim-gray rounded-lg font-medium" 
                    data-testid="input-meme-bottom-text"
                  />
                </div>
                {/* Quick Actions */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <Button 
                    type="button"
                    onClick={() => {
                      setTopText('');
                      setBottomText('');
                      setCenterText('');
                    }}
                    className="py-2 bg-gradient-to-r from-dim-gray/40 to-dim-gray/20 hover:from-dim-gray/60 hover:to-dim-gray/40 text-ash-white border border-dim-gray/30 font-semibold text-sm rounded-lg transition-all duration-200"
                    data-testid="button-clear-text"
                  >
                    🗑️ CLEAR TEXT
                  </Button>
                  <Button 
                    type="button"
                    onClick={() => {
                      const examples = [
                        { top: 'WHEN YOU', bottom: 'STACK $BAGZ', center: 'VILLAIN MODE' },
                        { top: 'CHAOS', bottom: 'IS PROFIT', center: 'BODY BAGZ' },
                        { top: 'BREAKING:', bottom: 'VILLAIN ERA ACTIVATED', center: '$BAGZ RISING' },
                        { top: 'ME BUYING', bottom: 'THE DIP AGAIN', center: 'DIAMOND HANDS' },
                        { top: 'PORTFOLIO', bottom: 'GO BRRR', center: '$BAGZ POWER' }
                      ];
                      const example = examples[Math.floor(Math.random() * examples.length)];
                      setTopText(example.top);
                      setBottomText(example.bottom);
                      setCenterText(example.center);
                    }}
                    className="py-2 bg-gradient-to-r from-toxic-green/20 to-toxic-green/10 hover:from-toxic-green/30 hover:to-toxic-green/20 text-toxic-green border border-toxic-green/30 font-semibold text-sm rounded-lg transition-all duration-200"
                    data-testid="button-example-text"
                  >
                    🎲 EXAMPLE
                  </Button>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button 
                      className="w-full py-4 bg-gradient-to-r from-purple-600 to-purple-700 hover:from-purple-700 hover:to-purple-800 text-white font-bold tracking-wide rounded-lg transition-all duration-200 border border-purple-500"
                      onClick={downloadMeme}
                      data-testid="button-download-meme"
                    >
                      📥 DOWNLOAD
                    </Button>
                    <Button 
                      className="w-full py-4 bg-gradient-to-r from-toxic-green/60 to-toxic-green/70 hover:from-toxic-green/70 hover:to-toxic-green/80 text-white font-bold tracking-wide rounded-lg transition-all duration-200 border border-toxic-green/50"
                      onClick={() => saveContent('meme', `Meme ${Date.now()}`, generatedMemeImage, { topText, bottomText })}
                      disabled={isSavingContent}
                      data-testid="button-save-meme"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      {isSavingContent ? 'SAVING...' : 'SAVE'}
                    </Button>
                  </div>
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
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <Button 
                      className="w-full py-4 bg-gradient-to-r from-green-600 to-green-700 hover:from-green-700 hover:to-green-800 text-white font-bold tracking-wide rounded-lg transition-all duration-200 border border-green-500"
                      onClick={downloadPfp}
                      data-testid="button-download-pfp"
                    >
                      📥 DOWNLOAD
                    </Button>
                    <Button 
                      className="w-full py-4 bg-gradient-to-r from-toxic-green/60 to-toxic-green/70 hover:from-toxic-green/70 hover:to-toxic-green/80 text-white font-bold tracking-wide rounded-lg transition-all duration-200 border border-toxic-green/50"
                      onClick={() => saveContent('pfp', currentPfp, generatedPfpImage)}
                      disabled={isSavingContent}
                      data-testid="button-save-pfp"
                    >
                      <Save className="w-4 h-4 mr-1" />
                      {isSavingContent ? 'SAVING...' : 'SAVE'}
                    </Button>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
