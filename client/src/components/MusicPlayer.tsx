import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipBack, SkipForward } from 'lucide-react';
import { Button } from './ui/button';

interface Song {
  id: string;
  title: string;
  artist: string;
  src: string;
  duration?: string;
}

const playlist: Song[] = [
  {
    id: 'villain-mode',
    title: 'Villain Mode',
    artist: 'Body Bagz Official',
    src: '/audio/Villain Mode_1756862187502.mp3',
    duration: '2:45'
  },
  {
    id: 'cyber-throne',
    title: 'Cyber Throne',
    artist: 'Body Bagz Official', 
    src: '/audio/Cyber Throne_1756862187531.mp3',
    duration: '3:12'
  },
  {
    id: 'cyber-throne-2',
    title: 'Cyber Throne II',
    artist: 'Body Bagz Official',
    src: '/audio/Cyber Throne2_1756862187546.mp3',
    duration: '2:58'
  },
  {
    id: 'villain-era',
    title: 'Villain Era',
    artist: 'Body Bagz Official',
    src: '/audio/Villain Era_1756862187560.mp3',
    duration: '3:24'
  },
  {
    id: 'villain-era-2',
    title: 'Villain Era II',
    artist: 'Body Bagz Official',
    src: '/audio/Villain Era 2_1756862187574.mp3',
    duration: '3:07'
  }
];

interface MusicPlayerProps {
  autoPlay?: boolean;
  className?: string;
}

export function MusicPlayer({ autoPlay = true, className = "" }: MusicPlayerProps) {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [userInteracted, setUserInteracted] = useState(false);
  const [volume, setVolume] = useState(0.7);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const progressRef = useRef<HTMLDivElement>(null);

  const currentSong = playlist[currentSongIndex];

  // Handle user interaction for autoplay compliance
  useEffect(() => {
    const handleUserInteraction = () => {
      setUserInteracted(true);
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };

    document.addEventListener('click', handleUserInteraction);
    document.addEventListener('keydown', handleUserInteraction);

    return () => {
      document.removeEventListener('click', handleUserInteraction);
      document.removeEventListener('keydown', handleUserInteraction);
    };
  }, []);

  // Auto-play Villain Mode when user interacts
  useEffect(() => {
    if (autoPlay && userInteracted && audioRef.current) {
      audioRef.current.volume = volume;
      audioRef.current.play().then(() => {
        setIsPlaying(true);
      }).catch((error) => {
        console.log('Auto-play prevented:', error);
      });
    }
  }, [autoPlay, userInteracted, volume]);

  // Update audio source when song changes
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.src = currentSong.src;
      audioRef.current.volume = volume;
      audioRef.current.muted = isMuted;
      
      if (isPlaying && userInteracted) {
        audioRef.current.play().catch((error) => {
          console.log('Play prevented:', error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentSongIndex, currentSong.src, volume, isMuted, isPlaying, userInteracted]);

  // Time update handler
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      setIsPlaying(false);
      nextSong();
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
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

  const previousSong = () => {
    setCurrentSongIndex((prev) => (prev - 1 + playlist.length) % playlist.length);
  };

  const selectSong = (index: number) => {
    setCurrentSongIndex(index);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleProgressClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!audioRef.current || !progressRef.current) return;
    
    const rect = progressRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left;
    const width = rect.width;
    const percentage = clickX / width;
    const newTime = percentage * duration;
    
    audioRef.current.currentTime = newTime;
  };

  const progressPercentage = duration > 0 ? (currentTime / duration) * 100 : 0;

  return (
    <div className={`bg-gradient-to-r from-onyx via-jet-black to-onyx border border-blood-red/30 rounded-xl p-6 shadow-2xl ${className}`}>
      <audio ref={audioRef} preload="metadata" />
      
      {/* Current Song Display */}
      <div className="flex items-center gap-4 mb-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blood-red to-toxic-green rounded-lg flex items-center justify-center">
          <div className="w-8 h-8 bg-ash-white rounded-full flex items-center justify-center">
            <span className="text-jet-black font-bold text-sm">♫</span>
          </div>
        </div>
        
        <div className="flex-1">
          <h3 className="text-ash-white font-bold text-lg cyberpunk-glow">
            {currentSong.title}
          </h3>
          <p className="text-dim-gray text-sm">{currentSong.artist}</p>
          <p className="text-toxic-green text-xs">
            {formatTime(currentTime)} / {formatTime(duration)}
          </p>
        </div>
        
        {!userInteracted && autoPlay && (
          <div className="text-blood-red text-xs animate-pulse">
            Click anywhere to start
          </div>
        )}
      </div>

      {/* Progress Bar */}
      <div 
        ref={progressRef}
        className="w-full h-2 bg-dim-gray/30 rounded-full cursor-pointer mb-4 overflow-hidden"
        onClick={handleProgressClick}
      >
        <div 
          className="h-full bg-gradient-to-r from-blood-red to-toxic-green transition-all duration-100 cyberpunk-glow"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      {/* Control Buttons */}
      <div className="flex items-center justify-center gap-4 mb-6">
        <Button
          variant="ghost"
          size="sm"
          onClick={previousSong}
          className="text-ash-white hover:text-toxic-green hover:bg-toxic-green/10 cyberpunk-glow"
          data-testid="button-previous-song"
        >
          <SkipBack className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="lg"
          onClick={togglePlay}
          disabled={!userInteracted}
          className="text-ash-white hover:text-blood-red hover:bg-blood-red/10 border border-blood-red/30 cyberpunk-glow"
          data-testid="button-play-pause"
        >
          {isPlaying ? <Pause className="w-6 h-6" /> : <Play className="w-6 h-6" />}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={nextSong}
          className="text-ash-white hover:text-toxic-green hover:bg-toxic-green/10 cyberpunk-glow"
          data-testid="button-next-song"
        >
          <SkipForward className="w-5 h-5" />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMute}
          className="text-ash-white hover:text-glitch-purple hover:bg-glitch-purple/10 cyberpunk-glow ml-4"
          data-testid="button-mute-toggle"
        >
          {isMuted ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
        </Button>
      </div>

      {/* Playlist */}
      <div className="space-y-2">
        <h4 className="text-toxic-green font-bold text-sm mb-3 cyberpunk-glow">
          VILLAIN PLAYLIST
        </h4>
        {playlist.map((song, index) => (
          <div
            key={song.id}
            onClick={() => selectSong(index)}
            className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all duration-200 ${
              index === currentSongIndex 
                ? 'bg-blood-red/20 border border-blood-red/50 cyberpunk-glow' 
                : 'hover:bg-dim-gray/10 hover:border-toxic-green/30 border border-transparent'
            }`}
            data-testid={`song-item-${song.id}`}
          >
            <div className="w-2 h-2 rounded-full bg-toxic-green cyberpunk-glow" />
            <div className="flex-1">
              <p className={`font-medium text-sm ${
                index === currentSongIndex ? 'text-ash-white' : 'text-dim-gray'
              }`}>
                {song.title}
              </p>
            </div>
            <div className="text-toxic-green text-xs">
              {song.duration}
            </div>
            {index === currentSongIndex && isPlaying && (
              <div className="flex gap-1">
                <div className="w-1 h-3 bg-blood-red animate-pulse" />
                <div className="w-1 h-3 bg-toxic-green animate-pulse" style={{ animationDelay: '0.1s' }} />
                <div className="w-1 h-3 bg-glitch-purple animate-pulse" style={{ animationDelay: '0.2s' }} />
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}