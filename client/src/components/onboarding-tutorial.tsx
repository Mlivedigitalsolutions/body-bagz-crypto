import { useState, useEffect, useRef } from "react";
import { X, ChevronRight, ChevronLeft, Skull, Zap, Target, Crown } from "lucide-react";

interface TutorialStep {
  id: string;
  title: string;
  description: string;
  target: string;
  position: "top" | "bottom" | "left" | "right" | "center";
  icon: React.ComponentType<any>;
  villainTheme: string;
}

const tutorialSteps: TutorialStep[] = [
  {
    id: "welcome",
    title: "WELCOME TO THE CHAOS",
    description: "Enter the villain era where chaos reigns supreme. Body Bagz ($BAGZ) is your gateway to digital anarchy and meme domination.",
    target: "hero-section",
    position: "center",
    icon: Skull,
    villainTheme: "Welcome to the darkness, recruit. Your journey begins now."
  },
  {
    id: "tools",
    title: "VILLAIN ARSENAL",
    description: "Generate epic tweets, create chaos memes, and craft your villain PFP with our AI-powered tools. Spread the mayhem across social media.",
    target: "tools-section",
    position: "top",
    icon: Zap,
    villainTheme: "Arm yourself with digital weapons of mass disruption."
  },
  {
    id: "leaderboard",
    title: "HIERARCHY OF CHAOS",
    description: "Climb the villain leaderboard and prove your worth. Complete challenges, earn chaos points, and claim your place among the elite.",
    target: "leaderboard-section",
    position: "right",
    icon: Crown,
    villainTheme: "Only the strongest villains reach the top. Will you?"
  },
  {
    id: "tokenomics",
    title: "VILLAIN WALLETS",
    description: "Understand the dark economics of our token. From Army rewards to Treasury warfare - every villain needs to know the blueprint.",
    target: "tokenomics",
    position: "bottom",
    icon: Target,
    villainTheme: "Knowledge of the treasury is power. Use it wisely."
  }
];

interface OnboardingTutorialProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function OnboardingTutorial({ isOpen, onClose }: OnboardingTutorialProps) {
  const [currentStep, setCurrentStep] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const overlayRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      // Start with glitch animation
      setIsAnimating(true);
      setTimeout(() => setIsAnimating(false), 1000);
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  const nextStep = () => {
    if (currentStep < tutorialSteps.length - 1) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep + 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const prevStep = () => {
    if (currentStep > 0) {
      setIsAnimating(true);
      setTimeout(() => {
        setCurrentStep(currentStep - 1);
        setIsAnimating(false);
      }, 300);
    }
  };

  const getCurrentStepElement = () => {
    const step = tutorialSteps[currentStep];
    if (!step) return null;

    const targetElement = document.getElementById(step.target);
    if (!targetElement) return null;

    const rect = targetElement.getBoundingClientRect();
    return { element: targetElement, rect };
  };

  const getTooltipPosition = () => {
    const stepData = getCurrentStepElement();
    if (!stepData) return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };

    const { rect } = stepData;
    const step = tutorialSteps[currentStep];

    switch (step.position) {
      case 'top':
        return {
          top: `${rect.top - 20}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: 'translate(-50%, -100%)'
        };
      case 'bottom':
        return {
          top: `${rect.bottom + 20}px`,
          left: `${rect.left + rect.width / 2}px`,
          transform: 'translate(-50%, 0)'
        };
      case 'left':
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.left - 20}px`,
          transform: 'translate(-100%, -50%)'
        };
      case 'right':
        return {
          top: `${rect.top + rect.height / 2}px`,
          left: `${rect.right + 20}px`,
          transform: 'translate(0, -50%)'
        };
      default:
        return {
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)'
        };
    }
  };

  const getHighlightStyle = () => {
    const stepData = getCurrentStepElement();
    if (!stepData || tutorialSteps[currentStep].position === 'center') return null;

    const { rect } = stepData;
    return {
      top: `${rect.top - 10}px`,
      left: `${rect.left - 10}px`,
      width: `${rect.width + 20}px`,
      height: `${rect.height + 20}px`
    };
  };

  if (!isOpen) return null;

  const currentStepData = tutorialSteps[currentStep];
  const IconComponent = currentStepData?.icon;

  return (
    <div
      ref={overlayRef}
      className={`fixed inset-0 z-50 transition-all duration-500 ${
        isAnimating ? 'animate-pulse' : ''
      }`}
      style={{
        background: 'linear-gradient(45deg, rgba(10, 10, 11, 0.95), rgba(17, 18, 20, 0.95))',
        backdropFilter: 'blur(8px)'
      }}
    >
      {/* Cyberpunk Background Pattern */}
      <div className="absolute inset-0 opacity-10">
        <div 
          className="w-full h-full"
          style={{
            backgroundImage: `
              linear-gradient(90deg, transparent 49%, #39FF14 50%, transparent 51%),
              linear-gradient(0deg, transparent 49%, #E7352C 50%, transparent 51%)
            `,
            backgroundSize: '50px 50px',
            animation: 'cyber-grid 3s linear infinite'
          }}
        />
      </div>

      {/* Glitch Effect */}
      {isAnimating && (
        <div className="absolute inset-0 pointer-events-none">
          <div 
            className="w-full h-full bg-gradient-to-r from-toxic-green/20 via-transparent to-blood-red/20"
            style={{
              animation: 'glitch-flash 0.3s ease-in-out infinite alternate'
            }}
          />
        </div>
      )}

      {/* Target Highlight */}
      {getHighlightStyle() && (
        <div
          className="absolute pointer-events-none rounded-xl transition-all duration-500"
          style={{
            ...getHighlightStyle()!,
            border: '3px solid #39FF14',
            boxShadow: `
              0 0 20px #39FF14,
              inset 0 0 20px rgba(57, 255, 20, 0.1)
            `,
            animation: 'neon-pulse 2s ease-in-out infinite'
          }}
        />
      )}

      {/* Tutorial Tooltip */}
      <div
        className={`absolute w-96 max-w-[90vw] transition-all duration-500 ${
          isAnimating ? 'scale-95 opacity-0' : 'scale-100 opacity-100'
        }`}
        style={getTooltipPosition()}
        data-testid="tutorial-tooltip"
      >
        <div className="relative">
          {/* Neon Border Glow */}
          <div 
            className="absolute inset-0 rounded-xl"
            style={{
              background: 'linear-gradient(45deg, #39FF14, #7A3BFF, #E7352C, #39FF14)',
              backgroundSize: '400% 400%',
              animation: 'rainbow-border 3s ease infinite',
              padding: '2px'
            }}
          >
            <div className="w-full h-full bg-jet-black rounded-xl" />
          </div>

          {/* Content */}
          <div className="relative bg-gradient-to-br from-jet-black via-onyx to-jet-black rounded-xl p-6 border border-toxic-green/30">
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 text-dim-gray hover:text-blood-red transition-colors duration-200"
              data-testid="tutorial-close"
            >
              <X size={20} />
            </button>

            {/* Step Counter */}
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-2">
                {IconComponent && (
                  <div className="p-2 rounded-lg bg-toxic-green/20 border border-toxic-green/40">
                    <IconComponent size={20} className="text-toxic-green" />
                  </div>
                )}
                <span className="text-xs font-tech text-dim-gray tracking-wider">
                  STEP {currentStep + 1} OF {tutorialSteps.length}
                </span>
              </div>
            </div>

            {/* Title */}
            <h3 
              className="font-brand text-xl font-black text-blood-red mb-3 tracking-wide"
              style={{ textShadow: '0 0 10px rgba(231, 53, 44, 0.5)' }}
            >
              {currentStepData?.title}
            </h3>

            {/* Villain Theme Quote */}
            <div className="mb-4 p-3 rounded-lg bg-glitch-purple/10 border-l-4 border-glitch-purple">
              <p className="text-glitch-purple text-sm italic font-medium">
                "{currentStepData?.villainTheme}"
              </p>
            </div>

            {/* Description */}
            <p className="text-ash-white text-sm leading-relaxed mb-6">
              {currentStepData?.description}
            </p>

            {/* Progress Bar */}
            <div className="mb-6">
              <div className="w-full bg-onyx rounded-full h-2 mb-2">
                <div 
                  className="h-2 rounded-full bg-gradient-to-r from-toxic-green to-blood-red transition-all duration-500"
                  style={{ 
                    width: `${((currentStep + 1) / tutorialSteps.length) * 100}%`,
                    boxShadow: '0 0 10px rgba(57, 255, 20, 0.5)'
                  }}
                />
              </div>
              <p className="text-xs text-dim-gray text-center">
                {Math.round(((currentStep + 1) / tutorialSteps.length) * 100)}% Complete
              </p>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center">
              <button
                onClick={prevStep}
                disabled={currentStep === 0}
                className="flex items-center gap-2 px-4 py-2 rounded-lg bg-onyx hover:bg-dim-gray/20 text-ash-white disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200"
                data-testid="tutorial-prev"
              >
                <ChevronLeft size={16} />
                <span className="text-sm font-medium">Previous</span>
              </button>

              {currentStep < tutorialSteps.length - 1 ? (
                <button
                  onClick={nextStep}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-toxic-green to-blood-red hover:shadow-lg hover:shadow-toxic-green/25 text-jet-black font-bold text-sm transition-all duration-200 transform hover:scale-105"
                  data-testid="tutorial-next"
                >
                  <span>Next</span>
                  <ChevronRight size={16} />
                </button>
              ) : (
                <button
                  onClick={onClose}
                  className="flex items-center gap-2 px-6 py-2 rounded-lg bg-gradient-to-r from-blood-red to-glitch-purple hover:shadow-lg hover:shadow-blood-red/25 text-ash-white font-bold text-sm transition-all duration-200 transform hover:scale-105"
                  data-testid="tutorial-finish"
                >
                  <span>ENTER THE CHAOS</span>
                  <Zap size={16} />
                </button>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Custom Styles */}
      <style>{`
        @keyframes cyber-grid {
          0% { transform: translate(0, 0); }
          100% { transform: translate(50px, 50px); }
        }
        
        @keyframes glitch-flash {
          0% { opacity: 0; }
          100% { opacity: 1; }
        }
        
        @keyframes neon-pulse {
          0%, 100% { 
            box-shadow: 
              0 0 20px #39FF14,
              inset 0 0 20px rgba(57, 255, 20, 0.1);
          }
          50% { 
            box-shadow: 
              0 0 40px #39FF14,
              0 0 60px #39FF14,
              inset 0 0 30px rgba(57, 255, 20, 0.2);
          }
        }
        
        @keyframes rainbow-border {
          0% { background-position: 0% 50%; }
          50% { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
      `}</style>
    </div>
  );
}