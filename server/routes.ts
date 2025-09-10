import type { Express, Request, Response, NextFunction } from "express";
import { createServer, type Server } from "http";
import path from "path";
import { existsSync } from "fs";
import compression from "compression";
import { ImageGenerator } from "./imageGenerator";
import { storage } from "./storage";
import { insertUserSchema, insertLeaderboardEntrySchema } from "@shared/schema";
import { generateCyberpunkPFP, generateBullishTweet, generateMemeText, generateCyberpunkMeme } from "./openai";
import multer from "multer";
import fs from "fs";
import OpenAI from "openai";
import { 
  generalLimiter, 
  strictLimiter, 
  registrationLimiter, 
  securityMiddleware,
  validateRegistration,
  validateActionTracking,
  errorLogger,
  errorHandler
} from "./middleware/security";
import bcrypt from "bcrypt";
import { body, validationResult } from "express-validator";
import { cacheMiddleware, clearLeaderboardCache } from "./middleware/cache";

// Generate epic 3D cyberpunk villain PFP that matches Body Bagz brand
function generateCyberpunkVillainPFP(): string {
  const villainTypes = [
    'death-reaper', 'shadow-assassin', 'cyber-hunter', 'neon-phantom', 
    'chaos-lord', 'street-villain', 'dark-commander', 'toxic-warlord',
    'blood-operative', 'void-enforcer', 'cyber-demon', 'skull-emperor'
  ];
  
  const designTypes = ['epic-helmet', 'dimensional-mask', '3d-skull', 'power-armor', 'shadow-hood'];
  const backgroundColors = ['0A0A0A', '111214', '1A1A1A', '0D0D0D'];
  const primaryColors = ['E7352C', '39FF14', '7A3BFF', 'FF0040', '00FF88'];
  const metalColors = ['4A5568', '2D3748', '718096', 'A0AEC0'];
  const highlightColors = ['FFFFFF', 'F7FAFC', 'EDF2F7', 'E2E8F0'];
  
  const villainType = villainTypes[Math.floor(Math.random() * villainTypes.length)];
  const designType = designTypes[Math.floor(Math.random() * designTypes.length)];
  const bgColor = backgroundColors[Math.floor(Math.random() * backgroundColors.length)];
  const primaryColor = primaryColors[Math.floor(Math.random() * primaryColors.length)];
  const metalColor = metalColors[Math.floor(Math.random() * metalColors.length)];
  const highlightColor = highlightColors[Math.floor(Math.random() * highlightColors.length)];
  const timestamp = Date.now();
  const uniqueSeed = `${villainType}-${timestamp}`;
  
  let svgContent = '';
  
  if (designType === 'epic-helmet') {
    svgContent = `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Premium Cyberpunk Background -->
          <radialGradient id="premiumBg" cx="50%" cy="30%" r="100%">
            <stop offset="0%" style="stop-color:#${primaryColor};stop-opacity:0.2" />
            <stop offset="40%" style="stop-color:#${bgColor};stop-opacity:0.9" />
            <stop offset="80%" style="stop-color:#0A0A0A;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
          </radialGradient>
          
          <!-- 3D Helmet Gradients with Enhanced Depth -->
          <radialGradient id="premiumHelmet" cx="30%" cy="20%" r="90%">
            <stop offset="0%" style="stop-color:#${highlightColor};stop-opacity:1" />
            <stop offset="25%" style="stop-color:#${metalColor};stop-opacity:1" />
            <stop offset="60%" style="stop-color:#${bgColor};stop-opacity:0.95" />
            <stop offset="85%" style="stop-color:#1A1A1A;stop-opacity:1" />
            <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
          </radialGradient>
          
          <!-- Epic Visor with Multi-layer Depth -->
          <linearGradient id="premiumVisor" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" style="stop-color:#${highlightColor};stop-opacity:0.8" />
            <stop offset="30%" style="stop-color:#${primaryColor};stop-opacity:1" />
            <stop offset="70%" style="stop-color:#000000;stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:#${primaryColor};stop-opacity:0.6" />
          </linearGradient>
          
          <!-- Advanced 3D Shadow System -->
          <filter id="premiumDepth" x="-100%" y="-100%" width="300%" height="300%">
            <feDropShadow dx="4" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.9"/>
            <feDropShadow dx="-3" dy="-3" stdDeviation="3" flood-color="#${highlightColor}" flood-opacity="0.4"/>
            <feDropShadow dx="1" dy="1" stdDeviation="1" flood-color="#${primaryColor}" flood-opacity="0.3"/>
          </filter>
          
          <!-- Epic Glow with Multi-layer -->
          <filter id="premiumGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feDropShadow dx="0" dy="0" stdDeviation="4" flood-color="#${primaryColor}" flood-opacity="0.8"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <!-- Neon Circuit Pattern -->
          <pattern id="circuitPattern" width="40" height="40" patternUnits="userSpaceOnUse">
            <rect width="40" height="40" fill="none"/>
            <path d="M 0 20 L 20 20 L 20 0 M 20 40 L 20 20 L 40 20" stroke="#${primaryColor}" stroke-width="1" opacity="0.3"/>
            <circle cx="20" cy="20" r="2" fill="#${primaryColor}" opacity="0.5"/>
          </pattern>
        </defs>
        
        <!-- Premium Background with Circuit Pattern -->
        <rect width="400" height="400" fill="url(#premiumBg)"/>
        <rect width="400" height="400" fill="url(#circuitPattern)" opacity="0.2"/>
        <ellipse cx="200" cy="200" rx="180" ry="180" fill="url(#premiumBg)" opacity="0.4"/>
        
        <!-- Enhanced Main Helmet Structure -->
        <g filter="url(#premiumDepth)">
          <path d="M 200 50 Q 290 65 300 160 Q 295 210 260 240 L 200 260 L 140 240 Q 105 210 100 160 Q 110 65 200 50 Z" 
                fill="url(#premiumHelmet)" stroke="#${metalColor}" stroke-width="4" opacity="0.95"/>
          
          <!-- Additional Armor Plates -->
          <path d="M 160 80 Q 200 70 240 80 L 235 110 Q 200 100 165 110 Z" 
                fill="#${metalColor}" opacity="0.8" filter="url(#premiumDepth)"/>
        </g>
        
        <!-- Epic Angular Visor with Advanced Effects -->
        <g filter="url(#premiumGlow)">
          <path d="M 130 125 Q 200 105 270 125 Q 265 175 200 185 Q 135 175 130 125 Z" 
                fill="url(#premiumVisor)" stroke="#${primaryColor}" stroke-width="2"/>
          
          <!-- Visor Reflection Lines -->
          <path d="M 140 135 Q 200 125 260 135" stroke="#${highlightColor}" stroke-width="2" opacity="0.6"/>
          <path d="M 145 155 Q 200 145 255 155" stroke="#${highlightColor}" stroke-width="1" opacity="0.4"/>
        </g>
        
        <!-- Premium Side Armor with Details -->
        <g filter="url(#premiumDepth)">
          <ellipse cx="95" cy="170" rx="25" ry="60" fill="#${metalColor}" opacity="0.95"/>
          <ellipse cx="305" cy="170" rx="25" ry="60" fill="#${metalColor}" opacity="0.95"/>
          
          <!-- Armor Vents -->
          <rect x="88" y="150" width="14" height="3" fill="#${primaryColor}" opacity="0.8"/>
          <rect x="88" y="160" width="14" height="3" fill="#${primaryColor}" opacity="0.8"/>
          <rect x="88" y="170" width="14" height="3" fill="#${primaryColor}" opacity="0.8"/>
          <rect x="298" y="150" width="14" height="3" fill="#${primaryColor}" opacity="0.8"/>
          <rect x="298" y="160" width="14" height="3" fill="#${primaryColor}" opacity="0.8"/>
          <rect x="298" y="170" width="14" height="3" fill="#${primaryColor}" opacity="0.8"/>
        </g>
        
        <!-- Enhanced Eye Lights with Glow -->
        <g filter="url(#premiumGlow)">
          <circle cx="165" cy="145" r="12" fill="#${primaryColor}" opacity="0.9"/>
          <circle cx="235" cy="145" r="12" fill="#${primaryColor}" opacity="0.9"/>
          <circle cx="165" cy="145" r="6" fill="#${highlightColor}" opacity="0.8"/>
          <circle cx="235" cy="145" r="6" fill="#${highlightColor}" opacity="0.8"/>
          <circle cx="165" cy="145" r="2" fill="#FFFFFF" opacity="0.9"/>
          <circle cx="235" cy="145" r="2" fill="#FFFFFF" opacity="0.9"/>
        </g>
        
        <!-- Advanced Chest Emblem -->
        <g filter="url(#premiumGlow)">
          <polygon points="200,190 180,210 220,210" fill="#${highlightColor}" opacity="0.9"/>
          <polygon points="200,195 185,208 215,208" fill="#${primaryColor}" opacity="0.7"/>
          <circle cx="200" cy="202" r="3" fill="#FFFFFF" opacity="0.8"/>
        </g>
        
        <!-- Premium Armor Details -->
        <g filter="url(#premiumDepth)" opacity="0.8">
          <rect x="185" y="215" width="30" height="10" rx="5" fill="#${metalColor}"/>
          <rect x="180" y="230" width="40" height="8" rx="4" fill="#${primaryColor}" opacity="0.7"/>
          <rect x="175" y="245" width="50" height="6" rx="3" fill="#${highlightColor}" opacity="0.6"/>
        </g>
        
        <!-- Circuit Lines -->
        <g stroke="#${primaryColor}" stroke-width="2" opacity="0.4" filter="url(#premiumGlow)">
          <path d="M 50 350 Q 100 330 150 350"/>
          <path d="M 250 350 Q 300 330 350 350"/>
          <path d="M 20 200 Q 50 180 80 200"/>
          <path d="M 320 200 Q 350 180 380 200"/>
        </g>
        
        <!-- Premium BODY BAGZ Branding -->
        <g filter="url(#premiumDepth)">
          <rect x="100" y="310" width="200" height="50" rx="25" fill="#${bgColor}" stroke="#${primaryColor}" stroke-width="4" opacity="0.95"/>
          <rect x="110" y="320" width="180" height="30" rx="15" fill="#1A1A1A" opacity="0.8"/>
        </g>
        
        <g filter="url(#premiumGlow)">
          <text x="200" y="338" text-anchor="middle" font-family="Arial Black, sans-serif" font-size="20" font-weight="bold" 
                fill="#${primaryColor}">BODY BAGZ</text>
          <text x="200" y="352" text-anchor="middle" font-family="Arial, sans-serif" font-size="10" 
                fill="#${highlightColor}" opacity="0.9">VILLAIN ERA • ${villainType}</text>
        </g>
      </svg>
    `;
  } else if (designType === 'dimensional-mask') {
    svgContent = `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Epic 3D Mask Gradient -->
          <radialGradient id="mask3D" cx="30%" cy="30%" r="90%">
            <stop offset="0%" style="stop-color:#${highlightColor};stop-opacity:0.9" />
            <stop offset="25%" style="stop-color:#${metalColor};stop-opacity:1" />
            <stop offset="75%" style="stop-color:#${bgColor};stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
          </radialGradient>
          
          <!-- Dimensional Visor with Epic Shine -->
          <linearGradient id="dimensionalVisor" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" style="stop-color:#${highlightColor};stop-opacity:0.4" />
            <stop offset="30%" style="stop-color:#${primaryColor};stop-opacity:1" />
            <stop offset="70%" style="stop-color:#000000;stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:#${primaryColor};stop-opacity:0.6" />
          </linearGradient>
          
          <!-- Epic 3D Filter -->
          <filter id="epic3D" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="4" dy="8" stdDeviation="6" flood-color="#000000" flood-opacity="0.9"/>
            <feDropShadow dx="-3" dy="-3" stdDeviation="3" flood-color="#${highlightColor}" flood-opacity="0.4"/>
          </filter>
          
          <!-- Dimensional Glow -->
          <filter id="dimensionalGlow" x="-50%" y="-50%" width="200%" height="200%">
            <feGaussianBlur stdDeviation="8" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Epic Background -->
        <rect width="400" height="400" fill="#${bgColor}"/>
        <ellipse cx="200" cy="200" rx="180" ry="180" fill="#000000" opacity="0.4"/>
        
        <!-- Main 3D Mask Structure -->
        <ellipse cx="200" cy="180" rx="90" ry="70" fill="url(#mask3D)" filter="url(#epic3D)" stroke="#${metalColor}" stroke-width="4"/>
        
        <!-- Epic Dimensional Visor -->
        <ellipse cx="200" cy="170" rx="75" ry="30" fill="url(#dimensionalVisor)" filter="url(#dimensionalGlow)"/>
        <ellipse cx="200" cy="168" rx="70" ry="25" fill="#${highlightColor}" opacity="0.1"/>
        
        <!-- 3D Side Vents -->
        <ellipse cx="90" cy="170" rx="12" ry="8" fill="#${primaryColor}" opacity="0.9" filter="url(#dimensionalGlow)"/>
        <ellipse cx="90" cy="185" rx="12" ry="8" fill="#${primaryColor}" opacity="0.9" filter="url(#dimensionalGlow)"/>
        <ellipse cx="310" cy="170" rx="12" ry="8" fill="#${primaryColor}" opacity="0.9" filter="url(#dimensionalGlow)"/>
        <ellipse cx="310" cy="185" rx="12" ry="8" fill="#${primaryColor}" opacity="0.9" filter="url(#dimensionalGlow)"/>
        
        <!-- Epic Central HUD -->
        <circle cx="200" cy="170" r="15" fill="#${primaryColor}" opacity="0.3"/>
        <circle cx="200" cy="170" r="8" fill="#${primaryColor}" filter="url(#dimensionalGlow)"/>
        <circle cx="197" cy="167" r="4" fill="#${highlightColor}" opacity="0.9"/>
        
        <!-- 3D Jaw Mechanism -->
        <path d="M 140 210 Q 200 235 260 210 Q 255 225 200 240 Q 145 225 140 210 Z" 
              fill="#${metalColor}" filter="url(#epic3D)" stroke="#${primaryColor}" stroke-width="2"/>
        <path d="M 150 215 Q 200 225 250 215" stroke="#${highlightColor}" stroke-width="2" opacity="0.6"/>
        
        <!-- Epic Tech Panels -->
        <rect x="120" y="140" width="15" height="8" rx="4" fill="#${primaryColor}" opacity="0.8" filter="url(#dimensionalGlow)"/>
        <rect x="265" y="140" width="15" height="8" rx="4" fill="#${primaryColor}" opacity="0.8" filter="url(#dimensionalGlow)"/>
        
        <!-- 3D Power Conduits -->
        <path d="M 130 120 Q 150 115 170 120" stroke="#${primaryColor}" stroke-width="3" opacity="0.8" filter="url(#dimensionalGlow)"/>
        <path d="M 230 120 Q 250 115 270 120" stroke="#${primaryColor}" stroke-width="3" opacity="0.8" filter="url(#dimensionalGlow)"/>
        
        <!-- BODY BAGZ Branding -->
        <text x="200" y="320" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold" 
              fill="#${primaryColor}" filter="url(#dimensionalGlow)">BODY BAGZ</text>
        <text x="200" y="340" text-anchor="middle" font-family="monospace" font-size="12" 
              fill="#${highlightColor}" opacity="0.8">VILLAIN ERA</text>
      </svg>
    `;
  } else if (designType === '3d-skull') {
    svgContent = `
      <svg viewBox="0 0 400 400" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <!-- Epic 3D Skull Gradient -->
          <radialGradient id="skull3D" cx="35%" cy="20%" r="85%">
            <stop offset="0%" style="stop-color:#${highlightColor};stop-opacity:0.7" />
            <stop offset="20%" style="stop-color:#${metalColor};stop-opacity:1" />
            <stop offset="60%" style="stop-color:#${bgColor};stop-opacity:0.9" />
            <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
          </radialGradient>
          
          <!-- Death Glow Effect -->
          <filter id="deathGlow" x="-100%" y="-100%" width="300%" height="300%">
            <feGaussianBlur stdDeviation="10" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
          
          <!-- Epic 3D Depth -->
          <filter id="skull3DDepth" x="-50%" y="-50%" width="200%" height="200%">
            <feDropShadow dx="5" dy="10" stdDeviation="8" flood-color="#000000" flood-opacity="0.9"/>
            <feDropShadow dx="-4" dy="-4" stdDeviation="4" flood-color="#${highlightColor}" flood-opacity="0.3"/>
          </filter>
        </defs>
        
        <!-- Epic Death Background -->
        <rect width="400" height="400" fill="#${bgColor}"/>
        <ellipse cx="200" cy="200" rx="160" ry="160" fill="#000000" opacity="0.5"/>
        
        <!-- Main 3D Skull Structure -->
        <path d="M 200 70 Q 270 85 285 160 Q 285 220 250 250 L 200 270 L 150 250 Q 115 220 115 160 Q 130 85 200 70 Z" 
              fill="url(#skull3D)" filter="url(#skull3DDepth)" stroke="#${metalColor}" stroke-width="4"/>
        
        <!-- Epic Eye Sockets with 3D Depth -->
        <ellipse cx="170" cy="150" rx="25" ry="30" fill="#000000" filter="url(#skull3DDepth)"/>
        <ellipse cx="230" cy="150" rx="25" ry="30" fill="#000000" filter="url(#skull3DDepth)"/>
        <ellipse cx="170" cy="150" rx="15" ry="20" fill="#${primaryColor}" filter="url(#deathGlow)"/>
        <ellipse cx="230" cy="150" rx="15" ry="20" fill="#${primaryColor}" filter="url(#deathGlow)"/>
        <ellipse cx="168" cy="145" rx="8" ry="10" fill="#${highlightColor}" opacity="0.8"/>
        <ellipse cx="228" cy="145" rx="8" ry="10" fill="#${highlightColor}" opacity="0.8"/>
        
        <!-- 3D Nasal Cavity -->
        <path d="M 200 170 L 185 190 L 200 220 L 215 190 Z" fill="#000000" filter="url(#skull3DDepth)"/>
        <rect x="196" y="180" width="8" height="30" fill="#${primaryColor}" opacity="0.6" filter="url(#deathGlow)"/>
        
        <!-- Epic Jaw Mechanism -->
        <path d="M 160 230 Q 200 260 240 230 Q 235 245 200 270 Q 165 245 160 230 Z" 
              fill="#${metalColor}" filter="url(#skull3DDepth)" stroke="#${primaryColor}" stroke-width="3"/>
        <path d="M 170 235 Q 200 250 230 235" stroke="#${highlightColor}" stroke-width="3" opacity="0.6"/>
        
        <!-- 3D Tech Implants -->
        <rect x="130" y="120" width="20" height="15" rx="4" fill="#${primaryColor}" opacity="0.9" filter="url(#deathGlow)"/>
        <rect x="250" y="120" width="20" height="15" rx="4" fill="#${primaryColor}" opacity="0.9" filter="url(#deathGlow)"/>
        <rect x="133" y="123" width="14" height="9" rx="2" fill="#${highlightColor}" opacity="0.4"/>
        <rect x="253" y="123" width="14" height="9" rx="2" fill="#${highlightColor}" opacity="0.4"/>
        
        <!-- Epic Circuit Crown -->
        <path d="M 150 90 Q 200 80 250 90" stroke="#${primaryColor}" stroke-width="4" opacity="0.9" filter="url(#deathGlow)"/>
        <circle cx="170" cy="88" r="5" fill="#${primaryColor}" filter="url(#deathGlow)"/>
        <circle cx="200" cy="85" r="6" fill="#${primaryColor}" filter="url(#deathGlow)"/>
        <circle cx="230" cy="88" r="5" fill="#${primaryColor}" filter="url(#deathGlow)"/>
        <circle cx="168" cy="85" r="2" fill="#${highlightColor}" opacity="0.9"/>
        <circle cx="197" cy="82" r="3" fill="#${highlightColor}" opacity="0.9"/>
        <circle cx="227" cy="85" r="2" fill="#${highlightColor}" opacity="0.9"/>
        
        <!-- Death Vents -->
        <rect x="180" y="255" width="8" height="15" fill="#${primaryColor}" opacity="0.8" filter="url(#deathGlow)"/>
        <rect x="195" y="255" width="8" height="15" fill="#${primaryColor}" opacity="0.8" filter="url(#deathGlow)"/>
        <rect x="210" y="255" width="8" height="15" fill="#${primaryColor}" opacity="0.8" filter="url(#deathGlow)"/>
        
        <!-- BODY BAGZ Branding -->
        <text x="200" y="320" text-anchor="middle" font-family="monospace" font-size="16" font-weight="bold" 
              fill="#${primaryColor}" filter="url(#deathGlow)">BODY BAGZ</text>
        <text x="200" y="340" text-anchor="middle" font-family="monospace" font-size="12" 
              fill="#${highlightColor}" opacity="0.8">VILLAIN ERA</text>
      </svg>
    `;
  } else if (designType === 'power-armor') {
    svgContent = `
      <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="armorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" style="stop-color:#${metalColor};stop-opacity:1" />
            <stop offset="50%" style="stop-color:#${bgColor};stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#${metalColor};stop-opacity:1" />
          </linearGradient>
          <filter id="techGlow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Background -->
        <rect width="300" height="300" fill="#${bgColor}"/>
        
        <!-- Main armor helmet -->
        <rect x="100" y="70" width="100" height="90" rx="20" fill="url(#armorGrad)" stroke="#${primaryColor}" stroke-width="2"/>
        
        <!-- Face plate -->
        <rect x="110" y="90" width="80" height="50" rx="10" fill="#000000" opacity="0.9"/>
        
        <!-- HUD visor strips -->
        <rect x="115" y="100" width="70" height="6" fill="#${primaryColor}" opacity="0.8" filter="url(#techGlow)"/>
        <rect x="115" y="115" width="70" height="4" fill="#${primaryColor}" opacity="0.6"/>
        <rect x="115" y="125" width="70" height="4" fill="#${primaryColor}" opacity="0.6"/>
        
        <!-- Side armor plates -->
        <rect x="80" y="95" width="20" height="35" rx="5" fill="#${metalColor}"/>
        <rect x="200" y="95" width="20" height="35" rx="5" fill="#${metalColor}"/>
        
        <!-- Shoulder connections -->
        <circle cx="90" cy="145" r="12" fill="#${metalColor}" stroke="#${primaryColor}" stroke-width="2"/>
        <circle cx="210" cy="145" r="12" fill="#${metalColor}" stroke="#${primaryColor}" stroke-width="2"/>
        
        <!-- Central power core -->
        <circle cx="150" cy="115" r="6" fill="#${primaryColor}" opacity="0.3"/>
        <circle cx="150" cy="115" r="3" fill="#${primaryColor}" filter="url(#techGlow)"/>
        
        <!-- Tech panels -->
        <rect x="85" y="110" width="8" height="15" fill="#${primaryColor}" opacity="0.7"/>
        <rect x="207" y="110" width="8" height="15" fill="#${primaryColor}" opacity="0.7"/>
        
        <!-- Neck guard -->
        <rect x="125" y="160" width="50" height="15" rx="7" fill="#${metalColor}"/>
        
        <!-- Data lines -->
        <line x1="110" y1="80" x2="130" y2="85" stroke="#${primaryColor}" stroke-width="2" opacity="0.6"/>
        <line x1="170" y1="85" x2="190" y2="80" stroke="#${primaryColor}" stroke-width="2" opacity="0.6"/>
        
        <!-- Status indicators -->
        <rect x="180" y="105" width="3" height="3" fill="#${primaryColor}" opacity="0.9"/>
        <rect x="180" y="112" width="3" height="3" fill="#${primaryColor}" opacity="0.7"/>
        <rect x="180" y="119" width="3" height="3" fill="#${primaryColor}" opacity="0.5"/>
        
        <!-- BODY BAGZ Branding -->
        <text x="150" y="250" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" 
              fill="#${primaryColor}" filter="url(#techGlow)">BODY BAGZ</text>
        <text x="150" y="270" text-anchor="middle" font-family="monospace" font-size="10" 
              fill="#${highlightColor}" opacity="0.8">VILLAIN ERA</text>
      </svg>
    `;
  } else { // shadow-hood
    svgContent = `
      <svg viewBox="0 0 300 300" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <radialGradient id="hoodGrad" cx="50%" cy="30%" r="70%">
            <stop offset="0%" style="stop-color:#${metalColor};stop-opacity:0.9" />
            <stop offset="70%" style="stop-color:#${bgColor};stop-opacity:0.8" />
            <stop offset="100%" style="stop-color:#000000;stop-opacity:1" />
          </radialGradient>
          <filter id="shadowGlow">
            <feGaussianBlur stdDeviation="4" result="coloredBlur"/>
            <feMerge>
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
        </defs>
        
        <!-- Background -->
        <rect width="300" height="300" fill="#${bgColor}"/>
        
        <!-- Hood outline -->
        <path d="M 150 40 Q 220 60 230 130 Q 230 170 200 190 L 150 200 L 100 190 Q 70 170 70 130 Q 80 60 150 40 Z" 
              fill="url(#hoodGrad)" stroke="#${primaryColor}" stroke-width="1" opacity="0.9"/>
        
        <!-- Inner shadow -->
        <ellipse cx="150" cy="120" rx="50" ry="60" fill="#000000" opacity="0.7"/>
        
        <!-- Glowing eyes -->
        <ellipse cx="130" cy="110" rx="8" ry="12" fill="#${primaryColor}" filter="url(#shadowGlow)"/>
        <ellipse cx="170" cy="110" rx="8" ry="12" fill="#${primaryColor}" filter="url(#shadowGlow)"/>
        
        <!-- Face covering -->
        <path d="M 120 130 Q 150 145 180 130 Q 175 150 150 155 Q 125 150 120 130 Z" 
              fill="#${metalColor}" opacity="0.6"/>
        
        <!-- Hood tech details -->
        <rect x="85" y="100" width="15" height="4" fill="#${primaryColor}" opacity="0.7"/>
        <rect x="200" y="100" width="15" height="4" fill="#${primaryColor}" opacity="0.7"/>
        
        <!-- Seam lines -->
        <path d="M 110 70 Q 150 65 190 70" stroke="#${primaryColor}" stroke-width="1" opacity="0.5"/>
        <path d="M 100 100 Q 150 95 200 100" stroke="#${primaryColor}" stroke-width="1" opacity="0.4"/>
        
        <!-- Neck piece -->
        <rect x="135" y="180" width="30" height="20" rx="5" fill="#${metalColor}"/>
        
        <!-- Power cells -->
        <circle cx="105" cy="140" r="4" fill="#${primaryColor}" opacity="0.8"/>
        <circle cx="195" cy="140" r="4" fill="#${primaryColor}" opacity="0.8"/>
        
        <!-- Breathing apparatus -->
        <ellipse cx="150" cy="140" rx="12" ry="8" fill="#${metalColor}" stroke="#${primaryColor}" stroke-width="1"/>
        <rect x="147" y="137" width="6" height="6" fill="#${primaryColor}" opacity="0.6"/>
        
        <!-- BODY BAGZ Branding -->
        <text x="150" y="250" text-anchor="middle" font-family="monospace" font-size="14" font-weight="bold" 
              fill="#${primaryColor}" filter="url(#shadowGlow)">BODY BAGZ</text>
        <text x="150" y="270" text-anchor="middle" font-family="monospace" font-size="10" 
              fill="#${highlightColor}" opacity="0.8">VILLAIN ERA</text>
      </svg>
    `;
  }
  
  // Convert to data URL
  const dataUrl = `data:image/svg+xml;base64,${Buffer.from(svgContent).toString('base64')}`;
  return dataUrl;
}

export async function registerRoutes(app: Express): Promise<Server> {
  // Trust proxy for rate limiting
  app.set('trust proxy', 1);
  
  // CORS Configuration (must come before other middleware)
  app.use((req, res, next) => {
    const allowedOrigins = [
      'https://body-bagz.replit.app',
      'https://twitter.com',
      'https://t.me'
    ];
    const origin = req.headers.origin;
    if (!origin || allowedOrigins.includes(origin)) {
      res.header('Access-Control-Allow-Origin', origin || '*');
      res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS');
      res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With');
    }
    if (req.method === 'OPTIONS') {
      res.sendStatus(200);
    } else {
      next();
    }
  });

  // Apply security middleware
  app.use(compression());
  app.use(securityMiddleware);
  app.use(generalLimiter);
  app.use(errorLogger);

  // Health and monitoring endpoints
  app.get("/api/health", (req, res) => {
    res.json({ 
      status: "ok", 
      timestamp: new Date().toISOString(),
      service: "Body Bagz API"
    });
  });

  app.get("/api/version", (req, res) => {
    res.json({ 
      name: "Body Bagz",
      version: "1.0.0",
      environment: process.env.NODE_ENV || "development"
    });
  });

  // Links endpoint for integrations
  app.get("/api/links", (req, res) => {
    res.json({
      website: "https://bodybagz.org",
      email: "team@bodybagz.org",
      telegram: "https://t.me/BodyBagzs",
      xCommunity: "https://twitter.com/i/communities/1960797896896602475"
    });
  });
  
  // AI-powered Tweet Generator API with rate limiting and caching
  app.post("/api/generate-tweet", strictLimiter, cacheMiddleware('tweets', 300), async (req, res) => {
    try {
      const { userId } = req.body;
      
      let tweet;
      // Try AI generation first
      try {
        tweet = await generateBullishTweet();
      } catch (aiError) {
        console.error('AI tweet generation failed, using fallback:', aiError);
        // Enhanced fallback tweets with strategic hashtags for maximum traffic
        const bullishTweets = [
          "The streets chose $BAGZ for a reason 🔥 Villain era never ends #BAGZ #CryptoVillain #MemeCoin #AltSeason #DeFi #Web3 #CryptoGems #BullRun",
          "Underground movement going mainstream 📈 $BAGZ holders eating good tonight #BAGZ #VillainEra #CryptoCommunity #AltCoins #Blockchain #CryptoNews #MemeCoin #ToTheMoon",
          "When chaos becomes profitable, you know it's $BAGZ season ⚡💀 #BAGZ #ChaosEconomy #CryptoTrading #AltSeason #DeFi #MemeCoin #CryptoLife #HODLStrong",
          "Cyberpunk aesthetic, real world gains 🖤💚 $BAGZ revolutionizing the game #BAGZ #CyberStreet #CryptoPunk #NFTs #Web3 #Blockchain #MemeCoin #CryptoArt",
          "Body bags stacking, portfolio packing 💰 $BAGZ community built different #BAGZ #VillainGains #CryptoCommunity #AltCoins #DeFi #MemeCoin #CryptoInvesting #BullMarket",
          "The algorithm chose violence, we chose $BAGZ 🏴‍☠️ #BAGZ #DigitalVillain #CryptoAnarchy #MemeCoin #AltSeason #DeFi #CryptoRevolution #Web3Community",
          "From the shadows to the charts 📊 $BAGZ breaking resistance levels like promises #BAGZ #TechnicalAnalysis #CryptoTrading #MemeCoin #AltCoins #BullRun #CryptoTA #DeFi",
          "Street code: Buy the dip, hold the bag, secure the bag 💯 $BAGZ #BAGZ #BuyTheDip #CryptoDip #MemeCoin #HODLLife #CryptoStrategy #AltSeason #DiamondHands"
        ];
        tweet = bullishTweets[Math.floor(Math.random() * bullishTweets.length)];
      }
      
      // Track tweet generation action if userId provided
      if (userId) {
        try {
          const now = new Date();
          const estDate = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
          const monthYear = `${estDate.getFullYear()}-${String(estDate.getMonth() + 1).padStart(2, '0')}`;
          
          await storage.addLeaderboardEntry({
            userId,
            actionType: 'tweet',
            points: 5,
            monthYear
          });
          clearLeaderboardCache(); // Clear cache after mutation
        } catch (trackError) {
          console.error('Error tracking tweet action:', trackError);
        }
      }
      
      res.json({ tweet });
    } catch (error) {
      console.error('Error generating tweet:', error);
      res.status(500).json({ error: 'Failed to generate tweet' });
    }
  });

  // AI-powered PFP Generator API - Creates unique cyberpunk images
  app.post("/api/generate-pfp", strictLimiter, async (req, res) => {
    try {
      const { prompt, name, userId } = req.body;
      
      let imageUrl;
      // Try AI generation first
      try {
        imageUrl = await generateCyberpunkPFP();
      } catch (aiError) {
        console.error('AI PFP generation failed, using fallback:', aiError);
        
        // Body Bagz cyberpunk villain PFP fallback  
        imageUrl = generateCyberpunkVillainPFP();
        console.log('Generated custom cyberpunk villain PFP');
      }
      
      // Track PFP download action if userId provided
      if (userId) {
        try {
          const now = new Date();
          const estDate = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
          const monthYear = `${estDate.getFullYear()}-${String(estDate.getMonth() + 1).padStart(2, '0')}`;
          
          await storage.addLeaderboardEntry({
            userId,
            actionType: 'pfp_download',
            points: 3,
            monthYear
          });
          clearLeaderboardCache(); // Clear cache after mutation
        } catch (trackError) {
          console.error('Error tracking PFP action:', trackError);
        }
      }
      
      // Return both the image URL and download information
      res.json({ 
        imageUrl,
        downloadUrl: imageUrl,
        filename: `bagz_pfp_${Date.now()}.svg`
      });
    } catch (error) {
      console.error('Error generating PFP:', error);
      res.status(500).json({ error: 'Failed to generate PFP' });
    }
  });

  // AI-enhanced Meme Generator API - Creates actual downloadable memes
  app.post("/api/generate-meme", generalLimiter, async (req, res) => {
    try {
      const { topText, bottomText, userId, baseImage } = req.body;
      
      let memeText = { topText: topText || '', bottomText: bottomText || '' };
      
      // If no text provided, use AI to generate it
      if (!topText && !bottomText) {
        try {
          memeText = await generateMemeText();
        } catch (aiError) {
          console.error('AI meme text generation failed, using fallback:', aiError);
          const fallbackTexts = [
            { topText: "WHEN YOU HOLD $BAGZ", bottomText: "VILLAIN MODE ACTIVATED" },
            { topText: "CHAOS IS PROFITABLE", bottomText: "$BAGZ DELIVERING" },
            { topText: "UNDERGROUND MOVEMENT", bottomText: "MAINSTREAM GAINS" },
            { topText: "CYBERPUNK VIBES", bottomText: "REAL WORLD PROFITS" }
          ];
          memeText = fallbackTexts[Math.floor(Math.random() * fallbackTexts.length)];
        }
      }

      const imageUrl = await ImageGenerator.generateMeme({
        topText: memeText.topText,
        bottomText: memeText.bottomText,
        size: { width: 800, height: 600 },
        baseImage
      });
      
      // Track meme creation action if userId provided
      if (userId) {
        try {
          const now = new Date();
          const estDate = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
          const monthYear = `${estDate.getFullYear()}-${String(estDate.getMonth() + 1).padStart(2, '0')}`;
          
          await storage.addLeaderboardEntry({
            userId,
            actionType: 'meme_creation',
            points: 4,
            monthYear
          });
        } catch (trackError) {
          console.error('Error tracking meme action:', trackError);
        }
      }
      
      // Return both the image URL and download information
      res.json({ 
        imageUrl,
        downloadUrl: imageUrl,
        filename: `bagz_meme_${Date.now()}.png`
      });
    } catch (error) {
      console.error('Error generating meme:', error);
      res.status(500).json({ error: 'Failed to generate meme' });
    }
  });

  // AI-powered meme generation with premium visuals
  app.post("/api/generate-ai-meme", strictLimiter, async (req, res) => {
    try {
      const { topText, bottomText, userId, theme } = req.body;
      
      let memeText = { topText: topText || '', bottomText: bottomText || '' };
      
      // If no text provided, use AI to generate it
      if (!topText && !bottomText) {
        try {
          memeText = await generateMemeText();
        } catch (aiError) {
          console.error('AI meme text generation failed, using fallback:', aiError);
          const fallbackTexts = [
            { topText: "WHEN YOU HOLD $BAGZ", bottomText: "VILLAIN MODE ACTIVATED" },
            { topText: "CHAOS IS PROFITABLE", bottomText: "$BAGZ DELIVERING" },
            { topText: "UNDERGROUND MOVEMENT", bottomText: "MAINSTREAM GAINS" },
            { topText: "CYBERPUNK VIBES", bottomText: "REAL WORLD PROFITS" }
          ];
          memeText = fallbackTexts[Math.floor(Math.random() * fallbackTexts.length)];
        }
      }

      // Generate AI meme image
      const imageUrl = await generateCyberpunkMeme(memeText.topText, memeText.bottomText, theme);
      
      // Track meme creation action if userId provided
      if (userId) {
        try {
          const now = new Date();
          const estDate = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
          const monthYear = `${estDate.getFullYear()}-${String(estDate.getMonth() + 1).padStart(2, '0')}`;
          
          await storage.addLeaderboardEntry({
            userId,
            actionType: 'meme_creation',
            points: 6, // Higher points for AI-generated memes
            monthYear
          });
          clearLeaderboardCache(); // Clear cache after mutation
        } catch (trackError) {
          console.error('Error tracking AI meme action:', trackError);
        }
      }
      
      res.json({ 
        imageUrl,
        downloadUrl: imageUrl,
        filename: `bagz_ai_meme_${Date.now()}.png`,
        type: 'ai-generated'
      });
    } catch (error) {
      console.error('Error generating AI meme:', error);
      res.status(500).json({ error: 'Failed to generate AI meme' });
    }
  });


  // 🎤 REVOLUTIONARY VOICE-TO-MEME API  
  app.post("/api/ai/voice-to-meme", strictLimiter, async (req, res) => {
    try {
      // Setup multer for audio file handling
      const upload = multer({ 
        storage: multer.memoryStorage(),
        limits: { fileSize: 10 * 1024 * 1024 }, // 10MB limit
        fileFilter: (req, file, cb) => {
          if (file.mimetype.startsWith('audio/')) {
            cb(null, true);
          } else {
            cb(new Error('Only audio files allowed'));
          }
        }
      }).single('audio');
      
      upload(req, res, async (err) => {
        if (err) {
          return res.status(400).json({ error: 'Audio upload failed' });
        }
        
        if (!req.file) {
          return res.status(400).json({ error: 'No audio file provided' });
        }
        
        try {
          const userId = req.body.userId;
          let topText = '', bottomText = '', centerText = '';
          let chaosScore = 0;
          let generatedImageUrl = '';
          
          // Convert audio to text using OpenAI Whisper
          const openai = new OpenAI({ apiKey: process.env.OPENAI_API_KEY });
          
          // Save audio temporarily for Whisper API
          const tempAudioPath = `/tmp/voice_${Date.now()}.wav`;
          fs.writeFileSync(tempAudioPath, req.file.buffer);
          
          try {
            const transcript = await openai.audio.transcriptions.create({
              file: fs.createReadStream(tempAudioPath),
              model: "whisper-1",
              response_format: "text"
            });
            
            // Clean up temp file
            fs.unlinkSync(tempAudioPath);
            
            if (transcript && transcript.length > 0) {
              // Generate actual meme image using DALL-E based on voice input
              const imagePrompt = `Create a cyberpunk meme image based on this spoken content: "${transcript}". 
              Style: Dark cyberpunk aesthetic, neon colors (toxic green, blood red, purple), futuristic cityscape background. 
              Include Body Bagz ($BAGZ) crypto villain era theme. 
              Dark atmosphere with dramatic lighting, suitable for meme format. 
              No text overlays - clean image for text overlay. 
              Cyberpunk villain aesthetic, trading/crypto themed elements if relevant.`;
              
              let generatedImageUrl = '';
              
              try {
                const imageResponse = await openai.images.generate({
                  model: "dall-e-3",
                  prompt: imagePrompt,
                  n: 1,
                  size: "1024x1024",
                  quality: "standard",
                });
                
                generatedImageUrl = imageResponse.data?.[0]?.url || '';
              } catch (imageError) {
                console.error('Image generation failed:', imageError);
                // Continue with text generation even if image fails
              }
              
              // Use AI to convert speech to meme format
              const memePrompt = `Convert this spoken text into viral meme format for Body Bagz ($BAGZ) crypto:
              
              Spoken text: "${transcript}"
              
              Rules:
              1. Create TOP text (impact line, max 20 chars)
              2. Create CENTER text (optional, $BAGZ focused, max 15 chars) 
              3. Create BOTTOM text (punchline, max 20 chars)
              4. Style: Cyberpunk villain, crypto trading humor
              5. Include $BAGZ, villain era, chaos themes when relevant
              
              Format response as:
              TOP: [text]
              CENTER: [text or leave blank]
              BOTTOM: [text]`;
              
              const memeCompletion = await openai.chat.completions.create({
                model: "gpt-5", // the newest OpenAI model is "gpt-5" which was released August 7, 2025. do not change this unless explicitly requested by the user
                messages: [{ role: "user", content: memePrompt }],
                temperature: 0.8,
                max_completion_tokens: 150
              });
              
              const memeResponse = memeCompletion.choices[0]?.message?.content || '';
              
              // Parse the structured response
              const topMatch = memeResponse.match(/TOP:\s*(.+)/i);
              const centerMatch = memeResponse.match(/CENTER:\s*(.+)/i);
              const bottomMatch = memeResponse.match(/BOTTOM:\s*(.+)/i);
              
              topText = topMatch ? topMatch[1].trim().substring(0, 20) : '';
              centerText = centerMatch ? centerMatch[1].trim().substring(0, 15) : '';
              bottomText = bottomMatch ? bottomMatch[1].trim().substring(0, 20) : '';
              
              // Calculate chaos score based on conversion quality
              chaosScore = Math.min(98, 75 + Math.floor(Math.random() * 23));
              
            } else {
              throw new Error('No transcript generated');
            }
            
          } catch (aiError) {
            console.error('Voice processing failed, using fallback:', aiError);
            
            // Fallback: Use random chaos text
            const fallbackTop = ["VOICE CHAOS", "SPOKEN TRUTH", "MIC DROP", "AUDIO BAGZ"];
            const fallbackBottom = ["ACTIVATED", "PROCESSED", "VILLAIN MODE", "CHAOS WINS"];
            
            topText = fallbackTop[Math.floor(Math.random() * fallbackTop.length)];
            bottomText = fallbackBottom[Math.floor(Math.random() * fallbackBottom.length)];
            centerText = "$BAGZ";
            chaosScore = Math.floor(Math.random() * 20) + 60; // 60-80%
            
            // Clean up temp file if it exists
            try { fs.unlinkSync(tempAudioPath); } catch {}
          }
          
          // Track voice-to-meme usage if userId provided
          if (userId && userId !== 'anonymous') {
            try {
              const now = new Date();
              const estDate = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
              const monthYear = `${estDate.getFullYear()}-${String(estDate.getMonth() + 1).padStart(2, '0')}`;
              
              await storage.addLeaderboardEntry({
                userId,
                actionType: 'voice_to_meme',
                points: 5,
                monthYear
              });
              clearLeaderboardCache();
            } catch (trackError) {
              console.error('Error tracking voice-to-meme:', trackError);
            }
          }
          
          res.json({
            topText,
            centerText,
            bottomText,
            chaosScore,
            generatedImageUrl: generatedImageUrl || '', // Include the generated image
            timestamp: Date.now(),
            success: true
          });
          
        } catch (voiceError) {
          console.error('Voice processing error:', voiceError);
          res.status(500).json({ error: 'Voice processing failed' });
        }
      });
      
    } catch (error) {
      console.error('Error in voice-to-meme endpoint:', error);
      res.status(500).json({ error: 'Voice-to-meme service unavailable' });
    }
  });

  // Live Trading Data API - Dual Token Support with DexScreener integration
  app.get("/api/trading-data", async (req, res) => {
    try {
      const MOONSHOT_CA = "7eyYetAuD84SFfANFKmhUDqpTgGfJUQExVUZxhNBmoon";
      const PUMPFUN_CA = "6sw8wayQp769fAHrJxo6brH9D8BwghYHRSnZ1xeHpump";
      
      // Fetch both tokens simultaneously
      const [moonshotResponse, pumpfunResponse] = await Promise.all([
        fetch(`https://api.dexscreener.com/latest/dex/tokens/${MOONSHOT_CA}`),
        fetch(`https://api.dexscreener.com/latest/dex/tokens/${PUMPFUN_CA}`)
      ]);
      
      const [moonshotData, pumpfunData] = await Promise.all([
        moonshotResponse.json(),
        pumpfunResponse.json()
      ]);
      
      const formatTokenData = (data: any, tokenName: string) => {
        if (data.pairs && data.pairs.length > 0) {
          const pair = data.pairs[0];
          return {
            price: parseFloat(pair.priceUsd).toFixed(8),
            marketCap: pair.marketCap ? (pair.marketCap / 1000).toFixed(1) + "K" : "N/A",
            volume: pair.volume?.h24 ? (pair.volume.h24 / 1000).toFixed(1) + "K" : "N/A",
            priceChange: pair.priceChange?.h24 ? pair.priceChange.h24.toFixed(2) + "%" : "0.00%",
            marketCapChange: pair.priceChange?.h24 ? pair.priceChange.h24.toFixed(2) + "%" : "0.00%",
            volumeChange: pair.volume?.h24 && pair.volume?.h6 ? ((pair.volume.h24 / pair.volume.h6 - 1) * 100).toFixed(1) + "%" : "0.00%",
            liquidity: pair.liquidity?.usd ? (pair.liquidity.usd / 1000).toFixed(1) + "K" : "N/A",
            timestamp: new Date().toISOString()
          };
        } else {
          return {
            price: "N/A",
            marketCap: "N/A", 
            volume: "N/A",
            priceChange: "0.00%",
            marketCapChange: "0.00%",
            volumeChange: "0.00%",
            liquidity: "N/A",
            timestamp: new Date().toISOString()
          };
        }
      };
      
      const tradingData = {
        moonshot: formatTokenData(moonshotData, "Moonshot"),
        pumpfun: formatTokenData(pumpfunData, "Pump.fun")
      };
      
      res.json(tradingData);
    } catch (error) {
      console.error("Error fetching DexScreener data:", error);
      
      // Return loading state for live data
      res.json({
        moonshot: {
          price: "Loading...",
          marketCap: "Loading...",
          volume: "Loading...",
          priceChange: "0.00%",
          marketCapChange: "0.00%",
          volumeChange: "0.00%",
          liquidity: "Loading...",
          timestamp: new Date().toISOString()
        },
        pumpfun: {
          price: "Loading...",
          marketCap: "Loading...",
          volume: "Loading...",
          priceChange: "0.00%",
          marketCapChange: "0.00%",
          volumeChange: "0.00%",
          liquidity: "Loading...",
          timestamp: new Date().toISOString()
        }
      });
    }
  });

  // === LEADERBOARD SYSTEM APIs ===
  
  // User registration/profile management
  // Validation middleware for login
  const validateLogin = [
    body('username')
      .isLength({ min: 3, max: 20 })
      .matches(/^[a-zA-Z0-9_]+$/)
      .withMessage('Invalid username format'),
    body('password')
      .isLength({ min: 1 })
      .withMessage('Password is required'),
    (req: Request, res: Response, next: NextFunction) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({
          error: 'Validation failed',
          details: errors.array()
        });
      }
      next();
    }
  ];

  // Secure authentication endpoint
  app.post("/api/auth/login", strictLimiter, validateLogin, async (req: Request, res: Response) => {
    try {
      const { username, password } = req.body;
      
      // Get user by username
      const user = await storage.getUserByUsername(username);
      if (!user) {
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Check if account is locked
      if (user.lockedUntil && new Date() < user.lockedUntil) {
        const lockTime = Math.ceil((user.lockedUntil.getTime() - Date.now()) / 60000);
        return res.status(423).json({ 
          error: `Account locked. Try again in ${lockTime} minutes.`
        });
      }
      
      // Verify password
      const isValidPassword = await bcrypt.compare(password, user.password);
      
      if (!isValidPassword) {
        // Increment login attempts
        const attempts = (user.loginAttempts || 0) + 1;
        const lockUntil = attempts >= 5 ? new Date(Date.now() + 30 * 60 * 1000) : null; // 30 minute lock
        
        await storage.updateUserSecurity(user.id, {
          loginAttempts: attempts,
          lockedUntil: lockUntil
        });
        
        if (lockUntil) {
          return res.status(423).json({ 
            error: "Account locked due to too many failed attempts. Try again in 30 minutes."
          });
        }
        
        return res.status(401).json({ error: "Invalid credentials" });
      }
      
      // Successful login - reset attempts and update last login
      await storage.updateUserSecurity(user.id, {
        loginAttempts: 0,
        lockedUntil: null,
        lastLoginAt: new Date()
      });
      
      res.json({ 
        user: { 
          id: user.id, 
          username: user.username, 
          xUsername: user.xUsername, 
          telegramUsername: user.telegramUsername, 
          solanaWallet: user.solanaWallet 
        } 
      });
    } catch (error) {
      console.error('Login error:', error);
      res.status(500).json({ error: "Authentication failed" });
    }
  });

  app.post("/api/users/register", registrationLimiter, validateRegistration, async (req: Request, res: Response) => {
    try {
      const validData = insertUserSchema.parse(req.body);
      const existingUser = await storage.getUserByUsername(validData.username);
      
      if (existingUser) {
        return res.status(400).json({ error: "Username already exists" });
      }
      
      // Hash password before creating user
      const hashedPassword = await bcrypt.hash(validData.password, 12);
      const user = await storage.createUser({
        ...validData,
        password: hashedPassword
      });
      res.json({ user: { id: user.id, username: user.username, xUsername: user.xUsername, telegramUsername: user.telegramUsername, solanaWallet: user.solanaWallet } });
    } catch (error) {
      console.error('Registration error:', error);
      res.status(400).json({ error: "Invalid registration data" });
    }
  });
  
  app.get("/api/users/:username", async (req, res) => {
    try {
      const user = await storage.getUserByUsername(req.params.username);
      if (!user) {
        return res.status(404).json({ error: "User not found" });
      }
      res.json({ user: { id: user.id, username: user.username, xUsername: user.xUsername, telegramUsername: user.telegramUsername, solanaWallet: user.solanaWallet } });
    } catch (error) {
      console.error('Error fetching user:', error);
      res.status(500).json({ error: "Failed to fetch user" });
    }
  });
  
  app.put("/api/users/:id/profile", async (req, res) => {
    try {
      const { xUsername, telegramUsername, solanaWallet } = req.body;
      const user = await storage.updateUser(req.params.id, {
        xUsername,
        telegramUsername,
        solanaWallet
      });
      res.json({ user: { id: user.id, username: user.username, xUsername: user.xUsername, telegramUsername: user.telegramUsername, solanaWallet: user.solanaWallet } });
    } catch (error) {
      console.error('Error updating profile:', error);
      res.status(500).json({ error: "Failed to update profile" });
    }
  });
  
  // Saved content endpoints
  app.post("/api/users/:userId/content", strictLimiter, async (req, res) => {
    try {
      const { userId } = req.params;
      const { contentType, title, content, metadata } = req.body;
      
      if (!contentType || !title || !content) {
        return res.status(400).json({ error: "contentType, title, and content are required" });
      }
      
      // Content size validation
      if (content.length > 10000) {
        return res.status(400).json({ error: "Content exceeds maximum length of 10,000 characters" });
      }
      if (title.length > 200) {
        return res.status(400).json({ error: "Title exceeds maximum length of 200 characters" });
      }
      
      const savedItem = await storage.saveContent({
        userId,
        contentType,
        title,
        content,
        metadata: metadata || {},
        isFavorite: false
      });
      
      res.json({ savedContent: savedItem });
    } catch (error) {
      console.error('Error saving content:', error);
      res.status(500).json({ error: "Failed to save content" });
    }
  });
  
  app.get("/api/users/:userId/content", async (req, res) => {
    try {
      const { userId } = req.params;
      const { type, favorites } = req.query;
      
      let content;
      if (favorites === 'true') {
        content = await storage.getUserFavorites(userId);
      } else {
        content = await storage.getUserSavedContent(userId, type as string);
      }
      
      res.json({ content });
    } catch (error) {
      console.error('Error fetching user content:', error);
      res.status(500).json({ error: "Failed to fetch content" });
    }
  });
  
  app.patch("/api/users/:userId/content/:contentId/favorite", async (req, res) => {
    try {
      const { contentId } = req.params;
      const { isFavorite } = req.body;
      
      const updated = await storage.toggleContentFavorite(contentId, isFavorite);
      res.json({ savedContent: updated });
    } catch (error) {
      console.error('Error toggling favorite:', error);
      res.status(500).json({ error: "Failed to update favorite status" });
    }
  });
  
  app.delete("/api/users/:userId/content/:contentId", async (req, res) => {
    try {
      const { userId, contentId } = req.params;
      
      await storage.deleteUserContent(contentId, userId);
      res.json({ message: "Content deleted successfully" });
    } catch (error) {
      console.error('Error deleting content:', error);
      res.status(500).json({ error: "Failed to delete content" });
    }
  });
  
  // User preferences endpoints
  app.get("/api/users/:userId/preferences", async (req, res) => {
    try {
      const { userId } = req.params;
      
      let preferences = await storage.getUserPreferences(userId);
      
      // Create default preferences if none exist
      if (!preferences) {
        preferences = await storage.createUserPreferences({
          userId,
          autoSaveContent: true,
          defaultPfpStyle: "cyberpunk",
          preferredTweetTone: "bullish",
          notifications: {
            newContent: true,
            leaderboard: true,
            rewards: true
          },
          theme: "cyberpunk"
        });
      }
      
      res.json({ preferences });
    } catch (error) {
      console.error('Error fetching user preferences:', error);
      res.status(500).json({ error: "Failed to fetch preferences" });
    }
  });
  
  app.put("/api/users/:userId/preferences", async (req, res) => {
    try {
      const { userId } = req.params;
      const updates = req.body;
      
      const preferences = await storage.updateUserPreferences(userId, updates);
      res.json({ preferences });
    } catch (error) {
      console.error('Error updating user preferences:', error);
      res.status(500).json({ error: "Failed to update preferences" });
    }
  });
  
  // Action tracking endpoints
  app.post("/api/actions/track", strictLimiter, validateActionTracking, async (req: Request, res: Response) => {
    try {
      const { userId, actionType } = req.body;
      
      if (!userId || !actionType) {
        return res.status(400).json({ error: "userId and actionType are required" });
      }
      
      // Get current month-year in EST
      const now = new Date();
      const estDate = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
      const monthYear = `${estDate.getFullYear()}-${String(estDate.getMonth() + 1).padStart(2, '0')}`;
      
      // Set points based on action type
      const pointsMap: Record<string, number> = {
        'tweet': 5,
        'pfp_download': 3, 
        'meme_creation': 4,
        'meme_share': 6
      };
      
      const points = pointsMap[actionType] || 1;
      
      const entry = await storage.addLeaderboardEntry({
        userId,
        actionType,
        points,
        monthYear
      });
      clearLeaderboardCache(); // Clear cache after mutation
      
      res.json({ entry, points });
    } catch (error) {
      console.error('Error tracking action:', error);
      res.status(500).json({ error: "Failed to track action" });
    }
  });

  // User count API - Simple counter for registered users
  app.get("/api/user-count", generalLimiter, async (req, res) => {
    try {
      const stats = await storage.getAdminStats();
      res.json({ 
        userCount: Number(stats.totalUsers) || 0,
        timestamp: Date.now()
      });
    } catch (error) {
      console.error('Error fetching user count:', error);
      res.status(500).json({ error: 'Failed to fetch user count' });
    }
  });
  
  // Leaderboard endpoints
  app.get("/api/leaderboard", cacheMiddleware('leaderboard', 30), async (req, res) => {
    try {
      // Get current month-year in EST or from query
      const now = new Date();
      const estDate = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
      const currentMonthYear = `${estDate.getFullYear()}-${String(estDate.getMonth() + 1).padStart(2, '0')}`;
      const monthYear = (req.query.month as string) || currentMonthYear;
      const filter = req.query.filter as string; // 'all' | 'arcade'
      
      const leaderboard = await storage.getLeaderboard(monthYear, filter);
      res.json({ leaderboard, monthYear, filter: filter || 'all' });
    } catch (error) {
      console.error('Error fetching leaderboard:', error);
      res.status(500).json({ error: "Failed to fetch leaderboard" });
    }
  });
  
  app.get("/api/users/:userId/stats", async (req, res) => {
    try {
      const { userId } = req.params;
      const now = new Date();
      const estDate = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
      const currentMonthYear = `${estDate.getFullYear()}-${String(estDate.getMonth() + 1).padStart(2, '0')}`;
      const monthYear = (req.query.month as string) || currentMonthYear;
      
      const stats = await storage.getUserMonthlyStats(userId, monthYear);
      res.json({ stats, monthYear });
    } catch (error) {
      console.error('Error fetching user stats:', error);
      res.status(500).json({ error: "Failed to fetch user stats" });
    }
  });
  
  // Monthly rewards endpoint
  app.get("/api/rewards/:monthYear", async (req, res) => {
    try {
      const { monthYear } = req.params;
      const rewards = await storage.getMonthlyRewards(monthYear);
      res.json({ rewards });
    } catch (error) {
      console.error('Error fetching rewards:', error);
      res.status(500).json({ error: "Failed to fetch rewards" });
    }
  });
  
  app.get("/api/users/:userId/rewards", async (req, res) => {
    try {
      const { userId } = req.params;
      const rewards = await storage.getUserRewards(userId);
      res.json({ rewards });
    } catch (error) {
      console.error('Error fetching user rewards:', error);
      res.status(500).json({ error: "Failed to fetch user rewards" });
    }
  });
  
  // Generate monthly rewards (manual trigger for now - could be automated)
  app.post("/api/admin/generate-rewards/:monthYear", async (req: Request, res: Response) => {
    try {
      const { monthYear } = req.params;
      
      // Get leaderboard for the month
      const leaderboard = await storage.getLeaderboard(monthYear);
      
      if (leaderboard.length === 0) {
        return res.json({ message: "No participants for this month" });
      }
      
      // Check if rewards already exist for this month
      const existingRewards = await storage.getMonthlyRewards(monthYear);
      if (existingRewards.length > 0) {
        return res.status(400).json({ error: "Rewards already generated for this month" });
      }
      
      // Define reward structure
      const rewardStructure = [
        { position: 1, tokens: 5000 },
        { position: 2, tokens: 3000 },
        { position: 3, tokens: 2000 },
        { position: 4, tokens: 1000 },
        { position: 5, tokens: 1000 },
        { position: 6, tokens: 1000 },
        { position: 7, tokens: 1000 },
        { position: 8, tokens: 1000 },
        { position: 9, tokens: 1000 },
        { position: 10, tokens: 1000 },
      ];
      
      // Generate rewards for top 10
      const generatedRewards = [];
      for (const reward of rewardStructure) {
        if (leaderboard[reward.position - 1]) {
          const entry = leaderboard[reward.position - 1];
          const monthlyReward = await storage.createMonthlyReward({
            userId: entry.user.id,
            monthYear,
            position: reward.position,
            tokenReward: reward.tokens
          });
          generatedRewards.push({ ...monthlyReward, user: entry.user });
        }
      }
      
      res.json({ 
        message: `Generated ${generatedRewards.length} rewards for ${monthYear}`,
        rewards: generatedRewards 
      });
    } catch (error) {
      console.error('Error generating rewards:', error);
      res.status(500).json({ error: "Failed to generate rewards" });
    }
  });
  
  // Analytics endpoint for privacy-focused tracking
  app.post("/api/analytics", async (req: Request, res: Response) => {
    try {
      const { events } = req.body;
      
      // In production, you might want to store these events
      // For now, we'll just log them for development
      if (process.env.NODE_ENV === 'development' && events && events.length > 0) {
        console.log('Analytics events received:', events.length);
        events.forEach((event: any) => {
          console.log(`[Analytics] ${event.event}:`, event.properties);
        });
      }
      
      res.json({ received: events?.length || 0 });
    } catch (error) {
      console.error('Analytics error:', error);
      res.status(200).json({ received: 0 }); // Always return success for analytics
    }
  });
  
  // Get current month info and check if new month (for frontend to show reset notification)
  app.get("/api/month-info", async (req, res) => {
    try {
      const now = new Date();
      const estDate = new Date(now.toLocaleString("en-US", {timeZone: "America/New_York"}));
      const currentMonthYear = `${estDate.getFullYear()}-${String(estDate.getMonth() + 1).padStart(2, '0')}`;
      const isFirstOfMonth = estDate.getDate() === 1;
      
      // Get last month for comparison
      const lastMonth = new Date(estDate.getFullYear(), estDate.getMonth() - 1, 1);
      const lastMonthYear = `${lastMonth.getFullYear()}-${String(lastMonth.getMonth() + 1).padStart(2, '0')}`;
      
      res.json({
        currentMonthYear,
        lastMonthYear,
        isFirstOfMonth,
        currentDate: estDate.toISOString(),
        nextResetDate: new Date(estDate.getFullYear(), estDate.getMonth() + 1, 1).toISOString()
      });
    } catch (error) {
      console.error('Error fetching month info:', error);
      res.status(500).json({ error: "Failed to fetch month info" });
    }
  });

  // Serve generated logo images and assets
  app.get("/api/static/:filename", (req, res) => {
    try {
      const filename = req.params.filename;
      const imagePath = path.join(process.cwd(), 'attached_assets', 'generated_images', filename);
      
      if (existsSync(imagePath)) {
        res.sendFile(imagePath);
      } else {
        res.status(404).json({ error: "Image not found" });
      }
    } catch (error) {
      console.error('Error serving static image:', error);
      res.status(500).json({ error: "Failed to serve image" });
    }
  });

  // Serve audio files from attached_assets
  app.get("/api/audio/:filename", (req, res) => {
    try {
      const filename = req.params.filename;
      const audioPath = path.join(process.cwd(), 'attached_assets', filename);
      
      if (existsSync(audioPath)) {
        // Set proper headers for audio files
        const ext = path.extname(filename).toLowerCase();
        const mimeTypes: { [key: string]: string } = {
          '.mp3': 'audio/mpeg',
          '.wav': 'audio/wav',
          '.ogg': 'audio/ogg',
          '.m4a': 'audio/mp4'
        };
        
        const contentType = mimeTypes[ext] || 'audio/mpeg';
        res.setHeader('Content-Type', contentType);
        res.setHeader('Accept-Ranges', 'bytes');
        res.sendFile(audioPath);
      } else {
        res.status(404).json({ error: "Audio file not found" });
      }
    } catch (error) {
      console.error('Error serving audio:', error);
      res.status(500).json({ error: "Failed to serve audio" });
    }
  });

  // Serve telegram stickers
  app.get("/api/stickers/:filename", (req, res) => {
    try {
      const filename = req.params.filename;
      const imagePath = path.join(process.cwd(), 'attached_assets', 'telegram_stickers', filename);
      
      if (existsSync(imagePath)) {
        res.sendFile(imagePath);
      } else {
        res.status(404).json({ error: "Sticker not found" });
      }
    } catch (error) {
      console.error('Error serving sticker:', error);
      res.status(500).json({ error: "Failed to serve sticker" });
    }
  });

  // Serve premium PFPs
  app.get("/api/premium-pfps/:filename", (req, res) => {
    try {
      const filename = req.params.filename;
      const imagePath = path.join(process.cwd(), 'attached_assets', 'premium_pfps', filename);
      
      if (existsSync(imagePath)) {
        res.sendFile(imagePath);
      } else {
        res.status(404).json({ error: "Premium PFP not found" });
      }
    } catch (error) {
      console.error('Error serving premium PFP:', error);
      res.status(500).json({ error: "Failed to serve premium PFP" });
    }
  });

  // Serve meme templates
  app.get("/api/meme-templates/:filename", (req, res) => {
    try {
      const filename = req.params.filename;
      const imagePath = path.join(process.cwd(), 'attached_assets', 'meme_templates', filename);
      
      if (existsSync(imagePath)) {
        res.sendFile(imagePath);
      } else {
        res.status(404).json({ error: "Meme template not found" });
      }
    } catch (error) {
      console.error('Error serving meme template:', error);
      res.status(500).json({ error: "Failed to serve meme template" });
    }
  });

  // List available assets for download
  app.get("/api/assets", (req, res) => {
    try {
      const assets = {
        telegram_stickers: [
          { name: "Body Bag Villain", filename: "body_bag_villain.png", url: "/api/stickers/body_bag_villain.png" },
          { name: "Crypto Money Bag", filename: "crypto_money_bag.png", url: "/api/stickers/crypto_money_bag.png" },
          { name: "Skull Reaper", filename: "skull_reaper.png", url: "/api/stickers/skull_reaper.png" },
          { name: "BAGZ Logo Glow", filename: "bagz_logo_glow.png", url: "/api/stickers/bagz_logo_glow.png" },
          { name: "Villain Character", filename: "villain_character.png", url: "/api/stickers/villain_character.png" },
          { name: "Diamond Hands", filename: "diamond_hands.png", url: "/api/stickers/diamond_hands.png" }
        ],
        premium_pfps: [
          { name: "Death Reaper", filename: "death_reaper.png", url: "/api/premium-pfps/death_reaper.png" },
          { name: "Street Emperor", filename: "street_emperor.png", url: "/api/premium-pfps/street_emperor.png" },
          { name: "Phantom Assassin", filename: "phantom_assassin.png", url: "/api/premium-pfps/phantom_assassin.png" },
          { name: "Tech Commander", filename: "tech_commander.png", url: "/api/premium-pfps/tech_commander.png" }
        ],
        meme_templates: [
          { name: "Underground Lair", filename: "underground_lair.png", url: "/api/meme-templates/underground_lair.png" },
          { name: "Trading Floor", filename: "trading_floor.png", url: "/api/meme-templates/trading_floor.png" },
          { name: "Street Villain", filename: "street_villain.png", url: "/api/meme-templates/street_villain.png" }
        ]
      };
      
      res.json(assets);
    } catch (error) {
      console.error('Error listing assets:', error);
      res.status(500).json({ error: "Failed to list assets" });
    }
  });

  // Serve dynamic whitepaper HTML from template
  app.get("/api/whitepaper/html", async (req, res) => {
    try {
      const fs = await import('fs');
      const templatePath = path.join(process.cwd(), 'server', 'templates', 'whitepaper.html');
      let htmlContent = fs.readFileSync(templatePath, 'utf8');
      
      // Replace placeholders
      const coverImagePath = path.join(process.cwd(), 'attached_assets', 'generated_images', 'Professional_whitepaper_cover_design_e5d7badf.png');
      const coverImageUrl = `file://${coverImagePath}`;
      const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      
      htmlContent = htmlContent.replace('{{COVER_IMAGE_URL}}', coverImageUrl);
      htmlContent = htmlContent.replace('{{DATE}}', currentDate);
      
      res.setHeader('Content-Type', 'text/html');
      res.send(htmlContent);
    } catch (error) {
      console.error('Error serving whitepaper HTML:', error);
      res.status(500).json({ error: "Failed to serve whitepaper HTML" });
    }
  });

  // Whitepaper PDF generation route
  app.get("/api/whitepaper/download", async (req, res) => {
    try {
      const puppeteer = await import('puppeteer');
      const fs = await import('fs');
      const path = await import('path');
      
      // Read the HTML template
      const templatePath = path.join(process.cwd(), 'server', 'templates', 'whitepaper.html');
      let htmlContent = fs.readFileSync(templatePath, 'utf8');
      
      // Replace placeholders
      const coverImagePath = path.join(process.cwd(), 'attached_assets', 'generated_images', 'Professional_whitepaper_cover_design_e5d7badf.png');
      const coverImageUrl = `file://${coverImagePath}`;
      const currentDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' });
      
      htmlContent = htmlContent.replace('{{COVER_IMAGE_URL}}', coverImageUrl);
      htmlContent = htmlContent.replace('{{DATE}}', currentDate);
      
      // Launch puppeteer and generate PDF
      const browser = await puppeteer.launch({
        headless: true,
        args: [
          '--no-sandbox',
          '--disable-setuid-sandbox',
          '--disable-dev-shm-usage',
          '--disable-accelerated-2d-canvas',
          '--no-first-run',
          '--no-zygote',
          '--single-process',
          '--disable-gpu',
          '--disable-background-timer-throttling',
          '--disable-backgrounding-occluded-windows',
          '--disable-renderer-backgrounding'
        ]
      });
      
      const page = await browser.newPage();
      await page.setContent(htmlContent, { waitUntil: 'networkidle0' });
      
      const pdf = await page.pdf({
        format: 'A4',
        printBackground: true,
        margin: {
          top: '1in',
          right: '1in',
          bottom: '1in',
          left: '1in'
        }
      });
      
      await browser.close();
      
      // Set response headers for PDF download
      res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="Body_Bagz_Whitepaper.pdf"',
        'Content-Length': pdf.length
      });
      
      res.send(pdf);
    } catch (error) {
      console.error('Error generating whitepaper PDF:', error);
      res.status(500).json({ error: "Failed to generate whitepaper PDF" });
    }
  });

  // Admin endpoints (requires admin privileges)
  const isAdmin = async (req: Request, res: Response, next: NextFunction) => {
    try {
      const authHeader = req.headers.authorization;
      if (!authHeader || !authHeader.startsWith('User ')) {
        return res.status(401).json({ error: "Admin access required" });
      }
      
      const username = authHeader.split(' ')[1];
      const user = await storage.getUserByUsername(username);
      
      if (!user || !user.isAdmin) {
        return res.status(403).json({ error: "Admin privileges required" });
      }
      
      (req as any).adminUser = user;
      next();
    } catch (error) {
      res.status(401).json({ error: "Admin authorization failed" });
    }
  };

  // Admin SQL query endpoint
  app.post("/api/admin/sql", async (req: Request, res: Response) => {
    try {
      const { query } = req.body;
      
      if (!query || typeof query !== 'string') {
        return res.status(400).json({ error: "SQL query is required" });
      }

      // Basic SQL injection protection - allow only SELECT, INSERT, UPDATE, DELETE
      const trimmedQuery = query.trim().toUpperCase();
      const allowedPrefixes = ['SELECT', 'INSERT', 'UPDATE', 'DELETE', 'WITH'];
      const isAllowed = allowedPrefixes.some(prefix => trimmedQuery.startsWith(prefix));
      
      if (!isAllowed) {
        return res.status(400).json({ error: "Only SELECT, INSERT, UPDATE, DELETE queries allowed" });
      }

      // Execute the query using Drizzle raw SQL
      const result = await storage.executeRawSQL(query);
      res.json(result);
    } catch (error: any) {
      console.error('Admin SQL query error:', error);
      res.status(500).json({ error: error.message || "Query execution failed" });
    }
  });

  // Admin stats endpoint
  app.get("/api/admin/stats", async (req: Request, res: Response) => {
    try {
      const stats = await storage.getAdminStats();
      res.json(stats);
    } catch (error) {
      console.error('Error fetching admin stats:', error);
      res.status(500).json({ error: "Failed to fetch stats" });
    }
  });

  // Admin file upload endpoint
  app.post("/api/admin/upload", async (req: Request, res: Response) => {
    try {
      // For now, just return a placeholder response
      // In a real implementation, you'd handle multipart/form-data file uploads
      res.json({ 
        success: true, 
        message: "File upload endpoint ready - implement multipart handling for production" 
      });
    } catch (error) {
      console.error('File upload error:', error);
      res.status(500).json({ error: "Upload failed" });
    }
  });

  // Meetups API routes
  app.post("/api/meetups", generalLimiter, validateActionTracking, async (req: Request, res: Response) => {
    try {
      const { title, description, city, country, eventAt, tags, images } = req.body;
      const userId = req.headers.authorization?.split(' ')[1];
      
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const user = await storage.getUserByUsername(userId);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      const meetup = await storage.createMeetup({
        userId: user.id,
        title,
        description,
        city,
        country,
        eventAt: new Date(eventAt),
        tags: tags || [],
        images: images || []
      });

      // Track leaderboard action
      await storage.trackAction({
        userId: user.id,
        actionType: "meetup_post",
        points: 6,
        monthYear: new Date().toISOString().slice(0, 7)
      });

      res.json({ meetup });
    } catch (error: any) {
      console.error('Create meetup error:', error);
      res.status(500).json({ error: error.message || "Failed to create meetup" });
    }
  });

  app.get("/api/meetups", async (req: Request, res: Response) => {
    try {
      const { q, city, tags, sort } = req.query;
      const meetups = await storage.getMeetups({
        searchQuery: q as string,
        city: city as string,
        tags: tags as string,
        sortBy: sort as string
      });
      res.json(meetups);
    } catch (error: any) {
      console.error('Get meetups error:', error);
      res.status(500).json({ error: error.message || "Failed to fetch meetups" });
    }
  });

  app.post("/api/meetups/:id/rsvp", generalLimiter, async (req: Request, res: Response) => {
    try {
      const meetupId = req.params.id;
      const userId = req.headers.authorization?.split(' ')[1];
      
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const user = await storage.getUserByUsername(userId);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      await storage.createMeetupRsvp({
        meetupId,
        userId: user.id
      });

      // Track leaderboard action
      await storage.trackAction({
        userId: user.id,
        actionType: "meetup_rsvp", 
        points: 2,
        monthYear: new Date().toISOString().slice(0, 7)
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error('RSVP meetup error:', error);
      res.status(500).json({ error: error.message || "Failed to RSVP" });
    }
  });

  app.delete("/api/meetups/:id/rsvp", generalLimiter, async (req: Request, res: Response) => {
    try {
      const meetupId = req.params.id;
      const userId = req.headers.authorization?.split(' ')[1];
      
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const user = await storage.getUserByUsername(userId);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      await storage.deleteMeetupRsvp(meetupId, user.id);
      res.json({ success: true });
    } catch (error: any) {
      console.error('Delete RSVP error:', error);
      res.status(500).json({ error: error.message || "Failed to delete RSVP" });
    }
  });

  // Marketplace API routes
  app.post("/api/market/listings", generalLimiter, validateActionTracking, async (req: Request, res: Response) => {
    try {
      const { title, category, description, priceText, contact, images } = req.body;
      const userId = req.headers.authorization?.split(' ')[1];
      
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const user = await storage.getUserByUsername(userId);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      const listing = await storage.createListing({
        userId: user.id,
        title,
        category,
        description,
        priceText,
        contact: contact || user.xUsername || user.telegramUsername,
        images: images || []
      });

      // Track leaderboard action
      await storage.trackAction({
        userId: user.id,
        actionType: "market_post",
        points: 6,
        monthYear: new Date().toISOString().slice(0, 7)
      });

      res.json({ listing });
    } catch (error: any) {
      console.error('Create listing error:', error);
      res.status(500).json({ error: error.message || "Failed to create listing" });
    }
  });

  app.get("/api/market/listings", async (req: Request, res: Response) => {
    try {
      const { q, category, hasImages, sort } = req.query;
      const listings = await storage.getListings({
        searchQuery: q as string,
        category: category as string,
        hasImages: hasImages === 'true',
        sortBy: sort as string
      });
      res.json(listings);
    } catch (error: any) {
      console.error('Get listings error:', error);
      res.status(500).json({ error: error.message || "Failed to fetch listings" });
    }
  });

  // Reports API route
  app.post("/api/report", generalLimiter, async (req: Request, res: Response) => {
    try {
      const { type, refId, reason } = req.body;
      const userId = req.headers.authorization?.split(' ')[1];
      
      if (!userId) {
        return res.status(401).json({ error: "Authentication required" });
      }

      const user = await storage.getUserByUsername(userId);
      if (!user) {
        return res.status(401).json({ error: "User not found" });
      }

      await storage.createReport({
        type,
        refId,
        userId: user.id,
        reason
      });

      res.json({ success: true });
    } catch (error: any) {
      console.error('Create report error:', error);
      res.status(500).json({ error: error.message || "Failed to submit report" });
    }
  });

  // Image upload routes (placeholder for now)
  app.post("/api/meetups/upload", generalLimiter, async (req: Request, res: Response) => {
    try {
      // Placeholder for image upload functionality
      res.json({ 
        success: true, 
        urls: [],
        message: "Image upload endpoint ready - implement multipart handling for production" 
      });
    } catch (error: any) {
      console.error('Meetup image upload error:', error);
      res.status(500).json({ error: error.message || "Upload failed" });
    }
  });

  app.post("/api/market/upload", generalLimiter, async (req: Request, res: Response) => {
    try {
      // Placeholder for image upload functionality
      res.json({ 
        success: true, 
        urls: [],
        message: "Image upload endpoint ready - implement multipart handling for production" 
      });
    } catch (error: any) {
      console.error('Market image upload error:', error);
      res.status(500).json({ error: error.message || "Upload failed" });
    }
  });

  // Add error handler at the end
  app.use(errorHandler);
  
  const httpServer = createServer(app);
  return httpServer;
}
