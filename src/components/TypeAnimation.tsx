
import React, { useState, useEffect } from 'react';

interface TypeAnimationProps {
  texts: string[];  // Changed from single text to array of texts
  speed?: number;
  className?: string;
}

const TypeAnimation = ({ texts, speed = 100, className = '' }: TypeAnimationProps) => {
  const [displayText, setDisplayText] = useState('');
  const [currentTextIndex, setCurrentTextIndex] = useState(0);
  const [currentCharIndex, setCurrentCharIndex] = useState(0);
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
        setCurrentTextIndex((prevIndex) => (prevIndex + 1) % texts.length);
      } else {
        const timeout = setTimeout(() => {
          setDisplayText(displayText.substring(0, displayText.length - 1));
        }, speed / 2);
        
        return () => clearTimeout(timeout);
      }
    } else {
      const currentText = texts[currentTextIndex];
      if (displayText === currentText) {
        setIsPaused(true);
      } else {
        const timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        }, speed);
        
        return () => clearTimeout(timeout);
      }
    }
  }, [displayText, texts, currentTextIndex, isDeleting, isPaused, speed]);

  return (
    <div className={`inline-block ${className}`}>
      <span>{displayText}</span>
      <span className="border-r-2 border-glidr-bright-purple ml-1 animate-blink-caret">&nbsp;</span>
    </div>
  );
};

export default TypeAnimation;
