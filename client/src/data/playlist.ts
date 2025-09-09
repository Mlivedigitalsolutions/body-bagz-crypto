export interface Song {
  id: string;
  title: string;
  src: string;
  category: 'latest' | 'crypto' | 'villain' | 'revolution' | 'classic';
  description?: string;
  duration?: string;
}

export const playlist: Song[] = [
  // Latest drops (newest uploads)
  {
    id: 'champagne-dreams',
    title: 'Champagne Dreams',
    src: '/api/audio/champagne dreams_1757383060150.mp3',
    category: 'latest',
    description: 'Luxurious villain vibes with champagne lifestyle energy'
  },
  {
    id: 'villain-creed',
    title: 'Villain Creed',
    src: '/api/audio/Villian creed _1757383060158.mp3',
    category: 'villain',
    description: 'The fundamental principles of the villain era'
  },
  {
    id: 'chaos-amplified',
    title: 'Chaos Amplified',
    src: '/api/audio/Chaos amplified _1757383060165.mp3',
    category: 'latest',
    description: 'Maximum chaos energy for the collective'
  },
  {
    id: 'straight-out-da-trenches-remix-wav',
    title: 'Straight Out Da Trenches Remix',
    src: '/api/audio/Straight out Da Trenches remix_1757383060172.wav',
    category: 'revolution',
    description: 'High-quality remix straight from the trenches'
  },
  {
    id: 'straight-out-da-trenches',
    title: 'Straight Out Da Trenches',
    src: '/api/audio/Straight out Da Trenches _1757383060179.mp3',
    category: 'revolution',
    description: 'Raw street energy and underground hustle'
  },
  {
    id: 'straight-out-da-trenches-remix',
    title: 'Straight Out Da Trenches Remix',
    src: '/api/audio/Straight out Da Trenches remix_1757383060186.mp3',
    category: 'revolution',
    description: 'Alternative remix with enhanced beats'
  },
  {
    id: 'villain-revolution-remix',
    title: 'Villain Revolution Remix',
    src: '/api/audio/Villian Revolution remix_1757383060192.mp3',
    category: 'revolution',
    description: 'Revolutionary anthem for the villain collective'
  },
  {
    id: 'villain-revolution-1',
    title: 'Villain Revolution I',
    src: '/api/audio/Villian Revolution 1_1757383060200.mp3',
    category: 'revolution',
    description: 'First chapter of the villain revolution'
  },
  {
    id: 'gen-z-stand-up-remix',
    title: 'Gen Z Stand Up Remix',
    src: '/api/audio/Gen Z Stand up remix_1757383060208.mp3',
    category: 'revolution',
    description: 'Generational anthem remix for Gen Z warriors'
  },
  {
    id: 'gen-z-stand-up',
    title: 'Gen Z Stand Up!!',
    src: '/api/audio/Gez Z Stand Up!!_1757383060216.mp3',
    category: 'revolution',
    description: 'Powerful call to action for the new generation'
  },
  
  // Crypto anthems (second batch)
  {
    id: 'rug-hunter-club-mix',
    title: 'Rug Hunter Club Mix',
    src: '/api/audio/Rug Hunter club mix_1757382875327.mp3',
    category: 'crypto',
    description: 'Club remix for hunting down rug pulls'
  },
  {
    id: 'rug-hunter',
    title: 'Rug Hunter',
    src: '/api/audio/Rug Hunter_1757382875336.mp3',
    category: 'crypto',
    description: 'Protect yourself from crypto scams'
  },
  {
    id: '10x-100x-1000x-remix',
    title: '10x 100x 1000x Remix',
    src: '/api/audio/10x 100x 1000x remix_1757382875344.mp3',
    category: 'crypto',
    description: 'Multiplier madness remix for massive gains'
  },
  {
    id: '10x-100x-1000x-mix',
    title: '10x 100x 1000x Mix',
    src: '/api/audio/10x 100x 1000x mix_1757382875353.mp3',
    category: 'crypto',
    description: 'Alternative mix of the multiplier anthem'
  },
  {
    id: '10x-100x-real',
    title: '10x 100x Real',
    src: '/api/audio/10x 100x real_1757382875361.mp3',
    category: 'crypto',
    description: 'Real talk about crypto multipliers'
  },
  {
    id: '10x-100x-raw',
    title: '10x 100x Raw',
    src: '/api/audio/10x 100x raw_1757382875370.mp3',
    category: 'crypto',
    description: 'Raw energy for crypto gains'
  },
  {
    id: 'ten-x-style',
    title: 'Ten X Style',
    src: '/api/audio/Ten x style_1757382875379.mp3',
    category: 'crypto',
    description: 'Stylized version of the 10x anthem'
  },
  {
    id: 'ten-x',
    title: 'Ten X',
    src: '/api/audio/Ten x_1757382875387.mp3',
    category: 'crypto',
    description: 'Clean 10x energy for your portfolio'
  },
  {
    id: 'champagne-dreams-duet',
    title: 'Champagne Dreams Duet',
    src: '/api/audio/champagne dreams duet _1757382875396.mp3',
    category: 'latest',
    description: 'Duet version of the champagne lifestyle anthem'
  },
  
  // Classic villain era (original tracks)
  {
    id: 'villain-mode',
    title: 'Villain Mode',
    src: '/audio/Villain Mode_1756862187502.mp3',
    category: 'classic',
    description: 'The original villain mode activation track'
  },
  {
    id: 'cyber-throne',
    title: 'Cyber Throne',
    src: '/audio/Cyber Throne_1756862187531.mp3',
    category: 'classic',
    description: 'Ascending to the cyberpunk throne'
  },
  {
    id: 'cyber-throne-2',
    title: 'Cyber Throne II',
    src: '/audio/Cyber Throne2_1756862187546.mp3',
    category: 'classic',
    description: 'Second chapter of cyber dominance'
  },
  {
    id: 'villain-era',
    title: 'Villain Era',
    src: '/audio/Villain Era_1756862187560.mp3',
    category: 'villain',
    description: 'Defining the villain era movement'
  },
  {
    id: 'villain-era-2',
    title: 'Villain Era II',
    src: '/audio/Villain Era 2_1756862187574.mp3',
    category: 'villain',
    description: 'Evolution of the villain era sound'
  },
  {
    id: 'frankenstein-rising-epic',
    title: 'Frankenstein Rising Epic',
    src: '/audio/Frankenstein Rising epic_1756864222767.mp3',
    category: 'classic',
    description: 'Epic rise of the digital monster'
  },
  {
    id: 'frankenstein-rising',
    title: 'Frankenstein Rising',
    src: '/audio/Frankenstein Rising_1756864222802.mp3',
    category: 'classic',
    description: 'The monster awakens in cyberspace'
  },
  {
    id: 'march-of-the-villain',
    title: 'March of the Villain',
    src: '/audio/March of the Villain_1756864222809.mp3',
    category: 'villain',
    description: 'The villain army marches forward'
  },
  {
    id: 'march-of-the-villain-1',
    title: 'March of the Villain I',
    src: '/audio/March of the Villain 1_1756864222821.mp3',
    category: 'villain',
    description: 'First movement of the villain march'
  },
  {
    id: 'dr-frankenstein-theme-2',
    title: 'Dr Frankenstein\'s Theme II',
    src: '/audio/Dr Frankenstein\'s Theme 2_1756864222828.mp3',
    category: 'classic',
    description: 'The mad scientist\'s continued experiments'
  },
  {
    id: 'dr-frankenstein-theme-1',
    title: 'Dr Frankenstein\'s Theme I',
    src: '/audio/Dr Frankenstein\'s Theme 1_1756864222833.mp3',
    category: 'classic',
    description: 'Original theme of digital creation'
  }
];

export const getCategorizedPlaylist = () => {
  const categories = {
    latest: playlist.filter(song => song.category === 'latest'),
    crypto: playlist.filter(song => song.category === 'crypto'),
    villain: playlist.filter(song => song.category === 'villain'),
    revolution: playlist.filter(song => song.category === 'revolution'),
    classic: playlist.filter(song => song.category === 'classic')
  };
  
  return categories;
};