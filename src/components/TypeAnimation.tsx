
import { useState, useEffect } from 'react';

interface TypeAnimationProps {
  text: string;
  speed?: number;
  className?: string;
}

const TypeAnimation = ({ text, speed = 100, className = '' }: TypeAnimationProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const pauseDelay = 2000;

  useEffect(() => {
    if (isPaused) {
      const timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDelay);
      
      return () => clearTimeout(timeout);
    }

    if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex((prevIndex) => (prevIndex + 1) % text.length);
      } else {
        const timeout = setTimeout(() => {
          setDisplayText(text.substring(0, displayText.length - 1));
        }, speed / 2);
        
        return () => clearTimeout(timeout);
      }
    } else {
      if (displayText === text) {
        setIsPaused(true);
      } else {
        const timeout = setTimeout(() => {
          setDisplayText(text.substring(0, displayText.length + 1));
        }, speed);
        
        return () => clearTimeout(timeout);
      }
    }
  }, [displayText, text, isDeleting, isPaused, speed]);

  return (
    <div className={`inline-block ${className}`}>
      <span>{displayText}</span>
      <span className="border-r-2 border-glidr-bright-purple ml-1 animate-blink-caret">&nbsp;</span>
    </div>
  );
};

export default TypeAnimation;
