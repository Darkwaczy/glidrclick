
import React from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { Users, Target, Award, Heart } from "lucide-react";

const About = () => {
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
              About <span className="gradient-text">FlowCraft</span>
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              We're on a mission to simplify content creation and social media management 
              for businesses of all sizes. Our AI-powered platform helps you create, 
              schedule, and publish engaging content effortlessly.
            </p>
          </div>
        </section>

        {/* Our Story */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-4xl mx-auto">
              <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Story</h2>
              <div className="glass-card p-8 border-white/20">
                <p className="text-lg leading-relaxed mb-6 text-gray-300">
                  FlowCraft was born from a simple observation: content creation and social media 
                  management were taking up too much time for busy entrepreneurs and marketing teams. 
                  We saw brilliant businesses struggling to maintain consistent online presence while 
                  focusing on what they do best.
                </p>
                <p className="text-lg leading-relaxed mb-6 text-gray-300">
                  Our team of developers, marketers, and AI specialists came together to create a 
                  solution that would automate the tedious parts of content marketing while preserving 
                  the authentic voice that makes each brand unique.
                </p>
                <p className="text-lg leading-relaxed text-gray-300">
                  Today, FlowCraft helps thousands of businesses maintain engaging social media 
                  presence, generate high-quality blog content, and connect with their audiences 
                  more effectively than ever before.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 relative">
          <div className="absolute inset-0 overflow-hidden">
            <div className="absolute top-1/3 right-1/3 w-96 h-96 bg-gradient-to-r from-neon-lime/8 to-transparent rounded-full blur-3xl"></div>
          </div>
          <div className="container mx-auto px-4 relative z-10">
            <h2 className="text-3xl font-bold text-center mb-12 text-white">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="glass-card p-6 text-center border-white/20 hover:border-neon-electric/50 transition-all duration-300">
                <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Customer First</h3>
                <p className="text-gray-300">
                  Everything we build is designed with our customers' success in mind.
                </p>
              </div>
              <div className="glass-card p-6 text-center border-white/20 hover:border-neon-electric/50 transition-all duration-300">
                <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Target className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Innovation</h3>
                <p className="text-gray-300">
                  We constantly push the boundaries of what's possible with AI and automation.
                </p>
              </div>
              <div className="glass-card p-6 text-center border-white/20 hover:border-neon-electric/50 transition-all duration-300">
                <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Quality</h3>
                <p className="text-gray-300">
                  We never compromise on the quality of content and user experience.
                </p>
              </div>
              <div className="glass-card p-6 text-center border-white/20 hover:border-neon-electric/50 transition-all duration-300">
                <div className="bg-gradient-to-r from-neon-electric to-neon-pink rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2 text-white">Authenticity</h3>
                <p className="text-gray-300">
                  We help brands maintain their unique voice while scaling their content.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6 text-white">Ready to Get Started?</h2>
            <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that trust FlowCraft to manage their content strategy.
            </p>
            <Link to="/auth">
              <Button size="lg" className="btn-neon">
                Start Your Free Trial
              </Button>
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default About;
