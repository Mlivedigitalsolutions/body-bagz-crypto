import { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { ChevronDown, ChevronUp, Download, Globe } from 'lucide-react';

export default function WhitepaperArabic() {
  const [expandedSection, setExpandedSection] = useState<string | null>(null);

  useEffect(() => {
    // Set page title and language for SEO
    document.title = 'بودي باجز ($BAGZ) الورقة البيضاء - النسخة العربية | رمز الميم السيبرانية';
    document.documentElement.lang = 'ar';
    document.documentElement.dir = 'rtl';
    
    // Add meta description
    let metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', 'الورقة البيضاء الكاملة لـ بودي باجز ($BAGZ) باللغة العربية. النظام البيئي النهائي للميمز السيبرانية على سولانا مع أدوات الفوضى ومكافآت المجتمع واقتصاديات الرموز الشفافة.');
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
    <div className="min-h-screen bg-jet-black text-ash-white" dir="rtl">
      {/* Header */}
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Globe className="w-8 h-8 text-toxic-green" />
            <span className="text-2xl font-orbitron text-toxic-green">🇸🇦</span>
          </div>
          <h1 className="text-6xl font-anton text-blood-red mb-4 tracking-wider">
            بودي باجز
          </h1>
          <div className="text-2xl font-orbitron text-toxic-green mb-2">
            عصر الأشرار بدأ
          </div>
          <div className="text-4xl font-bebas text-ash-white mb-4 tracking-wide">
            الورقة البيضاء
          </div>
          <div className="text-xl text-glitch-purple mb-8">
            النظام البيئي النهائي للميمز السيبرانية
          </div>
          
          {/* Download Button */}
          <Button 
            className="cyber-button text-lg px-8 py-3"
            data-testid="button-download-arabic-whitepaper"
          >
            <Download className="w-5 h-5 ml-2" />
            تحميل كـ PDF
          </Button>
        </div>

        {/* Navigation */}
        <div className="flex flex-wrap justify-center gap-4 mb-12">
          {[
            { id: 'summary', label: 'الملخص التنفيذي' },
            { id: 'vision', label: 'الرؤية' },
            { id: 'tokenomics', label: 'اقتصاد الرموز' },
            { id: 'ecosystem', label: 'النظام البيئي' },
            { id: 'tech', label: 'التقنية' },
            { id: 'roadmap', label: 'خارطة الطريق' },
            { id: 'community', label: 'المجتمع' }
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
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center justify-end">
            الملخص التنفيذي
            <span className="text-toxic-green ml-3">⚡</span>
          </h2>
          <div className="bg-onyx p-8 rounded-lg border border-toxic-green">
            <p className="text-lg mb-4 leading-relaxed text-right">
              بودي باجز ($BAGZ) أكثر من مجرد رمز ميم — إنها <span className="text-toxic-green font-bold">حركة ثقافية سيبرانية</span>. 
              مبني على سولانا، مدفوع بالفوضى ومصمم لمشاركة المجتمع، يحول $BAGZ ثقافة الميمز إلى نظام بيئي حيوي من الأدوات والمسابقات والمكافآت.
            </p>
            <p className="text-lg leading-relaxed text-right">
              من خلال <span className="text-blood-red font-bold">مصنع الميمز</span> الخاص بنا، و<span className="text-blood-red font-bold">مولد الصور الشخصية</span> 
              و<span className="text-blood-red font-bold">لوحة الفوضى</span>، يمكّن بودي باجز أصحاب الرموز من إنشاء محتوى فيروسي، والتنافس على المكافآت، 
              وبناء هوياتهم الرقمية كأشرار.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
              <div className="text-center p-4 border border-glitch-purple rounded">
                <div className="text-3xl font-orbitron text-blood-red font-bold">11</div>
                <div className="text-sm text-glitch-purple">قوالب الميمز</div>
              </div>
              <div className="text-center p-4 border border-glitch-purple rounded">
                <div className="text-3xl font-orbitron text-blood-red font-bold">20</div>
                <div className="text-sm text-glitch-purple">صور شخصية متميزة</div>
              </div>
              <div className="text-center p-4 border border-glitch-purple rounded">
                <div className="text-3xl font-orbitron text-blood-red font-bold">∞</div>
                <div className="text-sm text-glitch-purple">إمكانات الفوضى</div>
              </div>
            </div>
          </div>
        </section>

        {/* Project Vision */}
        <section id="vision" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center justify-end">
            رؤية المشروع
            <span className="text-toxic-green ml-3">⚡</span>
          </h2>
          
          <div className="space-y-8">
            <div className="bg-onyx p-6 rounded-lg border border-blood-red">
              <h3 className="text-2xl font-orbitron text-toxic-green mb-4 text-right">المهمة</h3>
              <p className="text-lg text-right">
                إنشاء النظام البيئي النهائي للعملات المشفرة المتمحور حول الأشرار، والذي يمكّن أصحاب الرموز من احتضان الفوضى مع إنشاء قيمة حقيقية 
                من خلال المحتوى والثقافة والمجتمع.
              </p>
            </div>
            
            <div className="bg-onyx p-6 rounded-lg border border-glitch-purple">
              <h3 className="text-2xl font-orbitron text-toxic-green mb-4 text-right">الرؤية</h3>
              <p className="text-lg text-right">
                تأسيس $BAGZ كـ<span className="text-toxic-green font-bold">مركز عالمي لحرب الميمز</span>، حيث المشاركة تعني المكافآت، 
                والفوضى تعني الثقافة، والأشرار يأكلون أولاً.
              </p>
            </div>
            
            <div className="bg-onyx p-6 rounded-lg border border-toxic-green">
              <h3 className="text-2xl font-orbitron text-toxic-green mb-4 text-right">القيم الأساسية</h3>
              <ul className="space-y-3">
                <li className="flex items-start justify-end">
                  <div className="text-right">
                    <strong className="text-toxic-green">الفوضى كعملة:</strong> 
                    <span className="mr-2">مكافأة الاضطراب والدمار الإبداعي</span>
                  </div>
                  <span className="text-blood-red ml-3">•</span>
                </li>
                <li className="flex items-start justify-end">
                  <div className="text-right">
                    <strong className="text-toxic-green">المجتمع أولاً:</strong> 
                    <span className="mr-2">كل قرار يفيد جماعة الأشرار</span>
                  </div>
                  <span className="text-blood-red ml-3">•</span>
                </li>
                <li className="flex items-start justify-end">
                  <div className="text-right">
                    <strong className="text-toxic-green">الجودة قبل الكمية:</strong> 
                    <span className="mr-2">أدوات وأصول احترافية</span>
                  </div>
                  <span className="text-blood-red ml-3">•</span>
                </li>
                <li className="flex items-start justify-end">
                  <div className="text-right">
                    <strong className="text-toxic-green">الشفافية:</strong> 
                    <span className="mr-2">التطوير المفتوح وحوكمة المجتمع</span>
                  </div>
                  <span className="text-blood-red ml-3">•</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Tokenomics */}
        <section id="tokenomics" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center justify-end">
            اقتصاد الرموز
            <span className="text-toxic-green ml-3">⚡</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
            <div className="bg-onyx p-6 rounded-lg border border-toxic-green text-center">
              <div className="text-sm text-glitch-purple mb-2">اسم الرمز</div>
              <div className="text-xl font-orbitron text-blood-red font-bold">بودي باجز</div>
            </div>
            <div className="bg-onyx p-6 rounded-lg border border-toxic-green text-center">
              <div className="text-sm text-glitch-purple mb-2">الرمز</div>
              <div className="text-xl font-orbitron text-blood-red font-bold">$BAGZ</div>
            </div>
            <div className="bg-onyx p-6 rounded-lg border border-toxic-green text-center">
              <div className="text-sm text-glitch-purple mb-2">البلوك تشين</div>
              <div className="text-xl font-orbitron text-blood-red font-bold">سولانا</div>
            </div>
            <div className="bg-onyx p-6 rounded-lg border border-toxic-green text-center">
              <div className="text-sm text-glitch-purple mb-2">النوع</div>
              <div className="text-lg font-orbitron text-blood-red font-bold">ميم + فائدة</div>
            </div>
          </div>

          <div className="bg-gradient-to-r from-onyx to-jet-black p-8 rounded-lg border border-glitch-purple mb-6">
            <h3 className="text-2xl font-orbitron text-toxic-green mb-4 text-right">فلسفة الإطلاق الشفاف</h3>
            <p className="text-lg mb-4 text-right">
              <strong className="text-blood-red">تم إطلاق Moonshot $BAGZ بدون بيع مسبق وبدون تخصيص للفريق.</strong> 
              يتم توزيع الجزء الأكبر من المعروض بشفافية من خلال منحنى الترابط الخاص بـ Moonshot ونظام الحرق التلقائي.
            </p>
            <p className="text-lg text-right">
              يدعم نظام بودي باجز البيئي احتياطي طويل المدى قدره 20 مليون BAGZ مُؤمن حتى مارس 2026، 
              ومحفظة خزانة قدرها 36 مليون BAGZ لنمو النظام البيئي والمكافآت.
            </p>
          </div>
        </section>

        {/* Ecosystem Features */}
        <section id="ecosystem" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center justify-end">
            ميزات النظام البيئي
            <span className="text-toxic-green ml-3">⚡</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-onyx p-6 rounded-lg border border-blood-red">
              <h3 className="text-2xl font-orbitron text-blood-red mb-4 text-right">1. مصنع الميمز</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-end"><span className="text-toxic-green ml-2">✓</span>11 قالب "حاصد صاعد" مخصص</li>
                <li className="flex items-center justify-end"><span className="text-toxic-green ml-2">✓</span>جاهز للانتشار، محسّن لوسائل التواصل الاجتماعي</li>
                <li className="flex items-center justify-end"><span className="text-toxic-green ml-2">✓</span>مكتبة ميمز بموضوع الفوضى والحاصد</li>
                <li className="flex items-center justify-end"><span className="text-toxic-green ml-2">✓</span>إنشاء فوري بنص مخصص</li>
              </ul>
            </div>
            
            <div className="bg-onyx p-6 rounded-lg border border-glitch-purple">
              <h3 className="text-2xl font-orbitron text-glitch-purple mb-4 text-right">2. مولد التغريدات</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-end"><span className="text-toxic-green ml-2">✓</span>تغريدات بصوت الأشرار مدعومة بالذكاء الاصطناعي</li>
                <li className="flex items-center justify-end"><span className="text-toxic-green ml-2">✓</span>نبرات عدوانية/استراتيجية/فوضوية</li>
                <li className="flex items-center justify-end"><span className="text-toxic-green ml-2">✓</span>مصمم للانتشار على X</li>
                <li className="flex items-center justify-end"><span className="text-toxic-green ml-2">✓</span>خوارزميات تفاعل محسّنة</li>
              </ul>
            </div>
            
            <div className="bg-onyx p-6 rounded-lg border border-toxic-green">
              <h3 className="text-2xl font-orbitron text-toxic-green mb-4 text-right">3. مجموعة الصور الشخصية المتميزة</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-end"><span className="text-blood-red ml-2">✓</span>20 صورة شخصية سيبرانية عالية الجودة</li>
                <li className="flex items-center justify-end"><span className="text-blood-red ml-2">✓</span>مستويات ندرة: عادي، نادر، أسطوري</li>
                <li className="flex items-center justify-end"><span className="text-blood-red ml-2">✓</span>جاهز لـ NFT للتكامل المستقبلي</li>
                <li className="flex items-center justify-end"><span className="text-blood-red ml-2">✓</span>تحميل فوري، لا تأخير بالذكاء الاصطناعي</li>
              </ul>
            </div>
            
            <div className="bg-onyx p-6 rounded-lg border border-blood-red">
              <h3 className="text-2xl font-orbitron text-blood-red mb-4 text-right">4. لوحة الفوضى</h3>
              <ul className="space-y-2">
                <li className="flex items-center justify-end"><span className="text-toxic-green ml-2">•</span>إنشاء ميم ← 4 نقاط</li>
                <li className="flex items-center justify-end"><span className="text-toxic-green ml-2">•</span>إنشاء تغريدة ← 5 نقاط</li>
                <li className="flex items-center justify-end"><span className="text-toxic-green ml-2">•</span>تحميل صورة شخصية ← 3 نقاط</li>
                <li className="flex items-center justify-end"><span className="text-toxic-green ml-2">•</span>مشاركة ميم ← 6 نقاط</li>
                <li className="flex items-center justify-end text-blood-red font-bold">
                  <span>مسابقات شهرية بمكافآت 10 ألف $BAGZ</span>
                  <span className="text-toxic-green ml-2">★</span>
                </li>
              </ul>
            </div>
          </div>
        </section>

        {/* Technical Architecture */}
        <section id="tech" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center justify-end">
            البنية التقنية
            <span className="text-toxic-green ml-3">⚡</span>
          </h2>
          
          <div className="space-y-6">
            <div 
              className="bg-onyx p-6 rounded-lg border border-toxic-green cursor-pointer"
              onClick={() => toggleSection('frontend')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {expandedSection === 'frontend' ? 
                    <ChevronUp className="w-6 h-6 text-toxic-green" /> : 
                    <ChevronDown className="w-6 h-6 text-toxic-green" />
                  }
                </div>
                <h3 className="text-2xl font-orbitron text-toxic-green">مجموعة تقنيات الواجهة الأمامية</h3>
              </div>
              {expandedSection === 'frontend' && (
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span>React + TypeScript للأمان النوعي</span>
                    <span className="font-bold text-glitch-purple">الإطار:</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span>Vite للأداء المحسّن</span>
                    <span className="font-bold text-glitch-purple">أداة البناء:</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span>Radix UI مع مكونات shadcn</span>
                    <span className="font-bold text-glitch-purple">مكتبة واجهة المستخدم:</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span>Tailwind CSS مع موضوع سيبرانك</span>
                    <span className="font-bold text-glitch-purple">التصميم:</span>
                  </div>
                </div>
              )}
            </div>

            <div 
              className="bg-onyx p-6 rounded-lg border border-blood-red cursor-pointer"
              onClick={() => toggleSection('backend')}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  {expandedSection === 'backend' ? 
                    <ChevronUp className="w-6 h-6 text-blood-red" /> : 
                    <ChevronDown className="w-6 h-6 text-blood-red" />
                  }
                </div>
                <h3 className="text-2xl font-orbitron text-blood-red">البنية التحتية الخلفية</h3>
              </div>
              {expandedSection === 'backend' && (
                <div className="mt-4 space-y-3">
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span>Express.js مع TypeScript</span>
                    <span className="font-bold text-glitch-purple">الخادم:</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span>PostgreSQL مع Drizzle ORM</span>
                    <span className="font-bold text-glitch-purple">قاعدة البيانات:</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span>تكامل Replit Auth</span>
                    <span className="font-bold text-glitch-purple">المصادقة:</span>
                  </div>
                  <div className="flex justify-between items-center border-b border-dim-gray pb-2">
                    <span>تحديد المعدل و Helmet</span>
                    <span className="font-bold text-glitch-purple">الأمان:</span>
                  </div>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Roadmap */}
        <section id="roadmap" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center justify-end">
            خارطة الطريق
            <span className="text-toxic-green ml-3">⚡</span>
          </h2>
          
          <div className="space-y-6">
            <div className="bg-gradient-to-l from-toxic-green/20 to-onyx p-6 rounded-lg border-r-4 border-toxic-green">
              <h3 className="text-2xl font-bebas text-toxic-green mb-4 text-right">المرحلة 1: الأساس (مكتملة)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-end"><span className="text-toxic-green ml-2">✅</span>مصنع الميمز (11 قالب)</div>
                <div className="flex items-center justify-end"><span className="text-toxic-green ml-2">✅</span>مجموعة الصور الشخصية (20 أصل)</div>
                <div className="flex items-center justify-end"><span className="text-toxic-green ml-2">✅</span>تلعيب لوحة الفوضى</div>
                <div className="flex items-center justify-end"><span className="text-toxic-green ml-2">✅</span>منصات المجتمع مباشرة</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-l from-glitch-purple/20 to-onyx p-6 rounded-lg border-r-4 border-glitch-purple">
              <h3 className="text-2xl font-bebas text-glitch-purple mb-4 text-right">المرحلة 2: التوسع (حالية)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-end"><span className="text-glitch-purple ml-2">🔜</span>لوحة تحليلات متقدمة</div>
                <div className="flex items-center justify-end"><span className="text-glitch-purple ml-2">🔜</span>تحسينات الجوال أولاً</div>
                <div className="flex items-center justify-end"><span className="text-glitch-purple ml-2">🔜</span>تجمع الأشرار للأصول</div>
                <div className="flex items-center justify-end"><span className="text-glitch-purple ml-2">🔜</span>دعم متعدد اللغات</div>
              </div>
            </div>
            
            <div className="bg-gradient-to-l from-blood-red/20 to-onyx p-6 rounded-lg border-r-4 border-blood-red">
              <h3 className="text-2xl font-bebas text-blood-red mb-4 text-right">المرحلة 3: الهيمنة (الربع الأول 2025)</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-center justify-end"><span className="text-blood-red ml-2">⚡</span>تكامل سوق NFT</div>
                <div className="flex items-center justify-end"><span className="text-blood-red ml-2">⚡</span>جسر متعدد السلاسل</div>
                <div className="flex items-center justify-end"><span className="text-blood-red ml-2">⚡</span>متجر البضائع</div>
                <div className="flex items-center justify-end"><span className="text-blood-red ml-2">⚡</span>بيتا تطبيق الهاتف المحمول</div>
              </div>
            </div>
          </div>
        </section>

        {/* Community */}
        <section id="community" className="mb-16">
          <h2 className="text-4xl font-bebas text-blood-red mb-6 flex items-center justify-end">
            المجتمع والاتصال
            <span className="text-toxic-green ml-3">⚡</span>
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <div className="bg-gradient-to-br from-blue-600 to-blue-700 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">🐦</div>
              <h3 className="font-orbitron text-white font-bold mb-2">تويتر/X</h3>
              <p className="text-blue-100 text-sm">@BodyBagzToken</p>
            </div>
            
            <div className="bg-gradient-to-br from-blue-500 to-blue-600 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">💬</div>
              <h3 className="font-orbitron text-white font-bold mb-2">تيليجرام</h3>
              <p className="text-blue-100 text-sm">t.me/BodyBagzOfficial</p>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 to-purple-700 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">🎮</div>
              <h3 className="font-orbitron text-white font-bold mb-2">ديسكورد</h3>
              <p className="text-purple-100 text-sm">discord.gg/BodyBagz</p>
            </div>
            
            <div className="bg-gradient-to-br from-gray-700 to-gray-800 p-6 rounded-lg text-center">
              <div className="text-3xl mb-3">🌐</div>
              <h3 className="font-orbitron text-white font-bold mb-2">الموقع</h3>
              <p className="text-gray-100 text-sm">bodybagz.app</p>
            </div>
          </div>
          
          <div className="text-center bg-gradient-to-r from-jet-black via-onyx to-jet-black p-12 rounded-lg border border-toxic-green">
            <h2 className="text-4xl font-anton text-blood-red mb-4">أهلاً بكم في عصر الأشرار</h2>
            <p className="text-2xl font-orbitron text-toxic-green mb-4">فوضى. ثقافة. مجتمع.</p>
            <p className="text-xl text-glitch-purple">بودي باجز ($BAGZ) - حيث يزدهر الأشرار</p>
          </div>
        </section>

        {/* Risk Disclosure */}
        <section className="mb-16">
          <div className="bg-gradient-to-r from-red-900/50 to-red-800/50 p-8 rounded-lg border-2 border-blood-red">
            <h2 className="text-3xl font-bebas text-blood-red mb-4 flex items-center justify-end">
              تحذيرات مخاطر مهمة
              <span className="text-blood-red ml-3">⚠️</span>
            </h2>
            <p className="text-lg mb-4 text-right">
              <strong>العملات المشفرة متقلبة جداً ومحفوفة بالمخاطر.</strong> بودي باجز ($BAGZ) هو رمز ميم تجريبي 
              بدون ضمان للقيمة أو العائد.
            </p>
            <p className="text-blood-red font-bold text-lg text-right">
              استثمر فقط ما يمكنك تحمل خسارته. هذه ليست نصيحة مالية.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}