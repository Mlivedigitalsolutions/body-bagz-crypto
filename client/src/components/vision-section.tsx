import { UrbanGritIcon, FireSkullIcon, RaisedFistIcon } from "@/components/icons";
import visionHeaderImg from "@assets/generated_images/Vision_section_cyberpunk_header_94b2d214.png";
import cultureImg from "@assets/generated_images/Culture_card_cyberpunk_image_d524c9fd.png";
import chaosImg from "@assets/generated_images/Chaos_card_cyberpunk_image_63b5359d.png";
import peopleImg from "@assets/generated_images/People_card_cyberpunk_image_229a5db8.png";

export default function VisionSection() {
  return (
    <section id="vision" className="relative z-10 py-20 px-6">
      <div className="max-w-7xl mx-auto">
        <div className="relative mb-12 overflow-hidden rounded-xl">
          <img 
            src={visionHeaderImg} 
            alt="Cyberpunk Vision - For The Culture, Chaos & People" 
            className="w-full h-48 object-cover border border-blood-red/30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blood-red/30 via-toxic-green/20 to-glitch-purple/30"></div>
        </div>
        <h2 className="font-brand text-4xl md:text-5xl text-center text-blood-red mb-16" data-testid="vision-title">
          OUR VISION
        </h2>
        
        <div className="grid md:grid-cols-3 gap-8">
          {/* For the Culture Card */}
          <div className="neon-card p-8 rounded-xl text-center group" data-testid="card-culture">
            <div className="mb-6 flex justify-center">
              <div className="relative w-32 h-40 rounded-lg overflow-hidden border border-toxic-green/30 group-hover:shadow-green-glow transition-all duration-200">
                <img 
                  src={cultureImg} 
                  alt="For The Culture" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-toxic-green/20 to-transparent"></div>
                <div className="absolute top-2 right-2">
                  <UrbanGritIcon className="w-6 h-6 text-toxic-green" />
                </div>
              </div>
            </div>
            <h3 className="font-tech text-xl text-toxic-green mb-4 tracking-wide font-semibold">FOR THE CULTURE</h3>
            <p className="text-dim-enhanced font-medium leading-relaxed">Street-born, community-driven. We rep the underground and the overlooked.</p>
          </div>

          {/* For the Chaos Card */}
          <div className="neon-card p-8 rounded-xl text-center group" data-testid="card-chaos">
            <div className="mb-6 flex justify-center">
              <div className="relative w-32 h-40 rounded-lg overflow-hidden border border-blood-red/30 group-hover:shadow-red-glow transition-all duration-200">
                <img 
                  src={chaosImg} 
                  alt="For The Chaos" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-blood-red/20 to-transparent"></div>
                <div className="absolute top-2 right-2">
                  <FireSkullIcon className="w-6 h-6 text-blood-red" />
                </div>
              </div>
            </div>
            <h3 className="font-tech text-xl text-blood-red mb-4 tracking-wide font-semibold">FOR THE CHAOS</h3>
            <p className="text-dim-enhanced font-medium leading-relaxed">Disruption is our language. Order is overrated. Chaos breeds innovation.</p>
          </div>

          {/* For the People Card */}
          <div className="neon-card p-8 rounded-xl text-center group" data-testid="card-people">
            <div className="mb-6 flex justify-center">
              <div className="relative w-32 h-40 rounded-lg overflow-hidden border border-glitch-purple/30 group-hover:shadow-purple-glow transition-all duration-200">
                <img 
                  src={peopleImg} 
                  alt="For The People" 
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-glitch-purple/20 to-transparent"></div>
                <div className="absolute top-2 right-2">
                  <RaisedFistIcon className="w-6 h-6 text-glitch-purple" />
                </div>
              </div>
            </div>
            <h3 className="font-tech text-xl text-glitch-purple mb-4 tracking-wide font-semibold">FOR THE PEOPLE</h3>
            <p className="text-dim-enhanced font-medium leading-relaxed">Power to the holders. Built by the community, owned by the community.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
