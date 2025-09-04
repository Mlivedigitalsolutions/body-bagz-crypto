import { useState } from "react";
import { Button } from "@/components/ui/button";

// Simple merchandise data without image imports for testing
const merchandiseData = [
  {
    id: 1,
    name: "Black Cyberpunk Hoodie",
    category: "Hoodies",
    price: "$89.99",
    description: "Premium black hoodie with toxic green BODY BAGZ logo"
  },
  {
    id: 2,
    name: "Villain Era T-Shirt",
    category: "T-Shirts", 
    price: "$39.99",
    description: "Oversized black tee with blood red gothic lettering"
  },
  {
    id: 3,
    name: "BAGZ Army Tank",
    category: "Tank Tops",
    price: "$34.99", 
    description: "Athletic fit tank with glowing BODY BAGZ ARMY design"
  },
  {
    id: 4,
    name: "Toxic Green Hoodie",
    category: "Hoodies",
    price: "$89.99",
    description: "Bold green hoodie with black BODY BAGZ branding"
  }
];

const categories = ["All", "Hoodies", "T-Shirts", "Tank Tops"];

export default function MerchSection() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [hoveredItem, setHoveredItem] = useState<number | null>(null);

  const filteredMerch = selectedCategory === "All" 
    ? merchandiseData 
    : merchandiseData.filter(item => item.category === selectedCategory);

  return (
    <section id="merch" className="relative z-10 py-20 px-6 bg-gradient-to-b from-jet-black to-onyx">
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="text-center mb-16">
          <h2 
            className="font-brand text-4xl md:text-6xl text-blood-red mb-6 animate-fade-in-up"
            data-testid="merch-title"
          >
            VILLAIN GEAR
          </h2>
          <p 
            className="text-ash-white/80 text-xl font-medium max-w-2xl mx-auto animate-fade-in-up-delay"
          >
            Premium streetwear collection for the chaos collective. Embrace your villain era.
          </p>
        </div>

        {/* Category Filter */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
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

        {/* Merchandise Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8">
          {filteredMerch.map((item, index) => (
            <div
              key={item.id}
              className="neon-card group relative overflow-hidden rounded-xl bg-onyx/50 border border-dim-gray hover:border-toxic-green transition-all duration-500 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
              onMouseEnter={() => setHoveredItem(item.id)}
              onMouseLeave={() => setHoveredItem(null)}
              data-testid={`merch-item-${item.id}`}
            >
              {/* Product Image Placeholder */}
              <div className="relative overflow-hidden">
                <div className="w-full h-80 bg-dim-gray flex items-center justify-center">
                  <div className="text-center">
                    <div className="font-brand text-2xl text-toxic-green mb-2">COMING</div>
                    <div className="font-brand text-lg text-ash-white">SOON</div>
                  </div>
                </div>
                
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

              {/* Product Info */}
              <div className="p-6">
                <h3 className="font-brand text-xl text-ash-white mb-2 group-hover:text-toxic-green transition-colors">
                  {item.name}
                </h3>
                <p className="text-dim-gray text-sm mb-4 leading-relaxed">
                  {item.description}
                </p>
                
                {/* Action Button */}
                <Button
                  className="w-full cyber-button bg-gradient-to-r from-blood-red to-toxic-green text-jet-black font-bold hover:shadow-red-glow transition-all duration-300"
                  data-testid={`buy-${item.id}`}
                >
                  COMING SOON
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

        {/* Bottom CTA */}
        <div className="text-center mt-16 animate-fade-in-up-delay-2">
          <div className="neon-card p-8 max-w-2xl mx-auto">
            <h3 className="font-brand text-2xl text-toxic-green mb-4">
              JOIN THE VILLAIN ARMY
            </h3>
            <p className="text-ash-white/80 mb-6">
              Be the first to know when our exclusive streetwear collection drops. Premium quality, limited quantities.
            </p>
            <Button className="cyber-button bg-gradient-to-r from-toxic-green to-blood-red text-jet-black font-bold px-8 py-3 hover:shadow-green-glow">
              NOTIFY ME WHEN AVAILABLE
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
}