
import React from "react";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import TypeAnimation from "@/components/TypeAnimation";

const Hero = () => {
  return (
    <div className="relative min-h-screen flex items-center justify-center bg-[#f1f0fd]">
      {/* Background pattern with floating circles */}
      <div className="absolute inset-0 overflow-hidden z-0">
        <div className="absolute w-full h-full">
          {/* Decorative circles */}
          <div className="absolute top-1/4 left-1/5 w-16 h-16 bg-[#e5deff] rounded-full opacity-70"></div>
          <div className="absolute top-1/2 right-1/4 w-24 h-24 bg-[#e5deff] rounded-full opacity-70"></div>
          <div className="absolute bottom-1/4 left-1/3 w-20 h-20 bg-[#e5deff] rounded-full opacity-70"></div>
          <div className="absolute top-1/3 right-1/5 w-12 h-12 bg-[#e5deff] rounded-full opacity-70"></div>
          <div className="absolute bottom-1/3 left-1/4 w-28 h-28 bg-[#e5deff] rounded-full opacity-60"></div>
          <div className="absolute top-20 left-1/2 w-14 h-14 bg-[#e5deff] rounded-full opacity-60"></div>
          <div className="absolute bottom-1/5 right-1/3 w-20 h-20 bg-[#e5deff] rounded-full opacity-50"></div>
          <div className="absolute top-2/5 left-1/6 w-16 h-16 bg-[#e5deff] rounded-full opacity-40"></div>
          <div className="absolute bottom-2/5 right-1/6 w-24 h-24 bg-[#e5deff] rounded-full opacity-30"></div>
        </div>
      </div>
      
      <div className="container mx-auto px-4 relative z-10 text-center pt-16">
        <h1 className="text-4xl md:text-6xl font-bold mb-6">
          <span className="text-black">Automate Your Blog in </span>
          <span className="text-[#9b87f5]">One Click</span>
        </h1>
        
        <p className="text-xl text-gray-700 mb-12 max-w-2xl mx-auto">
          Let Glidrclick write and post high-quality content daily — straight to
          your blog and social media.
        </p>
        
        <div className="flex flex-col md:flex-row gap-4 justify-center">
          <Button size="lg" className="bg-[#9b87f5] hover:bg-[#7E69AB] text-white px-8 py-6 text-lg rounded-full">
            Try Free for 7 Days
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="border-[#9b87f5] text-[#9b87f5] hover:bg-[#e5deff] px-8 py-6 text-lg rounded-full"
          >
            <Play size={18} className="mr-1" /> Watch Demo
          </Button>
        </div>
        
        <div className="mt-12">
          <TypeAnimation texts={[
            "Ideate. Create. Share. Engage.",
            "Write. Schedule. Share. Succeed.",
            "Plan. Write. Post. Repeat."
          ]} />
        </div>
      </div>
    </div>
  );
};

export default Hero;
