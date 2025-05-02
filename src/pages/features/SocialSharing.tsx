
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";

const SocialSharing = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="text-center space-y-4">
              <h1 className="text-3xl md:text-5xl font-bold">Social Media Integration</h1>
              <p className="text-xl text-gray-700">
                Automatically share your blog content across all your social media channels
              </p>
            </div>
            
            <div className="grid md:grid-cols-2 gap-12 items-center">
              <div>
                <h2 className="text-2xl font-bold mb-4">Multi-Platform Publishing</h2>
                <p className="text-gray-700 mb-6">
                  Connect once and publish everywhere. Glidrclick formats your content perfectly for each 
                  social platform, maximizing engagement and reach.
                </p>
                <ul className="space-y-3">
                  {[
                    "Facebook, Twitter, LinkedIn, and Instagram support",
                    "Platform-specific content formatting",
                    "Hashtag optimization for each network",
                    "Image resizing for each platform's requirements",
                    "Custom posting schedules per platform"
                  ].map((feature, index) => (
                    <li key={index} className="flex items-start">
                      <span className="text-glidr-purple mr-2">✓</span>
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-4">
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white font-bold text-xs">f</div>
                    <div className="text-sm font-medium">Facebook Post</div>
                  </div>
                  <div className="bg-white shadow-sm rounded-md p-3 text-sm">
                    <p className="mb-3">✨ New blog post: 10 Ways to Improve Your Content Strategy</p>
                    <div className="h-20 bg-gray-200 rounded-md mb-2 flex items-center justify-center text-gray-400 text-xs">Featured Image</div>
                    <p className="text-gray-700 text-xs">Read more at yourblog.com</p>
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-sky-500 flex items-center justify-center text-white font-bold text-xs">t</div>
                    <div className="text-sm font-medium">Twitter Post</div>
                  </div>
                  <div className="bg-white shadow-sm rounded-md p-3 text-sm">
                    <p>Just published: 10 Ways to Improve Your Content Strategy 🚀 Check it out! yourblog.com/content-strategy #ContentMarketing #BloggingTips</p>
                  </div>
                </div>
                
                <div className="bg-gray-100 rounded-lg p-4">
                  <div className="flex items-center space-x-2 mb-3">
                    <div className="w-8 h-8 rounded-full bg-blue-800 flex items-center justify-center text-white font-bold text-xs">in</div>
                    <div className="text-sm font-medium">LinkedIn Post</div>
                  </div>
                  <div className="bg-white shadow-sm rounded-md p-3 text-sm">
                    <p className="mb-3">I just published a new article on improving your content strategy. Here are the key takeaways:</p>
                    <ul className="list-disc pl-5 mb-2 text-xs">
                      <li>Understanding your audience is crucial</li>
                      <li>Consistent publishing improves engagement</li>
                      <li>Quality beats quantity every time</li>
                    </ul>
                    <p className="text-gray-700 text-xs">Read the full article: yourblog.com</p>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-gray-200 pt-12">
              <h2 className="text-2xl font-bold mb-6">Optimize for Each Platform</h2>
              <div className="grid md:grid-cols-3 gap-8">
                {[
                  {
                    step: "1",
                    title: "Connect Accounts",
                    description: "Link your social media profiles with secure OAuth authentication."
                  },
                  {
                    step: "2", 
                    title: "Configure Templates",
                    description: "Set up custom formats and styles for each platform's post."
                  },
                  {
                    step: "3",
                    title: "Automatic Publishing",
                    description: "Your blog content is shared across all networks on schedule."
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
              <h2 className="text-2xl font-bold mb-4">Multiply your content's reach</h2>
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

export default SocialSharing;
