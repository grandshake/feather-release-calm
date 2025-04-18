
import React, { useState, useEffect } from 'react';
import { Feather as FeatherIcon } from 'lucide-react';

interface FeatherProps {
  isReleasing: boolean;
  size?: number;
}

const Feather: React.FC<FeatherProps> = ({ isReleasing, size = 64 }) => {
  const [rotate, setRotate] = useState(0);
  
  // Create gentle random rotation
  useEffect(() => {
    if (!isReleasing) {
      const interval = setInterval(() => {
        setRotate(prev => prev + (Math.random() * 0.8 - 0.4));
      }, 1000);
      
      return () => clearInterval(interval);
    }
  }, [isReleasing]);
  
  return (
    <div 
      className={`${isReleasing ? 'release-animation' : 'floating-animation'} transition-all duration-300`}
      style={{ transform: `rotate(${rotate}deg)` }}
    >
      <FeatherIcon 
        size={size} 
        strokeWidth={1}
        className="text-slate-500/80"
      />
    </div>
  );
};

export default Feather;
