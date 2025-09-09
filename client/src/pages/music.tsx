import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Volume2, VolumeX, SkipForward, SkipBack, Shuffle, Repeat, Download, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { playlist, getCategorizedPlaylist, type Song } from '@/data/playlist';

export default function MusicPage() {
  const [currentSongIndex, setCurrentSongIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const [isMuted, setIsMuted] = useState(false);
  const [volume, setVolume] = useState(70);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const [isShuffled, setIsShuffled] = useState(false);
  const [isRepeating, setIsRepeating] = useState(false);
  const [activeCategory, setActiveCategory] = useState<string>('all');
  const [userInteracted, setUserInteracted] = useState(false);
  
  const audioRef = useRef<HTMLAudioElement>(null);
  const currentSong = playlist[currentSongIndex];
  const categories = getCategorizedPlaylist();

  // Handle user interaction for autoplay compliance
  useEffect(() => {
    const handleUserInteraction = () => {
      if (!userInteracted) {
        setUserInteracted(true);
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

  // Audio event handlers
  useEffect(() => {
    const audio = audioRef.current;
    if (!audio) return;

    const updateTime = () => setCurrentTime(audio.currentTime);
    const updateDuration = () => setDuration(audio.duration);
    const handleEnded = () => {
      if (isRepeating) {
        audio.currentTime = 0;
        audio.play();
      } else {
        nextTrack();
      }
    };

    audio.addEventListener('timeupdate', updateTime);
    audio.addEventListener('loadedmetadata', updateDuration);
    audio.addEventListener('ended', handleEnded);

    return () => {
      audio.removeEventListener('timeupdate', updateTime);
      audio.removeEventListener('loadedmetadata', updateDuration);
      audio.removeEventListener('ended', handleEnded);
    };
  }, [isRepeating]);

  // Update volume
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.volume = isMuted ? 0 : volume / 100;
    }
  }, [volume, isMuted]);

  const togglePlay = () => {
    if (!userInteracted) return;
    
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
    const nextIndex = isShuffled 
      ? Math.floor(Math.random() * playlist.length)
      : (currentSongIndex + 1) % playlist.length;
    setCurrentSongIndex(nextIndex);
  };

  const prevTrack = () => {
    const prevIndex = isShuffled
      ? Math.floor(Math.random() * playlist.length)
      : (currentSongIndex - 1 + playlist.length) % playlist.length;
    setCurrentSongIndex(prevIndex);
  };

  const playTrack = (index: number) => {
    setCurrentSongIndex(index);
    setIsPlaying(true);
  };

  const formatTime = (time: number) => {
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60);
    return `${minutes}:${seconds.toString().padStart(2, '0')}`;
  };

  const handleSeek = (values: number[]) => {
    if (audioRef.current) {
      audioRef.current.currentTime = values[0];
      setCurrentTime(values[0]);
    }
  };

  const getCategoryBadgeColor = (category: Song['category']) => {
    const colors = {
      latest: 'bg-toxic-green text-jet-black',
      crypto: 'bg-glitch-purple text-ash-white',
      villain: 'bg-blood-red text-ash-white',
      revolution: 'bg-orange-500 text-jet-black',
      classic: 'bg-ash-white text-jet-black'
    };
    return colors[category] || 'bg-dim-gray text-ash-white';
  };

  const getFilteredPlaylist = () => {
    if (activeCategory === 'all') return playlist;
    return playlist.filter(song => song.category === activeCategory);
  };

  return (
    <div className="min-h-screen bg-jet-black text-ash-white p-4">
      <audio ref={audioRef} preload="metadata" />
      
      {/* Header */}
      <div className="max-w-7xl mx-auto mb-8">
        <div className="text-center mb-8">
          <h1 className="text-6xl font-bold font-anton text-toxic-green mb-4 glitch-text">
            BODY BAGZ MUSIC
          </h1>
          <p className="text-xl text-dim-gray font-inter max-w-2xl mx-auto">
            Epic villain era soundtracks, crypto anthems, and revolutionary tracks. 
            30 bangers ready to fuel your villain journey.
          </p>
        </div>

        {/* Enhanced Player */}
        <Card className="bg-onyx border-blood-red shadow-2xl mb-8">
          <CardContent className="p-6">
            <div className="flex flex-col lg:flex-row items-center gap-6">
              {/* Current Track Info */}
              <div className="flex-1 text-center lg:text-left">
                <h3 className="text-2xl font-bold text-toxic-green mb-2">
                  {currentSong?.title || 'No Track Selected'}
                </h3>
                <p className="text-dim-gray mb-2">
                  {currentSong?.description || 'Select a track to play'}
                </p>
                {currentSong && (
                  <Badge className={getCategoryBadgeColor(currentSong.category)}>
                    {currentSong.category.toUpperCase()}
                  </Badge>
                )}
              </div>

              {/* Player Controls */}
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-4">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsShuffled(!isShuffled)}
                    className={`${isShuffled ? 'text-toxic-green' : 'text-dim-gray'} hover:text-ash-white`}
                    data-testid="button-shuffle"
                  >
                    <Shuffle size={20} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={prevTrack}
                    className="text-ash-white hover:text-toxic-green"
                    data-testid="button-previous"
                  >
                    <SkipBack size={24} />
                  </Button>
                  
                  <Button
                    onClick={togglePlay}
                    className="bg-blood-red hover:bg-red-600 text-ash-white w-16 h-16 rounded-full cyber-button"
                    disabled={!userInteracted}
                    data-testid="button-play-pause"
                  >
                    {isPlaying ? <Pause size={28} /> : <Play size={28} />}
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={nextTrack}
                    className="text-ash-white hover:text-toxic-green"
                    data-testid="button-next"
                  >
                    <SkipForward size={24} />
                  </Button>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsRepeating(!isRepeating)}
                    className={`${isRepeating ? 'text-toxic-green' : 'text-dim-gray'} hover:text-ash-white`}
                    data-testid="button-repeat"
                  >
                    <Repeat size={20} />
                  </Button>
                </div>

                {/* Progress Bar */}
                <div className="flex items-center gap-4 w-full max-w-md">
                  <span className="text-sm text-dim-gray min-w-[40px]">
                    {formatTime(currentTime)}
                  </span>
                  <Slider
                    value={[currentTime]}
                    max={duration || 100}
                    step={1}
                    onValueChange={handleSeek}
                    className="flex-1"
                    data-testid="slider-progress"
                  />
                  <span className="text-sm text-dim-gray min-w-[40px]">
                    {formatTime(duration)}
                  </span>
                </div>

                {/* Volume Control */}
                <div className="flex items-center gap-2">
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setIsMuted(!isMuted)}
                    className="text-dim-gray hover:text-ash-white"
                    data-testid="button-mute"
                  >
                    {isMuted ? <VolumeX size={20} /> : <Volume2 size={20} />}
                  </Button>
                  <Slider
                    value={[volume]}
                    max={100}
                    step={1}
                    onValueChange={(values) => setVolume(values[0])}
                    className="w-24"
                    data-testid="slider-volume"
                  />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Category Filters */}
        <div className="flex flex-wrap gap-2 mb-6 justify-center">
          {['all', 'latest', 'crypto', 'villain', 'revolution', 'classic'].map((category) => (
            <Button
              key={category}
              variant={activeCategory === category ? "default" : "outline"}
              onClick={() => setActiveCategory(category)}
              className={`
                ${activeCategory === category 
                  ? 'bg-toxic-green text-jet-black' 
                  : 'border-blood-red text-ash-white hover:bg-blood-red'
                } cyber-button
              `}
              data-testid={`filter-${category}`}
            >
              {category.toUpperCase()}
              {category !== 'all' && (
                <Badge variant="secondary" className="ml-2">
                  {category === 'latest' ? categories.latest.length :
                   category === 'crypto' ? categories.crypto.length :
                   category === 'villain' ? categories.villain.length :
                   category === 'revolution' ? categories.revolution.length :
                   categories.classic.length}
                </Badge>
              )}
            </Button>
          ))}
        </div>

        {/* Track List */}
        <div className="grid gap-2">
          {getFilteredPlaylist().map((song, index) => {
            const originalIndex = playlist.findIndex(s => s.id === song.id);
            const isCurrentTrack = originalIndex === currentSongIndex;
            
            return (
              <Card
                key={song.id}
                className={`
                  ${isCurrentTrack 
                    ? 'bg-blood-red/20 border-toxic-green shadow-lg shadow-toxic-green/20' 
                    : 'bg-onyx border-dim-gray hover:border-blood-red'
                  } transition-all duration-300 cursor-pointer group
                `}
                onClick={() => playTrack(originalIndex)}
                data-testid={`track-${song.id}`}
              >
                <CardContent className="p-4">
                  <div className="flex items-center gap-4">
                    <div className="flex-shrink-0">
                      <Button
                        variant="ghost"
                        size="sm"
                        className={`
                          ${isCurrentTrack && isPlaying
                            ? 'text-toxic-green' 
                            : 'text-dim-gray group-hover:text-ash-white'
                          }
                        `}
                        data-testid={`play-track-${song.id}`}
                      >
                        {isCurrentTrack && isPlaying ? <Pause size={20} /> : <Play size={20} />}
                      </Button>
                    </div>
                    
                    <div className="flex-1 min-w-0">
                      <h4 className={`
                        font-semibold truncate
                        ${isCurrentTrack ? 'text-toxic-green' : 'text-ash-white'}
                      `}>
                        {song.title}
                      </h4>
                      <p className="text-sm text-dim-gray truncate">
                        {song.description}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <Badge className={getCategoryBadgeColor(song.category)}>
                        {song.category}
                      </Badge>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-dim-gray hover:text-blood-red opacity-0 group-hover:opacity-100 transition-opacity"
                        data-testid={`favorite-${song.id}`}
                      >
                        <Heart size={16} />
                      </Button>
                      
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-dim-gray hover:text-toxic-green opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={(e) => {
                          e.stopPropagation();
                          const link = document.createElement('a');
                          link.href = song.src;
                          link.download = `${song.title}.mp3`;
                          link.click();
                        }}
                        data-testid={`download-${song.id}`}
                      >
                        <Download size={16} />
                      </Button>
                    </div>
                  </div>
                </CardContent>
              </Card>
            );
          })}
        </div>

        {/* Stats */}
        <div className="mt-12 text-center">
          <div className="grid grid-cols-2 md:grid-cols-5 gap-4">
            <div className="bg-onyx p-4 rounded-lg border border-blood-red">
              <div className="text-2xl font-bold text-toxic-green">{playlist.length}</div>
              <div className="text-sm text-dim-gray">Total Tracks</div>
            </div>
            <div className="bg-onyx p-4 rounded-lg border border-blood-red">
              <div className="text-2xl font-bold text-glitch-purple">{categories.latest.length}</div>
              <div className="text-sm text-dim-gray">Latest Drops</div>
            </div>
            <div className="bg-onyx p-4 rounded-lg border border-blood-red">
              <div className="text-2xl font-bold text-blood-red">{categories.villain.length}</div>
              <div className="text-sm text-dim-gray">Villain Era</div>
            </div>
            <div className="bg-onyx p-4 rounded-lg border border-blood-red">
              <div className="text-2xl font-bold text-orange-500">{categories.revolution.length}</div>
              <div className="text-sm text-dim-gray">Revolution</div>
            </div>
            <div className="bg-onyx p-4 rounded-lg border border-blood-red">
              <div className="text-2xl font-bold text-ash-white">{categories.classic.length}</div>
              <div className="text-sm text-dim-gray">Classics</div>
            </div>
          </div>
        </div>

        {/* Video Player Section (Placeholder) */}
        <div className="mt-12">
          <h2 className="text-4xl font-bold text-center text-toxic-green mb-8 font-anton">
            MUSIC VIDEOS
          </h2>
          <Card className="bg-onyx border-blood-red">
            <CardContent className="p-8 text-center">
              <div className="bg-jet-black border border-dim-gray rounded-lg p-12 mb-4">
                <div className="text-6xl text-dim-gray mb-4">🎬</div>
                <h3 className="text-xl text-ash-white mb-2">Coming Soon</h3>
                <p className="text-dim-gray">
                  Epic music videos for your favorite Body Bagz tracks are in production.
                  Stay tuned for cyberpunk visuals that match the villain era energy!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}