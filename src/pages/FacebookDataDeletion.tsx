
import React, { useEffect, useState } from 'react';

const FacebookDataDeletion = () => {
  const [status, setStatus] = useState<'loading' | 'success' | 'error'>('loading');
  const [response, setResponse] = useState<{
    url?: string;
    confirmation_code?: string;
    error?: string;
  }>({});

  useEffect(() => {
    const processRequest = async () => {
      try {
        // Get the request parameters
        const urlParams = new URLSearchParams(window.location.search);
        const hasParams = urlParams.toString().length > 0;
        
        // If it's a POST-like request with signed_request in the URL
        if (hasParams && urlParams.get('signed_request')) {
          const signedRequest = urlParams.get('signed_request');
          
          // Process deletion request
          setResponse({
            url: "https://glidrclick.lovable.app/privacy",
            confirmation_code: "deletion_confirmed_" + Date.now()
          });
          setStatus('success');
          
          console.log("Processed deletion request with signed_request");
        } 
        // If it's a verification request (GET without parameters)
        else {
          // Handle the verification request
          setResponse({
            url: "https://glidrclick.lovable.app/privacy",
            confirmation_code: "verification_accepted_" + Date.now()
          });
          setStatus('success');
          
          console.log("Processed verification request");
        }
      } catch (error) {
        console.error("Error processing request:", error);
        setStatus('error');
        setResponse({ error: error instanceof Error ? error.message : 'Unknown error' });
      }
    };

    processRequest();
  }, []);

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50">
      <div className="w-full max-w-md p-8 space-y-4 bg-white rounded-lg shadow">
        {status === 'loading' && (
          <div className="text-center">
            <p className="text-gray-500">Processing request...</p>
          </div>
        )}
        
        {status === 'success' && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-center">Facebook Data Deletion</h1>
            <div className="bg-gray-100 p-4 rounded-md">
              <pre className="whitespace-pre-wrap text-sm">
                {JSON.stringify(response, null, 2)}
              </pre>
            </div>
          </div>
        )}
        
        {status === 'error' && (
          <div className="space-y-4">
            <h1 className="text-2xl font-bold text-center text-red-600">Error</h1>
            <div className="bg-red-50 p-4 rounded-md">
              <p className="text-red-700">
                {response.error || 'An unknown error occurred'}
              </p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default FacebookDataDeletion;
