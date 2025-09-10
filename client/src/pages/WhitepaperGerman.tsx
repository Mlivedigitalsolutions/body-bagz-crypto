import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Download, Globe } from 'lucide-react';

export default function WhitepaperGerman() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    // Set page title and language for SEO
    document.title = 'Body Bagz ($BAGZ) Whitepaper - Deutsche Version | Cyberpunk Meme Token';
    document.documentElement.lang = 'de';
    document.documentElement.dir = 'ltr';
    
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Das komplette Body Bagz ($BAGZ) Whitepaper in deutscher Sprache. Das ultimative Cyberpunk-Meme-Ökosystem auf Solana mit Chaos-Tools, Community-Belohnungen und transparenter Tokenomics.');
    }
    
    // Cleanup on unmount
    return () => {
      document.title = 'Body Bagz ($BAGZ) - Cyberpunk Crypto Token | Chaos Tools & Meme Generator';
      document.documentElement.lang = 'en';
      document.documentElement.dir = 'ltr';
    };
  }, []);

  const toggleSection = (sectionId: string) => {
    setExpandedSection(expandedSection === sectionId ? null : sectionId);
  };

  return (
    <div className="min-h-screen bg-jet-black text-ash-white">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-toxic-green" />
            <span className="text-2xl font-orbitron text-toxic-green">🇩🇪</span>
          </div>
          <h1 className="text-6xl font-anton text-blood-red mb-4 tracking-wider">
            BODY BAGZ
          </h1>
          <div className="text-2xl font-orbitron text-toxic-green mb-2">
            DIE SCHURKEN-ÄRA HAT BEGONNEN
          </div>
          <div className="text-4xl font-bebas text-ash-white mb-4 tracking-wide">
            WHITEPAPER
          </div>
          <div className="text-xl text-glitch-purple mb-8">
            Das ultimative Cyberpunk-Meme-Ökosystem
          </div>
          
          {/* Download Button */}
          <Button 
            className="cyber-button text-lg px-8 py-3"
            data-testid="button-download-german-whitepaper"
          >
            <Download className="w-5 h-5 mr-2" />
            Als PDF Herunterladen
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'summary', label: 'Zusammenfassung' },
            { id: 'vision', label: 'Vision' },
            { id: 'tokenomics', label: 'Tokenomics' },
            { id: 'ecosystem', label: 'Ökosystem' },
            { id: 'tech', label: 'Technik' },
            { id: 'roadmap', label: 'Roadmap' },
            { id: 'community', label: 'Community' }
          ].map((section) => (
            <button
              key={section.id}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: 'smooth' })}
              className="px-4 py-2 border border-toxic-green text-toxic-green hover:bg-toxic-green hover:text-jet-black transition-all duration-300 rounded font-orbitron"
              data-testid={`nav-${section.id}`}
            >
              {section.label}
            </button>
          ))}
        </div>

        {/* Executive Summary */}
        <section id="summary" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center">
            <span className="text-toxic-green mr-3">⚡</span>
            ZUSAMMENFASSUNG
          </h2>
          <div className="bg-onyx p-8 rounded-lg border border-toxic-green">
            <p className="text-lg mb-4 leading-relaxed">
              Body Bagz ($BAGZ) ist mehr als ein Meme-Token — es ist eine <span className="text-toxic-green font-bold">Cyberpunk-Kulturbewegung</span>. 
              Auf Solana aufgebaut, durch Chaos angetrieben und für Community-Engagement konzipiert, verwandelt $BAGZ die Meme-Kultur in ein 
              lebendiges Ökosystem aus Tools, Wettbewerben und Belohnungen.
            </p>
            <p className="text-lg leading-relaxed">
              Durch unsere <span className="text-blood-red font-bold">Meme-Fabrik</span>, den <span className="text-blood-red font-bold">PFP-Generator</span> 
              und die <span className="text-blood-red font-bold">Chaos-Bestenliste</span> ermöglicht Body Bagz Inhabern, virale Inhalte zu erstellen, 
              um Belohnungen zu kämpfen und ihre digitalen Schurken-Identitäten aufzubauen.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 border border-glitch-purple rounded">
                <div className="text-3xl font-orbitron text-blood-red font-bold">11</div>
                <div className="text-sm text-glitch-purple">Meme-Vorlagen</div>
              </div>
              <div className="text-center p-4 border border-glitch-purple rounded">
                <div className="text-3xl font-orbitron text-blood-red font-bold">20</div>
                <div className="text-sm text-glitch-purple">Premium-PFPs</div>
              </div>
              <div className="text-center p-4 border border-glitch-purple rounded">
                <div className="text-3xl font-orbitron text-blood-red font-bold">∞</div>
                <div className="text-sm text-glitch-purple">Chaos-Potenzial</div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Vision */}
        <section id="vision" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center">
            <span className="text-toxic-green mr-3">⚡</span>
            PROJEKTVISION
          </h2>
          
          <div className="space-y-8">
            <div className="bg-onyx p-6 rounded-lg border border-blood-red">
              <h3 className="text-2xl font-orbitron text-toxic-green mb-4">Mission</h3>
              <p className="text-lg">
                Das ultimative schurken-thematische Krypto-Ökosystem schaffen, das Inhaber befähigt, Chaos zu umarmen und 
                gleichzeitig echten Wert durch Inhalte, Kultur und Gemeinschaft zu schaffen.
              </p>
            </div>
            
            <div className="bg-onyx p-6 rounded-lg border border-glitch-purple">
              <h3 className="text-2xl font-orbitron text-toxic-green mb-4">Vision</h3>
              <p className="text-lg">
                $BAGZ als <span className="text-toxic-green font-bold">globales Zentrum der Meme-Kriegsführung</span> etablieren, 
                wo Teilnahme Belohnungen bedeutet, Chaos Kultur bedeutet und Schurken zuerst essen.
              </p>
            </div>
            
            <div className="bg-onyx p-6 rounded-lg border border-toxic-green">
              <h3 className="text-2xl font-orbitron text-toxic-green mb-4">Grundwerte</h3>
              <ul className="space-y-3">
                <li className="flex items-start">
                  <span className="text-blood-red mr-3">•</span>
                  <div>
                    <strong className="text-toxic-green">Chaos als Währung:</strong> 
                    <span className="ml-2">Belohnung von Störung und kreativer Zerstörung</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blood-red mr-3">•</span>
                  <div>
                    <strong className="text-toxic-green">Community zuerst:</strong> 
                    <span className="ml-2">Jede Entscheidung kommt dem Schurken-Kollektiv zugute</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blood-red mr-3">•</span>
                  <div>
                    <strong className="text-toxic-green">Qualität vor Quantität:</strong> 
                    <span className="ml-2">Professionelle Tools und Assets</span>
                  </div>
                </li>
                <li className="flex items-start">
                  <span className="text-blood-red mr-3">•</span>
                  <div>
                    <strong className="text-toxic-green">Transparenz:</strong> 
                    <span className="ml-2">Offene Entwicklung und Community-Governance</span>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tokenomics */}
        <section id="tokenomics" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center">
            <span className="text-toxic-green mr-3">⚡</span>
            TOKENOMICS
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-onyx p-6 rounded-lg border border-toxic-green text-center">
              <div className="text-sm text-glitch-purple mb-2">Token-Name</div>
              <div className="text-xl font-orbitron text-blood-red font-bold">Body Bagz</div>
            </div>
            <div className="bg-onyx p-6 rounded-lg border border-toxic-green text-center">
              <div className="text-sm text-glitch-purple mb-2">Symbol</div>
              <div className="text-xl font-orbitron text-blood-red font-bold">$BAGZ</div>
            </div>
            <div className="bg-onyx p-6 rounded-lg border border-toxic-green text-center">
              <div className="text-sm text-glitch-purple mb-2">Blockchain</div>
              <div className="text-xl font-orbitron text-blood-red font-bold">Solana</div>
            </div>
            <div className="bg-onyx p-6 rounded-lg border border-toxic-green text-center">
              <div className="text-sm text-glitch-purple mb-2">Typ</div>
              <div className="text-lg font-orbitron text-blood-red font-bold">Meme + Nutzen</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-onyx to-jet-black p-8 rounded-lg border border-glitch-purple mb-6">
            <h3 className="text-2xl font-orbitron text-toxic-green mb-4">Transparente Launch-Philosophie</h3>
            <p className="text-lg mb-4">
              <strong className="text-blood-red">Moonshot $BAGZ wurde ohne Presale und ohne Team-Allokation gestartet.</strong> 
              Der Großteil des Angebots wird transparent über Moonshots Bonding-Kurve und automatisches Verbrennungssystem verteilt.
            </p>
            <p className="text-lg">
              Das Body Bagz-Ökosystem wird durch eine langfristige Reserve von 20M BAGZ unterstützt, die bis März 2026 gesperrt ist, 
              und ein Treasury-Wallet von 36M BAGZ für Ökosystem-Wachstum und Belohnungen.
            </p>
          </div>
        </section>

        {/* Ecosystem Features */}
        <section id="ecosystem" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center">
            <span className="text-toxic-green mr-3">⚡</span>
            ÖKOSYSTEM-FUNKTIONEN
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-onyx p-6 rounded-lg border border-blood-red">
              <h3 className="text-2xl font-orbitron text-blood-red mb-4">1. Meme-Fabrik</h3>
              <ul className="space-y-2">
                <li className="flex items-center"><span className="text-toxic-green mr-2">✓</span>11 benutzerdefinierte "Bullish Reaper"-Vorlagen</li>
                <li className="flex items-center"><span className="text-toxic-green mr-2">✓</span>Viral-bereit, optimiert für soziale Medien</li>
                <li className="flex items-center"><span className="text-toxic-green mr-2">✓</span>Chaos & Reaper-thematische Meme-Bibliothek</li>
                <li className="flex items-center"><span className="text-toxic-green mr-2">✓</span>Sofortige Generierung mit benutzerdefiniertem Text</li>
              </ul>
            </div>
            
            <div className="bg-onyx p-6 rounded-lg border border-glitch-purple">
              <h3 className="text-2xl font-orbitron text-glitch-purple mb-4">2. Tweet-Generator</h3>
              <ul className="space-y-2">
                <li className="flex items-center"><span className="text-toxic-green mr-2">✓</span>KI-gesteuerte Schurken-Stimme-Tweets</li>
                <li className="flex items-center"><span className="text-toxic-green mr-2">✓</span>Aggressiv/strategisch/chaos Tonarten</li>
                <li className="flex items-center"><span className="text-toxic-green mr-2">✓</span>Für Viralität auf X konzipiert</li>
                <li className="flex items-center"><span className="text-toxic-green mr-2">✓</span>Optimierte Engagement-Algorithmen</li>
              </ul>
            </div>
            
            <div className="bg-onyx p-6 rounded-lg border border-toxic-green">
              <h3 className="text-2xl font-orbitron text-toxic-green mb-4">3. Premium-PFP-Sammlung</h3>
              <ul className="space-y-2">
                <li className="flex items-center"><span className="text-blood-red mr-2">✓</span>20 hochwertige Cyberpunk-Schurken-PFPs</li>
                <li className="flex items-center"><span className="text-blood-red mr-2">✓</span>Seltenheitsstufen: Gewöhnlich, Selten, Legendär</li>
                <li className="flex items-center"><span className="text-blood-red mr-2">✓</span>NFT-bereit für zukünftige Integration</li>
                <li className="flex items-center"><span className="text-blood-red mr-2">✓</span>Sofortiger Download, keine KI-Verzögerungen</li>
              </ul>
            </div>
            
            <div className="bg-onyx p-6 rounded-lg border border-blood-red">
              <h3 className="text-2xl font-orbitron text-blood-red mb-4">4. Chaos-Bestenliste</h3>
              <ul className="space-y-2">
                <li className="flex items-center"><span className="text-toxic-green mr-2">•</span>Meme-Erstellung → 4 Punkte</li>
                <li className="flex items-center"><span className="text-toxic-green mr-2">•</span>Tweet-Generierung → 5 Punkte</li>
                <li className="flex items-center"><span className="text-toxic-green mr-2">•</span>PFP-Download → 3 Punkte</li>
                <li className="flex items-center"><span className="text-toxic-green mr-2">•</span>Meme-Teilen → 6 Punkte</li>
                <li className="flex items-center text-blood-red font-bold">
                  <span className="text-toxic-green mr-2">★</span>Monatliche Wettbewerbe mit 10K $BAGZ-Belohnungen
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Architecture */}
        <section id="tech" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center">
            <span className="text-toxic-green mr-3">⚡</span>
            TECHNISCHE ARCHITEKTUR
          </h2>
          
          <div className="space-y-6">
            <div 
              className="bg-onyx p-6 rounded-lg border border-toxic-green cursor-pointer"
              onClick={() => toggleSection('frontend')}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-orbitron text-toxic-green">Frontend-Technologie-Stack</h3>
                {expandedSection === 'frontend' ? 
                  <ChevronUp className="w-6 h-6 text-toxic-green" /> : 
                  <ChevronDown className="w-6 h-6 text-toxic-green" />
                }
              </div>
              {expandedSection === 'frontend' && (
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span className="font-bold text-glitch-purple">Framework:</span>
                    <span>React + TypeScript für Typsicherheit</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span className="font-bold text-glitch-purple">Build-Tool:</span>
                    <span>Vite für optimierte Leistung</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span className="font-bold text-glitch-purple">UI-Bibliothek:</span>
                    <span>Radix UI mit shadcn-Komponenten</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span className="font-bold text-glitch-purple">Styling:</span>
                    <span>Tailwind CSS mit Cyberpunk-Theme</span>
                  </div>
                </div>
              )}
            </div>

            <div 
              className="bg-onyx p-6 rounded-lg border border-blood-red cursor-pointer"
              onClick={() => toggleSection('backend')}
            >
              <div className="flex items-center justify-between">
                <h3 className="text-2xl font-orbitron text-blood-red">Backend-Infrastruktur</h3>
                {expandedSection === 'backend' ? 
                  <ChevronUp className="w-6 h-6 text-blood-red" /> : 
                  <ChevronDown className="w-6 h-6 text-blood-red" />
                }
              </div>
              {expandedSection === 'backend' && (
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span className="font-bold text-glitch-purple">Server:</span>
                    <span>Express.js mit TypeScript</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span className="font-bold text-glitch-purple">Datenbank:</span>
                    <span>PostgreSQL mit Drizzle ORM</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span className="font-bold text-glitch-purple">Authentifizierung:</span>
                    <span>Replit Auth-Integration</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span className="font-bold text-glitch-purple">Sicherheit:</span>
                    <span>Rate-Limiting und Helmet</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section id="roadmap" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center">
            <span className="text-toxic-green mr-3">⚡</span>
            ROADMAP
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-r from-toxic-green/20 to-onyx p-6 rounded-lg border-l-4 border-toxic-green">
              <h3 className="text-2xl font-bebas text-toxic-green mb-4">Phase 1: Fundament (Abgeschlossen)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center"><span className="text-toxic-green mr-2">✅</span>Meme-Fabrik (11 Vorlagen)</div>
                <div className="flex items-center"><span className="text-toxic-green mr-2">✅</span>PFP-Sammlung (20 Assets)</div>
                <div className="flex items-center"><span className="text-toxic-green mr-2">✅</span>Chaos-Bestenlisten-Gamification</div>
                <div className="flex items-center"><span className="text-toxic-green mr-2">✅</span>Community-Plattformen live</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-glitch-purple/20 to-onyx p-6 rounded-lg border-l-4 border-glitch-purple">
              <h3 className="text-2xl font-bebas text-glitch-purple mb-4">Phase 2: Expansion (Aktuell)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center"><span className="text-glitch-purple mr-2">🔜</span>Erweiterte Analyse-Dashboard</div>
                <div className="flex items-center"><span className="text-glitch-purple mr-2">🔜</span>Mobile-First-Upgrades</div>
                <div className="flex items-center"><span className="text-glitch-purple mr-2">🔜</span>Genesis Villain Pool Staking</div>
                <div className="flex items-center"><span className="text-glitch-purple mr-2">🔜</span>Multilingual Support</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-blood-red/20 to-onyx p-6 rounded-lg border-l-4 border-blood-red">
              <h3 className="text-2xl font-bebas text-blood-red mb-4">Phase 3: Dominanz (Q1 2025)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center"><span className="text-blood-red mr-2">⚡</span>NFT-Marktplatz-Integration</div>
                <div className="flex items-center"><span className="text-blood-red mr-2">⚡</span>Multi-Chain-Brücke</div>
                <div className="flex items-center"><span className="text-blood-red mr-2">⚡</span>Merchandise-Shop</div>
                <div className="flex items-center"><span className="text-blood-red mr-2">⚡</span>Mobile App Beta</div>
              </div>
            </div>
          </div>
        </section>

        {/* Community */}
        <section id="community" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center">
            <span className="text-toxic-green mr-3">⚡</span>
            COMMUNITY & KONTAKTE
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">🐦</div>
              <h3 className="font-orbitron text-white font-bold mb-2">Twitter/X</h3>
              <p className="text-blue-100 text-sm">@BodyBagzToken</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-orbitron text-white font-bold mb-2">Telegram</h3>
              <p className="text-blue-100 text-sm">t.me/BodyBagzOfficial</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">🎮</div>
              <h3 className="font-orbitron text-white font-bold mb-2">Discord</h3>
              <p className="text-purple-100 text-sm">discord.gg/BodyBagz</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="font-orbitron text-white font-bold mb-2">Website</h3>
              <p className="text-gray-100 text-sm">bodybagz.app</p>
            </div>
          </div>
          
          <div className="text-center bg-gradient-to-r from-jet-black via-onyx to-jet-black p-12 rounded-lg border border-toxic-green">
            <h2 className="text-4xl font-anton text-blood-red mb-4">WILLKOMMEN IN DER SCHURKEN-ÄRA</h2>
            <p className="text-2xl font-orbitron text-toxic-green mb-4">CHAOS. KULTUR. COMMUNITY.</p>
            <p className="text-xl text-glitch-purple">Body Bagz ($BAGZ) - Wo Schurken gedeihen</p>
          </div>
        </section>

        {/* Risk Disclosure */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 p-8 rounded-lg border-2 border-blood-red">
            <h2 className="text-3xl font-bebas text-blood-red mb-4 flex items-center">
              <span className="text-blood-red mr-3">⚠️</span>
              WICHTIGE RISIKOHINWEISE
            </h2>
            <p className="text-lg mb-4">
              <strong>Kryptowährungen sind hochvolatil und risikoreich.</strong> Body Bagz ($BAGZ) ist ein experimenteller 
              Meme-Token ohne Garantie für Wert oder Ertrag.
            </p>
            <p className="text-blood-red font-bold text-lg">
              Investieren Sie nur, was Sie sich leisten können zu verlieren. Dies ist keine Finanzberatung.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}