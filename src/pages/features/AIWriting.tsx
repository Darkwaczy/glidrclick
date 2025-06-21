
import React from 'react';
import { Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { PenTool, Zap, Target, Users } from 'lucide-react';
import { useAuthContext } from '@/context/AuthContext';
import Header from '@/components/Header';
import Footer from '@/components/Footer';

const AIWriting: React.FC = () => {
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
              AI-Powered <span className="gradient-text">Content Writing</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-8">
              Create high-quality, engaging content in seconds with our advanced AI writing assistant. 
              From blog posts to social media captions, let AI handle your content creation.
            </p>
            {isAuthenticated ? (
              <Button asChild size="lg" className="btn-neon">
                <Link to="/dashboard/content">Start Writing</Link>
              </Button>
            ) : (
              <Button asChild size="lg" className="btn-neon">
                <Link to="/auth?redirect=/dashboard/content">Try AI Writing</Link>
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
                    <PenTool className="text-white" size={24} />
                  </div>
                  <CardTitle className="text-white">Smart Content Generation</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300">Generate blog posts, articles, and social media content with advanced AI that understands your brand voice.</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/20 hover:border-neon-electric/50 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Zap className="text-white" size={24} />
                  </div>
                  <CardTitle className="text-white">Lightning Fast</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300">Create content in seconds, not hours. Our AI processes your requirements instantly for immediate results.</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/20 hover:border-neon-electric/50 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Target className="text-white" size={24} />
                  </div>
                  <CardTitle className="text-white">SEO Optimized</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300">All content is automatically optimized for search engines to help your content rank higher and reach more people.</p>
                </CardContent>
              </Card>

              <Card className="glass-card border-white/20 hover:border-neon-electric/50 transition-all duration-300">
                <CardHeader className="text-center">
                  <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                    <Users className="text-white" size={24} />
                  </div>
                  <CardTitle className="text-white">Multiple Formats</CardTitle>
                </CardHeader>
                <CardContent className="text-center">
                  <p className="text-gray-300">Create blog posts, social media content, product descriptions, emails, and more with one powerful tool.</p>
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
            <h2 className="text-3xl font-bold text-center mb-12 text-white">How AI Writing Works</h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              <div className="text-center">
                <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">1</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Describe Your Content</h3>
                <p className="text-gray-300">Tell our AI what you want to write about, your target audience, and the tone you prefer.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">2</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">AI Generates Content</h3>
                <p className="text-gray-300">Our advanced AI processes your requirements and creates high-quality, original content in seconds.</p>
              </div>
              
              <div className="text-center">
                <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                  <span className="text-white font-bold">3</span>
                </div>
                <h3 className="text-xl font-semibold mb-4 text-white">Edit & Publish</h3>
                <p className="text-gray-300">Review, edit if needed, and publish directly to your blog or social media platforms.</p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Transform Your Content Creation?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of content creators who use FlowCraft AI to produce amazing content faster than ever.
            </p>
            {isAuthenticated ? (
              <Button asChild size="lg" className="btn-neon">
                <Link to="/dashboard/content">Start Creating Content</Link>
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

export default AIWriting;
