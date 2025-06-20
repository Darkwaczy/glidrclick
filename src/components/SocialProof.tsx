
import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { TrendingUp, MessageCircle, Share2, Users2 } from "lucide-react";

const SocialProof = () => {
  const activities = [
    {
      user: "Sarah M.",
      company: "Tech Startup",
      action: "generated 50 blog posts",
      time: "2 hours ago",
      metric: "+300% engagement"
    },
    {
      user: "Mike R.",
      company: "E-commerce",
      action: "automated Instagram posts",
      time: "5 hours ago",
      metric: "15k new followers"
    },
    {
      user: "Jessica L.",
      company: "Consulting Firm",
      action: "scheduled 2 weeks of content",
      time: "1 day ago",
      metric: "2x conversion rate"
    },
    {
      user: "David K.",
      company: "Restaurant Chain",
      action: "created viral TikTok content",
      time: "2 days ago",
      metric: "1M+ views"
    }
  ];

  const stats = [
    {
      icon: TrendingUp,
      number: "2.5M+",
      label: "Posts Generated",
      color: "text-green-600"
    },
    {
      icon: MessageCircle,
      number: "150k+",
      label: "Conversations Started",
      color: "text-blue-600"
    },
    {
      icon: Share2,
      number: "5M+",
      label: "Social Shares",
      color: "text-purple-600"
    },
    {
      icon: Users2,
      number: "10k+",
      label: "Active Users",
      color: "text-orange-600"
    }
  ];

  return (
    <section className="py-16 bg-gradient-to-b from-white to-gray-50">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real Results, Real People
          </h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            See what our community is achieving with Glidrclick right now
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Live Activity Feed */}
          <div>
            <h3 className="text-2xl font-semibold mb-6 flex items-center">
              <div className="w-3 h-3 bg-green-500 rounded-full mr-3 animate-pulse"></div>
              Live Activity
            </h3>
            
            <div className="space-y-4">
              {activities.map((activity, index) => (
                <Card key={index} className="hover:shadow-md transition-shadow">
                  <CardContent className="p-4">
                    <div className="flex justify-between items-start">
                      <div className="flex-1">
                        <div className="flex items-center mb-2">
                          <div className="w-8 h-8 bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] rounded-full flex items-center justify-center text-white text-sm font-bold mr-3">
                            {activity.user.charAt(0)}
                          </div>
                          <div>
                            <span className="font-semibold">{activity.user}</span>
                            <span className="text-gray-600 text-sm ml-2">from {activity.company}</span>
                          </div>
                        </div>
                        <p className="text-gray-700 mb-1">{activity.action}</p>
                        <div className="flex justify-between items-center">
                          <span className="text-gray-500 text-sm">{activity.time}</span>
                          <span className="text-[#9b87f5] font-semibold text-sm">{activity.metric}</span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>

          {/* Community Stats */}
          <div>
            <h3 className="text-2xl font-semibold mb-6">Community Impact</h3>
            
            <div className="grid grid-cols-2 gap-4 mb-8">
              {stats.map((stat, index) => (
                <Card key={index} className="text-center p-6 hover:shadow-lg transition-shadow">
                  <stat.icon className={`mx-auto mb-3 ${stat.color}`} size={32} />
                  <div className="text-2xl font-bold mb-1">{stat.number}</div>
                  <div className="text-gray-600 text-sm">{stat.label}</div>
                </Card>
              ))}
            </div>

            <Card className="bg-gradient-to-r from-[#9b87f5] to-[#7E69AB] text-white p-6">
              <div className="text-center">
                <h4 className="text-xl font-semibold mb-2">Join the Movement</h4>
                <p className="mb-4 opacity-90">
                  Be part of the content revolution that's changing how businesses engage online
                </p>
                <div className="flex justify-center space-x-4 text-sm opacity-75">
                  <span>✓ No setup fees</span>
                  <span>✓ Cancel anytime</span>
                  <span>✓ 7-day free trial</span>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
};

export default SocialProof;
