
import React, { useState, useEffect } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Users, Clock, TrendingUp } from 'lucide-react';

const stats = [
  {
    icon: FileText,
    label: 'Posts Generated',
    value: 1234567,
    increment: 15,
    suffix: '',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50'
  },
  {
    icon: Users,
    label: 'Active Users',
    value: 5234,
    increment: 2,
    suffix: '+',
    color: 'text-green-500',
    bgColor: 'bg-green-50'
  },
  {
    icon: Clock,
    label: 'Hours Saved',
    value: 89765,
    increment: 8,
    suffix: '',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50'
  },
  {
    icon: TrendingUp,
    label: 'Success Rate',
    value: 99.7,
    increment: 0.1,
    suffix: '%',
    color: 'text-orange-500',
    bgColor: 'bg-orange-50'
  }
];

const LiveStats = () => {
  const [currentStats, setCurrentStats] = useState(stats.map(stat => ({ ...stat, displayValue: stat.value })));

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentStats(prev => 
        prev.map(stat => ({
          ...stat,
          displayValue: stat.displayValue + stat.increment
        }))
      );
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  const formatNumber = (num) => {
    if (num >= 1000000) {
      return (num / 1000000).toFixed(1) + 'M';
    } else if (num >= 1000) {
      return (num / 1000).toFixed(1) + 'K';
    }
    return num.toLocaleString();
  };

  return (
    <section className="py-20 bg-gradient-to-b from-glidr-soft-gray to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <div className="inline-flex items-center gap-2 bg-green-100 text-green-600 px-4 py-2 rounded-full text-sm font-semibold mb-4 animate-pulse">
            <div className="w-2 h-2 bg-green-500 rounded-full animate-ping"></div>
            LIVE STATS
          </div>
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Real-Time <span className="gradient-text">Impact</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Watch our community grow and see the collective impact we're making together
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {currentStats.map((stat, index) => (
            <Card 
              key={index} 
              className="hover:shadow-lg transition-all duration-300 hover:scale-105 animate-fade-in-up"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-6 text-center">
                <div className={`w-16 h-16 ${stat.bgColor} rounded-full flex items-center justify-center mx-auto mb-4`}>
                  <stat.icon className={`w-8 h-8 ${stat.color}`} />
                </div>
                
                <div className="text-3xl font-bold text-gray-800 mb-2 transition-all duration-300">
                  {stat.suffix === '%' 
                    ? stat.displayValue.toFixed(1) 
                    : formatNumber(Math.floor(stat.displayValue))
                  }{stat.suffix}
                </div>
                
                <div className="text-gray-600 font-medium">{stat.label}</div>
                
                {/* Live indicator */}
                <div className="flex items-center justify-center gap-1 mt-3">
                  <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600 font-medium">Live</span>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Additional insights */}
        <div className="mt-16 text-center">
          <div className="inline-flex flex-wrap justify-center gap-8 text-sm text-gray-600">
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
              <span>+{Math.floor(Math.random() * 20 + 10)} new users in the last hour</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-3 h-3 bg-blue-500 rounded-full animate-pulse"></div>
              <span>+{Math.floor(Math.random() * 100 + 50)} posts generated this minute</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LiveStats;
