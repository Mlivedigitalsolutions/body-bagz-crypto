import { UrbanGritIcon, FireSkullIcon, RaisedFistIcon } from "@/components/icons";
import visionHeaderImg from "@assets/generated_images/Vision_section_cyberpunk_header_94b2d214.png";
import cultureImg from "@assets/generated_images/Culture_card_cyberpunk_image_d524c9fd.png";
import chaosImg from "@assets/generated_images/Chaos_card_cyberpunk_image_63b5359d.png";
import peopleImg from "@assets/generated_images/People_card_cyberpunk_image_229a5db8.png";

export default function VisionSection() {
  return (
    <section id="vision" className="relative z-10 py-8 px-6">
      <div className="max-w-4xl mx-auto">
        <h2 className="font-brand text-2xl md:text-3xl text-center text-blood-red mb-6" data-testid="vision-title">
          OUR VISION
        </h2>
        
        <div className="grid grid-cols-2 gap-4 max-w-2xl mx-auto">
          {/* For the Culture Card */}
          <a 
            href="/mission" 
            target="_blank" 
            rel="noopener noreferrer"
            className="neon-card p-4 rounded-lg text-center group hover:scale-105 transition-all duration-300 hover:shadow-green-glow cursor-pointer block" 
            data-testid="card-culture"
          >
            <div className="mb-4 flex justify-center">
              <div className="w-8 h-8 bg-toxic-green/20 rounded flex items-center justify-center group-hover:bg-toxic-green/30 transition-colors">
                <UrbanGritIcon className="w-5 h-5 text-toxic-green" />
              </div>
            </div>
            <h3 className="font-tech text-lg text-toxic-green mb-3 tracking-wide font-semibold group-hover:text-toxic-green/90">FOR THE CULTURE</h3>
            <p className="text-dim-enhanced text-sm leading-relaxed group-hover:text-ash-white">Street-born, community-driven. We rep the underground and the overlooked.</p>
          </a>

          {/* For the Chaos Card */}
          <a 
            href="/meetups" 
            target="_blank" 
            rel="noopener noreferrer"
            className="neon-card p-4 rounded-lg text-center group hover:scale-105 transition-all duration-300 hover:shadow-red-glow cursor-pointer block" 
            data-testid="card-chaos"
          >
            <div className="mb-4 flex justify-center">
              <div className="w-8 h-8 bg-blood-red/20 rounded flex items-center justify-center group-hover:bg-blood-red/30 transition-colors">
                <FireSkullIcon className="w-5 h-5 text-blood-red" />
              </div>
            </div>
            <h3 className="font-tech text-lg text-blood-red mb-3 tracking-wide font-semibold group-hover:text-blood-red/90">FOR THE CHAOS</h3>
            <p className="text-dim-enhanced text-sm leading-relaxed group-hover:text-ash-white">Disruption is our language. Order is overrated. Chaos breeds innovation.</p>
          </a>

          {/* For the People Card */}
          <a 
            href="/market" 
            target="_blank" 
            rel="noopener noreferrer"
            className="neon-card p-4 rounded-lg text-center group hover:scale-105 transition-all duration-300 hover:shadow-purple-glow cursor-pointer block col-span-2" 
            data-testid="card-people"
          >
            <div className="mb-4 flex justify-center">
              <div className="w-8 h-8 bg-glitch-purple/20 rounded flex items-center justify-center group-hover:bg-glitch-purple/30 transition-colors">
                <RaisedFistIcon className="w-5 h-5 text-glitch-purple" />
              </div>
            </div>
            <h3 className="font-tech text-lg text-glitch-purple mb-3 tracking-wide font-semibold group-hover:text-glitch-purple/90">FOR THE PEOPLE</h3>
            <p className="text-dim-enhanced text-sm leading-relaxed group-hover:text-ash-white">Power to the holders. Built by the community, owned by the community.</p>
          </a>
        </div>
      </div>
    </section>
  );
}
