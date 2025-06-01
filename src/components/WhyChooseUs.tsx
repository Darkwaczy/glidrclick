
import { Card, CardContent } from '@/components/ui/card';
import { Zap, Shield, Users, Clock, TrendingUp, Award } from 'lucide-react';

const features = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description: 'Generate high-quality content in seconds, not hours',
    color: 'text-yellow-500',
    bgColor: 'bg-yellow-50',
    gradient: 'from-yellow-100 to-yellow-50'
  },
  {
    icon: Shield,
    title: 'Enterprise Security',
    description: 'Bank-level encryption and GDPR compliance built-in',
    color: 'text-blue-500',
    bgColor: 'bg-blue-50',
    gradient: 'from-blue-100 to-blue-50'
  },
  {
    icon: Users,
    title: 'Team Collaboration',
    description: 'Built for teams with role-based access and approval workflows',
    color: 'text-purple-500',
    bgColor: 'bg-purple-50',
    gradient: 'from-purple-100 to-purple-50'
  },
  {
    icon: Clock,
    title: 'Smart Scheduling',
    description: 'AI-optimized posting times for maximum engagement',
    color: 'text-green-500',
    bgColor: 'bg-green-50',
    gradient: 'from-green-100 to-green-50'
  },
  {
    icon: TrendingUp,
    title: 'Analytics & Insights',
    description: 'Real-time performance tracking and optimization suggestions',
    color: 'text-red-500',
    bgColor: 'bg-red-50',
    gradient: 'from-red-100 to-red-50'
  },
  {
    icon: Award,
    title: 'Premium Support',
    description: '24/7 expert support and dedicated account management',
    color: 'text-indigo-500',
    bgColor: 'bg-indigo-50',
    gradient: 'from-indigo-100 to-indigo-50'
  }
];

const WhyChooseUs = () => {
  return (
    <section className="py-20 bg-white" id="features">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Why Choose <span className="gradient-text">Glidrclick</span>?
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to transform your content creation process
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className={`group hover:shadow-xl transition-all duration-500 hover:scale-105 hover:-translate-y-2 animate-fade-in-up bg-gradient-to-br ${feature.gradient} border-0 overflow-hidden`}
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <CardContent className="p-8 relative">
                {/* Decorative element */}
                <div className="absolute top-0 right-0 w-20 h-20 bg-white/20 rounded-full -translate-y-10 translate-x-10 group-hover:scale-150 transition-transform duration-500"></div>
                
                {/* Icon */}
                <div className={`w-16 h-16 ${feature.bgColor} rounded-2xl flex items-center justify-center mb-6 group-hover:rotate-12 group-hover:scale-110 transition-all duration-300`}>
                  <feature.icon className={`w-8 h-8 ${feature.color}`} />
                </div>
                
                {/* Content */}
                <h3 className="text-xl font-bold mb-3 text-gray-800 group-hover:text-gray-900 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 group-hover:text-gray-700 transition-colors leading-relaxed">
                  {feature.description}
                </p>

                {/* Hover glow effect */}
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Bottom stats */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-4 gap-8 text-center">
          <div className="animate-fade-in-up" style={{ animationDelay: '0.8s' }}>
            <div className="text-3xl font-bold gradient-text mb-2">98%</div>
            <div className="text-gray-600">Customer Satisfaction</div>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '0.9s' }}>
            <div className="text-3xl font-bold gradient-text mb-2">50+</div>
            <div className="text-gray-600">Integrations</div>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '1.0s' }}>
            <div className="text-3xl font-bold gradient-text mb-2">24/7</div>
            <div className="text-gray-600">Expert Support</div>
          </div>
          <div className="animate-fade-in-up" style={{ animationDelay: '1.1s' }}>
            <div className="text-3xl font-bold gradient-text mb-2">99.9%</div>
            <div className="text-gray-600">Uptime Guarantee</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseUs;
