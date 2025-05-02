
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AIWriting = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold">AI-Powered Content Creation</h1>
              <p className="text-xl text-gray-700">
                Generate high-quality, SEO-optimized blog posts with a single click
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Smart Content Generation</h2>
                <p className="text-gray-700 mb-6">
                  Our advanced AI understands your brand voice, industry context, and audience preferences
                  to create engaging content that resonates with your readers.
                </p>
                <ul className="space-y-3">
                  {[
                    "Human-like writing that passes AI detection",
                    "SEO-optimized for better search rankings",
                    "Customizable tone and style options",
                    "Factually accurate with proper citations",
                    "Multi-language support"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-glidr-purple mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="bg-gray-100 p-8 rounded-lg shadow-inner">
                <div className="bg-white shadow-md rounded-md p-6 border border-gray-200">
                  <div className="flex justify-between items-center mb-4">
                    <div className="flex space-x-1">
                      <div className="w-3 h-3 rounded-full bg-red-500"></div>
                      <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
                      <div className="w-3 h-3 rounded-full bg-green-500"></div>
                    </div>
                    <div className="text-xs text-gray-500">AI Writer</div>
                  </div>
                  <h3 className="text-lg font-bold mb-2">10 Ways to Improve Your Content Strategy</h3>
                  <div className="space-y-3 text-sm text-gray-700">
                    <p>Creating compelling content starts with understanding your audience...</p>
                    <p>First, research your target demographic and identify their pain points...</p>
                    <p className="animate-pulse border-r-2 border-glidr-bright-purple">Second, develop a consistent publishing schedule that keeps readers engaged...|</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-bold mb-6">How It Works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: "1",
                    title: "Define Your Topic",
                    description: "Choose your subject matter, keywords, and content parameters."
                  },
                  {
                    step: "2", 
                    title: "AI Does the Writing",
                    description: "Our AI crafts a complete article with proper structure and SEO optimization."
                  },
                  {
                    step: "3",
                    title: "Review & Publish",
                    description: "Make any final edits and publish directly to your blog with one click."
                  }
                ].map((item) => (
                  <div key={item.step} className="bg-gray-50 rounded-lg p-6 border border-gray-100 relative">
                    <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-glidr-purple text-white flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-glidr-purple/10 to-glidr-bright-purple/10 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Ready to revolutionize your content creation?</h2>
              <p className="text-lg mb-6">Join thousands of bloggers saving 10+ hours per week with Glidrclick</p>
              <Button className="gradient-button text-white rounded-full px-8 py-6 text-lg">
                Try Free for 7 Days <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AIWriting;
