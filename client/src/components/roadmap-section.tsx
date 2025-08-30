const roadmapPhases = [
  {
    number: "01",
    title: "CHAOS FUEL",
    description: "Launch, community building, meme warfare begins",
    color: "blood-red",
    bgColor: "bg-blood-red",
    glowClass: "shadow-red-glow"
  },
  {
    number: "02",
    title: "MERCH DROP",
    description: "Exclusive streetwear for the villain collective",
    color: "toxic-green",
    bgColor: "bg-toxic-green",
    glowClass: "shadow-green-glow"
  },
  {
    number: "03",
    title: "NFT CHAOS",
    description: "Limited edition Body Bagz PFP collection",
    color: "glitch-purple",
    bgColor: "bg-glitch-purple",
    glowClass: "shadow-purple-glow"
  },
  {
    number: "04",
    title: "EXPANSION",
    description: "Global domination, partnerships, chaos spreads",
    color: "ash-white",
    bgColor: "bg-ash-white",
    glowClass: ""
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
                <div className={`relative mx-auto w-20 h-20 ${phase.bgColor} rounded-lg flex items-center justify-center mb-4 ${phase.glowClass} border border-dim-gray group-hover:scale-110 transition-all duration-200`} style={{borderRadius: '6px'}}>
                  <span className="font-brand text-2xl text-jet-black font-black tracking-tight">{phase.number}</span>
                </div>
                <h3 className={`font-tech text-lg text-${phase.color} mb-2 tracking-wide font-semibold`}>{phase.title}</h3>
                <p className="text-dim-gray text-sm font-medium leading-relaxed">{phase.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
