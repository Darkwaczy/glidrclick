
import React from "react";
import { AlertCircle } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { Link } from "react-router-dom";

interface FacebookSdkWarningProps {
  error: string;
}

const FacebookSdkWarning: React.FC<FacebookSdkWarningProps> = ({ error }) => {
  const isJsSdkError = error.toLowerCase().includes("jssdk option is not toggled") || 
                       error.toLowerCase().includes("log in with javascript sdk");
                       
  return (
    <Alert variant="destructive" className="mb-6">
      <AlertCircle className="h-4 w-4" />
      <AlertTitle>Facebook SDK Configuration Error</AlertTitle>
      <AlertDescription className="space-y-2">
        <p>{error}</p>
        
        {isJsSdkError && (
          <div className="mt-2">
            <p className="font-medium">How to fix:</p>
            <ol className="list-decimal ml-5 mt-2 text-sm space-y-1">
              <li>Go to <a href="https://developers.facebook.com" className="underline" target="_blank" rel="noopener noreferrer">developers.facebook.com</a></li>
              <li>Select your app</li>
              <li>Navigate to Products → Facebook Login → Settings</li>
              <li>Find "Log in with JavaScript SDK" and toggle it to "Yes"</li>
              <li>Save changes</li>
              <li>Return here and try connecting again</li>
            </ol>
          </div>
        )}
        
        <p className="text-sm mt-4">
          <Link to="/dashboard/settings" className="underline">
            Go to platform settings
          </Link>
        </p>
      </AlertDescription>
    </Alert>
  );
};

export default FacebookSdkWarning;
