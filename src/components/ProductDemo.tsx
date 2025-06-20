
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Play, ArrowRight } from "lucide-react";

const ProductDemo = () => {
  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            See Glidrclick in Action
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Watch how easy it is to create, schedule, and publish content across all your platforms
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <Card className="overflow-hidden shadow-2xl">
            <CardContent className="p-0">
              <div className="relative bg-gradient-to-br from-[#9b87f5] to-[#7E69AB] aspect-video flex items-center justify-center">
                <div className="text-center text-white">
                  <Button
                    size="lg"
                    variant="outline"
                    className="bg-white/10 border-white/30 text-white hover:bg-white/20 backdrop-blur-sm mb-4"
                  >
                    <Play size={24} className="mr-2" />
                    Watch Demo (2:30)
                  </Button>
                  <p className="text-lg opacity-90">See how it works in under 3 minutes</p>
                </div>
              </div>
            </CardContent>
          </Card>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12">
            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="bg-[#9b87f5] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">1</span>
              </div>
              <h3 className="font-semibold mb-2">Connect Your Accounts</h3>
              <p className="text-gray-600 text-sm">Link your blog and social media platforms in seconds</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="bg-[#9b87f5] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">2</span>
              </div>
              <h3 className="font-semibold mb-2">AI Creates Content</h3>
              <p className="text-gray-600 text-sm">Our AI generates engaging, on-brand content automatically</p>
            </Card>

            <Card className="text-center p-6 hover:shadow-lg transition-shadow">
              <div className="bg-[#9b87f5] rounded-full w-12 h-12 flex items-center justify-center mx-auto mb-4">
                <span className="text-white font-bold">3</span>
              </div>
              <h3 className="font-semibold mb-2">Auto-Publish & Grow</h3>
              <p className="text-gray-600 text-sm">Content gets published automatically while you focus on your business</p>
            </Card>
          </div>

          <div className="text-center mt-8">
            <Button className="gradient-button">
              Start Your Free Trial
              <ArrowRight size={16} className="ml-2" />
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProductDemo;
