
import React from 'react';
import { useToast } from '@/hooks/use-toast';

interface ReleaseButtonProps {
  onRelease: () => void;
  disabled: boolean;
}

const ReleaseButton: React.FC<ReleaseButtonProps> = ({ onRelease, disabled }) => {
  const { toast } = useToast();
  
  const handleClick = () => {
    if (disabled) {
      toast({
        title: "Already released today",
        description: "Return tomorrow for another moment of release.",
        duration: 3000,
      });
      return;
    }
    
    onRelease();
  };
  
  return (
    <button 
      onClick={handleClick}
      className={`release-button ${disabled ? 'opacity-50' : ''}`}
      aria-disabled={disabled}
    >
      Release
    </button>
  );
};

export default ReleaseButton;
