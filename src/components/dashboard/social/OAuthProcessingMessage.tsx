
import React from "react";

interface OAuthProcessingMessageProps {
  processingOAuth: boolean;
}

const OAuthProcessingMessage: React.FC<OAuthProcessingMessageProps> = ({ processingOAuth }) => {
  if (!processingOAuth) return null;
  
  return (
    <div className="p-4 border border-blue-100 rounded bg-blue-50 text-blue-800 text-sm">
      Processing your platform connection. Please wait...
    </div>
  );
};

export default OAuthProcessingMessage;
