import { useState } from "react";
import tokenomicsHeaderImg from "@assets/generated_images/Tokenomics_section_cyberpunk_header_0d963af7.png";

interface TokenomicsData {
  label: string;
  percentage: number;
  color: string;
  description: string;
  glowClass: string;
}

const tokenomicsData: TokenomicsData[] = [
  {
    label: "LIQUIDITY",
    percentage: 50,
    color: "#E7352C",
    description: "Locked and loaded for maximum stability and trading depth.",
    glowClass: "hover:shadow-red-glow"
  },
  {
    label: "COMMUNITY",
    percentage: 25,
    color: "#39FF14",
    description: "Rewards, incentives, and chaos fuel for the faithful.",
    glowClass: "hover:shadow-green-glow"
  },
  {
    label: "TREASURY",
    percentage: 15,
    color: "#7A3BFF",
    description: "War chest for development, marketing, and world domination.",
    glowClass: "hover:shadow-purple-glow"
  },
  {
    label: "TEAM",
    percentage: 10,
    color: "#EDEEF0",
    description: "Vested allocation for the architects of chaos.",
    glowClass: ""
  }
];

export default function TokenomicsSection() {
  const [hoveredSection, setHoveredSection] = useState<string | null>(null);

  // Calculate stroke dash arrays for the pie chart
  const circumference = 2 * Math.PI * 70; // radius = 70
  let cumulativePercentage = 0;

  const sections = tokenomicsData.map((data, index) => {
    const dashArray = (data.percentage / 100) * circumference;
    const dashOffset = -cumulativePercentage * circumference / 100;
    cumulativePercentage += data.percentage;

    return {
      ...data,
      dashArray,
      dashOffset,
      strokeWidth: hoveredSection === data.label ? "25" : "20"
    };
  });

  return (
    <section id="tokenomics" className="relative z-10 py-20 px-6">
      <div className="max-w-6xl mx-auto">
        <div className="relative mb-12 overflow-hidden rounded-xl">
          <img 
            src={tokenomicsHeaderImg} 
            alt="Cyberpunk Tokenomics - Financial Warfare" 
            className="w-full h-48 object-cover border border-toxic-green/30"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-toxic-green/20 to-blood-red/20"></div>
        </div>
        <h2 className="font-brand text-4xl md:text-5xl text-center text-blood-red mb-16" data-testid="tokenomics-title">
          TOKENOMICS
        </h2>
        
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Enhanced Interactive Pie Chart */}
          <div className="flex justify-center">
            <div className="relative w-80 h-80 neon-card p-8 rounded-xl" data-testid="tokenomics-chart">
              <svg className="w-full h-full transform -rotate-90" viewBox="0 0 160 160">
                {sections.map((section, index) => (
                  <circle
                    key={section.label}
                    cx="80"
                    cy="80"
                    r="65"
                    fill="none"
                    stroke={section.color}
                    strokeWidth={section.strokeWidth}
                    strokeDasharray={`${section.dashArray} ${circumference - section.dashArray}`}
                    strokeDashoffset={section.dashOffset}
                    className="transition-all duration-200 cursor-pointer drop-shadow-lg"
                    onMouseEnter={() => setHoveredSection(section.label)}
                    onMouseLeave={() => setHoveredSection(null)}
                    data-testid={`chart-section-${section.label.toLowerCase()}`}
                    style={{
                      filter: hoveredSection === section.label ? `drop-shadow(0 0 8px ${section.color})` : 'none'
                    }}
                  />
                ))}
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-center">
                  <div className="font-brand text-3xl text-blood-red tracking-tight" style={{textShadow: '0 0 10px rgba(231, 53, 44, 0.5)'}}>$BAGZ</div>
                  <div className="font-tech text-sm text-dim-gray tracking-widest">SUPPLY</div>
                </div>
              </div>
            </div>
          </div>

          {/* Enhanced Distribution Details */}
          <div className="space-y-4">
            {tokenomicsData.map((data) => (
              <div 
                key={data.label}
                className={`neon-card p-6 rounded-xl transition-all duration-200 ${data.glowClass} border-l-4`}
                style={{ borderLeftColor: data.color }}
                onMouseEnter={() => setHoveredSection(data.label)}
                onMouseLeave={() => setHoveredSection(null)}
                data-testid={`tokenomics-card-${data.label.toLowerCase()}`}
              >
                <div className="flex items-center mb-3">
                  <div 
                    className="w-3 h-3 mr-3" 
                    style={{ 
                      backgroundColor: data.color,
                      boxShadow: `0 0 8px ${data.color}`,
                      borderRadius: '1px'
                    }}
                  ></div>
                  <span 
                    className="font-tech text-lg font-semibold tracking-wide"
                    style={{ color: data.color }}
                  >
                    {data.percentage}% {data.label}
                  </span>
                </div>
                <p className="text-dim-gray font-medium leading-relaxed">{data.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
