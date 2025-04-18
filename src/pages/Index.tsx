
import React, { useState, useEffect } from 'react';
import Feather from '@/components/Feather';
import ReleaseButton from '@/components/ReleaseButton';
import { getRandomAffirmation, hasReleasedToday, markReleasedToday } from '@/utils/affirmations';
import { soundPlayer } from '@/utils/sounds';

const Index = () => {
  const [isReleasing, setIsReleasing] = useState(false);
  const [affirmation, setAffirmation] = useState('');
  const [showAffirmation, setShowAffirmation] = useState(false);
  const [hasReleased, setHasReleased] = useState(false);
  
  // Check if user has already released today
  useEffect(() => {
    // Small delay to ensure localStorage is available
    const timer = setTimeout(() => {
      setHasReleased(hasReleasedToday());
    }, 100);
    
    return () => clearTimeout(timer);
  }, []);
  
  const handleRelease = () => {
    setIsReleasing(true);
    soundPlayer.playChime();
    
    // Generate a new affirmation
    setAffirmation(getRandomAffirmation());
    
    // Show affirmation after a delay
    setTimeout(() => {
      setShowAffirmation(true);
    }, 500);
    
    // Mark as released today
    markReleasedToday();
    setHasReleased(true);
  };
  
  return (
    <div className="gradient-bg flex flex-col items-center justify-center px-4 text-center">
      <h1 className="text-3xl font-light text-slate-700 mb-8 mt-8">
        Nishkama Karma
      </h1>
      
      <div className="flex-1 flex flex-col items-center justify-center">
        <div className="mb-12">
          <Feather isReleasing={isReleasing} />
        </div>
        
        <div className={`transition-opacity duration-500 ${showAffirmation ? 'opacity-100' : 'opacity-0'}`}>
          {showAffirmation && (
            <p className="affirmation-text mb-12">{affirmation}</p>
          )}
        </div>
        
        {!isReleasing && (
          <ReleaseButton 
            onRelease={handleRelease} 
            disabled={hasReleased} 
          />
        )}
        
        {hasReleased && !isReleasing && (
          <p className="text-sm text-slate-400 mt-4">
            Return tomorrow for another moment of release
          </p>
        )}
      </div>
      
      <footer className="py-4 text-slate-400 text-xs">
        <p>nishkamakarma.com</p>
      </footer>
    </div>
  );
};

export default Index;
