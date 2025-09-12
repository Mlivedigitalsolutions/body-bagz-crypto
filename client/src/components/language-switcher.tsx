import { useState, useEffect } from "react";
import { Globe, ChevronDown } from "lucide-react";
import { Button } from "@/components/ui/button";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";

// Supported languages for Body Bagz global community
const languages = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'ja', name: 'Japanese', flag: '🇯🇵', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
  { code: 'pt', name: 'Portuguese', flag: '🇧🇷', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिंदी' },
  { code: 'tr', name: 'Turkish', flag: '🇹🇷', nativeName: 'Türkçe' }
];

export default function LanguageSwitcher() {
  const [currentLanguage, setCurrentLanguage] = useState(languages[0]);
  const [isTranslating, setIsTranslating] = useState(false);

  // Initialize Google Translate
  useEffect(() => {
    const initializeGoogleTranslate = () => {
      if (!import.meta.env.VITE_GOOGLE_TRANSLATE_API_KEY) {
        // Fallback: Use free Google Translate widget (no API key required)
        console.info('Using free Google Translate widget for language support');
        
        // Load Google Translate script (free widget)
        const script = document.createElement('script');
        script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
        script.async = true;
        
        // Initialize callback
        (window as any).googleTranslateElementInit = () => {
          new (window as any).google.translate.TranslateElement({
            pageLanguage: 'en',
            includedLanguages: languages.map(lang => lang.code).join(','),
            layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
            autoDisplay: false
          }, 'google_translate_element');
        };

        document.head.appendChild(script);
        return;
      }

      // Check if Google Translate is already loaded
      if ((window as any).google?.translate) {
        return;
      }

      // Load Google Translate script
      const script = document.createElement('script');
      script.src = 'https://translate.google.com/translate_a/element.js?cb=googleTranslateElementInit';
      script.async = true;
      
      // Initialize callback
      (window as any).googleTranslateElementInit = () => {
        new (window as any).google.translate.TranslateElement({
          pageLanguage: 'en',
          includedLanguages: languages.map(lang => lang.code).join(','),
          layout: (window as any).google.translate.TranslateElement.InlineLayout.SIMPLE,
          autoDisplay: false
        }, 'google_translate_element');
      };

      document.head.appendChild(script);
    };

    initializeGoogleTranslate();
  }, []);

  const handleLanguageChange = async (language: typeof languages[0]) => {
    if (language.code === currentLanguage.code) return;

    setIsTranslating(true);
    setCurrentLanguage(language);

    try {
      // Trigger Google Translate widget (works with free widget too)
      const translateElement = document.getElementById('google_translate_element');
      if (translateElement && (window as any).google?.translate) {
        // Find and click the language option
        const selectElement = translateElement.querySelector('select');
        if (selectElement) {
          selectElement.value = language.code;
          selectElement.dispatchEvent(new Event('change'));
        }
      }

      // Store language preference
      localStorage.setItem('preferred_language', language.code);
    } catch (error) {
      console.error('Translation error:', error);
    } finally {
      setTimeout(() => setIsTranslating(false), 1000);
    }
  };

  // Load saved language preference
  useEffect(() => {
    const savedLanguage = localStorage.getItem('preferred_language');
    if (savedLanguage) {
      const language = languages.find(lang => lang.code === savedLanguage);
      if (language) {
        setCurrentLanguage(language);
      }
    }
  }, []);

  return (
    <div className="relative">
      {/* Hidden Google Translate Element */}
      <div id="google_translate_element" className="hidden"></div>
      
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button 
            variant="ghost" 
            className="bg-jet-black/50 border border-toxic-green/30 hover:border-toxic-green hover:bg-toxic-green/10 transition-all duration-300"
            data-testid="language-switcher"
            disabled={isTranslating}
          >
            <div className="flex items-center gap-2">
              <Globe className="w-4 h-4 text-toxic-green" />
              <span className="text-sm font-medium text-ash-white hidden sm:block">
                {currentLanguage.flag} {currentLanguage.nativeName}
              </span>
              <span className="text-sm font-medium text-ash-white sm:hidden">
                {currentLanguage.flag}
              </span>
              {isTranslating ? (
                <div className="w-4 h-4 border-2 border-toxic-green border-t-transparent rounded-full animate-spin"></div>
              ) : (
                <ChevronDown className="w-4 h-4 text-toxic-green" />
              )}
            </div>
          </Button>
        </DropdownMenuTrigger>
        
        <DropdownMenuContent 
          className="bg-jet-black border border-toxic-green/30 max-h-80 overflow-y-auto scrollbar-thin scrollbar-thumb-toxic-green scrollbar-track-transparent"
          align="end"
        >
          <div className="p-2">
            <div className="text-xs text-toxic-green font-semibold mb-2 px-2">
              GLOBAL CHAOS LANGUAGES
            </div>
            {languages.map(language => (
              <DropdownMenuItem
                key={language.code}
                className={`cursor-pointer hover:bg-toxic-green/10 transition-colors ${
                  currentLanguage.code === language.code ? 'bg-toxic-green/20' : ''
                }`}
                onClick={() => handleLanguageChange(language)}
                data-testid={`language-${language.code}`}
              >
                <div className="flex items-center gap-3 w-full">
                  <span className="text-lg">{language.flag}</span>
                  <div className="flex-1">
                    <div className="text-ash-white font-medium">{language.nativeName}</div>
                    <div className="text-dim-gray text-xs">{language.name}</div>
                  </div>
                  {currentLanguage.code === language.code && (
                    <div className="w-2 h-2 bg-toxic-green rounded-full"></div>
                  )}
                </div>
              </DropdownMenuItem>
            ))}
          </div>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
}