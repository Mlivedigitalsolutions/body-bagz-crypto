import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward } from 'lucide-react';
import { Button } from './ui/button';

interface Song {
  id: string;
  title: string;
  src: string;
}

const playlist: Song[] = [
  {
    id: 'villain-mode',
    title: 'Villain Mode',
    src: '/audio/Villain Mode_1756862187502.mp3'
  },
  {
    id: 'cyber-throne',
    title: 'Cyber Throne',
    src: '/audio/Cyber Throne_1756862187531.mp3'
  },
  {
    id: 'cyber-throne-2',
    title: 'Cyber Throne II',
    src: '/audio/Cyber Throne2_1756862187546.mp3'
  },
  {
    id: 'villain-era',
    title: 'Villain Era',
    src: '/audio/Villain Era_1756862187560.mp3'
  },
  {
    id: 'villain-era-2',
    title: 'Villain Era II',
    src: '/audio/Villain Era 2_1756862187574.mp3'
  },
  {
    id: 'frankenstein-rising-epic',
    title: 'Frankenstein Rising Epic',
    src: '/audio/Frankenstein Rising epic_1756864222767.mp3'
  },
  {
    id: 'frankenstein-rising',
    title: 'Frankenstein Rising',
    src: '/audio/Frankenstein Rising_1756864222802.mp3'
  },
  {
    id: 'march-of-the-villain',
    title: 'March of the Villain',
    src: '/audio/March of the Villain_1756864222809.mp3'
  },
  {
    id: 'march-of-the-villain-1',
    title: 'March of the Villain I',
    src: '/audio/March of the Villain 1_1756864222821.mp3'
  },
  {
    id: 'dr-frankenstein-theme-2',
    title: 'Dr Frankenstein\'s Theme II',
    src: '/audio/Dr Frankenstein\'s Theme 2_1756864222828.mp3'
  },
  {
    id: 'dr-frankenstein-theme-1',
    title: 'Dr Frankenstein\'s Theme I',
    src: '/audio/Dr Frankenstein\'s Theme 1_1756864222833.mp3'
  },
  {
    id: 'rug-hunter-club-mix',
    title: 'Rug Hunter Club Mix',
    src: '/audio/Rug Hunter club mix_1757382875327.mp3'
  },
  {
    id: 'rug-hunter',
    title: 'Rug Hunter',
    src: '/audio/Rug Hunter_1757382875336.mp3'
  },
  {
    id: '10x-100x-1000x-remix',
    title: '10x 100x 1000x Remix',
    src: '/audio/10x 100x 1000x remix_1757382875344.mp3'
  },
  {
    id: '10x-100x-1000x-mix',
    title: '10x 100x 1000x Mix',
    src: '/audio/10x 100x 1000x mix_1757382875353.mp3'
  },
  {
    id: '10x-100x-real',
    title: '10x 100x Real',
    src: '/audio/10x 100x real_1757382875361.mp3'
  },
  {
    id: '10x-100x-raw',
    title: '10x 100x Raw',
    src: '/audio/10x 100x raw_1757382875370.mp3'
  },
  {
    id: 'ten-x-style',
    title: 'Ten X Style',
    src: '/audio/Ten x style_1757382875379.mp3'
  },
  {
    id: 'ten-x',
    title: 'Ten X',
    src: '/audio/Ten x_1757382875387.mp3'
  },
  {
    id: 'champagne-dreams-duet',
    title: 'Champagne Dreams Duet',
    src: '/audio/champagne dreams duet _1757382875396.mp3'
  }
];

export function CompactMusicPlayer() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [isMinimized, setIsMinimized] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentSong = playlist[currentSongIndex];

  // Handle user interaction for autoplay compliance
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
        console.log('User interaction detected, enabling audio');
      }
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);
    document.addEventListener('touchstart', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
      document.removeEventListener('touchstart', handleUserInteraction);
    };
  }, [userInteracted]);

  // Update audio source when song changes
  useEffect(() => {
    if (audioRef.current && currentSong) {
      console.log('Loading audio:', currentSong.title, currentSong.src);
      audioRef.current.src = currentSong.src;
      audioRef.current.volume = 0.5;
      audioRef.current.muted = isMuted;
      
      // Load the audio
      audioRef.current.load();
      
      if (isPlaying && userInteracted) {
        audioRef.current.play().catch((error) => {
          console.log('Play error for', currentSong.title, ':', error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentSongIndex, currentSong, isMuted, isPlaying, userInteracted]);

  // Auto-advance to next song
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      setIsPlaying(false);
      nextSong();
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, []);

  const togglePlay = () => {
    if (!audioRef.current || !userInteracted) return;
    
    if (isPlaying) {
      audioRef.current.pause();
      setIsPlaying(false);
    } else {
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Play error:', error);
      });
    }
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
    if (audioRef.current) {
      audioRef.current.muted = !isMuted;
    }
  };

  const nextSong = () => {
    setCurrentSongIndex((prev) => (prev + 1) % playlist.length);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-6 right-6 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="w-12 h-12 rounded-full bg-blood-red/90 hover:bg-blood-red border border-toxic-green/50 cyberpunk-glow backdrop-blur-sm"
          data-testid="button-expand-player"
        >
          <div className="flex gap-1">
            <div className="w-1 h-3 bg-ash-white animate-pulse" />
            <div className="w-1 h-3 bg-ash-white animate-pulse" style={{ animationDelay: '0.2s' }} />
            <div className="w-1 h-3 bg-ash-white animate-pulse" style={{ animationDelay: '0.4s' }} />
          </div>
        </Button>
        <audio ref={audioRef} preload="metadata" />
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 right-6 z-50">
      <div className="bg-jet-black/95 border border-blood-red/50 rounded-lg p-3 shadow-2xl backdrop-blur-sm cyberpunk-glow max-w-[280px]">
        <audio ref={audioRef} preload="metadata" />
        
        {/* Header */}
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-toxic-green rounded-full animate-pulse"></div>
            <span className="text-toxic-green text-xs font-bold">VILLAIN RADIO</span>
          </div>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => setIsMinimized(true)}
            className="text-dim-gray hover:text-ash-white w-6 h-6 p-0"
            data-testid="button-minimize-player"
          >
            ─
          </Button>
        </div>

        {/* Current Song */}
        <div className="mb-3">
          <p className="text-ash-white font-semibold text-sm truncate">{currentSong.title}</p>
          <p className="text-dim-gray text-xs">Body Bagz Official</p>
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-2 mb-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={togglePlay}
            disabled={!userInteracted}
            className="text-ash-white hover:text-blood-red w-8 h-8 p-0 border border-blood-red/30"
            data-testid="button-play-pause-compact"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={nextSong}
            className="text-ash-white hover:text-toxic-green w-6 h-6 p-0"
            data-testid="button-next-compact"
          >
            <SkipForward className="w-3 h-3" />
          </Button>
          
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleMute}
            className="text-ash-white hover:text-glitch-purple w-6 h-6 p-0"
            data-testid="button-mute-compact"
          >
            {isMuted ? <VolumeX className="w-3 h-3" /> : <Volume2 className="w-3 h-3" />}
          </Button>
        </div>

        {/* Track info */}
        <div className="text-center">
          <p className="text-dim-gray text-xs">
            Track {currentSongIndex + 1} of {playlist.length}
          </p>
          {!userInteracted && (
            <p className="text-blood-red text-xs animate-pulse mt-1">
              Click to start
            </p>
          )}
        </div>
      </div>
    </div>
  );
}