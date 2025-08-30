import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChainLinkIcon, BodyBagIcon, GasMaskIcon } from "@/components/icons";
import { useToast } from "@/hooks/use-toast";

const bullishTweets = [
  "Just bagged another mil in $BAGZ 💀 The villain era hits different when you're stacking chaos. NFA but this rocket's fueled by pure degeneracy 🚀",
  "While you're sleeping, $BAGZ holders are building an empire in the shadows. The chaos collective never rests 👤",
  "$BAGZ isn't just a token, it's a movement. For the culture, for the chaos, for the people who refuse to conform 🔥",
  "Zipped up another bag today. $BAGZ community growing stronger while the market bleeds. This is how villains win 💪",
  "The street chose $BAGZ. Underground vibes, premium gains. If you know, you know 🖤"
];

const pfpVariants = [
  "Hooded Chaos Reaper #1337",
  "Glitch Cat Villain #420",
  "Prepper Skull Lord #666",
  "Shadow Bag Keeper #999",
  "Digital Grim #2024"
];

export default function ToolsSection() {
  const [generatedTweet, setGeneratedTweet] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [currentPfp, setCurrentPfp] = useState(pfpVariants[0]);
  const { toast } = useToast();

  const generateTweet = () => {
    const randomTweet = bullishTweets[Math.floor(Math.random() * bullishTweets.length)];
    setGeneratedTweet(randomTweet);
    toast({
      title: "Tweet Generated!",
      description: "Copy and spread the chaos on X",
    });
  };

  const generateMeme = () => {
    if (!topText && !bottomText) {
      toast({
        title: "Add some text!",
        description: "Enter top or bottom text to create your meme",
        variant: "destructive"
      });
      return;
    }
    toast({
      title: "Meme Created!",
      description: "Your chaos meme is ready to share",
    });
  };

  const generatePfp = () => {
    const randomPfp = pfpVariants[Math.floor(Math.random() * pfpVariants.length)];
    setCurrentPfp(randomPfp);
    toast({
      title: "PFP Generated!",
      description: "Your villain profile is ready",
    });
  };

  return (
    <section id="tools" className="relative z-10 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-brand text-4xl md:text-5xl text-center text-blood-red mb-16" data-testid="tools-title">
          CHAOS TOOLS
        </h2>
        
        <div className="grid lg:grid-cols-3 gap-8">
          {/* Tweet Generator */}
          <div className="neon-card p-8 rounded-2xl" data-testid="tweet-generator">
            <div className="flex items-center mb-6">
              <ChainLinkIcon className="w-8 h-8 text-toxic-green mr-3" />
              <h3 className="font-tech text-xl text-toxic-green">TWEET GENERATOR</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-jet-black p-4 rounded border border-dim-gray min-h-[120px]">
                <p className="text-ash-white text-sm" data-testid="generated-tweet">
                  {generatedTweet || "Click below to generate a bullish tweet..."}
                </p>
              </div>
              <Button 
                className="cyber-button w-full py-3 text-ash-white font-semibold" 
                onClick={generateTweet}
                data-testid="button-generate-tweet"
              >
                GENERATE CHAOS
              </Button>
            </div>
          </div>

          {/* Meme Generator */}
          <div className="neon-card p-8 rounded-2xl" data-testid="meme-generator">
            <div className="flex items-center mb-6">
              <BodyBagIcon className="w-8 h-8 text-blood-red mr-3" />
              <h3 className="font-tech text-xl text-blood-red">MEME FACTORY</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-jet-black p-4 rounded border border-dim-gray text-center">
                <div className="w-full h-32 bg-dim-gray rounded flex items-center justify-center mb-4 relative">
                  <span className="text-ash-white text-sm">Body Bagz Meme Template</span>
                  {topText && (
                    <div className="absolute top-2 left-2 right-2 text-white font-bold text-xs">
                      {topText}
                    </div>
                  )}
                  {bottomText && (
                    <div className="absolute bottom-2 left-2 right-2 text-white font-bold text-xs">
                      {bottomText}
                    </div>
                  )}
                </div>
                <Input 
                  type="text" 
                  placeholder="Top text..." 
                  value={topText}
                  onChange={(e) => setTopText(e.target.value)}
                  className="w-full bg-jet-black border border-dim-gray rounded px-3 py-2 text-ash-white placeholder-dim-gray focus:border-toxic-green focus:outline-none mb-2" 
                  data-testid="input-meme-top-text"
                />
                <Input 
                  type="text" 
                  placeholder="Bottom text..." 
                  value={bottomText}
                  onChange={(e) => setBottomText(e.target.value)}
                  className="w-full bg-jet-black border border-dim-gray rounded px-3 py-2 text-ash-white placeholder-dim-gray focus:border-toxic-green focus:outline-none" 
                  data-testid="input-meme-bottom-text"
                />
              </div>
              <Button 
                className="cyber-button w-full py-3 text-ash-white font-semibold" 
                onClick={generateMeme}
                data-testid="button-create-meme"
              >
                CREATE MEME
              </Button>
            </div>
          </div>

          {/* PFP Generator */}
          <div className="neon-card p-8 rounded-2xl" data-testid="pfp-generator">
            <div className="flex items-center mb-6">
              <GasMaskIcon className="w-8 h-8 text-glitch-purple mr-3" />
              <h3 className="font-tech text-xl text-glitch-purple">PFP CHAOS</h3>
            </div>
            <div className="space-y-4">
              <div className="bg-jet-black p-4 rounded border border-dim-gray">
                <div className="w-32 h-32 mx-auto bg-dim-gray rounded-full flex items-center justify-center mb-4">
                  {/* Sample PFP Preview */}
                  <svg className="w-20 h-20 text-glitch-purple" viewBox="0 0 64 64" fill="currentColor">
                    <circle cx="32" cy="20" r="12"/>
                    <path d="M20 45c0-6.63 5.37-12 12-12s12 5.37 12 12v8H20v-8z"/>
                    <circle cx="28" cy="18" r="2" fill="#0A0A0B"/>
                    <circle cx="36" cy="18" r="2" fill="#0A0A0B"/>
                  </svg>
                </div>
                <p className="text-center text-dim-gray text-sm" data-testid="current-pfp">{currentPfp}</p>
              </div>
              <Button 
                className="cyber-button w-full py-3 text-ash-white font-semibold" 
                onClick={generatePfp}
                data-testid="button-generate-pfp"
              >
                GENERATE PFP
              </Button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
