import { useState, useRef } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { ChainLinkIcon, BodyBagIcon, GasMaskIcon } from "@/components/icons";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useUser } from "@/contexts/UserContext";
import { apiRequest } from "@/lib/queryClient";
import { Save, Mic, MicOff, Sparkles, Zap, Wand2, Palette, MessageSquare, Image, User } from "lucide-react";
import pfpHeaderImg from "@assets/generated_images/Cyberpunk_PFP_Generator_header_fad9f426.png";
import tweetHeaderImg from "@assets/generated_images/Cyberpunk_Tweet_Generator_header_85711bc6.png";
import memeHeaderImg from "@assets/generated_images/Cyberpunk_Meme_Creator_header_95968e4a.png";
import epicSkullImg from "@assets/generated_images/Epic_BODY_BAGZ_skull_branding_6dcb9ad5.png";

// Import bullish reaper meme templates
import reaperChartMeme from "@assets/generated_images/Reaper_bullish_chart_meme_122f2417.png";
import reaperMoneyMeme from "@assets/generated_images/Reaper_money_bags_meme_b5397ddd.png";
import reaperTradingMeme from "@assets/generated_images/Reaper_trading_setup_meme_f96e3ad5.png";
import reaperVictoryMeme from "@assets/generated_images/Reaper_victory_dance_meme_7374fee0.png";
import reaperDiamondMeme from "@assets/generated_images/Diamond_hands_reaper_meme_3147d7ae.png";
import reaperSleepMeme from "@assets/generated_images/Sleeping_reaper_confidence_meme_43c78b30.png";
import reaperCookingMeme from "@assets/generated_images/Reaper_cooking_gains_meme_db5bc9f2.png";
import reaperBusinessMeme from "@assets/generated_images/Business_reaper_success_meme_0b2baee5.png";
import reaperApprovalMeme from "@assets/generated_images/Reaper_approval_wealth_meme_93fed4c0.png";
import reaperRocketMeme from "@assets/generated_images/Reaper_rocket_moon_meme_ef7d2642.png";
import reaperStrengthMeme from "@assets/generated_images/Reaper_strength_gains_meme_e94151d5.png";

// Import 20 pre-made PFP collection
import pfp01 from "@assets/generated_images/Toxic_Green_Cyber_Assassin_d59133d7.png";
import pfp02 from "@assets/generated_images/Blood_Red_Android_Profile_70411c89.png";
import pfp03 from "@assets/generated_images/Purple_Skull_Overlord_9dd6bdc3.png";
import pfp04 from "@assets/generated_images/Cyber_Samurai_Warrior_2e32dee9.png";
import pfp05 from "@assets/generated_images/Cyber_Reaper_Commander_7f14f6b0.png";
import pfp06 from "@assets/generated_images/Neon_Hacker_Elite_cf2b2d73.png";
import pfp07 from "@assets/generated_images/Chrome_Assassin_Queen_234f8bba.png";
import pfp08 from "@assets/generated_images/Battle_Scarred_Soldier_86cd315d.png";
import pfp09 from "@assets/generated_images/Neon_Punk_Rebel_e72ba670.png";
import pfp10 from "@assets/generated_images/Corporate_Cyber_Elite_833f4e75.png";
import pfp11 from "@assets/generated_images/Cyber_Medic_Specialist_5d1f3b5c.png";
import pfp12 from "@assets/generated_images/Digital_Ghost_Runner_6767af22.png";
import pfp13 from "@assets/generated_images/Cyber_Bounty_Hunter_8f6af44d.png";
import pfp14 from "@assets/generated_images/Neo_Ninja_Operative_bafcd4a8.png";
import pfp15 from "@assets/generated_images/Cyber_Mechanic_Worker_c36b063a.png";
import pfp16 from "@assets/generated_images/Cyber_Shaman_Mystic_c169fd87.png";
import pfp17 from "@assets/generated_images/Cyber_Pilot_Ace_94ecb3aa.png";
import pfp18 from "@assets/generated_images/Cyber_Cage_Fighter_e071f7ad.png";
import pfp19 from "@assets/generated_images/Corporate_Security_Chief_ffa43132.png";
import pfp20 from "@assets/generated_images/Cyber_Digital_Artist_581d26ce.png";

const bullishTweets = [
  "Just bagged another mil in $BAGZ. The villain era hits different when you're stacking chaos. NFA but this rocket's fueled by pure degeneracy.",
  "While you're sleeping, $BAGZ holders are building an empire in the shadows. The chaos collective never rests.",
  "$BAGZ isn't just a token, it's a movement. For the culture, for the chaos, for the people who refuse to conform.",
  "Zipped up another bag today. $BAGZ community growing stronger while the market bleeds. This is how villains win.",
  "The street chose $BAGZ. Underground vibes, premium gains. If you know, you know."
];

// Premium PFP Collection - 20 High-Quality Profile Pictures
const premiumPfpCollection = [
  { id: "BAGZ-001", name: "Toxic Green Cyber Assassin", image: pfp01, rarity: "common" },
  { id: "BAGZ-002", name: "Blood Red Android Profile", image: pfp02, rarity: "common" },
  { id: "BAGZ-003", name: "Purple Skull Overlord", image: pfp03, rarity: "rare" },
  { id: "BAGZ-004", name: "Cyber Samurai Warrior", image: pfp04, rarity: "common" },
  { id: "BAGZ-005", name: "Cyber Reaper Commander", image: pfp05, rarity: "legendary" },
  { id: "BAGZ-006", name: "Neon Hacker Elite", image: pfp06, rarity: "common" },
  { id: "BAGZ-007", name: "Chrome Assassin Queen", image: pfp07, rarity: "rare" },
  { id: "BAGZ-008", name: "Battle Scarred Soldier", image: pfp08, rarity: "common" },
  { id: "BAGZ-009", name: "Neon Punk Rebel", image: pfp09, rarity: "common" },
  { id: "BAGZ-010", name: "Corporate Cyber Elite", image: pfp10, rarity: "rare" },
  { id: "BAGZ-011", name: "Cyber Medic Specialist", image: pfp11, rarity: "common" },
  { id: "BAGZ-012", name: "Digital Ghost Runner", image: pfp12, rarity: "rare" },
  { id: "BAGZ-013", name: "Cyber Bounty Hunter", image: pfp13, rarity: "common" },
  { id: "BAGZ-014", name: "Neo Ninja Operative", image: pfp14, rarity: "rare" },
  { id: "BAGZ-015", name: "Cyber Mechanic Worker", image: pfp15, rarity: "common" },
  { id: "BAGZ-016", name: "Cyber Shaman Mystic", image: pfp16, rarity: "legendary" },
  { id: "BAGZ-017", name: "Cyber Pilot Ace", image: pfp17, rarity: "common" },
  { id: "BAGZ-018", name: "Cyber Cage Fighter", image: pfp18, rarity: "common" },
  { id: "BAGZ-019", name: "Corporate Security Chief", image: pfp19, rarity: "rare" },
  { id: "BAGZ-020", name: "Cyber Digital Artist", image: pfp20, rarity: "legendary" }
];

// Type definitions for meme templates
type SVGMemeTemplate = {
  name: string;
  icon: string;
  generate: (topText: string, bottomText: string, centerText?: string) => string;
};

type ImageMemeTemplate = {
  name: string;
  icon: string;
  isImage: true;
  imageUrl: string;
  generate: () => string;
};

type MemeTemplate = SVGMemeTemplate | ImageMemeTemplate;

const memeTemplates: Record<string, MemeTemplate> = {
  'cyberpunk-grid': {
    name: 'Cyberpunk Grid',
    icon: '🏢',
    generate: (topText: string, bottomText: string, centerText?: string) => `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="premiumCityGrad" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#7A3BFF;stop-opacity:1" />
            <stop offset="25%" style="stop-color:#0A0A0A;stop-opacity:1" />
            <stop offset="75%" style="stop-color:#1A1A1A;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#E7352C;stop-opacity:0.9" />
          </linearGradient>
          <pattern id="advancedGrid" width="15" height="15" patternUnits="userSpaceOnUse">
            <rect width="15" height="15" fill="none"/>
            <path d="M 15 0 L 0 0 0 15" fill="none" stroke="#39FF14" stroke-width="0.8" opacity="0.4"/>
            <circle cx="7.5" cy="7.5" r="0.5" fill="#39FF14" opacity="0.6"/>
          </pattern>
          <filter id="premiumGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="textStroke">
            <feFlood flood-color="#000000" result="black"/>
            <feMorphology in="SourceGraphic" operator="dilate" radius="2" result="stroke"/>
            <feComposite in="black" in2="stroke" operator="in" result="strokeBlack"/>
            <feMerge><feMergeNode in="strokeBlack"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <rect width="400" height="300" fill="url(#premiumCityGrad)"/>
        <rect width="400" height="300" fill="url(#advancedGrid)"/>
        
        <!-- Premium Building Structures -->
        <g filter="url(#premiumGlow)">
          <rect x="40" y="70" width="90" height="130" fill="#1A1A1A" stroke="#39FF14" stroke-width="2" opacity="0.9"/>
          <rect x="45" y="80" width="15" height="8" fill="#39FF14" opacity="0.7"/>
          <rect x="65" y="80" width="15" height="8" fill="#39FF14" opacity="0.7"/>
          <rect x="85" y="80" width="15" height="8" fill="#39FF14" opacity="0.7"/>
          <rect x="105" y="80" width="15" height="8" fill="#39FF14" opacity="0.7"/>
          
          <rect x="150" y="50" width="100" height="150" fill="#1A1A1A" stroke="#E7352C" stroke-width="2" opacity="0.9"/>
          <rect x="160" y="70" width="20" height="12" fill="#E7352C" opacity="0.8"/>
          <rect x="190" y="70" width="20" height="12" fill="#E7352C" opacity="0.8"/>
          <rect x="220" y="70" width="20" height="12" fill="#E7352C" opacity="0.8"/>
          
          <rect x="270" y="80" width="80" height="120" fill="#1A1A1A" stroke="#7A3BFF" stroke-width="2" opacity="0.9"/>
          <rect x="280" y="100" width="12" height="10" fill="#7A3BFF" opacity="0.9"/>
          <rect x="300" y="100" width="12" height="10" fill="#7A3BFF" opacity="0.9"/>
          <rect x="320" y="100" width="12" height="10" fill="#7A3BFF" opacity="0.9"/>
        </g>
        
        <!-- Atmospheric Effects -->
        <rect x="0" y="0" width="400" height="50" fill="url(#premiumCityGrad)" opacity="0.3"/>
        <rect x="0" y="250" width="400" height="50" fill="url(#premiumCityGrad)" opacity="0.3"/>
        
        <!-- Body Bagz Branding -->
        <rect x="150" y="220" width="100" height="25" rx="12" fill="#2A2B31" stroke="#E7352C" stroke-width="2" filter="url(#premiumGlow)"/>
        <text x="200" y="237" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="12" font-weight="bold" fill="#E7352C">BODY BAGZ</text>
        
        ${topText ? `<text x="200" y="35" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="22" font-weight="bold" fill="#BDC1C6" filter="url(#textStroke)">${topText.toUpperCase()}</text>` : ''}
        ${centerText ? `<text x="200" y="150" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="16" font-weight="bold" fill="#39FF14" filter="url(#premiumGlow)">${centerText.toUpperCase()}</text>` : ''}
        ${bottomText ? `<text x="200" y="275" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="22" font-weight="bold" fill="#BDC1C6" filter="url(#textStroke)">${bottomText.toUpperCase()}</text>` : ''}
      </svg>
    `
  },
  'villain-portrait': {
    name: 'Villain Portrait', 
    icon: '💀',
    generate: (topText: string, bottomText: string, centerText?: string) => `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="premiumSkullGrad" cx="50%" cy="30%" r="80%">
            <stop offset="0%" style="stop-color:#7A3BFF;stop-opacity:0.6" />
            <stop offset="40%" style="stop-color:#2A2B31;stop-opacity:0.9" />
            <stop offset="80%" style="stop-color:#0A0A0A;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
          </radialGradient>
          <filter id="skullGlow">
            <feGaussianBlur stdDeviation="5" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="redFire">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feOffset in="coloredBlur" dx="1" dy="1" result="offsetBlur"/>
            <feMerge><feMergeNode in="offsetBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <rect width="400" height="300" fill="url(#premiumSkullGrad)"/>
        
        <!-- Enhanced Skull Design -->
        <g filter="url(#skullGlow)">
          <ellipse cx="200" cy="140" rx="90" ry="100" fill="#1A1A1A" stroke="#E7352C" stroke-width="3" opacity="0.95"/>
          
          <!-- Eye Sockets with Glow -->
          <ellipse cx="175" cy="120" rx="18" ry="25" fill="#000000" stroke="#E7352C" stroke-width="2"/>
          <ellipse cx="225" cy="120" rx="18" ry="25" fill="#000000" stroke="#E7352C" stroke-width="2"/>
          <circle cx="175" cy="125" r="6" fill="#E7352C" filter="url(#redFire)"/>
          <circle cx="225" cy="125" r="6" fill="#E7352C" filter="url(#redFire)"/>
          <circle cx="175" cy="125" r="2" fill="#39FF14" opacity="0.8"/>
          <circle cx="225" cy="125" r="2" fill="#39FF14" opacity="0.8"/>
          
          <!-- Detailed Nose -->
          <polygon points="195,150 205,150 200,175 190,165" fill="#000000" stroke="#E7352C" stroke-width="2"/>
          
          <!-- Enhanced Mouth -->
          <path d="M 170 185 Q 200 210 230 185" stroke="#E7352C" stroke-width="3" fill="none"/>
          <rect x="185" y="190" width="4" height="15" fill="#000000" rx="2"/>
          <rect x="195" y="190" width="4" height="20" fill="#000000" rx="2"/>
          <rect x="205" y="190" width="4" height="15" fill="#000000" rx="2"/>
          <rect x="215" y="190" width="4" height="18" fill="#000000" rx="2"/>
        </g>
        
        <!-- Atmospheric Smoke Effects -->
        <circle cx="150" cy="80" r="15" fill="#7A3BFF" opacity="0.3" filter="url(#skullGlow)"/>
        <circle cx="250" cy="90" r="20" fill="#E7352C" opacity="0.2" filter="url(#skullGlow)"/>
        <circle cx="120" cy="200" r="12" fill="#39FF14" opacity="0.4" filter="url(#skullGlow)"/>
        
        <!-- Premium Body Bagz Branding -->
        <rect x="160" y="250" width="80" height="30" rx="15" fill="#2A2B31" stroke="#39FF14" stroke-width="2" filter="url(#skullGlow)"/>
        <text x="200" y="268" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="12" font-weight="bold" fill="#39FF14">BODY BAGZ</text>
        <text x="200" y="278" text-anchor="middle" font-family="Arial, sans-serif" font-size="6" font-weight="bold" fill="#E7352C">VILLAIN ERA</text>
        
        ${topText ? `<text x="200" y="25" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="20" font-weight="bold" fill="#BDC1C6" filter="url(#redFire)">${topText.toUpperCase()}</text>` : ''}
        ${centerText ? `<text x="200" y="55" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="14" font-weight="bold" fill="#39FF14" filter="url(#skullGlow)">${centerText.toUpperCase()}</text>` : ''}
        ${bottomText ? `<text x="200" y="295" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="20" font-weight="bold" fill="#BDC1C6" filter="url(#redFire)">${bottomText.toUpperCase()}</text>` : ''}
      </svg>
    `
  },
  'chaos-explosion': {
    name: 'Chaos Explosion',
    icon: '💥', 
    generate: (topText: string, bottomText: string, centerText?: string) => `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="chaosExplosion" cx="50%" cy="50%" r="70%">
            <stop offset="0%" style="stop-color:#E7352C;stop-opacity:1" />
            <stop offset="20%" style="stop-color:#7A3BFF;stop-opacity:0.9" />
            <stop offset="40%" style="stop-color:#39FF14;stop-opacity:0.8" />
            <stop offset="60%" style="stop-color:#E7352C;stop-opacity:0.7" />
            <stop offset="80%" style="stop-color:#1A1A1A;stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:#0A0A0A;stop-opacity:1" />
          </radialGradient>
          <filter id="chaosEffect">
            <feGaussianBlur stdDeviation="6" result="coloredBlur"/>
            <feOffset in="coloredBlur" dx="2" dy="2" result="offsetBlur"/>
            <feMerge><feMergeNode in="offsetBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="lightning">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feOffset in="SourceGraphic" dx="1" dy="0" result="red"/>
            <feOffset in="SourceGraphic" dx="-1" dy="0" result="blue"/>
            <feMerge><feMergeNode in="red"/><feMergeNode in="blue"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
        </defs>
        <rect width="400" height="300" fill="#0A0A0A"/>
        <circle cx="200" cy="150" r="120" fill="url(#chaosExplosion)" filter="url(#chaosEffect)"/>
        
        <!-- Advanced Explosion Effects -->
        <g filter="url(#chaosEffect)">
          <polygon points="200,30 220,90 280,60 230,110 290,130 225,140 250,180 200,155 150,180 175,140 110,130 170,110 120,60 180,90" fill="#E7352C" opacity="0.9"/>
          <polygon points="200,70 210,100 240,90 220,120 250,130 217,135 235,155 200,142 165,155 183,135 150,130 180,120 160,90 190,100" fill="#39FF14" opacity="0.95"/>
          <polygon points="200,90 205,110 220,105 210,120 225,125 212,128 220,140 200,133 180,140 188,128 175,125 190,120 180,105 195,110" fill="#7A3BFF" opacity="0.8"/>
        </g>
        
        <!-- Energy Particles -->
        <circle cx="130" cy="100" r="12" fill="#E7352C" opacity="0.8" filter="url(#chaosEffect)"/>
        <circle cx="270" cy="120" r="8" fill="#39FF14" opacity="0.9" filter="url(#chaosEffect)"/>
        <circle cx="160" cy="220" r="6" fill="#7A3BFF" opacity="0.8" filter="url(#chaosEffect)"/>
        <circle cx="240" cy="200" r="10" fill="#E7352C" opacity="0.7" filter="url(#chaosEffect)"/>
        <circle cx="100" cy="180" r="7" fill="#39FF14" opacity="0.85" filter="url(#chaosEffect)"/>
        <circle cx="300" cy="170" r="9" fill="#7A3BFF" opacity="0.75" filter="url(#chaosEffect)"/>
        
        <!-- Premium Branding -->
        <rect x="320" y="260" width="70" height="25" rx="12" fill="#2A2B31" stroke="#E7352C" stroke-width="2" filter="url(#chaosEffect)"/>
        <text x="355" y="275" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="10" font-weight="bold" fill="#E7352C">BODY BAGZ</text>
        
        ${topText ? `<text x="200" y="25" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="22" font-weight="bold" fill="#BDC1C6" filter="url(#lightning)">${topText.toUpperCase()}</text>` : ''}
        ${centerText ? `<text x="200" y="155" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="16" font-weight="bold" fill="#BDC1C6" filter="url(#chaosEffect)">${centerText.toUpperCase()}</text>` : ''}
        ${bottomText ? `<text x="200" y="290" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="22" font-weight="bold" fill="#BDC1C6" filter="url(#lightning)">${bottomText.toUpperCase()}</text>` : ''}
      </svg>
    `
  },
  'neon-street': {
    name: 'Neon Street',
    icon: '🌃',
    generate: (topText: string, bottomText: string, centerText?: string) => `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="neonStreetGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#7A3BFF;stop-opacity:0.8" />
            <stop offset="30%" style="stop-color:#2A2B31;stop-opacity:1" />
            <stop offset="70%" style="stop-color:#0A0A0A;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#1A1A1A;stop-opacity:1" />
          </linearGradient>
          <filter id="neonBloom">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge><feMergeNode in="coloredBlur"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <filter id="streetGlow">
            <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
            <feDropShadow dx="0" dy="0" stdDeviation="3" flood-color="#39FF14" flood-opacity="0.8"/>
          </filter>
        </defs>
        <rect width="400" height="300" fill="url(#neonStreetGrad)"/>
        
        <!-- Street Ground -->
        <rect x="0" y="200" width="400" height="100" fill="#1A1A1A" stroke="#39FF14" stroke-width="2" opacity="0.9"/>
        <rect x="0" y="210" width="400" height="2" fill="#39FF14" opacity="0.6"/>
        <rect x="0" y="220" width="400" height="1" fill="#E7352C" opacity="0.4"/>
        
        <!-- Premium Neon Signs -->
        <g filter="url(#neonBloom)">
          <rect x="30" y="160" width="12" height="40" fill="#E7352C" rx="6"/>
          <rect x="60" y="150" width="10" height="50" fill="#39FF14" rx="5"/>
          <rect x="90" y="165" width="15" height="35" fill="#7A3BFF" rx="7"/>
          <rect x="120" y="155" width="8" height="45" fill="#E7352C" rx="4"/>
          
          <rect x="260" y="155" width="12" height="45" fill="#39FF14" rx="6"/>
          <rect x="290" y="160" width="10" height="40" fill="#7A3BFF" rx="5"/>
          <rect x="320" y="150" width="15" height="50" fill="#E7352C" rx="7"/>
          <rect x="350" y="165" width="8" height="35" fill="#39FF14" rx="4"/>
        </g>
        
        <!-- Street Reflections -->
        <ellipse cx="200" cy="230" rx="80" ry="12" fill="#39FF14" opacity="0.2" filter="url(#streetGlow)"/>
        <ellipse cx="200" cy="240" rx="60" ry="8" fill="#E7352C" opacity="0.15"/>
        <ellipse cx="200" cy="250" rx="40" ry="6" fill="#7A3BFF" opacity="0.1"/>
        
        <!-- Atmospheric Fog -->
        <rect x="0" y="180" width="400" height="30" fill="url(#neonStreetGrad)" opacity="0.4"/>
        
        <!-- Enhanced Branding -->
        <rect x="150" y="240" width="100" height="35" rx="17" fill="#2A2B31" stroke="#E7352C" stroke-width="3" filter="url(#neonBloom)"/>
        <text x="200" y="258" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="14" font-weight="bold" fill="#E7352C">BODY BAGZ</text>
        <text x="200" y="270" text-anchor="middle" font-family="Arial, sans-serif" font-size="8" font-weight="bold" fill="#39FF14">NEON VILLAIN</text>
        
        ${topText ? `<text x="200" y="35" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="24" font-weight="bold" fill="#39FF14" filter="url(#neonBloom)">${topText.toUpperCase()}</text>` : ''}
        ${centerText ? `<text x="200" y="110" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="18" font-weight="bold" fill="#BDC1C6" filter="url(#streetGlow)">${centerText.toUpperCase()}</text>` : ''}
        ${bottomText ? `<text x="200" y="295" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="22" font-weight="bold" fill="#7A3BFF" filter="url(#neonBloom)">${bottomText.toUpperCase()}</text>` : ''}
      </svg>
    `
  },
  'glitch-matrix': {
    name: 'Glitch Matrix',
    icon: '👾',
    generate: (topText: string, bottomText: string, centerText?: string) => `
      <svg viewBox="0 0 400 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <filter id="advancedGlitch">
            <feOffset in="SourceGraphic" dx="3" dy="0" result="red"/>
            <feOffset in="SourceGraphic" dx="-3" dy="0" result="blue"/>
            <feOffset in="SourceGraphic" dx="0" dy="2" result="green"/>
            <feFlood flood-color="#E7352C" result="redFlood"/>
            <feFlood flood-color="#39FF14" result="greenFlood"/>
            <feFlood flood-color="#7A3BFF" result="blueFlood"/>
            <feComposite in="redFlood" in2="red" operator="in" result="redChannel"/>
            <feComposite in="greenFlood" in2="green" operator="in" result="greenChannel"/>
            <feComposite in="blueFlood" in2="blue" operator="in" result="blueChannel"/>
            <feMerge><feMergeNode in="redChannel"/><feMergeNode in="greenChannel"/><feMergeNode in="blueChannel"/><feMergeNode in="SourceGraphic"/></feMerge>
          </filter>
          <pattern id="matrixCode" width="8" height="12" patternUnits="userSpaceOnUse">
            <rect width="8" height="12" fill="#0A0A0A"/>
            <text x="4" y="9" text-anchor="middle" font-family="monospace" font-size="7" fill="#39FF14" opacity="0.7">0</text>
          </pattern>
          <pattern id="matrixCode2" width="10" height="14" patternUnits="userSpaceOnUse">
            <rect width="10" height="14" fill="#0A0A0A"/>
            <text x="5" y="10" text-anchor="middle" font-family="monospace" font-size="8" fill="#39FF14" opacity="0.5">1</text>
          </pattern>
          <filter id="dataGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feDropShadow dx="0" dy="0" stdDeviation="2" flood-color="#39FF14" flood-opacity="0.8"/>
          </filter>
        </defs>
        <rect width="400" height="300" fill="#0A0A0A"/>
        <rect width="400" height="150" fill="url(#matrixCode)" opacity="0.4"/>
        <rect x="0" y="150" width="400" height="150" fill="url(#matrixCode2)" opacity="0.3"/>
        
        <!-- Main Terminal -->
        <g filter="url(#dataGlow)">
          <rect x="40" y="40" width="320" height="220" fill="#1A1A1A" stroke="#39FF14" stroke-width="3" opacity="0.95" rx="10"/>
          <rect x="50" y="50" width="300" height="20" fill="#2A2B31" stroke="#39FF14" stroke-width="1"/>
          <circle cx="60" cy="60" r="3" fill="#E7352C"/>
          <circle cx="70" cy="60" r="3" fill="#39FF14"/>
          <circle cx="80" cy="60" r="3" fill="#7A3BFF"/>
        </g>
        
        <!-- Data Streams -->
        <g filter="url(#advancedGlitch)" opacity="0.8">
          <rect x="60" y="90" width="280" height="3" fill="#39FF14"/>
          <rect x="60" y="110" width="280" height="2" fill="#E7352C"/>
          <rect x="60" y="130" width="280" height="3" fill="#7A3BFF"/>
          <rect x="60" y="150" width="280" height="2" fill="#39FF14"/>
          <rect x="60" y="170" width="280" height="3" fill="#E7352C"/>
          <rect x="60" y="190" width="280" height="2" fill="#7A3BFF"/>
          <rect x="60" y="210" width="280" height="3" fill="#39FF14"/>
        </g>
        
        <!-- Glitch Elements -->
        <circle cx="120" cy="140" r="5" fill="#E7352C" filter="url(#advancedGlitch)" opacity="0.9"/>
        <circle cx="280" cy="180" r="4" fill="#39FF14" filter="url(#advancedGlitch)" opacity="0.8"/>
        <rect x="200" y="120" width="8" height="8" fill="#7A3BFF" filter="url(#advancedGlitch)" opacity="0.7"/>
        
        <!-- Enhanced Branding -->
        <rect x="160" y="230" width="80" height="25" rx="12" fill="#2A2B31" stroke="#7A3BFF" stroke-width="2" filter="url(#dataGlow)"/>
        <text x="200" y="245" text-anchor="middle" font-family="monospace" font-size="11" font-weight="bold" fill="#7A3BFF">BODY BAGZ</text>
        <text x="200" y="252" text-anchor="middle" font-family="monospace" font-size="6" font-weight="bold" fill="#39FF14">MATRIX.EXE</text>
        
        ${topText ? `<text x="200" y="25" text-anchor="middle" font-family="monospace" font-size="20" font-weight="bold" fill="#39FF14" filter="url(#advancedGlitch)">${topText.toUpperCase()}</text>` : ''}
        ${centerText ? `<text x="200" y="155" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold" fill="#BDC1C6" filter="url(#dataGlow)">${centerText.toUpperCase()}</text>` : ''}
        ${bottomText ? `<text x="200" y="290" text-anchor="middle" font-family="monospace" font-size="20" font-weight="bold" fill="#E7352C" filter="url(#advancedGlitch)">${bottomText.toUpperCase()}</text>` : ''}
      </svg>
    `
  },
  // Bullish Reaper Meme Templates
  'reaper-bullish-chart': {
    name: 'Bullish Chart Reaper',
    icon: '📈',
    isImage: true,
    imageUrl: reaperChartMeme,
    generate: () => reaperChartMeme
  },
  'reaper-money-bags': {
    name: 'Money Bags Reaper',
    icon: '💰',
    isImage: true,
    imageUrl: reaperMoneyMeme,
    generate: () => reaperMoneyMeme
  },
  'reaper-trading-setup': {
    name: 'Trading Setup Reaper',
    icon: '🖥️',
    isImage: true,
    imageUrl: reaperTradingMeme,
    generate: () => reaperTradingMeme
  },
  'reaper-victory-dance': {
    name: 'Victory Dance Reaper',
    icon: '🎉',
    isImage: true,
    imageUrl: reaperVictoryMeme,
    generate: () => reaperVictoryMeme
  },
  'reaper-diamond-hands': {
    name: 'Diamond Hands Reaper',
    icon: '💎',
    isImage: true,
    imageUrl: reaperDiamondMeme,
    generate: () => reaperDiamondMeme
  },
  'reaper-sleeping-confident': {
    name: 'Sleeping Confident Reaper',
    icon: '😴',
    isImage: true,
    imageUrl: reaperSleepMeme,
    generate: () => reaperSleepMeme
  },
  'reaper-cooking-gains': {
    name: 'Cooking Gains Reaper',
    icon: '👨‍🍳',
    isImage: true,
    imageUrl: reaperCookingMeme,
    generate: () => reaperCookingMeme
  },
  'reaper-business-success': {
    name: 'Business Success Reaper',
    icon: '💼',
    isImage: true,
    imageUrl: reaperBusinessMeme,
    generate: () => reaperBusinessMeme
  },
  'reaper-approval-wealth': {
    name: 'Approval Wealth Reaper',
    icon: '👍',
    isImage: true,
    imageUrl: reaperApprovalMeme,
    generate: () => reaperApprovalMeme
  },
  'reaper-rocket-moon': {
    name: 'Rocket Moon Reaper',
    icon: '🚀',
    isImage: true,
    imageUrl: reaperRocketMeme,
    generate: () => reaperRocketMeme
  },
  'reaper-strength-gains': {
    name: 'Strength Gains Reaper',
    icon: '💪',
    isImage: true,
    imageUrl: reaperStrengthMeme,
    generate: () => reaperStrengthMeme
  }
};

// Legacy AI prompts replaced with premium pre-made collection

export default function ToolsSection() {
  // Tab state for clean UI navigation
  const [activeTab, setActiveTab] = useState<'tweet' | 'meme' | 'pfp'>('tweet');
  
  const [generatedTweet, setGeneratedTweet] = useState("");
  const [topText, setTopText] = useState("");
  const [bottomText, setBottomText] = useState("");
  const [centerText, setCenterText] = useState("");
  const [selectedTemplate, setSelectedTemplate] = useState('cyberpunk-grid');
  const [textPosition, setTextPosition] = useState('standard');
  const [textStyle, setTextStyle] = useState('bold');
  const [currentPfp, setCurrentPfp] = useState(premiumPfpCollection[0]);
  const [generatedPfpImage, setGeneratedPfpImage] = useState("");
  const [generatedMemeImage, setGeneratedMemeImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState<File | null>(null);
  const [isGeneratingPfp, setIsGeneratingPfp] = useState(false);
  const [isGeneratingMeme, setIsGeneratingMeme] = useState(false);
  const [isGeneratingTweet, setIsGeneratingTweet] = useState(false);
  const [isSavingContent, setIsSavingContent] = useState(false);
  
  // 🚀 AI-Powered Chaos Features
  const [aiSuggestions, setAiSuggestions] = useState<string[]>([]);
  const [isLoadingAiSuggestions, setIsLoadingAiSuggestions] = useState(false);
  const [chaosScore, setChaosScore] = useState<number>(0);
  
  // 🎤 Voice-to-Meme Features
  const [isRecording, setIsRecording] = useState(false);
  const [isProcessingVoice, setIsProcessingVoice] = useState(false);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);
  
  // 🎨 Advanced Image Effects
  const [selectedFilter, setSelectedFilter] = useState('none');
  const [imageOpacity, setImageOpacity] = useState(100);
  const [glitchIntensity, setGlitchIntensity] = useState(0);
  
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
    const template = memeTemplates[selectedTemplate as keyof typeof memeTemplates];
    
    // Check if it's an image-based template (reaper memes)
    if ('isImage' in template && template.isImage) {
      setIsGeneratingMeme(true);
      
      try {
        // For image-based templates, use the image directly
        const imageUrl = template.imageUrl;
        setGeneratedMemeImage(imageUrl);
        
        toast({
          title: "Meme Ready!",
          description: user ? "Your bullish reaper meme is ready to download (+4 points!)" : "Your bullish reaper meme is ready to download",
        });
        
        if (user) {
          trackAction('meme_generated');
        }
      } catch (error) {
        console.error('Error loading meme:', error);
        toast({
          title: "Loading Error",
          description: "Failed to load meme template. Try again.",
          variant: "destructive"
        });
      } finally {
        setIsGeneratingMeme(false);
      }
      return;
    }
    
    // Check for content
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
      const canvas = document.createElement('canvas');
      const ctx = canvas.getContext('2d');
      if (!ctx) throw new Error('Canvas context not available');
      
      canvas.width = 400;
      canvas.height = 300;
      
      // If user uploaded an image, use it as background
      if (uploadedImage) {
        const uploadedImageUrl = URL.createObjectURL(uploadedImage);
        const uploadedImg = new Image();
        
        uploadedImg.onload = () => {
          // Draw uploaded image as background
          ctx.drawImage(uploadedImg, 0, 0, 400, 300);
          
          // Apply advanced filters
          if (selectedFilter !== 'none') {
            applyImageFilter(canvas, ctx);
          }
          
          // Add text overlays with cyberpunk styling
          ctx.textAlign = 'center';
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 3;
          
          // Top text
          if (topText) {
            ctx.font = 'bold 28px Arial Black, sans-serif';
            ctx.fillStyle = '#BDC1C6';
            ctx.strokeText(topText.toUpperCase(), 200, 40);
            ctx.fillText(topText.toUpperCase(), 200, 40);
          }
          
          // Center text  
          if (centerText) {
            ctx.font = 'bold 20px Arial Black, sans-serif';
            ctx.fillStyle = '#39FF14';
            ctx.strokeText(centerText.toUpperCase(), 200, 160);
            ctx.fillText(centerText.toUpperCase(), 200, 160);
          }
          
          // Bottom text
          if (bottomText) {
            ctx.font = 'bold 28px Arial Black, sans-serif';
            ctx.fillStyle = '#BDC1C6';
            ctx.strokeText(bottomText.toUpperCase(), 200, 280);
            ctx.fillText(bottomText.toUpperCase(), 200, 280);
          }
          
          // Add Body Bagz watermark
          ctx.font = 'bold 12px Arial Black, sans-serif';
          ctx.fillStyle = '#E7352C';
          ctx.strokeStyle = '#000000';
          ctx.lineWidth = 1;
          ctx.strokeText('BODY BAGZ', 350, 290);
          ctx.fillText('BODY BAGZ', 350, 290);
          
          const pngDataUrl = canvas.toDataURL('image/png');
          setGeneratedMemeImage(pngDataUrl);
          URL.revokeObjectURL(uploadedImageUrl);
          
          toast({
            title: "Custom Meme Created!",
            description: user ? "Your custom meme is ready to download (+4 points!)" : "Your custom meme is ready to download",
          });
          
          if (user) {
            trackAction('meme_generated');
          }
          setIsGeneratingMeme(false);
        };
        
        uploadedImg.onerror = () => {
          URL.revokeObjectURL(uploadedImageUrl);
          throw new Error('Failed to load uploaded image');
        };
        
        uploadedImg.src = uploadedImageUrl;
        return;
      }
      
      // Use SVG template if no uploaded image
      const svgContent = template.generate(topText, bottomText, centerText);
      const svgBlob = new Blob([svgContent], { type: 'image/svg+xml' });
      const svgUrl = URL.createObjectURL(svgBlob);
      
      const img = new Image();
      
      img.onload = () => {
        ctx.drawImage(img, 0, 0);
        
        // Apply advanced filters to SVG templates too
        if (selectedFilter !== 'none') {
          applyImageFilter(canvas, ctx);
        }
        
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
    
    // Randomly select from the premium PFP collection
    const randomIndex = Math.floor(Math.random() * premiumPfpCollection.length);
    const selectedPfp = premiumPfpCollection[randomIndex];
    
    setCurrentPfp(selectedPfp);
    setGeneratedPfpImage(selectedPfp.image);
    
    // Add a small delay for UX (simulate generation)
    await new Promise(resolve => setTimeout(resolve, 800));
    
    try {
      // Track the PFP generation action  
      if (user) {
        try {
          await fetch('/api/leaderboard/action', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              userId: user.id,
              actionType: 'pfp_generated',
              points: 3
            })
          });
        } catch (trackError) {
          console.error('Failed to track PFP generation:', trackError);
        }
      }
      
      const rarityMessages = {
        common: "Your cyberpunk identity is ready",
        rare: "You got a rare cyberpunk identity!",
        legendary: "🔥 LEGENDARY PFP! This is special!"
      };
      
      toast({
        title: "PFP Generated!",
        description: user 
          ? `${rarityMessages[selectedPfp.rarity as keyof typeof rarityMessages]} (+3 points!)` 
          : rarityMessages[selectedPfp.rarity as keyof typeof rarityMessages],
      });
      
      if (user) {
        trackAction('pfp_generated');
      }
    } catch (error) {
      console.error('Error tracking PFP generation:', error);
      // Still show success since PFP was generated
      toast({
        title: "PFP Generated!",
        description: "Your cyberpunk identity is ready",
      });
    } finally {
      setIsGeneratingPfp(false);
    }
  };
  
  const downloadPfp = () => {
    if (generatedPfpImage) {
      const link = document.createElement('a');
      link.href = generatedPfpImage;
      link.download = `${currentPfp.name.replace(/[^a-zA-Z0-9]/g, '_')}_${currentPfp.id}.png`;
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

  // 🚀 AI-POWERED CHAOS FUNCTIONS
  const generateAiSuggestions = async (type: 'top' | 'bottom' | 'center') => {
    setIsLoadingAiSuggestions(true);
    try {
      const response = await fetch('/api/ai/meme-suggestions', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          textType: type,
          currentTexts: { topText, bottomText, centerText },
          template: selectedTemplate,
          userId: user?.id
        }),
      });
      
      if (response.ok) {
        const data = await response.json();
        setAiSuggestions(data.suggestions);
        setChaosScore(data.chaosScore);
        toast({
          title: "🤖 AI Chaos Unlocked!",
          description: `Got ${data.suggestions.length} viral suggestions (Chaos Score: ${data.chaosScore}%)`,
        });
      } else {
        // Fallback suggestions
        const fallbackSuggestions = [
          "WHEN THE DIP", "HITS DIFFERENT", "VILLAIN MODE ON",
          "CHAOS IS PROFIT", "$BAGZ RISING", "DIAMOND HANDS ONLY"
        ];
        setAiSuggestions(fallbackSuggestions);
        setChaosScore(Math.floor(Math.random() * 40) + 60);
      }
    } catch (error) {
      toast({
        title: "AI Offline",
        description: "Using chaos fallback mode",
        variant: "destructive"
      });
    } finally {
      setIsLoadingAiSuggestions(false);
    }
  };

  // 🎤 VOICE-TO-MEME FUNCTIONS
  const startVoiceRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      mediaRecorderRef.current = new MediaRecorder(stream);
      audioChunksRef.current = [];
      
      mediaRecorderRef.current.ondataavailable = (event) => {
        audioChunksRef.current.push(event.data);
      };
      
      mediaRecorderRef.current.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, { type: 'audio/wav' });
        await processVoiceToMeme(audioBlob);
        stream.getTracks().forEach(track => track.stop());
      };
      
      mediaRecorderRef.current.start();
      setIsRecording(true);
      
      toast({
        title: "🎤 Recording Started",
        description: "Speak your meme chaos into existence!",
      });
    } catch (error) {
      toast({
        title: "Mic Access Denied",
        description: "Enable microphone access for voice-to-meme magic",
        variant: "destructive"
      });
    }
  };

  const stopVoiceRecording = () => {
    if (mediaRecorderRef.current && isRecording) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
      setIsProcessingVoice(true);
    }
  };

  const processVoiceToMeme = async (audioBlob: Blob) => {
    try {
      const formData = new FormData();
      formData.append('audio', audioBlob, 'voice-meme.wav');
      formData.append('userId', user?.id || 'anonymous');
      
      const response = await fetch('/api/ai/voice-to-meme', {
        method: 'POST',
        body: formData,
      });
      
      if (response.ok) {
        const data = await response.json();
        setTopText(data.topText || '');
        setBottomText(data.bottomText || '');
        setCenterText(data.centerText || '');
        setChaosScore(data.chaosScore);
        
        toast({
          title: "🎤✨ Voice Decoded!",
          description: `Your chaos voice converted to meme text (Chaos: ${data.chaosScore}%)`,
        });
      } else {
        throw new Error('Voice processing failed');
      }
    } catch (error) {
      toast({
        title: "Voice Processing Failed",
        description: "Try speaking more clearly or check your connection",
        variant: "destructive"
      });
    } finally {
      setIsProcessingVoice(false);
    }
  };

  // 🎨 ADVANCED IMAGE FILTER FUNCTIONS
  const applyImageFilter = (canvas: HTMLCanvasElement, ctx: CanvasRenderingContext2D) => {
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const data = imageData.data;
    
    switch (selectedFilter) {
      case 'cyberpunk':
        // Enhance reds and greens, reduce blues
        for (let i = 0; i < data.length; i += 4) {
          data[i] = Math.min(255, data[i] * 1.3);     // Red
          data[i + 1] = Math.min(255, data[i + 1] * 1.1); // Green  
          data[i + 2] = data[i + 2] * 0.7;           // Blue
        }
        break;
        
      case 'glitch':
        // Add random color displacement
        for (let i = 0; i < data.length; i += 4) {
          if (Math.random() < glitchIntensity / 100) {
            const offset = Math.floor(Math.random() * 10) - 5;
            const sourceIndex = Math.max(0, Math.min(data.length - 4, i + offset * 4));
            data[i] = data[sourceIndex];
            data[i + 1] = data[sourceIndex + 1];
            data[i + 2] = data[sourceIndex + 2];
          }
        }
        break;
        
      case 'neon':
        // Increase saturation and add glow effect
        for (let i = 0; i < data.length; i += 4) {
          const avg = (data[i] + data[i + 1] + data[i + 2]) / 3;
          data[i] = Math.min(255, avg + (data[i] - avg) * 1.5);
          data[i + 1] = Math.min(255, avg + (data[i + 1] - avg) * 1.5);
          data[i + 2] = Math.min(255, avg + (data[i + 2] - avg) * 1.5);
        }
        break;
    }
    
    // Apply opacity
    if (imageOpacity < 100) {
      for (let i = 3; i < data.length; i += 4) {
        data[i] = data[i] * (imageOpacity / 100);
      }
    }
    
    ctx.putImageData(imageData, 0, 0);
  };

  return (
    <section id="tools-section" className="relative z-10 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        {/* EPIC BODY BAGZ SKULL BRANDING */}
        <div className="mb-8 flex justify-center">
          <div className="relative animate-pulse-glow">
            <div className="w-full max-w-xl rounded-xl overflow-hidden neon-card border border-blood-red/30">
              <img 
                src={epicSkullImg}
                alt="Body Bagz Epic Skull - Villain Era Branding"
                className="w-full h-auto object-contain"
                data-testid="epic-skull-banner"
              />
            </div>
            {/* Epic glow effects */}
            <div className="absolute -inset-2 bg-gradient-to-r from-blood-red/20 via-toxic-green/20 to-glitch-purple/20 rounded-2xl blur-lg -z-10"></div>
          </div>
        </div>

        <h2 className="font-brand text-3xl md:text-4xl text-center text-blood-red mb-8" data-testid="tools-title">
          CHAOS TOOLS
        </h2>
        
        {/* Tab Navigation */}
        <div className="flex justify-center mb-8">
          <div className="bg-jet-black/50 border border-dim-gray/50 rounded-xl p-2 backdrop-blur-sm">
            <div className="grid grid-cols-3 gap-2">
              <button
                onClick={() => setActiveTab('tweet')}
                className={`px-6 py-3 rounded-lg font-tech text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                  activeTab === 'tweet'
                    ? 'bg-gradient-to-r from-toxic-green to-toxic-green/80 text-jet-black shadow-green-glow'
                    : 'text-ash-white hover:text-toxic-green hover:bg-jet-black/30'
                }`}
                data-testid="tab-tweet-generator"
              >
                <MessageSquare className="w-4 h-4" />
                TWEET GEN
              </button>
              <button
                onClick={() => setActiveTab('meme')}
                className={`px-6 py-3 rounded-lg font-tech text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                  activeTab === 'meme'
                    ? 'bg-gradient-to-r from-blood-red to-blood-red/80 text-white shadow-red-glow'
                    : 'text-ash-white hover:text-blood-red hover:bg-jet-black/30'
                }`}
                data-testid="tab-meme-factory"
              >
                <Image className="w-4 h-4" />
                MEME FACTORY
              </button>
              <button
                onClick={() => setActiveTab('pfp')}
                className={`px-6 py-3 rounded-lg font-tech text-sm font-bold transition-all duration-200 flex items-center justify-center gap-2 ${
                  activeTab === 'pfp'
                    ? 'bg-gradient-to-r from-glitch-purple to-glitch-purple/80 text-white shadow-purple-glow'
                    : 'text-ash-white hover:text-glitch-purple hover:bg-jet-black/30'
                }`}
                data-testid="tab-pfp-generator"
              >
                <User className="w-4 h-4" />
                PFP CHAOS
              </button>
            </div>
          </div>
        </div>

        {/* Tab Content */}
        <div className="max-w-4xl mx-auto">
          {activeTab === 'tweet' && (
            <div className="neon-card p-8 rounded-xl group" data-testid="tweet-generator">
            <div className="relative mb-6 overflow-hidden rounded-lg">
              <img 
                src={tweetHeaderImg} 
                alt="Cyberpunk Tweet Generator" 
                className="w-full h-32 object-contain border border-toxic-green/30 bg-jet-black/30"
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
          )}

          {activeTab === 'meme' && (
          <div className="neon-card p-8 rounded-xl group" data-testid="meme-generator">
            <div className="relative mb-6 overflow-hidden rounded-lg">
              <img 
                src={memeHeaderImg} 
                alt="Cyberpunk Meme Creator" 
                className="w-full h-32 object-contain border border-blood-red/30 bg-jet-black/30"
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
                      className="w-full h-full object-cover object-center rounded-lg"
                      data-testid="generated-meme-image"
                    />
                  ) : (
                    (() => {
                      const template = memeTemplates[selectedTemplate as keyof typeof memeTemplates];
                      if (template && 'isImage' in template && template.isImage) {
                        // For image-based templates, show the image directly
                        return (
                          <img 
                            src={template.imageUrl} 
                            alt={template.name}
                            className="w-full h-full object-cover object-center rounded-lg"
                            data-testid="meme-preview-image"
                          />
                        );
                      } else {
                        // For SVG templates, render the SVG content
                        return (
                          <div 
                            className="w-full h-full flex items-center justify-center rounded-lg"
                            dangerouslySetInnerHTML={{
                              __html: template?.generate(
                                topText || 'TOP TEXT',
                                bottomText || 'BOTTOM TEXT', 
                                centerText || ''
                              ) || ''
                            }}
                            data-testid="meme-preview"
                          />
                        );
                      }
                    })()
                  )}
                </div>
                {/* Template Selection */}
                <div className="mb-4">
                  <label className="text-ash-white text-sm font-semibold mb-2 block">MEME TEMPLATE</label>
                  <Select value={selectedTemplate} onValueChange={setSelectedTemplate}>
                    <SelectTrigger className="cyber-input w-full text-ash-white" data-testid="select-meme-template">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-jet-black border border-dim-gray max-h-96 overflow-y-auto">
                      {/* Bullish Reaper Collection - Featured */}
                      <div className="px-2 py-1 text-toxic-green text-xs font-bold border-b border-dim-gray">
                        🏆 BULLISH REAPER COLLECTION (NEW!)
                      </div>
                      {Object.entries(memeTemplates)
                        .filter(([key]) => key.startsWith('reaper-'))
                        .map(([key, template]) => (
                          <SelectItem 
                            key={key}
                            value={key} 
                            className="text-ash-white hover:bg-dim-gray focus:bg-dim-gray cursor-pointer pl-4 py-3 border-l-2 border-l-toxic-green"
                            data-testid={`template-${key}`}
                          >
                            <span className="mr-2">{template.icon}</span>
                            <span className="font-medium">{template.name}</span>
                            {'isImage' in template && template.isImage && (
                              <span className="ml-2 text-xs bg-toxic-green text-jet-black px-1 rounded">VIRAL</span>
                            )}
                          </SelectItem>
                        ))}
                      
                      {/* Classic SVG Templates */}
                      <div className="px-2 py-1 text-ash-white text-xs font-bold border-b border-dim-gray mt-2">
                        ⚡ CLASSIC CYBERPUNK TEMPLATES
                      </div>
                      {Object.entries(memeTemplates)
                        .filter(([key]) => !key.startsWith('reaper-'))
                        .map(([key, template]) => (
                          <SelectItem 
                            key={key}
                            value={key} 
                            className="text-ash-white hover:bg-dim-gray focus:bg-dim-gray cursor-pointer pl-4"
                            data-testid={`template-${key}`}
                          >
                            <span className="mr-2">{template.icon}</span>
                            {template.name}
                          </SelectItem>
                        ))}
                    </SelectContent>
                  </Select>
                </div>

                {/* Custom Image Upload */}
                <div className="mb-4">
                  <label className="text-ash-white text-sm font-semibold mb-2 block">UPLOAD YOUR IMAGE (OPTIONAL)</label>
                  <div className="relative">
                    <Input 
                      type="file" 
                      accept="image/*"
                      onChange={handleImageUpload}
                      className="cyber-input w-full px-4 py-3 text-ash-white placeholder-dim-gray rounded-lg font-medium file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-toxic-green file:text-jet-black hover:file:bg-toxic-green/80" 
                      data-testid="input-upload-image"
                    />
                    {uploadedImage && (
                      <div className="mt-2 p-2 bg-jet-black/50 rounded-lg border border-toxic-green/30">
                        <p className="text-toxic-green text-xs font-medium">✓ Image uploaded: {uploadedImage.name}</p>
                      </div>
                    )}
                  </div>
                </div>

                {/* 🚀 AI-POWERED TEXT GENERATION */}
                <div className="mb-4 p-4 bg-gradient-to-r from-toxic-green/10 to-glitch-purple/10 rounded-lg border border-toxic-green/30">
                  <div className="flex items-center justify-between mb-3">
                    <label className="text-toxic-green text-sm font-bold flex items-center">
                      <Sparkles className="w-4 h-4 mr-2" />
                      AI CHAOS INTELLIGENCE
                    </label>
                    {chaosScore > 0 && (
                      <div className="text-xs bg-glitch-purple/20 text-glitch-purple px-2 py-1 rounded-full border border-glitch-purple/30">
                        Chaos Score: {chaosScore}%
                      </div>
                    )}
                  </div>
                  
                  <div className="grid grid-cols-3 gap-2 mb-3">
                    <Button 
                      type="button"
                      onClick={() => generateAiSuggestions('top')}
                      disabled={isLoadingAiSuggestions}
                      className="py-2 text-xs bg-gradient-to-r from-toxic-green/20 to-toxic-green/10 hover:from-toxic-green/30 hover:to-toxic-green/20 text-toxic-green border border-toxic-green/30 rounded-lg transition-all duration-200"
                      data-testid="button-ai-suggest-top"
                    >
                      {isLoadingAiSuggestions ? <Zap className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                      AI Top
                    </Button>
                    <Button 
                      type="button"
                      onClick={() => generateAiSuggestions('center')}
                      disabled={isLoadingAiSuggestions}
                      className="py-2 text-xs bg-gradient-to-r from-glitch-purple/20 to-glitch-purple/10 hover:from-glitch-purple/30 hover:to-glitch-purple/20 text-glitch-purple border border-glitch-purple/30 rounded-lg transition-all duration-200"
                      data-testid="button-ai-suggest-center"
                    >
                      {isLoadingAiSuggestions ? <Zap className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                      AI Center
                    </Button>
                    <Button 
                      type="button"
                      onClick={() => generateAiSuggestions('bottom')}
                      disabled={isLoadingAiSuggestions}
                      className="py-2 text-xs bg-gradient-to-r from-blood-red/20 to-blood-red/10 hover:from-blood-red/30 hover:to-blood-red/20 text-blood-red border border-blood-red/30 rounded-lg transition-all duration-200"
                      data-testid="button-ai-suggest-bottom"
                    >
                      {isLoadingAiSuggestions ? <Zap className="w-3 h-3 animate-spin" /> : <Wand2 className="w-3 h-3" />}
                      AI Bottom
                    </Button>
                  </div>
                  
                  {/* AI Suggestions Display */}
                  {aiSuggestions.length > 0 && (
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      {aiSuggestions.slice(0, 6).map((suggestion, index) => (
                        <button
                          key={index}
                          onClick={() => {
                            if (index < 2) setTopText(suggestion);
                            else if (index < 4) setCenterText(suggestion);
                            else setBottomText(suggestion);
                          }}
                          className="p-2 text-xs bg-jet-black/50 hover:bg-jet-black/70 text-ash-white border border-dim-gray/30 hover:border-toxic-green/50 rounded transition-all duration-200 text-left"
                        >
                          ✨ {suggestion}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {/* 🎤 VOICE-TO-MEME FEATURE */}
                <div className="mb-4 p-4 bg-gradient-to-r from-blood-red/10 to-glitch-purple/10 rounded-lg border border-blood-red/30">
                  <label className="text-blood-red text-sm font-bold flex items-center mb-3">
                    <Mic className="w-4 h-4 mr-2" />
                    VOICE-TO-MEME MAGIC
                  </label>
                  
                  <div className="flex items-center gap-3">
                    <Button 
                      type="button"
                      onClick={isRecording ? stopVoiceRecording : startVoiceRecording}
                      disabled={isProcessingVoice}
                      className={`py-3 px-4 font-bold tracking-wide rounded-lg transition-all duration-200 border ${
                        isRecording 
                          ? 'bg-gradient-to-r from-blood-red to-blood-red/80 text-white border-blood-red animate-pulse' 
                          : 'bg-gradient-to-r from-blood-red/20 to-blood-red/10 hover:from-blood-red/30 hover:to-blood-red/20 text-blood-red border-blood-red/30'
                      }`}
                      data-testid="button-voice-to-meme"
                    >
                      {isProcessingVoice ? (
                        <>
                          <Zap className="w-4 h-4 mr-2 animate-spin" />
                          PROCESSING...
                        </>
                      ) : isRecording ? (
                        <>
                          <MicOff className="w-4 h-4 mr-2" />
                          STOP RECORDING
                        </>
                      ) : (
                        <>
                          <Mic className="w-4 h-4 mr-2" />
                          SPEAK YOUR MEME
                        </>
                      )}
                    </Button>
                    
                    {isRecording && (
                      <div className="flex items-center text-blood-red text-sm font-medium">
                        <div className="w-2 h-2 bg-blood-red rounded-full animate-pulse mr-2"></div>
                        Recording...
                      </div>
                    )}
                  </div>
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

                {/* 🎨 ADVANCED IMAGE EFFECTS */}
                <div className="mb-4 p-4 bg-gradient-to-r from-glitch-purple/10 to-toxic-green/10 rounded-lg border border-glitch-purple/30">
                  <label className="text-glitch-purple text-sm font-bold flex items-center mb-3">
                    <Palette className="w-4 h-4 mr-2" />
                    CHAOS VISUAL EFFECTS
                  </label>
                  
                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div>
                      <label className="text-ash-white text-xs font-medium mb-1 block">Filter Style</label>
                      <Select value={selectedFilter} onValueChange={setSelectedFilter}>
                        <SelectTrigger className="cyber-input text-ash-white" data-testid="select-image-filter">
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-jet-black border border-dim-gray">
                          <SelectItem value="none" className="text-ash-white hover:bg-dim-gray">None</SelectItem>
                          <SelectItem value="cyberpunk" className="text-ash-white hover:bg-dim-gray">🔴 Cyberpunk</SelectItem>
                          <SelectItem value="glitch" className="text-ash-white hover:bg-dim-gray">⚡ Glitch</SelectItem>
                          <SelectItem value="neon" className="text-ash-white hover:bg-dim-gray">💚 Neon</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    
                    <div>
                      <label className="text-ash-white text-xs font-medium mb-1 block">Opacity: {imageOpacity}%</label>
                      <input
                        type="range"
                        min="10"
                        max="100"
                        value={imageOpacity}
                        onChange={(e) => setImageOpacity(Number(e.target.value))}
                        className="w-full h-2 bg-dim-gray rounded-lg appearance-none cursor-pointer slider-thumb"
                        data-testid="slider-image-opacity"
                      />
                    </div>
                  </div>
                  
                  {selectedFilter === 'glitch' && (
                    <div>
                      <label className="text-ash-white text-xs font-medium mb-1 block">Glitch Intensity: {glitchIntensity}%</label>
                      <input
                        type="range"
                        min="0"
                        max="50"
                        value={glitchIntensity}
                        onChange={(e) => setGlitchIntensity(Number(e.target.value))}
                        className="w-full h-2 bg-dim-gray rounded-lg appearance-none cursor-pointer slider-thumb"
                        data-testid="slider-glitch-intensity"
                      />
                    </div>
                  )}
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
          )}

          {activeTab === 'pfp' && (
          <div className="neon-card p-8 rounded-xl group" data-testid="pfp-generator">
            <div className="relative mb-6 overflow-hidden rounded-lg">
              <img 
                src={pfpHeaderImg} 
                alt="Cyberpunk PFP Generator" 
                className="w-full h-32 object-contain border border-glitch-purple/30 bg-jet-black/30"
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
                      alt={currentPfp.name}
                      className="w-full h-full object-cover object-center rounded-lg"
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
                <div className="text-center mb-4">
                  <p className="text-dim-gray text-sm font-medium tracking-wide" data-testid="current-pfp">{currentPfp.name}</p>
                  <p className="text-xs text-dim-gray/70 mt-1">
                    {currentPfp.id} • 
                    <span className={`ml-1 ${
                      currentPfp.rarity === 'legendary' ? 'text-glitch-purple' :
                      currentPfp.rarity === 'rare' ? 'text-toxic-green' : 
                      'text-ash-white'
                    }`}>
                      {currentPfp.rarity.toUpperCase()}
                    </span>
                  </p>
                </div>
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
                      onClick={() => saveContent('pfp', currentPfp.name, generatedPfpImage, { id: currentPfp.id, rarity: currentPfp.rarity })}
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
          )}
        </div>
      </div>
    </section>
  );
}
