import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward } from 'lucide-react';
import { Button } from './ui/button';
import { playlist } from '@/data/playlist';

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
      audioRef.current.load();
      
      if (isPlaying && userInteracted) {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
          setIsPlaying(false);
        });
      }
    }
  }, [currentSongIndex, currentSong, userInteracted]);

  // Auto-advance to next track when current track ends
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const handleEnded = () => {
      const nextIndex = (currentSongIndex + 1) % playlist.length;
      setCurrentSongIndex(nextIndex);
    };

    audio.addEventListener('ended', handleEnded);
    return () => audio.removeEventListener('ended', handleEnded);
  }, [currentSongIndex]);

  // Update audio volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : 0.7;
    }
  }, [isMuted]);

  const togglePlay = () => {
    if (!userInteracted) {
      console.log('User interaction required before playing audio');
      return;
    }
    
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play().catch(error => {
          console.error('Error playing audio:', error);
        });
      }
      setIsPlaying(!isPlaying);
    }
  };

  const nextTrack = () => {
    const nextIndex = (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  if (isMinimized) {
    return (
      <div className="fixed bottom-4 right-4 z-50">
        <Button
          onClick={() => setIsMinimized(false)}
          className="bg-blood-red/90 hover:bg-blood-red text-ash-white p-2 rounded-full shadow-lg backdrop-blur-sm border border-toxic-green/30"
          data-testid="button-expand-player"
        >
          <Play size={16} />
        </Button>
      </div>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-jet-black/95 border border-toxic-green/30 rounded-lg p-4 shadow-xl backdrop-blur-sm max-w-xs">
      <audio ref={audioRef} preload="metadata" />
      
      {/* Minimize button */}
      <button
        onClick={() => setIsMinimized(true)}
        className="absolute top-2 right-2 text-dim-gray hover:text-ash-white text-xs"
        data-testid="button-minimize-player"
      >
        ×
      </button>
      
      {/* Track info */}
      <div className="mb-3">
        <div className="text-sm font-semibold text-toxic-green truncate" data-testid="text-current-track">
          {currentSong?.title || 'No Track'}
        </div>
        <div className="text-xs text-dim-gray">
          {currentSongIndex + 1} / {playlist.length}
        </div>
      </div>
      
      {/* Controls */}
      <div className="flex items-center justify-between">
        <Button
          variant="ghost"
          size="sm"
          onClick={togglePlay}
          className="text-ash-white hover:text-toxic-green"
          disabled={!userInteracted || !currentSong}
          data-testid="button-play-pause-compact"
        >
          {isPlaying ? <Pause size={20} /> : <Play size={20} />}
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={nextTrack}
          className="text-ash-white hover:text-toxic-green"
          data-testid="button-next-compact"
        >
          <SkipForward size={18} />
        </Button>
        
        <Button
          variant="ghost"
          size="sm"
          onClick={toggleMute}
          className="text-ash-white hover:text-toxic-green"
          data-testid="button-mute-compact"
        >
          {isMuted ? <VolumeX size={18} /> : <Volume2 size={18} />}
        </Button>
      </div>
      
      {/* Visual indicator */}
      <div className="mt-2 h-1 bg-dim-gray/30 rounded-full overflow-hidden">
        <div 
          className={`h-full bg-toxic-green transition-all duration-1000 ${isPlaying ? 'animate-pulse' : ''}`}
          style={{ width: isPlaying ? '100%' : '0%' }}
        />
      </div>
      
      {!userInteracted && (
        <div className="text-xs text-dim-gray mt-2 text-center">
          Click to enable audio
        </div>
      )}
    </div>
  );
}