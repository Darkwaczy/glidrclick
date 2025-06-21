
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Calendar, Clock, RefreshCw, BarChart3 } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AutoPosting: React.FC = () => {
  const { isAuthenticated } = useAuthContext();
  
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
              Automated <span className="gradient-text">Content Publishing</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Set it and forget it! Schedule your content across all platforms and let FlowCraft 
              automatically publish at the optimal times for maximum engagement.
            </p>
            {isAuthenticated ? (
              <Button asChild size="lg" className="btn-neon">
                <Link to="/dashboard/schedule">Set Up Auto-Posting</Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="btn-neon">
                <Link to="/auth?redirect=/dashboard/schedule">Try Auto-Posting</Link>
              </Button>
            )}
          </div>
        </section>

        {/* Features Grid */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <Card className="glass-card border-white/20 hover:border-neon-electric/50 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Calendar className="text-white" size={24} />
                  </div>
                  <CardTitle className="text-white">Smart Scheduling</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300">AI analyzes your audience behavior to schedule posts at the most effective times for engagement.</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/20 hover:border-neon-electric/50 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <RefreshCw className="text-white" size={24} />
                  </div>
                  <CardTitle className="text-white">Cross-Platform Publishing</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300">Publish to multiple social media platforms and your blog simultaneously with customized formatting.</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/20 hover:border-neon-electric/50 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Clock className="text-white" size={24} />
                  </div>
                  <CardTitle className="text-white">24/7 Automation</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300">Your content gets published automatically, even when you're sleeping. Never miss a posting opportunity.</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/20 hover:border-neon-electric/50 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <BarChart3 className="text-white" size={24} />
                  </div>
                  <CardTitle className="text-white">Performance Tracking</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300">Monitor how your automated posts perform and get insights to optimize your posting strategy.</p>
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
            <h2 className="text-3xl font-bold text-center mb-12 text-white">How Auto-Posting Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Create Content Queue</h3>
                <p className="text-gray-300">Add your content to the queue or let AI generate content automatically based on your preferences.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Set Posting Schedule</h3>
                <p className="text-gray-300">Configure when and where you want your content published. AI suggests optimal posting times.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Sit Back & Relax</h3>
                <p className="text-gray-300">FlowCraft automatically publishes your content at the scheduled times across all your platforms.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Automate Your Content Strategy?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Save hours every week with intelligent auto-posting that keeps your audience engaged 24/7.
            </p>
            {isAuthenticated ? (
              <Button asChild size="lg" className="btn-neon">
                <Link to="/dashboard/schedule">Start Auto-Posting</Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="btn-neon">
                <Link to="/auth?redirect=/dashboard">Get Started Free</Link>
              </Button>
            )}
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default AutoPosting;
