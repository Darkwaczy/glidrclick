
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
        <section className="bg-gradient-to-b from-[#e5deff] to-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-6">
              About <span className="text-[#9b87f5]">Glidrclick</span>
            </h1>
            <p className="text-xl text-gray-700 max-w-3xl mx-auto">
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
              <h2 className="text-3xl font-bold text-center mb-12">Our Story</h2>
              <div className="prose prose-lg mx-auto text-gray-700">
                <p className="text-lg leading-relaxed mb-6">
                  Glidrclick was born from a simple observation: content creation and social media 
                  management were taking up too much time for busy entrepreneurs and marketing teams. 
                  We saw brilliant businesses struggling to maintain consistent online presence while 
                  focusing on what they do best.
                </p>
                <p className="text-lg leading-relaxed mb-6">
                  Our team of developers, marketers, and AI specialists came together to create a 
                  solution that would automate the tedious parts of content marketing while preserving 
                  the authentic voice that makes each brand unique.
                </p>
                <p className="text-lg leading-relaxed">
                  Today, Glidrclick helps thousands of businesses maintain engaging social media 
                  presence, generate high-quality blog content, and connect with their audiences 
                  more effectively than ever before.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Our Values */}
        <section className="py-16 bg-gray-50">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold text-center mb-12">Our Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              <div className="text-center">
                <div className="bg-[#9b87f5] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Users className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Customer First</h3>
                <p className="text-gray-600">
                  Everything we build is designed with our customers' success in mind.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#9b87f5] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Target className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Innovation</h3>
                <p className="text-gray-600">
                  We constantly push the boundaries of what's possible with AI and automation.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#9b87f5] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Award className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Quality</h3>
                <p className="text-gray-600">
                  We never compromise on the quality of content and user experience.
                </p>
              </div>
              <div className="text-center">
                <div className="bg-[#9b87f5] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                  <Heart className="text-white" size={32} />
                </div>
                <h3 className="text-xl font-semibold mb-2">Authenticity</h3>
                <p className="text-gray-600">
                  We help brands maintain their unique voice while scaling their content.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className="py-16">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-3xl font-bold mb-6">Ready to Get Started?</h2>
            <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto">
              Join thousands of businesses that trust Glidrclick to manage their content strategy.
            </p>
            <Link to="/auth">
              <Button size="lg" className="gradient-button">
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
