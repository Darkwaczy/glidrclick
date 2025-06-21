import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { Calendar, Share2, MessageSquare, RefreshCw } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import { handleOAuthCallback } from '@/utils/social/authentication';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const SocialSharing: React.FC = () => {
  const { isAuthenticated } = useAuthContext();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const [isProcessingOAuth, setIsProcessingOAuth] = useState(false);
  
  useEffect(() => {
    if (searchParams.get('code')) {
      handleOAuthCallback(searchParams.get('code'), navigate);
      setIsProcessingOAuth(true);
    }
  }, [searchParams, navigate]);
  
  if (isProcessingOAuth) {
    return (
      <div className="container max-w-6xl py-8">
        <Card className="glass-card border-white/20">
          <CardHeader>
            <CardTitle className="text-center text-white">Processing Authentication</CardTitle>
          </CardHeader>
          <CardContent className="flex flex-col items-center py-8">
            <RefreshCw className="animate-spin h-12 w-12 mb-4 text-neon-electric" />
            <p className="text-lg text-white">Completing your social media connection...</p>
            <p className="text-sm text-gray-400 mt-2">Please don't close this window.</p>
          </CardContent>
        </Card>
      </div>
    );
  }
  
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-1 pt-20">
        {/* Hero Section */}
        <section className="py-16 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-neon-electric/8 to-transparent rounded-full blur-3xl"></div>
            <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-neon-pink/8 to-transparent rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 text-center relative z-10">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              Social Media <span className="gradient-text">Integration</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Connect all your social media accounts and manage everything from one powerful dashboard. 
              Share, schedule, and engage across all platforms effortlessly.
            </p>
            {isAuthenticated ? (
              <Button asChild size="lg" className="btn-neon">
                <Link to="/dashboard/social">Connect Your Accounts</Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="btn-neon">
                <Link to="/auth?redirect=/dashboard/social">Try Social Sharing</Link>
              </Button>
            )}
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <Card className="glass-card border-white/20 hover:border-neon-electric/50 transition-all duration-300">
                <CardHeader className="bg-gradient-to-br from-blue-500/20 to-blue-700/20 text-white border-b border-white/10">
                  <CardTitle className="flex items-center gap-2">
                    <Share2 size={20} />
                    <span>Unified Social Posting</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="mb-4 text-gray-300">Share your content across multiple platforms simultaneously with a single click.</p>
                  <p className="mb-6 text-sm text-gray-400">Connect your accounts and start posting to Facebook, Twitter, LinkedIn, and more.</p>
                  {isAuthenticated ? (
                    <Button asChild className="w-full btn-neon">
                      <Link to="/dashboard/social">Connect Your Accounts</Link>
                    </Button>
                  ) : (
                    <Button asChild className="w-full btn-neon">
                      <Link to="/auth?redirect=/dashboard/social">Sign In to Connect</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              <Card className="glass-card border-white/20 hover:border-neon-electric/50 transition-all duration-300">
                <CardHeader className="bg-gradient-to-br from-purple-500/20 to-purple-700/20 text-white border-b border-white/10">
                  <CardTitle className="flex items-center gap-2">
                    <Calendar size={20} />
                    <span>Content Scheduling</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="mb-4 text-gray-300">Plan and schedule your content for optimal engagement times across platforms.</p>
                  <p className="mb-6 text-sm text-gray-400">Create a content calendar to maintain consistent presence on all your platforms.</p>
                  {isAuthenticated ? (
                    <Button asChild className="w-full btn-neon">
                      <Link to="/dashboard/schedule">Manage Schedule</Link>
                    </Button>
                  ) : (
                    <Button asChild className="w-full btn-neon">
                      <Link to="/auth?redirect=/dashboard/schedule">Sign In to Schedule</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
              
              <Card className="glass-card border-white/20 hover:border-neon-electric/50 transition-all duration-300">
                <CardHeader className="bg-gradient-to-br from-green-500/20 to-green-700/20 text-white border-b border-white/10">
                  <CardTitle className="flex items-center gap-2">
                    <MessageSquare size={20} />
                    <span>Engagement Tracking</span>
                  </CardTitle>
                </CardHeader>
                <CardContent className="pt-6">
                  <p className="mb-4 text-gray-300">Monitor mentions, comments, and messages across all platforms in one place.</p>
                  <p className="mb-6 text-sm text-gray-400">Never miss an important comment or customer query again.</p>
                  {isAuthenticated ? (
                    <Button asChild className="w-full btn-neon">
                      <Link to="/dashboard/analytics">View Analytics</Link>
                    </Button>
                  ) : (
                    <Button asChild className="w-full btn-neon">
                      <Link to="/auth?redirect=/dashboard/analytics">Sign In to Track</Link>
                    </Button>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
        
        {/* How It Works */}
        <section className="py-16 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-neon-lime/8 to-transparent rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">How It Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Connect Your Accounts</h3>
                <p className="text-gray-300">Securely link your social media accounts with just a few clicks.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Create & Schedule Content</h3>
                <p className="text-gray-300">Write once and publish to multiple platforms with customized scheduling.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Track Performance</h3>
                <p className="text-gray-300">Analyze engagement metrics and optimize your social media strategy.</p>
              </div>
            </div>
          </div>
        </section>
        
        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Simplify Your Social Media Management?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that use FlowCraft to streamline their social media presence.
            </p>
            {isAuthenticated ? (
              <Button asChild size="lg" className="btn-neon">
                <Link to="/dashboard/social">Get Started Now</Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="btn-neon">
                <Link to="/auth?redirect=/dashboard">Sign Up Free</Link>
              </Button>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default SocialSharing;
