import chaosFuelImg from '@assets/generated_images/Cyberpunk_chaos_fuel_launch_73f25345.png';
import merchDropImg from '@assets/generated_images/Cyberpunk_merch_drop_streetwear_5139bff8.png';
import nftChaosImg from '@assets/generated_images/Cyberpunk_NFT_chaos_collection_e59321ba.png';
import expansionImg from '@assets/generated_images/Cyberpunk_global_expansion_map_a0f2cda0.png';

const roadmapPhases = [
  {
    number: "01",
    title: "CHAOS FUEL",
    description: "Launch, community building, meme warfare begins",
    color: "blood-red",
    bgColor: "bg-blood-red",
    glowClass: "shadow-red-glow",
    image: chaosFuelImg
  },
  {
    number: "02",
    title: "MERCH DROP",
    description: "Exclusive streetwear for the villain collective",
    color: "toxic-green",
    bgColor: "bg-toxic-green",
    glowClass: "shadow-green-glow",
    image: merchDropImg
  },
  {
    number: "03",
    title: "NFT CHAOS",
    description: "Limited edition Body Bagz PFP collection",
    color: "glitch-purple",
    bgColor: "bg-glitch-purple",
    glowClass: "shadow-purple-glow",
    image: nftChaosImg
  },
  {
    number: "04",
    title: "EXPANSION",
    description: "Global domination, partnerships, chaos spreads",
    color: "ash-white",
    bgColor: "bg-ash-white",
    glowClass: "",
    image: expansionImg
  }
];

export default function RoadmapSection() {
  return (
    <section className="relative z-10 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-brand text-4xl md:text-5xl text-center text-blood-red mb-16" data-testid="roadmap-title">
          ROADMAP
        </h2>
        
        <div className="relative">
          {/* Timeline Line */}
          <div className="absolute top-1/2 left-0 right-0 h-1 bg-dim-gray transform -translate-y-1/2 hidden md:block"></div>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {roadmapPhases.map((phase, index) => (
              <div key={phase.number} className="text-center group" data-testid={`roadmap-phase-${phase.number}`}>
                <div className="relative mx-auto w-32 h-32 mb-4 group-hover:scale-110 transition-all duration-200">
                  <div className="relative w-full h-full rounded-xl overflow-hidden border border-dim-gray group-hover:shadow-2xl">
                    <img 
                      src={phase.image} 
                      alt={phase.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                    <div className={`absolute inset-0 bg-gradient-to-t from-${phase.color}/30 to-transparent`}></div>
                    <div className="absolute bottom-2 right-2">
                      <span className="font-brand text-xl text-white font-black tracking-tight bg-black/60 px-2 py-1 rounded">{phase.number}</span>
                    </div>
                  </div>
                </div>
                <h3 className={`font-tech text-lg text-${phase.color} mb-2 tracking-wide font-semibold`}>{phase.title}</h3>
                <p className="text-dim-enhanced text-sm font-medium leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
