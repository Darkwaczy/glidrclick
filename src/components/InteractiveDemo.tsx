
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Play, Wand2, Clock, Share2 } from 'lucide-react';

const demoSteps = [
  {
    title: "Enter Your Topic",
    description: "Type any topic you'd like to create content about",
    icon: Wand2
  },
  {
    title: "AI Generates Content",
    description: "Watch as our AI creates engaging, SEO-optimized content",
    icon: Clock
  },
  {
    title: "Auto-Schedule & Post",
    description: "Content is automatically scheduled and posted across platforms",
    icon: Share2
  }
];

const sampleGenerations = [
  {
    topic: "Sustainable Living Tips",
    content: "🌱 5 Simple Ways to Live More Sustainably Today\n\n1. Switch to reusable water bottles and reduce plastic waste by 1,500 bottles per year...",
    platforms: ["Blog", "Twitter", "LinkedIn"],
    engagement: "94% higher than average"
  },
  {
    topic: "Remote Work Productivity",
    content: "🏠 Boost Your Remote Work Productivity: The Ultimate Guide\n\nWorking from home doesn't have to mean lower productivity. Here are proven strategies...",
    platforms: ["Blog", "Facebook", "Instagram"],
    engagement: "87% higher than average"
  },
  {
    topic: "Digital Marketing Trends",
    content: "📈 2024 Digital Marketing Trends You Can't Ignore\n\nThe digital landscape is evolving rapidly. Stay ahead with these emerging trends...",
    platforms: ["Blog", "Twitter", "LinkedIn"],
    engagement: "91% higher than average"
  }
];

const InteractiveDemo = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [inputTopic, setInputTopic] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [showResult, setShowResult] = useState(false);
  const [selectedSample, setSelectedSample] = useState(0);

  const handleGenerate = () => {
    if (inputTopic.trim()) {
      setIsGenerating(true);
      setCurrentStep(1);
      
      setTimeout(() => {
        setCurrentStep(2);
        setIsGenerating(false);
        setShowResult(true);
      }, 2000);
    }
  };

  const resetDemo = () => {
    setCurrentStep(0);
    setInputTopic('');
    setIsGenerating(false);
    setShowResult(false);
  };

  return (
    <section className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See <span className="gradient-text">Glidrclick</span> in Action
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Try our interactive demo and experience the power of AI-driven content creation
          </p>
        </div>

        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
            {/* Demo Interface */}
            <div className="space-y-6">
              <Card className="overflow-hidden">
                <CardHeader className="bg-gradient-to-r from-glidr-purple to-glidr-bright-purple text-white">
                  <CardTitle className="flex items-center gap-2">
                    <Play className="w-5 h-5" />
                    Live Demo - Content Generator
                  </CardTitle>
                </CardHeader>
                <CardContent className="p-6">
                  {/* Step 1: Input */}
                  <div className={`transition-all duration-300 ${currentStep >= 0 ? 'opacity-100' : 'opacity-50'}`}>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      What would you like to write about?
                    </label>
                    <div className="flex gap-2">
                      <Input
                        placeholder="e.g., Sustainable living tips"
                        value={inputTopic}
                        onChange={(e) => setInputTopic(e.target.value)}
                        className="flex-1"
                        disabled={currentStep > 0}
                      />
                      <Button 
                        onClick={handleGenerate}
                        disabled={!inputTopic.trim() || isGenerating}
                        className="gradient-button text-white"
                      >
                        {isGenerating ? (
                          <Clock className="w-4 h-4 animate-spin" />
                        ) : (
                          <Wand2 className="w-4 h-4" />
                        )}
                      </Button>
                    </div>
                  </div>

                  {/* Step 2: Generating */}
                  {currentStep >= 1 && (
                    <div className="mt-6 p-4 bg-blue-50 rounded-lg animate-fade-in">
                      <div className="flex items-center gap-2 mb-2">
                        <Clock className="w-4 h-4 text-blue-500 animate-spin" />
                        <span className="text-blue-700 font-medium">
                          {isGenerating ? 'Generating content...' : 'Content generated!'}
                        </span>
                      </div>
                      <div className="text-sm text-blue-600">
                        AI is analyzing your topic and creating optimized content for multiple platforms
                      </div>
                    </div>
                  )}

                  {/* Step 3: Result */}
                  {showResult && (
                    <div className="mt-6 space-y-4 animate-fade-in">
                      <div className="p-4 bg-green-50 rounded-lg">
                        <div className="flex items-center gap-2 mb-2">
                          <Share2 className="w-4 h-4 text-green-500" />
                          <span className="text-green-700 font-medium">Ready to publish!</span>
                        </div>
                        <div className="text-sm text-green-600">
                          Content optimized for: Blog, Social Media, SEO
                        </div>
                      </div>
                      
                      <Button onClick={resetDemo} variant="outline" className="w-full">
                        Try Another Topic
                      </Button>
                    </div>
                  )}
                </CardContent>
              </Card>

              {/* Process Steps */}
              <div className="space-y-4">
                {demoSteps.map((step, index) => (
                  <div 
                    key={index}
                    className={`flex items-center gap-4 p-4 rounded-lg transition-all duration-300 ${
                      currentStep >= index 
                        ? 'bg-glidr-soft-purple text-glidr-purple' 
                        : 'bg-gray-50 text-gray-500'
                    }`}
                  >
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${
                      currentStep >= index ? 'bg-glidr-purple text-white' : 'bg-gray-200'
                    }`}>
                      <step.icon className="w-5 h-5" />
                    </div>
                    <div>
                      <div className="font-medium">{step.title}</div>
                      <div className="text-sm opacity-75">{step.description}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Sample Results */}
            <div className="space-y-6">
              <h3 className="text-xl font-bold text-gray-800">Sample Generated Content</h3>
              
              {/* Sample Selector */}
              <div className="flex flex-wrap gap-2">
                {sampleGenerations.map((sample, index) => (
                  <Button
                    key={index}
                    variant={selectedSample === index ? "default" : "outline"}
                    size="sm"
                    onClick={() => setSelectedSample(index)}
                    className={selectedSample === index ? "gradient-button text-white" : ""}
                  >
                    {sample.topic}
                  </Button>
                ))}
              </div>

              {/* Sample Content */}
              <Card className="animate-fade-in">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Generated Content:</h4>
                      <div className="text-gray-600 text-sm leading-relaxed bg-gray-50 p-4 rounded-lg">
                        {sampleGenerations[selectedSample].content}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-800 mb-2">Publishing Platforms:</h4>
                      <div className="flex flex-wrap gap-2">
                        {sampleGenerations[selectedSample].platforms.map((platform, index) => (
                          <Badge key={index} variant="secondary">{platform}</Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div className="p-3 bg-green-50 rounded-lg">
                      <div className="text-green-700 font-medium text-sm">
                        📊 {sampleGenerations[selectedSample].engagement}
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default InteractiveDemo;
