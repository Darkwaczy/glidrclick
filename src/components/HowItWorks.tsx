
import { Card, CardContent } from '@/components/ui/card';

const steps = [
  {
    icon: '👤',
    title: 'Login',
    description: 'Sign up or log in to your dashboard.'
  },
  {
    icon: '📂',
    title: 'Choose Category',
    description: 'Select blog niche, tone, and keywords.'
  },
  {
    icon: '🤖',
    title: 'Generate & Auto-Post',
    description: 'AI writes, schedules, and posts to your blog & social media.'
  }
];

const HowItWorks = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-white to-glidr-soft-gray" id="how-it-works">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">How It Works</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get your blog automated in three simple steps. No coding required.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="flex flex-col items-center animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <Card className="w-full h-full bg-white hover:shadow-lg transition-shadow duration-300 rounded-2xl overflow-hidden hover:scale-105 transition-transform">
                <CardContent className="p-8 flex flex-col items-center text-center">
                  <div className="text-4xl mb-4 animate-pulse-soft">
                    {step.icon}
                  </div>
                  <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
                  <p className="text-gray-600">{step.description}</p>
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
