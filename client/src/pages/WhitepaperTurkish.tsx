import { useState, useEffect } from 'react';

export default function WhitepaperTurkish() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    // Set page title and language for SEO
    document.title = 'Body Bagz ($BAGZ) Beyaz Kağıt - Türkçe Versiyon | Cyberpunk Meme Token';
    document.documentElement.lang = 'tr';
    document.documentElement.dir = 'ltr';
    
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'Body Bagz ($BAGZ) için eksiksiz Türkçe beyaz kağıt. Solana üzerinde nihai cyberpunk meme ekosistemi; kaos araçları, topluluk ödülleri ve şeffaf tokenomics ile.');
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
      <div className="relative py-20 px-6">
        <div className="absolute inset-0 bg-gradient-to-b from-blood-red/20 to-transparent"></div>
        <div className="relative max-w-4xl mx-auto text-center">
          <h1 className="font-brand text-4xl md:text-6xl lg:text-7xl text-blood-red mb-6 animate-pulse">
            KÖTÜ ADAM ÇAĞI BAŞLADI
          </h1>
          <p className="font-tech text-toxic-green text-xl md:text-2xl mb-8">
            BODY BAGZ ($BAGZ) RESMİ BEYAZ KAĞIT
          </p>
          <div className="text-ash-white/80 text-lg max-w-2xl mx-auto">
            Dijital kaosu kucaklayın. Cyberpunk devrimi başladı.
          </div>
        </div>
      </div>

      {/* Navigation */}
      <div className="sticky top-0 z-50 bg-jet-black/95 backdrop-blur-sm border-b border-dim-gray py-4 px-6">
        <div className="max-w-4xl mx-auto">
          <div className="flex flex-wrap gap-2 justify-center">
            {[
              { id: 'ozet', label: 'Özet' },
              { id: 'vizyon', label: 'Vizyon' },
              { id: 'tokenomics', label: 'Tokenomics' },
              { id: 'ekosistem', label: 'Ekosistem' },
              { id: 'teknoloji', label: 'Teknoloji' },
              { id: 'yol-haritasi', label: 'Yol Haritası' },
              { id: 'topluluk', label: 'Topluluk' }
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
        </div>
      </div>

      {/* Content */}
      <div className="max-w-4xl mx-auto px-6 py-12 space-y-16">
        
        {/* Executive Summary */}
        <section id="ozet" className="space-y-8">
          <h2 className="font-brand text-3xl md:text-4xl text-blood-red">Özet</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Body Bagz ($BAGZ), dijital kaosu ve cyberpunk kültürünü benimseyen devrimci bir meme token'dır. 
              Solana blockchain üzerinde inşa edilen bu proje, geleneksel kripto yaklaşımlarını reddederek 
              "kötü adam çağı" felsefesini benimser.
            </p>
            <p>
              İki ayrı token ekosistemi (Moonshot $BAGZ ve Pump.fun $BAGZ) ile Body Bagz, topluluk yönetimli 
              bir platform sunar. AI destekli kaos araçları, NFT koleksiyonları, müzik platformu ve stake 
              mekanizmaları ile eksiksiz bir dijital deneyim yaratır.
            </p>
            <p>
              Şeffaflık, topluluk katılımı ve sürekli inovasyon Body Bagz'ın temel değerleridir. 
              Bu proje, kripto dünyasında yeni bir paradigma yaratmayı hedefler.
            </p>
          </div>
        </section>

        {/* Vision */}
        <section id="vizyon" className="space-y-8">
          <h2 className="font-brand text-3xl md:text-4xl text-blood-red">Vizyon</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Body Bagz'ın vizyonu, dijital kaosu organize ederek cyberpunk kültürünün merkezi haline gelmektir. 
              Geleneksel finansal sistemlerin dışında, topluluk yönetimli alternatif bir ekonomi yaratmayı amaçlıyoruz.
            </p>
            <div className="bg-dim-gray/20 p-6 rounded-lg border border-toxic-green">
              <h3 className="font-tech text-xl text-toxic-green mb-4">Temel Hedefler</h3>
              <ul className="space-y-3">
                <li>• Küresel cyberpunk topluluğunu birleştirmek</li>
                <li>• Merkezi olmayan yaratıcı araçlar geliştirmek</li>
                <li>• Dijital sanat ve müzikte devrim yaratmak</li>
                <li>• Topluluk yönetimini güçlendirmek</li>
                <li>• Sürdürülebilir token ekonomisi oluşturmak</li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tokenomics */}
        <section id="tokenomics" className="space-y-8">
          <h2 className="font-brand text-3xl md:text-4xl text-blood-red">Tokenomics</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Body Bagz, iki farklı platform üzerinde çifte token stratejisi benimser. 
              Bu yaklaşım, farklı topluluk segmentlerine hitap ederken likiditeyi artırır.
            </p>
            
            <div className="grid md:grid-cols-2 gap-6">
              <div className="bg-dim-gray/20 p-6 rounded-lg border border-glitch-purple">
                <h3 className="font-tech text-xl text-glitch-purple mb-4">Moonshot $BAGZ</h3>
                <ul className="space-y-2">
                  <li>• Toplam Arz: 1 Milyar Token</li>
                  <li>• LP Kilidi: 12 Ay</li>
                  <li>• Sahiplik: Yakıldı</li>
                  <li>• Vergi: %0</li>
                </ul>
              </div>
              
              <div className="bg-dim-gray/20 p-6 rounded-lg border border-toxic-green">
                <h3 className="font-tech text-xl text-toxic-green mb-4">Pump.fun $BAGZ</h3>
                <ul className="space-y-2">
                  <li>• Toplam Arz: 1 Milyar Token</li>
                  <li>• Adil Başlatım</li>
                  <li>• Topluluk Odaklı</li>
                  <li>• Vergi: %0</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Ecosystem */}
        <section id="ekosistem" className="space-y-8">
          <h2 className="font-brand text-3xl md:text-4xl text-blood-red">Ekosistem</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Body Bagz ekosistemi, çeşitli dijital araçları ve platformları bir araya getiren 
              kapsamlı bir cyberpunk deneyimi sunar.
            </p>
            
            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
              <div className="bg-dim-gray/20 p-6 rounded-lg border border-blood-red">
                <h3 className="font-tech text-lg text-blood-red mb-3">🎭 NFT Koleksiyonları</h3>
                <p className="text-sm">Benzersiz cyberpunk sanat eserleri ve karakter koleksiyonları</p>
              </div>
              
              <div className="bg-dim-gray/20 p-6 rounded-lg border border-toxic-green">
                <h3 className="font-tech text-lg text-toxic-green mb-3">🎵 Müzik Platformu</h3>
                <p className="text-sm">40+ cyberpunk track ile özel müzik deneyimi</p>
              </div>
              
              <div className="bg-dim-gray/20 p-6 rounded-lg border border-glitch-purple">
                <h3 className="font-tech text-lg text-glitch-purple mb-3">🛠️ Kaos Araçları</h3>
                <p className="text-sm">AI destekli meme üreticisi ve yaratıcı araçlar</p>
              </div>
              
              <div className="bg-dim-gray/20 p-6 rounded-lg border border-toxic-green">
                <h3 className="font-tech text-lg text-toxic-green mb-3">🏆 Liderlik Tablosu</h3>
                <p className="text-sm">Topluluk yarışmaları ve ödül sistemi</p>
              </div>
              
              <div className="bg-dim-gray/20 p-6 rounded-lg border border-blood-red">
                <h3 className="font-tech text-lg text-blood-red mb-3">👕 Merchandise</h3>
                <p className="text-sm">Özel tasarım cyberpunk kıyafetler ve aksesuarlar</p>
              </div>
              
              <div className="bg-dim-gray/20 p-6 rounded-lg border border-glitch-purple">
                <h3 className="font-tech text-lg text-glitch-purple mb-3">💰 Stake Sistemi</h3>
                <p className="text-sm">Genesis Villain Pool ve ödül mekanizmaları</p>
              </div>
            </div>
          </div>
        </section>

        {/* Technology */}
        <section id="teknoloji" className="space-y-8">
          <h2 className="font-brand text-3xl md:text-4xl text-blood-red">Teknoloji</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Body Bagz, Solana blockchain'inin yüksek performansından yararlanarak 
              gelişmiş teknolojik altyapı sunar.
            </p>
            
            <div className="bg-dim-gray/20 p-6 rounded-lg border border-toxic-green">
              <h3 className="font-tech text-xl text-toxic-green mb-4">Teknik Özellikler</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li>• Solana SPL Token Standardı</li>
                  <li>• Düşük İşlem Ücretleri</li>
                  <li>• Hızlı Onay Süreleri</li>
                  <li>• Çapraz Platform Entegrasyonu</li>
                </ul>
                <ul className="space-y-2">
                  <li>• AI Destekli Araçlar</li>
                  <li>• Gerçek Zamanlı Analytics</li>
                  <li>• Mobil Optimizasyon</li>
                  <li>• Güvenlik Protokolleri</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section id="yol-haritasi" className="space-y-8">
          <h2 className="font-brand text-3xl md:text-4xl text-blood-red">Yol Haritası</h2>
          <div className="space-y-6">
            <div className="space-y-8">
              <div className="border-l-4 border-toxic-green pl-6 py-4">
                <h3 className="font-tech text-xl text-toxic-green mb-2">Faz 1: Genesis (Q1 2025)</h3>
                <ul className="space-y-1 text-ash-white/90">
                  <li>• Token lansmanı ve başlangıç likidite</li>
                  <li>• Temel platform özelliklerinin devreye alınması</li>
                  <li>• İlk topluluk oluşturma çabaları</li>
                  <li>• NFT koleksiyonunun duyurulması</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-glitch-purple pl-6 py-4">
                <h3 className="font-tech text-xl text-glitch-purple mb-2">Faz 2: Genişleme (Q2 2025)</h3>
                <ul className="space-y-1 text-ash-white/90">
                  <li>• Stake sistemi ve ödül mekanizmalarının lansmanı</li>
                  <li>• Gelişmiş kaos araçlarının eklenmesi</li>
                  <li>• Müzik platformu ve sanatçı işbirlikleri</li>
                  <li>• Merchandise mağazasının açılması</li>
                </ul>
              </div>
              
              <div className="border-l-4 border-blood-red pl-6 py-4">
                <h3 className="font-tech text-xl text-blood-red mb-2">Faz 3: Dominasyon (Q3-Q4 2025)</h3>
                <ul className="space-y-1 text-ash-white/90">
                  <li>• Küresel pazarlara genişleme</li>
                  <li>• Büyük borsa listelemeleri</li>
                  <li>• Kurumsal ortaklıklar</li>
                  <li>• Metaverse entegrasyonu</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Community */}
        <section id="topluluk" className="space-y-8">
          <h2 className="font-brand text-3xl md:text-4xl text-blood-red">Topluluk</h2>
          <div className="space-y-6 text-lg leading-relaxed">
            <p>
              Body Bagz topluluğu, cyberpunk kültürünü benimseyen, yaratıcı ve yenilikçi bireylerden oluşur. 
              Merkezi olmayan yönetim anlayışıyla herkesin sesini duyurabildiği bir platform yaratıyoruz.
            </p>
            
            <div className="bg-dim-gray/20 p-6 rounded-lg border border-toxic-green">
              <h3 className="font-tech text-xl text-toxic-green mb-4">Topluluk Avantajları</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <ul className="space-y-2">
                  <li>• Özel etkinliklere erken erişim</li>
                  <li>• NFT airdrop'ları</li>
                  <li>• Governance oylamasına katılım</li>
                  <li>• Stake ödülleri</li>
                </ul>
                <ul className="space-y-2">
                  <li>• VIP Discord kanalları</li>
                  <li>• Merchandise indirimleri</li>
                  <li>• Sanatçı işbirlikleri</li>
                  <li>• Eğitim materyalleri</li>
                </ul>
              </div>
            </div>
            
            <div className="text-center pt-8">
              <p className="text-toxic-green font-tech text-xl">
                🎭 Kaosu kucaklayın. Devrime katılın. 🎭
              </p>
            </div>
          </div>
        </section>
      </div>

      {/* Footer */}
      <div className="border-t border-dim-gray mt-16 py-12 px-6 text-center">
        <div className="max-w-4xl mx-auto">
          <p className="text-ash-white/60 mb-4">
            Bu belge, Body Bagz ($BAGZ) projesi hakkında genel bilgi vermek amacıyla hazırlanmıştır. 
            Yatırım tavsiyesi değildir.
          </p>
          <p className="text-toxic-green font-tech">
            Kaostan doğdu. Topluluk tarafından yönetiliyor. 🚀
          </p>
        </div>
      </div>
    </div>
  );
}