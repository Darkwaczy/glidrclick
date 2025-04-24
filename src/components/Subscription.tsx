
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
    <section className="py-20 bg-glidr-soft-gray" id="subscription">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">What Happens After You Subscribe?</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our AI-powered system takes care of everything for you, from content creation to publishing.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-w-6xl mx-auto">
          {steps.map((step, index) => (
            <div 
              key={index} 
              className="animate-fade-in-up"
              style={{ animationDelay: `${0.1 * index}s` }}
            >
              <Card className="h-full rounded-2xl overflow-hidden hover:shadow-lg transition-all duration-300 bg-white border-t-4 hover:border-t-glidr-bright-purple">
                <CardContent className="p-8">
                  <div className="flex justify-between items-center mb-6">
                    <span className="text-3xl">{step.icon}</span>
                    <span className="w-8 h-8 rounded-full bg-gradient-to-r from-glidr-purple to-glidr-bright-purple text-white flex items-center justify-center font-medium">
                      {step.number}
                    </span>
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

export default Subscription;
