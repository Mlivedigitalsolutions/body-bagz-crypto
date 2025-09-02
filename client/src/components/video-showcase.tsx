import rallyImg from "@assets/generated_images/Movement_section_rally_image_36726732.png";
import bunkerImg from "@assets/generated_images/Movement_section_bunker_image_8cbc1617.png";
import takeoverImg from "@assets/generated_images/Movement_section_takeover_image_0b6c6d67.png";
import thumb1 from "@assets/file_0000000092506230a18fb043d2ff6404_1756566414120.png";

const movementImages = [
  {
    id: "rally-scene",
    title: "RALLY UPRISING",
    description: "The underground rises",
    image: rallyImg
  },
  {
    id: "tactical-bunker", 
    title: "TACTICAL HQ",
    description: "Strategic operations",
    image: bunkerImg
  },
  {
    id: "street-takeover",
    title: "STREET TAKEOVER", 
    description: "City-wide revolution",
    image: takeoverImg
  },
  {
    id: "chaos-collective",
    title: "CHAOS COLLECTIVE",
    description: "United in rebellion",
    image: thumb1
  }
];

export default function VideoShowcase() {
  return (
    <section className="relative z-10 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-brand text-4xl md:text-5xl text-center text-blood-red mb-16" data-testid="movement-title">
          THE MOVEMENT
        </h2>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {movementImages.map((movement) => (
            <div 
              key={movement.id}
              className="neon-card rounded-xl overflow-hidden group transition-all duration-200 interactive-scale"
              data-testid={`movement-card-${movement.id}`}
            >
              <div className="relative aspect-video bg-jet-black overflow-hidden">
                <img 
                  src={movement.image} 
                  alt={movement.title}
                  className="w-full h-full object-cover transition-all duration-300 group-hover:scale-105"
                  data-testid={`movement-image-${movement.id}`}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-jet-black/80 via-transparent to-transparent group-hover:from-jet-black/60 transition-all duration-300">
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <div className="w-12 h-12 border-2 border-toxic-green rounded-full flex items-center justify-center group-hover:scale-110 transition-transform duration-200 bg-jet-black/50 backdrop-blur-sm mb-2">
                      <svg className="w-5 h-5 text-toxic-green" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z"/>
                      </svg>
                    </div>
                  </div>
                </div>
                {/* Cyberpunk scan line effect */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-toxic-green to-transparent opacity-0 group-hover:opacity-60 animate-scanline transition-opacity duration-300"></div>
              </div>
              <div className="p-4">
                <h3 className="font-tech text-sm text-toxic-green mb-1 tracking-wide font-semibold">{movement.title}</h3>
                <p className="text-dim-gray text-xs">{movement.description}</p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Premium Movement Statement */}
        <div className="mt-16 max-w-4xl mx-auto">
          <div className="neon-card p-8 rounded-xl text-center">
            <h3 className="font-brand text-3xl text-blood-red mb-4 tracking-wide">
              JOIN THE CHAOS
            </h3>
            <p className="text-dim-gray text-lg leading-relaxed font-medium">
              The streets have chosen. The underground has spoken. 
              <span className="text-toxic-green font-semibold"> $BAGZ </span>
              represents more than just a token—it's a movement for the culture, 
              driven by chaos, and built by the people who refuse to conform.
            </p>
            <div className="mt-6 flex justify-center space-x-4">
              <div className="w-3 h-3 bg-blood-red rounded-full animate-pulse"></div>
              <div className="w-3 h-3 bg-toxic-green rounded-full animate-pulse" style={{animationDelay: '0.2s'}}></div>
              <div className="w-3 h-3 bg-glitch-purple rounded-full animate-pulse" style={{animationDelay: '0.4s'}}></div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}