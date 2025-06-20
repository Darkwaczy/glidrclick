
import { useState, useEffect } from "react";
import { toast } from "sonner";
import { handleOAuthCallback, getPlatformName } from "@/utils/social";

export const useOAuth = () => {
  const [processingOAuth, setProcessingOAuth] = useState(false);

  const processOAuthCallback = async (callback?: () => Promise<void>) => {
    const url = new URL(window.location.href);
    const urlParams = new URLSearchParams(url.search);
    const connectedPlatform = urlParams.get('connected');
    const code = urlParams.get('code');
    const error = urlParams.get('error');
    const errorReason = urlParams.get('error_reason');
    const errorDescription = urlParams.get('error_description');
    
    if (error || errorReason || errorDescription) {
      console.error("OAuth error:", { error, errorReason, errorDescription });
      toast.error(`Connection failed: ${errorDescription || errorReason || error || "Unknown error"}`);
      // Clean up URL parameters
      window.history.replaceState({}, document.title, window.location.pathname);
      return;
    }
    
    if (connectedPlatform && code) {
      setProcessingOAuth(true);
      try {
        console.log(`Processing OAuth callback for ${connectedPlatform} with code: ${code.substring(0, 10)}...`);
        const success = await handleOAuthCallback(connectedPlatform, code);
        if (success) {
          toast.success(`Connected to ${getPlatformName(connectedPlatform)} successfully!`);
          if (callback) await callback();
        }
      } catch (err) {
        console.error("OAuth callback error:", err);
        toast.error(`Failed to complete ${getPlatformName(connectedPlatform)} connection`);
      } finally {
        setProcessingOAuth(false);
        // Clean up URL parameters
        window.history.replaceState({}, document.title, window.location.pathname);
      }
    } else if (error) {
      toast.error(`Connection failed: ${error}`);
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  };

  return {
    processingOAuth,
    setProcessingOAuth,
    processOAuthCallback
  };
};
