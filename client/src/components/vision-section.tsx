import { UrbanGritIcon, FireSkullIcon, RaisedFistIcon } from "@/components/icons";
import visionHeaderImg from "@assets/generated_images/Vision_section_cyberpunk_header_94b2d214.png";
import cultureImg from "@assets/generated_images/Culture_card_cyberpunk_image_d524c9fd.png";
import chaosImg from "@assets/generated_images/Chaos_card_cyberpunk_image_63b5359d.png";
import peopleImg from "@assets/generated_images/People_card_cyberpunk_image_229a5db8.png";

export default function VisionSection() {
  return (
    <section id="vision" className="relative z-10 py-12 px-6">
      <div className="max-w-6xl mx-auto">
        <h2 className="font-brand text-3xl md:text-4xl text-center text-blood-red mb-8" data-testid="vision-title">
          OUR VISION
        </h2>
        
        <div className="grid md:grid-cols-3 gap-6">
          {/* For the Culture Card */}
          <div className="neon-card p-6 rounded-xl text-center group" data-testid="card-culture">
            <div className="mb-4 flex justify-center">
              <div className="w-8 h-8 bg-toxic-green/20 rounded flex items-center justify-center">
                <UrbanGritIcon className="w-5 h-5 text-toxic-green" />
              </div>
            </div>
            <h3 className="font-tech text-lg text-toxic-green mb-3 tracking-wide font-semibold">FOR THE CULTURE</h3>
            <p className="text-dim-enhanced text-sm leading-relaxed">Street-born, community-driven. We rep the underground and the overlooked.</p>
          </div>

          {/* For the Chaos Card */}
          <div className="neon-card p-6 rounded-xl text-center group" data-testid="card-chaos">
            <div className="mb-4 flex justify-center">
              <div className="w-8 h-8 bg-blood-red/20 rounded flex items-center justify-center">
                <FireSkullIcon className="w-5 h-5 text-blood-red" />
              </div>
            </div>
            <h3 className="font-tech text-lg text-blood-red mb-3 tracking-wide font-semibold">FOR THE CHAOS</h3>
            <p className="text-dim-enhanced text-sm leading-relaxed">Disruption is our language. Order is overrated. Chaos breeds innovation.</p>
          </div>

          {/* For the People Card */}
          <div className="neon-card p-6 rounded-xl text-center group" data-testid="card-people">
            <div className="mb-4 flex justify-center">
              <div className="w-8 h-8 bg-glitch-purple/20 rounded flex items-center justify-center">
                <RaisedFistIcon className="w-5 h-5 text-glitch-purple" />
              </div>
            </div>
            <h3 className="font-tech text-lg text-glitch-purple mb-3 tracking-wide font-semibold">FOR THE PEOPLE</h3>
            <p className="text-dim-enhanced text-sm leading-relaxed">Power to the holders. Built by the community, owned by the community.</p>
          </div>
        </div>
      </div>
    </section>
  );
}
