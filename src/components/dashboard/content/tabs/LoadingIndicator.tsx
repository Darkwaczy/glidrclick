
import React from "react";
import { Loader2 } from "lucide-react";

interface LoadingIndicatorProps {
  className?: string;
}

const LoadingIndicator: React.FC<LoadingIndicatorProps> = ({ className = "py-12" }) => {
  return (
    <div className={`flex items-center justify-center ${className}`}>
      <Loader2 className="h-8 w-8 animate-spin text-gray-400" />
    </div>
  );
};

export default LoadingIndicator;
