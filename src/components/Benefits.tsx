
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Clock, TrendingUp, Users, Zap, DollarSign, Target } from "lucide-react";

const Benefits = () => {
  const benefits = [
    {
      icon: Clock,
      title: "Save 15+ Hours Weekly",
      description: "Automate your content creation and posting schedule, freeing up time for strategic work",
      metric: "90% time reduction"
    },
    {
      icon: TrendingUp,
      title: "300% Engagement Boost",
      description: "AI-optimized content performs better, driving more likes, shares, and comments",
      metric: "Average increase"
    },
    {
      icon: Users,
      title: "Grow Your Audience",
      description: "Consistent, quality content helps you attract and retain more followers",
      metric: "2x faster growth"
    },
    {
      icon: DollarSign,
      title: "Reduce Marketing Costs",
      description: "Replace expensive agencies and freelancers with our AI-powered solution",
      metric: "Up to 80% savings"
    },
    {
      icon: Zap,
      title: "Instant Content Creation",
      description: "Generate blog posts, social media content, and captions in seconds",
      metric: "10x faster output"
    },
    {
      icon: Target,
      title: "Better ROI",
      description: "Track performance and optimize your content strategy with detailed analytics",
      metric: "250% ROI increase"
    }
  ];

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ocean-deep">
            Measurable Results for Your Business
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Don't just take our word for it. Here are the real benefits our customers experience
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {benefits.map((benefit, index) => (
            <Card key={index} className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-ocean-foam/20 animate-ocean-glow">
              <CardContent className="p-8 text-center">
                <div className="bg-gradient-to-br from-ocean-primary to-ocean-accent rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:scale-110 transition-transform duration-300">
                  <benefit.icon className="text-white" size={32} />
                </div>
                
                <h3 className="text-xl font-bold mb-3 text-ocean-deep">{benefit.title}</h3>
                <p className="text-gray-600 mb-4 leading-relaxed">{benefit.description}</p>
                
                <div className="gradient-text font-bold text-lg">
                  {benefit.metric}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-16 bg-gradient-to-r from-ocean-primary to-ocean-secondary rounded-2xl p-8 text-white text-center">
          <h3 className="text-2xl font-bold mb-4">Ready to See These Results?</h3>
          <p className="text-lg mb-6 opacity-90">
            Join thousands of businesses already experiencing these benefits with FlowCraft
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <div className="text-sm opacity-75">⭐⭐⭐⭐⭐ Rated 4.9/5 by 2,000+ users</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Benefits;
