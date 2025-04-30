
import React from "react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import TypeAnimation from "./TypeAnimation";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-gradient-to-b from-gray-50 to-gray-100 pt-20">
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute left-1/2 top-0 -translate-x-1/2 w-[200%] h-[200%] bg-[radial-gradient(circle_at_center,rgba(0,128,255,0.15),transparent_35%)]"></div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center max-w-5xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6">
            <span className="gradient-text">Create, Schedule, Share</span>
            <br />Social Content Made Easy
          </h1>
          
          <div className="text-xl md:text-2xl text-gray-600 mb-8 h-20">
            <TypeAnimation texts={[
              "Streamline your content marketing workflow",
              "Schedule posts across multiple platforms",
              "Generate AI-powered content ideas",
              "Analyze performance with detailed metrics"
            ]} />
          </div>
          
          <div className="flex flex-col md:flex-row gap-4 justify-center">
            <Link to="/register">
              <Button size="lg" className="text-lg px-8 py-6">
                Get Started Free
              </Button>
            </Link>
            <Link to="/auth">
              <Button size="lg" variant="outline" className="text-lg px-8 py-6">
                Sign In
              </Button>
            </Link>
          </div>
          
          <div className="mt-12 text-gray-600 flex items-center justify-center">
            <svg viewBox="0 0 24 24" className="h-5 w-5 mr-2 text-green-500" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>No credit card required</span>
            
            <svg viewBox="0 0 24 24" className="h-5 w-5 mx-2 text-green-500 ml-6" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>14-day free trial</span>
            
            <svg viewBox="0 0 24 24" className="h-5 w-5 mx-2 text-green-500 ml-6" fill="none" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
            <span>Cancel anytime</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Hero;
