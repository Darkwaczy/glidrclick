
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const AutoPosting = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold">Automated Content Publishing</h1>
              <p className="text-xl text-gray-700">
                Schedule and automatically post content to your blog on the perfect day and time
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div className="order-2 md:order-1 bg-gray-100 rounded-lg shadow-inner p-8">
                <div className="bg-white shadow-md rounded-md overflow-hidden">
                  <div className="bg-gray-50 p-4 border-b border-gray-200">
                    <h3 className="font-medium">Content Calendar</h3>
                  </div>
                  <div className="p-4">
                    <div className="grid grid-cols-7 gap-1 text-center text-xs mb-2">
                      {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
                        <div key={day} className="text-gray-500">{day}</div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-1">
                      {Array.from({ length: 30 }, (_, i) => i + 1).map(day => (
                        <div
                          key={day}
                          className={`aspect-square rounded-md flex items-center justify-center text-sm
                            ${[3, 8, 15, 22, 27].includes(day) ? 'bg-glidr-purple/20 border border-glidr-purple/40' : 
                              day === 18 ? 'bg-glidr-bright-purple/20 border border-glidr-bright-purple/40' : 
                              'bg-gray-50'}
                          `}
                        >
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="mt-4 space-y-2">
                      <div className="flex items-center">
                        <span className="w-3 h-3 bg-glidr-purple/20 border border-glidr-purple/40 rounded mr-2"></span>
                        <span className="text-xs">Blog posts</span>
                      </div>
                      <div className="flex items-center">
                        <span className="w-3 h-3 bg-glidr-bright-purple/20 border border-glidr-bright-purple/40 rounded mr-2"></span>
                        <span className="text-xs">Social media posts</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <div className="order-1 md:order-2">
                <h2 className="text-2xl font-bold mb-4">Set It and Forget It</h2>
                <p className="text-gray-700 mb-6">
                  Once you've configured your preferences, Glidrclick takes care of your entire 
                  content publishing workflow - from content creation to scheduling and posting.
                </p>
                <ul className="space-y-3">
                  {[
                    "Schedule posts weeks or months in advance",
                    "Smart timing based on audience analytics",
                    "WordPress integration with one click",
                    "Custom posting frequency for each channel",
                    "Automatically generate featured images"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-glidr-purple mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-bold mb-6">How Auto-Posting Works</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: "1",
                    title: "Connect Your Blog",
                    description: "Securely connect your WordPress blog in just a few clicks."
                  },
                  {
                    step: "2", 
                    title: "Set Your Schedule",
                    description: "Choose your ideal posting frequency and publishing times."
                  },
                  {
                    step: "3",
                    title: "Let It Run",
                    description: "Content is automatically published according to your schedule."
                  }
                ].map((item) => (
                  <div key={item.step} className="bg-gray-50 rounded-lg p-6 border border-gray-100 relative">
                    <div className="absolute -top-4 -left-4 w-8 h-8 rounded-full bg-glidr-purple text-white flex items-center justify-center font-bold">
                      {item.step}
                    </div>
                    <h3 className="text-xl font-bold mb-2">{item.title}</h3>
                    <p className="text-gray-700">{item.description}</p>
                  </div>
                ))}
              </div>
            </div>
            
            <div className="bg-gradient-to-r from-glidr-purple/10 to-glidr-bright-purple/10 rounded-xl p-8 text-center">
              <h2 className="text-2xl font-bold mb-4">Never worry about content scheduling again</h2>
              <p className="text-lg mb-6">Join thousands of bloggers saving 10+ hours per week with Glidrclick</p>
              <Button className="gradient-button text-white rounded-full px-8 py-6 text-lg">
                Try Free for 7 Days <ArrowRight className="ml-2" size={18} />
              </Button>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default AutoPosting;
