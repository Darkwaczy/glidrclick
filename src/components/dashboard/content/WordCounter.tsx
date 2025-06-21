
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
    if (!targetLength) return "text-gray-600";
    const percentage = (wordCount / targetLength) * 100;
    if (percentage < 50) return "text-red-500";
    if (percentage < 80) return "text-yellow-500";
    if (percentage > 120) return "text-red-500";
    return "text-green-500";
  };

  return (
    <div className="space-y-2">
      <Label>Content Statistics</Label>
      <div className="flex flex-wrap gap-4 text-sm">
        <span className={`font-medium ${getWordCountColor()}`}>
          Words: {wordCount}
          {targetLength && ` / ${targetLength}`}
        </span>
        <span className="text-gray-600">
          Characters: {characterCount}
        </span>
        {targetLength && (
          <span className="text-gray-600">
            Progress: {Math.round((wordCount / targetLength) * 100)}%
          </span>
        )}
      </div>
      {targetLength && (
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className={`h-2 rounded-full transition-all duration-300 ${
              wordCount < targetLength * 0.5 ? 'bg-red-500' :
              wordCount < targetLength * 0.8 ? 'bg-yellow-500' :
              wordCount > targetLength * 1.2 ? 'bg-red-500' :
              'bg-green-500'
            }`}
            style={{ width: `${Math.min((wordCount / targetLength) * 100, 100)}%` }}
          />
        </div>
      )}
    </div>
  );
};

export default WordCounter;
