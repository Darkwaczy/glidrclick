
import React from "react";
import { Label } from "@/components/ui/label";

interface WordCounterProps {
  content: string;
  targetLength?: number;
}

const WordCounter: React.FC<WordCounterProps> = ({ content, targetLength }) => {
  const wordCount = content.trim() ? content.trim().split(/\s+/).length : 0;
  const characterCount = content.length;
  
  const getWordCountColor = () => {
    if (!targetLength) return "text-gray-300";
    const percentage = (wordCount / targetLength) * 100;
    if (percentage < 50) return "text-red-400";
    if (percentage < 80) return "text-yellow-400";
    if (percentage > 120) return "text-red-400";
    return "text-green-400";
  };

  return (
    <div className="space-y-2">
      <div className="flex flex-wrap gap-4 text-sm">
        <span className={`font-medium ${getWordCountColor()}`}>
          Words: {wordCount}
          {targetLength && ` / ${targetLength}`}
        </span>
        <span className="text-gray-300">
          Characters: {characterCount}
        </span>
        {targetLength && (
          <span className="text-gray-300">
            Progress: {Math.round((wordCount / targetLength) * 100)}%
          </span>
        )}
      </div>
      {targetLength && (
        <div className="w-full bg-white/20 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              wordCount < targetLength * 0.5 ? 'bg-red-400' :
              wordCount < targetLength * 0.8 ? 'bg-yellow-400' :
              wordCount > targetLength * 1.2 ? 'bg-red-400' :
              'bg-green-400'
            }`}
            style={{ width: `${Math.min((wordCount / targetLength) * 100, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default WordCounter;
