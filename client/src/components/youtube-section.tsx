import { useState } from "react";
import { Play, Youtube, ExternalLink, TrendingUp } from "lucide-react";

// Featured crypto and Body Bagz videos
const featuredVideos = [
  {
    id: "dQw4w9WgXcQ",
    title: "Body Bagz: The Rise of Chaos Crypto",
    description: "Deep dive into the revolutionary tokenomics and chaos-driven ecosystem",
    thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
    duration: "12:45",
    views: "847K",
    category: "Educational"
  },
  {
    id: "J---aiyznGQ",
    title: "Crypto Market Analysis: $BAGZ Explosion",
    description: "Technical analysis and future predictions for Body Bagz token",
    thumbnail: "https://img.youtube.com/vi/J---aiyznGQ/maxresdefault.jpg",
    duration: "18:32",
    views: "523K",
    category: "Analysis"
  },
  {
    id: "fJ9rUzIMcZQ",
    title: "Community Spotlight: Chaos Creators",
    description: "Meet the rebels building the Body Bagz ecosystem",
    thumbnail: "https://img.youtube.com/vi/fJ9rUzIMcZQ/maxresdefault.jpg",
    duration: "9:15",
    views: "291K",
    category: "Community"
  },
  {
    id: "YbJOTdZBX1g",
    title: "Genesis Villain Pool: Staking Revolution",
    description: "How to maximize your Body Bagz staking rewards",
    thumbnail: "https://img.youtube.com/vi/YbJOTdZBX1g/maxresdefault.jpg",
    duration: "15:28",
    views: "672K",
    category: "Tutorial"
  }
];

const cryptoChannels = [
  {
    name: "Crypto Chaos Network",
    handle: "@CryptoChaosNet",
    subscribers: "2.4M",
    verified: true
  },
  {
    name: "Body Bagz Official",
    handle: "@BodyBagzOfficial",
    subscribers: "847K",
    verified: true
  },
  {
    name: "DeFi Rebels",
    handle: "@DeFiRebels",
    subscribers: "1.8M",
    verified: true
  }
];

export default function YoutubeSection() {
  const [selectedVideo, setSelectedVideo] = useState(featuredVideos[0]);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleVideoSelect = (video: typeof featuredVideos[0]) => {
    setSelectedVideo(video);
    setIsPlaying(false);
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'Educational': return 'bg-toxic-green/20 text-toxic-green border-toxic-green';
      case 'Analysis': return 'bg-blood-red/20 text-blood-red border-blood-red';
      case 'Community': return 'bg-glitch-purple/20 text-glitch-purple border-glitch-purple';
      case 'Tutorial': return 'bg-yellow-400/20 text-yellow-400 border-yellow-400';
      default: return 'bg-dim-gray/20 text-dim-gray border-dim-gray';
    }
  };

  return (
    <section className="relative z-10 py-20 px-6 overflow-hidden">
      {/* Background Effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-black via-blood-red/5 to-black"></div>
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_transparent_0%,_rgba(0,0,0,0.9)_100%)]"></div>
      
      <div className="relative z-10 max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <div className="flex items-center justify-center gap-4 mb-6">
            <Youtube className="text-blood-red w-8 h-8" />
            <h2 className="text-4xl md:text-6xl font-display font-bold text-ash-white">
              CHAOS CONTENT
            </h2>
            <TrendingUp className="text-toxic-green w-8 h-8" />
          </div>
          <p className="text-xl text-dim-gray max-w-3xl mx-auto">
            Stay ahead of the crypto game with exclusive Body Bagz content, market analysis, and community highlights from top creators.
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Main Video Player */}
          <div className="lg:col-span-2">
            <div className="bg-jet-black border border-blood-red/30 rounded-lg overflow-hidden">
              {/* Video Container */}
              <div className="relative aspect-video bg-onyx">
                {isPlaying && import.meta.env.VITE_YOUTUBE_API_KEY ? (
                  <iframe
                    className="w-full h-full"
                    src={`https://www.youtube.com/embed/${selectedVideo.id}?autoplay=1&rel=0`}
                    title={selectedVideo.title}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ) : (
                  <div 
                    className="relative w-full h-full cursor-pointer group"
                    onClick={() => setIsPlaying(true)}
                  >
                    <img 
                      src={selectedVideo.thumbnail} 
                      alt={selectedVideo.title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black/40 group-hover:bg-black/20 transition-all duration-300 flex items-center justify-center">
                      <div className="bg-blood-red/90 rounded-full p-4 group-hover:scale-110 transition-transform duration-300">
                        <Play className="w-8 h-8 text-white fill-current" />
                      </div>
                    </div>
                    <div className="absolute bottom-2 right-2 bg-black/80 text-white px-2 py-1 rounded text-sm">
                      {selectedVideo.duration}
                    </div>
                  </div>
                )}
              </div>
              
              {/* Video Info */}
              <div className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex-1">
                    <h3 className="text-xl font-bold text-ash-white mb-2">{selectedVideo.title}</h3>
                    <p className="text-dim-gray mb-3">{selectedVideo.description}</p>
                    <div className="flex items-center gap-4">
                      <span className={`px-3 py-1 rounded-full text-xs border ${getCategoryColor(selectedVideo.category)}`}>
                        {selectedVideo.category}
                      </span>
                      <span className="text-toxic-green text-sm">{selectedVideo.views} views</span>
                    </div>
                  </div>
                  <button 
                    className="cyber-button-secondary px-4 py-2 ml-4"
                    onClick={() => window.open(`https://youtube.com/watch?v=${selectedVideo.id}`, '_blank')}
                    data-testid="button-watch-youtube"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Video Playlist & Channels */}
          <div className="space-y-6">
            {/* Video Playlist */}
            <div>
              <h3 className="text-xl font-bold text-ash-white mb-4">Featured Content</h3>
              <div className="space-y-3 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-blood-red scrollbar-track-transparent">
                {featuredVideos.map(video => (
                  <div 
                    key={video.id}
                    className={`bg-jet-black border border-dim-gray/30 rounded-lg p-3 cursor-pointer transition-all duration-300 hover:border-blood-red/50 ${
                      selectedVideo.id === video.id ? 'border-blood-red bg-blood-red/5' : ''
                    }`}
                    onClick={() => handleVideoSelect(video)}
                    data-testid={`video-${video.id}`}
                  >
                    <div className="flex gap-3">
                      <div className="relative w-20 h-12 rounded overflow-hidden flex-shrink-0">
                        <img 
                          src={video.thumbnail} 
                          alt={video.title}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute bottom-1 right-1 bg-black/80 text-white px-1 text-xs rounded">
                          {video.duration}
                        </div>
                      </div>
                      <div className="flex-1 min-w-0">
                        <h4 className="text-ash-white text-sm font-medium line-clamp-2 mb-1">{video.title}</h4>
                        <div className="flex items-center gap-2">
                          <span className={`px-2 py-0.5 rounded text-xs border ${getCategoryColor(video.category)}`}>
                            {video.category}
                          </span>
                          <span className="text-toxic-green text-xs">{video.views}</span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Featured Channels */}
            <div>
              <h3 className="text-xl font-bold text-ash-white mb-4">Chaos Creators</h3>
              <div className="space-y-3">
                {cryptoChannels.map((channel, index) => (
                  <div 
                    key={index}
                    className="bg-jet-black border border-dim-gray/30 rounded-lg p-4 hover:border-blood-red/50 transition-all duration-300"
                    data-testid={`channel-${index}`}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-gradient-to-br from-blood-red to-toxic-green rounded-full flex items-center justify-center">
                        <Youtube className="w-5 h-5 text-white" />
                      </div>
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <h4 className="text-ash-white font-medium">{channel.name}</h4>
                          {channel.verified && (
                            <div className="w-4 h-4 bg-toxic-green rounded-full flex items-center justify-center">
                              <div className="w-2 h-2 bg-white rounded-full"></div>
                            </div>
                          )}
                        </div>
                        <p className="text-dim-gray text-sm">{channel.handle}</p>
                        <p className="text-toxic-green text-xs">{channel.subscribers} subscribers</p>
                      </div>
                      <button 
                        className="cyber-button-secondary px-3 py-1 text-sm"
                        data-testid={`subscribe-${index}`}
                      >
                        FOLLOW
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <div className="bg-gradient-to-r from-jet-black via-blood-red/10 to-jet-black border border-blood-red/30 rounded-lg p-8">
            <h3 className="text-2xl font-bold text-ash-white mb-4">Want to be Featured?</h3>
            <p className="text-dim-gray mb-6 max-w-2xl mx-auto">
              Create Body Bagz content and join the chaos creator program. Get featured on our platform and earn exclusive rewards.
            </p>
            <button className="cyber-button px-8 py-3" data-testid="button-creator-program">
              JOIN CREATOR PROGRAM
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}