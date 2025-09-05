import { useState } from "react";
import { Button } from "@/components/ui/button";

// Import all merchandise mockup images
import blackHoodie from "@assets/generated_images/BAGZ_black_hoodie_model_34d9bba3.png";
import villainTshirt from "@assets/generated_images/VILLAIN_ERA_t-shirt_female_model_5b7b8fe4.png";
import armyTank from "@assets/generated_images/BAGZ_ARMY_tank_top_model_a2433c2e.png";
import greenHoodie from "@assets/generated_images/Green_BAGZ_hoodie_female_model_878fd980.png";
import snapbackCap from "@assets/generated_images/BAGZ_snapback_cap_model_d91a27ec.png";
import redSweatshirt from "@assets/generated_images/Red_villain_era_sweatshirt_model_25be772d.png";
import beanie from "@assets/generated_images/BAGZ_beanie_model_shot_ebbb05c9.png";
import bomberJacket from "@assets/generated_images/BAGZ_bomber_jacket_female_model_06707ce8.png";
import whiteTshirt from "@assets/generated_images/White_BAGZ_t-shirt_model_95780a6e.png";
import cropTop from "@assets/generated_images/VILLAIN_crop_top_model_2e90c5f7.png";

// Featured merchandise - most popular items
const merchandiseData = [
  {
    id: 1,
    name: "Black Cyberpunk Hoodie",
    category: "Hoodies",
    price: "$89.99",
    image: blackHoodie,
    description: "Premium black hoodie with toxic green BODY BAGZ logo",
    featured: true
  },
  {
    id: 2,
    name: "Villain Era T-Shirt",
    category: "T-Shirts", 
    price: "$39.99",
    image: villainTshirt,
    description: "Oversized black tee with blood red gothic lettering",
    featured: true
  },
  {
    id: 4,
    name: "Toxic Green Hoodie",
    category: "Hoodies",
    price: "$89.99",
    image: greenHoodie,
    description: "Bold green hoodie with black BODY BAGZ branding",
    featured: true
  },
  {
    id: 5,
    name: "Snapback Cap",
    category: "Headwear",
    price: "$44.99",
    image: snapbackCap,
    description: "Embroidered black snapback with grim reaper skull",
    featured: true
  },
  {
    id: 8,
    name: "Bomber Jacket",
    category: "Outerwear",
    price: "$129.99", 
    image: bomberJacket,
    description: "Premium black bomber with large BODY BAGZ back patch",
    featured: true
  },
  {
    id: 10,
    name: "Villain Crop Top",
    category: "Crop Tops",
    price: "$34.99",
    image: cropTop,
    description: "Black crop top with glowing green VILLAIN ERA text",
    featured: true
  }
];

const categories = ["All", "Hoodies", "T-Shirts", "Headwear", "Outerwear"];

export default function MerchSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const filteredMerch = selectedCategory === "All" 
    ? merchandiseData 
    : merchandiseData.filter(item => item.category === selectedCategory);

  return (
    <section id="merch" className="relative z-10 py-16 px-6 bg-gradient-to-b from-jet-black to-onyx">
      <div className="max-w-7xl mx-auto">
        {/* Compact Section Header */}
        <div className="text-center mb-10">
          <h2 
            className="font-brand text-3xl md:text-4xl text-blood-red mb-4 animate-fade-in-up"
            data-testid="merch-title"
          >
            VILLAIN GEAR
          </h2>
          <p 
            className="text-ash-white/70 text-lg max-w-xl mx-auto animate-fade-in-up-delay mb-3"
          >
            Premium streetwear for the chaos collective.
          </p>
          <div className="bg-dim-gray/10 border border-dim-gray/30 rounded-md p-3 max-w-2xl mx-auto">
            <p className="text-ash-white/50 text-xs">
              <strong className="text-toxic-green">COMING SOON:</strong> Designs shown are conceptual examples.
            </p>
          </div>
        </div>

        {/* Compact Category Filter */}
        <div className="flex flex-wrap justify-center gap-3 mb-8">
          {categories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`cyber-button px-6 py-2 font-semibold transition-all duration-300 ${
                selectedCategory === category
                  ? "bg-toxic-green text-jet-black border-toxic-green shadow-green-glow"
                  : "bg-transparent text-ash-white border-dim-gray hover:border-toxic-green hover:text-toxic-green"
              }`}
              data-testid={`category-${category.toLowerCase()}`}
            >
              {category}
            </Button>
          ))}
        </div>

        {/* Compact Merchandise Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 md:gap-6">
          {filteredMerch.map((item, index) => (
            <div
              key={item.id}
              className="neon-card group relative overflow-hidden rounded-xl bg-onyx/50 border border-dim-gray hover:border-toxic-green transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              data-testid={`merch-item-${item.id}`}
            >
              {/* Product Image */}
              <div className="relative overflow-hidden">
                <img
                  src={item.image}
                  alt={item.name}
                  className="w-full h-48 md:h-56 object-cover transition-transform duration-700 group-hover:scale-110"
                  loading="lazy"
                />
                
                {/* Hover Overlay */}
                <div
                  className={`absolute inset-0 bg-gradient-to-t from-jet-black/90 via-transparent to-transparent transition-opacity duration-300 ${
                    hoveredItem === item.id ? 'opacity-100' : 'opacity-0'
                  }`}
                />

                {/* Price Badge */}
                <div className="absolute top-4 right-4 bg-blood-red/90 backdrop-blur-sm px-3 py-1 rounded-full">
                  <span className="text-ash-white font-bold text-sm">{item.price}</span>
                </div>

                {/* Category Badge */}
                <div className="absolute top-4 left-4 bg-toxic-green/20 backdrop-blur-sm border border-toxic-green/50 px-3 py-1 rounded-full">
                  <span className="text-toxic-green font-medium text-xs uppercase tracking-wider">{item.category}</span>
                </div>
              </div>

              {/* Compact Product Info */}
              <div className="p-4">
                <h3 className="font-brand text-sm md:text-base text-ash-white mb-1 group-hover:text-toxic-green transition-colors leading-tight">
                  {item.name}
                </h3>
                <p className="text-dim-gray text-xs mb-3 leading-relaxed hidden md:block">
                  {item.description}
                </p>
                
                {/* Compact Action Button */}
                <Button
                  size="sm"
                  className="w-full cyber-button bg-gradient-to-r from-blood-red to-toxic-green text-jet-black font-bold hover:shadow-red-glow transition-all duration-300 text-xs"
                  data-testid={`buy-${item.id}`}
                >
                  SOON
                </Button>
              </div>

              {/* Glitch Effect on Hover */}
              {hoveredItem === item.id && (
                <div className="absolute inset-0 pointer-events-none">
                  <div className="scanline-overlay absolute inset-0 animate-scanline opacity-30"></div>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Compact Bottom CTA */}
        <div className="text-center mt-10 animate-fade-in-up-delay-2">
          <div className="neon-card p-6 max-w-xl mx-auto">
            <h3 className="font-brand text-lg md:text-xl text-toxic-green mb-3">
              JOIN THE VILLAIN ARMY
            </h3>
            <p className="text-ash-white/70 mb-4 text-sm">
              Be first to access exclusive streetwear drops.
            </p>
            <Button className="cyber-button bg-gradient-to-r from-toxic-green to-blood-red text-jet-black font-bold px-6 py-2 hover:shadow-green-glow text-sm">
              GET NOTIFIED
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}