import { useState, useRef, useEffect } from "react";
import EasterEggGame from "./easter-egg-game";

interface EasterEggTriggerProps {
  children: React.ReactNode;
  hoverDuration?: number; // milliseconds
}

export default function EasterEggTrigger({ 
  children, 
  hoverDuration = 3000 
}: EasterEggTriggerProps) {
  const [showGame, setShowGame] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const timeoutRef = useRef<NodeJS.Timeout>();
  
  const handleMouseEnter = () => {
    setIsHovering(true);
    timeoutRef.current = setTimeout(() => {
      if (isHovering) {
        setShowGame(true);
      }
    }, hoverDuration);
  };
  
  const handleMouseLeave = () => {
    setIsHovering(false);
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
  };
  
  const closeGame = () => {
    setShowGame(false);
    setIsHovering(false);
  };
  
  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);
  
  return (
    <>
      <div
        onMouseEnter={handleMouseEnter}
        onMouseLeave={handleMouseLeave}
        className="cursor-pointer"
        data-testid="easter-egg-trigger"
      >
        {children}
      </div>
      
      {/* Lazy-loaded game component */}
      {showGame && (
        <EasterEggGame 
          isOpen={showGame} 
          onClose={closeGame} 
        />
      )}
    </>
  );
}