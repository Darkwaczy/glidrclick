
import { Card, CardContent } from '@/components/ui/card';
import { User, Settings, Bot, ArrowRight } from 'lucide-react';

const steps = [
  {
    icon: User,
    number: "01",
    title: 'Connect & Login',
    description: 'Sign up and connect your social media accounts and blog platforms in seconds.',
    color: 'neon-electric'
  },
  {
    icon: Settings,
    number: "02", 
    title: 'Configure Your Brand',
    description: 'Set your niche, tone, keywords, and content preferences. Our AI learns your style.',
    color: 'neon-pink'
  },
  {
    icon: Bot,
    number: "03",
    title: 'AI Takes Over',
    description: 'Sit back while our AI creates, schedules, and publishes engaging content automatically.',
    color: 'neon-lime'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-24 relative bg-dark-primary" id="how-it-works">
      {/* Background Elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-neon-electric/10 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-neon-pink/10 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">How It </span>
            <span className="gradient-text">Works</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get your content automation running in three simple steps. 
            <span className="neon-text font-semibold"> No coding. No complexity.</span>
          </p>
        </div>
        
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 relative">
            {/* Connection Lines */}
            <div className="hidden lg:block absolute top-1/2 left-1/3 right-1/3 h-px bg-gradient-to-r from-transparent via-neon-electric/50 to-transparent transform -translate-y-1/2"></div>
            
            {steps.map((step, index) => (
              <div key={index} className="relative group">
                {/* Step Number */}
                <div className="text-center mb-8">
                  <div className={`inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-r from-${step.color}/20 to-${step.color}/10 border-2 border-${step.color}/50 text-2xl font-bold text-${step.color} mb-4`}>
                    {step.number}
                  </div>
                </div>

                <Card className="glass-card hover:bg-white/15 transition-all duration-500 group-hover:scale-105 h-full border-white/20 hover:border-white/40 bg-dark-secondary/50">
                  <CardContent className="p-8 text-center h-full flex flex-col">
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-r from-${step.color}/20 to-${step.color}/10 border border-${step.color}/30 mx-auto mb-6 group-hover:animate-neon-glow transition-all duration-300`}>
                      <step.icon className={`text-${step.color} group-hover:scale-110 transition-transform`} size={36} />
                    </div>
                    
                    <h3 className="text-2xl font-bold mb-4 text-white group-hover:text-white transition-colors">
                      {step.title}
                    </h3>
                    
                    <p className="text-gray-300 leading-relaxed flex-grow">
                      {step.description}
                    </p>

                    {index < steps.length - 1 && (
                      <div className="mt-6 lg:hidden flex justify-center">
                        <ArrowRight className="text-neon-electric/50" size={24} />
                      </div>
                    )}
                  </CardContent>
                </Card>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-20">
          <div className="glass-card p-8 max-w-2xl mx-auto border-white/20 bg-dark-secondary/50">
            <h3 className="text-2xl font-bold mb-4 text-white">
              Ready to <span className="neon-text">Automate</span> Your Content?
            </h3>
            <p className="text-gray-300 mb-6">
              Join thousands of creators who've already revolutionized their content strategy.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm text-gray-400">
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-lime rounded-full animate-pulse-neon"></div>
                Setup in 5 minutes
              </span>
              <span>•</span>
              <span className="flex items-center gap-2">
                <div className="w-2 h-2 bg-neon-electric rounded-full animate-pulse-neon"></div>
                Works with 10+ platforms
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
