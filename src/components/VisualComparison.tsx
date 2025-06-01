
import { Card, CardContent } from '@/components/ui/card';
import { X, Check, Clock, Users, TrendingUp } from 'lucide-react';

const beforeItems = [
  { icon: Clock, text: "Hours spent writing daily", color: "text-red-500" },
  { icon: X, text: "Inconsistent posting schedule", color: "text-red-500" },
  { icon: X, text: "Limited content ideas", color: "text-red-500" },
  { icon: X, text: "Manual social media posting", color: "text-red-500" },
];

const afterItems = [
  { icon: Check, text: "Automated daily content", color: "text-green-500" },
  { icon: Check, text: "Consistent brand voice", color: "text-green-500" },
  { icon: Check, text: "Multi-platform publishing", color: "text-green-500" },
  { icon: TrendingUp, text: "3x more engagement", color: "text-green-500" },
];

const VisualComparison = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">
            Before vs After <span className="gradient-text">Glidrclick</span>
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            See the transformation from manual content creation to automated excellence
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
          {/* Before Card */}
          <Card className="relative overflow-hidden animate-fade-in-up">
            <div className="absolute top-4 left-4 bg-red-100 text-red-600 px-3 py-1 rounded-full text-sm font-semibold">
              BEFORE
            </div>
            <CardContent className="p-8 pt-16">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Users className="w-10 h-10 text-red-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">Manual Content Creation</h3>
                <p className="text-gray-600">Time-consuming, inconsistent, limited reach</p>
              </div>
              
              <div className="space-y-4">
                {beforeItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: `${index * 0.1}s` }}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-red-50 rounded-lg">
                <div className="text-red-600 font-semibold text-sm">RESULT:</div>
                <div className="text-red-800 font-bold text-lg">5+ hours daily, inconsistent growth</div>
              </div>
            </CardContent>
          </Card>

          {/* After Card */}
          <Card className="relative overflow-hidden animate-fade-in-up border-2 border-green-200 shadow-lg" style={{ animationDelay: '0.2s' }}>
            <div className="absolute top-4 left-4 bg-green-100 text-green-600 px-3 py-1 rounded-full text-sm font-semibold">
              AFTER
            </div>
            <CardContent className="p-8 pt-16">
              <div className="text-center mb-8">
                <div className="w-20 h-20 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                  <TrendingUp className="w-10 h-10 text-green-500" />
                </div>
                <h3 className="text-xl font-semibold text-gray-800 mb-2">AI-Powered Automation</h3>
                <p className="text-gray-600">Effortless, consistent, multi-platform reach</p>
              </div>
              
              <div className="space-y-4">
                {afterItems.map((item, index) => (
                  <div key={index} className="flex items-center gap-3 animate-fade-in-up" style={{ animationDelay: `${(index + 4) * 0.1}s` }}>
                    <item.icon className={`w-5 h-5 ${item.color}`} />
                    <span className="text-gray-700">{item.text}</span>
                  </div>
                ))}
              </div>

              <div className="mt-8 p-4 bg-green-50 rounded-lg">
                <div className="text-green-600 font-semibold text-sm">RESULT:</div>
                <div className="text-green-800 font-bold text-lg">5 minutes setup, exponential growth</div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Stats comparison */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-4xl mx-auto">
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.4s' }}>
            <div className="text-4xl font-bold text-red-500 mb-2">5+ hrs</div>
            <div className="text-gray-600">Daily time spent</div>
            <div className="text-sm text-gray-500">Before Glidrclick</div>
          </div>
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.5s' }}>
            <div className="text-4xl font-bold gradient-text mb-2">→</div>
            <div className="text-gray-600">Transformation</div>
            <div className="text-sm text-gray-500">With AI automation</div>
          </div>
          <div className="text-center animate-fade-in-up" style={{ animationDelay: '0.6s' }}>
            <div className="text-4xl font-bold text-green-500 mb-2">5 min</div>
            <div className="text-gray-600">Daily management</div>
            <div className="text-sm text-gray-500">After Glidrclick</div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VisualComparison;
