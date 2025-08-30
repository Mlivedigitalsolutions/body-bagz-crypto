import { useState } from "react";
import video1 from "@assets/download - 2025-08-26T133830.760_1756566328652.mp4";
import video2 from "@assets/download - 2025-08-26T134630.886_1756566328635.mp4";
import video3 from "@assets/download - 2025-08-26T135000.242_1756566328602.mp4";
import video4 from "@assets/download - 2025-08-26T140020.024_1756566328670.mp4";
import thumb1 from "@assets/file_0000000092506230a18fb043d2ff6404_1756566414120.png";
import thumb2 from "@assets/file_00000000bc006230a6c56e737deb5977_1756566414107.png";
import thumb3 from "@assets/file_0000000089e46230a8e16b26c568fac0_1756566414099.png";
import thumb4 from "@assets/file_0000000092506230a18fb043d2ff6404 (1)_1756566414069.png";

const videoAssets = [
  {
    id: "chaos-intro",
    title: "CHAOS UNLEASHED",
    description: "Enter the villain era",
    src: video1,
    thumbnail: thumb1
  },
  {
    id: "street-culture", 
    title: "STREET CULTURE",
    description: "For the underground",
    src: video2,
    thumbnail: thumb2
  },
  {
    id: "bagz-movement",
    title: "BAGZ MOVEMENT", 
    description: "Join the revolution",
    src: video3,
    thumbnail: thumb3
  },
  {
    id: "villain-era",
    title: "VILLAIN ERA",
    description: "Embrace the chaos",
    src: video4, 
    thumbnail: thumb4
  }
];

export default function VideoShowcase() {
  const [activeVideo, setActiveVideo] = useState<string | null>(null);

  return (
    <section className="relative z-10 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-brand text-4xl md:text-5xl text-center text-blood-red mb-16" data-testid="video-title">
          THE MOVEMENT
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {videoAssets.map((video) => (
            <div 
              key={video.id}
              className="neon-card rounded-xl overflow-hidden cursor-pointer transition-all duration-200"
              onClick={() => setActiveVideo(activeVideo === video.id ? null : video.id)}
              data-testid={`video-card-${video.id}`}
            >
              <div className="relative aspect-video bg-jet-black">
                {activeVideo === video.id ? (
                  <video 
                    className="w-full h-full object-cover"
                    controls
                    autoPlay
                    loop
                    muted
                    data-testid={`video-player-${video.id}`}
                  >
                    <source src={video.src} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                ) : (
                  <>
                    <img 
                      src={video.thumbnail} 
                      alt={video.title}
                      className="w-full h-full object-cover"
                      data-testid={`video-thumbnail-${video.id}`}
                    />
                    <div className="absolute inset-0 bg-jet-black bg-opacity-60 flex items-center justify-center group-hover:bg-opacity-40 transition-all">
                      <div className="w-16 h-16 border-2 border-toxic-green rounded-full flex items-center justify-center">
                        <svg className="w-6 h-6 text-toxic-green ml-1" fill="currentColor" viewBox="0 0 24 24">
                          <path d="M8 5v14l11-7z"/>
                        </svg>
                      </div>
                    </div>
                  </>
                )}
              </div>
              <div className="p-4">
                <h3 className="font-tech text-sm text-toxic-green mb-1 tracking-wide">{video.title}</h3>
                <p className="text-dim-gray text-xs">{video.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Central Feature Video */}
        {activeVideo && (
          <div className="mt-12 max-w-4xl mx-auto">
            <div className="neon-card p-6 rounded-xl">
              <div className="relative aspect-video bg-jet-black rounded-lg overflow-hidden">
                <video 
                  className="w-full h-full object-cover"
                  controls
                  autoPlay
                  loop
                  muted
                  data-testid="featured-video-player"
                >
                  <source src={videoAssets.find(v => v.id === activeVideo)?.src} type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
                <div className="absolute inset-0 pointer-events-none">
                  <div className="scanline-overlay absolute top-0 left-0 w-full h-1 animate-scanline"></div>
                </div>
              </div>
              <div className="mt-4 text-center">
                <h3 className="font-brand text-2xl text-blood-red mb-2">
                  {videoAssets.find(v => v.id === activeVideo)?.title}
                </h3>
                <p className="text-dim-gray">
                  {videoAssets.find(v => v.id === activeVideo)?.description}
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}