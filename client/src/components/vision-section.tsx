import { UrbanGritIcon, FireSkullIcon, RaisedFistIcon } from "@/components/icons";

export default function VisionSection() {
  return (
    <section id="vision" className="relative z-10 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-brand text-4xl md:text-5xl text-center text-blood-red mb-16" data-testid="vision-title">
          OUR VISION
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* For the Culture Card */}
          <div className="neon-card p-8 rounded-xl text-center group" data-testid="card-culture">
            <div className="mb-6 flex justify-center">
              <div className="p-4 rounded-lg bg-jet-black border border-dim-gray group-hover:shadow-green-glow transition-all duration-200">
                <UrbanGritIcon className="w-16 h-16 text-toxic-green" />
              </div>
            </div>
            <h3 className="font-tech text-xl text-toxic-green mb-4 tracking-wide font-semibold">FOR THE CULTURE</h3>
            <p className="text-dim-gray font-medium leading-relaxed">Street-born, community-driven. We rep the underground and the overlooked.</p>
          </div>

          {/* For the Chaos Card */}
          <div className="neon-card p-8 rounded-xl text-center group" data-testid="card-chaos">
            <div className="mb-6 flex justify-center">
              <div className="p-4 rounded-lg bg-jet-black border border-dim-gray group-hover:shadow-red-glow transition-all duration-200">
                <FireSkullIcon className="w-16 h-16 text-blood-red" />
              </div>
            </div>
            <h3 className="font-tech text-xl text-blood-red mb-4 tracking-wide font-semibold">FOR THE CHAOS</h3>
            <p className="text-dim-gray font-medium leading-relaxed">Disruption is our language. Order is overrated. Chaos breeds innovation.</p>
          </div>

          {/* For the People Card */}
          <div className="neon-card p-8 rounded-xl text-center group" data-testid="card-people">
            <div className="mb-6 flex justify-center">
              <div className="p-4 rounded-lg bg-jet-black border border-dim-gray group-hover:shadow-purple-glow transition-all duration-200">
                <RaisedFistIcon className="w-16 h-16 text-glitch-purple" />
              </div>
            </div>
            <h3 className="font-tech text-xl text-glitch-purple mb-4 tracking-wide font-semibold">FOR THE PEOPLE</h3>
            <p className="text-dim-gray font-medium leading-relaxed">Power to the holders. Built by the community, owned by the community.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
