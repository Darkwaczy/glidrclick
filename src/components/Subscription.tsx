
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    number: '1',
    title: 'Connect Blog',
    description: 'WordPress API integration.',
    icon: '🔗'
  },
  {
    number: '2',
    title: 'Set Preferences',
    description: 'Choose categories, tone, schedule.',
    icon: '⚙️'
  },
  {
    number: '3',
    title: 'AI Generates Content',
    description: 'Fully automated writing & images.',
    icon: '✍️'
  },
  {
    number: '4',
    title: 'Auto-Post',
    description: 'Scheduled publishing to blog & social media.',
    icon: '📱'
  }
];

const Subscription = () => {
  return (
    <section className="py-24 relative" id="subscription">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/3 left-1/4 w-96 h-96 bg-gradient-to-r from-neon-lime/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/3 right-1/4 w-96 h-96 bg-gradient-to-r from-neon-purple/8 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-20">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">What Happens After You </span>
            <span className="gradient-text">Subscribe?</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Our AI-powered system takes care of everything for you, from 
            <span className="neon-text font-semibold"> content creation to publishing</span>.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="group animate-slide-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <Card className="glass-card border-white/20 hover:border-white/40 transition-all duration-500 hover:scale-105 h-full group-hover:animate-neon-glow">
                <CardContent className="p-8 text-center">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-4xl filter drop-shadow-lg">{step.icon}</span>
                    <span className="w-10 h-10 rounded-full bg-gradient-to-r from-neon-electric to-neon-pink text-white flex items-center justify-center font-bold text-lg shadow-lg">
                      {step.number}
                    </span>
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{step.title}</h3>
                  <p className="text-gray-300 leading-relaxed">{step.description}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Subscription;
