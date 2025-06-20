
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Calendar, Share2, MessageSquare, RefreshCw } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import { handleOAuthCallback } from '@/utils/social/authentication';

const SocialSharing: React.FC = () => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isProcessingOAuth, setIsProcessingOAuth] = useState(false);
  
  useEffect(() => {
    // Check if this is an OAuth callback
    const platform = searchParams.get('platform');
    const code = searchParams.get('code');
    const error = searchParams.get('error');
    const state = searchParams.get('state');
    
    if (platform && code) {
      setIsProcessingOAuth(true);
      
      // Process OAuth callback
      (async () => {
        try {
          // Verify state
          const storedState = sessionStorage.getItem('oauth_state');
          if (state && storedState && state !== storedState) {
            throw new Error('Invalid state parameter');
          }
          
          // Clear state
          sessionStorage.removeItem('oauth_state');
          
          // Handle OAuth callback
          const success = await handleOAuthCallback(platform, code);
          
          if (success) {
            // Redirect to dashboard
            setTimeout(() => {
              navigate('/dashboard/social');
            }, 1000);
          }
        } catch (err) {
          console.error('Error processing OAuth callback:', err);
          toast.error(`Authentication failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
        } finally {
          setIsProcessingOAuth(false);
        }
      })();
    } else if (error) {
      toast.error(`Authentication error: ${error}`);
    }
  }, [searchParams, navigate]);
  
  if (isProcessingOAuth) {
    return (
      <div className="container max-w-6xl py-8">
        <Card>
          <CardHeader>
            <CardTitle className="text-center">Processing Authentication</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-8">
            <RefreshCw className="animate-spin h-12 w-12 mb-4" />
            <p className="text-lg">Completing your social media connection...</p>
            <p className="text-sm text-gray-500 mt-2">Please don't close this window.</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="container max-w-6xl py-8">
      <h1 className="text-3xl font-bold mb-8">Social Media Integration</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <Card>
          <CardHeader className="bg-gradient-to-br from-blue-500 to-blue-700 text-white">
            <CardTitle className="flex items-center gap-2">
              <Share2 size={20} />
              <span>Unified Social Posting</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">Share your content across multiple platforms simultaneously with a single click.</p>
            <p className="mb-6 text-sm text-gray-500">Connect your accounts and start posting to Facebook, Twitter, LinkedIn, and more.</p>
            {isAuthenticated ? (
              <Button asChild className="w-full">
                <Link to="/dashboard/social">Connect Your Accounts</Link>
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link to="/auth?redirect=/dashboard/social">Sign In to Connect</Link>
              </Button>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-gradient-to-br from-purple-500 to-purple-700 text-white">
            <CardTitle className="flex items-center gap-2">
              <Calendar size={20} />
              <span>Content Scheduling</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">Plan and schedule your content for optimal engagement times across platforms.</p>
            <p className="mb-6 text-sm text-gray-500">Create a content calendar to maintain consistent presence on all your platforms.</p>
            {isAuthenticated ? (
              <Button asChild className="w-full">
                <Link to="/dashboard/schedule">Manage Schedule</Link>
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link to="/auth?redirect=/dashboard/schedule">Sign In to Schedule</Link>
              </Button>
            )}
          </CardContent>
        </Card>
        
        <Card>
          <CardHeader className="bg-gradient-to-br from-green-500 to-green-700 text-white">
            <CardTitle className="flex items-center gap-2">
              <MessageSquare size={20} />
              <span>Engagement Tracking</span>
            </CardTitle>
          </CardHeader>
          <CardContent className="pt-6">
            <p className="mb-4">Monitor mentions, comments, and messages across all platforms in one place.</p>
            <p className="mb-6 text-sm text-gray-500">Never miss an important comment or customer query again.</p>
            {isAuthenticated ? (
              <Button asChild className="w-full">
                <Link to="/dashboard/analytics">View Analytics</Link>
              </Button>
            ) : (
              <Button asChild className="w-full">
                <Link to="/auth?redirect=/dashboard/analytics">Sign In to Track</Link>
              </Button>
            )}
          </CardContent>
        </Card>
      </div>
      
      <div className="mt-12">
        <h2 className="text-2xl font-bold mb-4">How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="flex flex-col items-center text-center">
            <div className="bg-blue-100 text-blue-700 rounded-full p-4 mb-4">
              <span className="text-xl font-bold">1</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Connect Your Accounts</h3>
            <p className="text-gray-600">Securely link your social media accounts with just a few clicks.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-purple-100 text-purple-700 rounded-full p-4 mb-4">
              <span className="text-xl font-bold">2</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Create & Schedule Content</h3>
            <p className="text-gray-600">Write once and publish to multiple platforms with customized scheduling.</p>
          </div>
          
          <div className="flex flex-col items-center text-center">
            <div className="bg-green-100 text-green-700 rounded-full p-4 mb-4">
              <span className="text-xl font-bold">3</span>
            </div>
            <h3 className="text-lg font-medium mb-2">Track Performance</h3>
            <p className="text-gray-600">Analyze engagement metrics and optimize your social media strategy.</p>
          </div>
        </div>
      </div>
      
      <div className="mt-12 text-center">
        <h2 className="text-2xl font-bold mb-4">Ready to Simplify Your Social Media Management?</h2>
        {isAuthenticated ? (
          <Button asChild size="lg" className="mt-4">
            <Link to="/dashboard/social">Get Started Now</Link>
          </Button>
        ) : (
          <Button asChild size="lg" className="mt-4">
            <Link to="/auth?redirect=/dashboard">Sign Up Free</Link>
          </Button>
        )}
      </div>
    </div>
  );
};

export default SocialSharing;
