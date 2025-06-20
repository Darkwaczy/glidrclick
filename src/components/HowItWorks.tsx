
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    icon: '🎯',
    title: 'Define Your Strategy',
    description: 'Set your content goals, target audience, and brand voice preferences.'
  },
  {
    icon: '🤖',
    title: 'AI Creates & Optimizes',
    description: 'Our AI generates high-quality, platform-specific content automatically.'
  },
  {
    icon: '🚀',
    title: 'Publish & Analyze',
    description: 'Content goes live across all platforms with real-time performance tracking.'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-ocean-mist" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ocean-deep">How FlowCraft Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Transform your content strategy in three simple steps. No technical expertise required.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <Card className="w-full h-full bg-white hover:shadow-xl transition-all duration-300 rounded-2xl overflow-hidden hover-lift border border-ocean-light">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="text-4xl mb-4 animate-float-gentle">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2 text-ocean-deep">{step.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{step.description}</p>
                  <div className="w-12 h-1 bg-gradient-to-r from-ocean-primary to-ocean-bright rounded-full mt-4"></div>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
