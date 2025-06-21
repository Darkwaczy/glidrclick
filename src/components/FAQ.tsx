
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How does the AI generate content?",
    answer:
      "Our AI uses advanced natural language processing to create high-quality, SEO-optimized blog posts based on your niche, tone preferences, and keywords. It analyzes trending topics, researches information, and produces original, engaging content that sounds human-written."
  },
  {
    question: "Can I edit posts before they go live?",
    answer:
      "Absolutely! While FlowCraft can fully automate your content, you can set your preference to review posts before publishing. From your dashboard, you can edit, approve, or request a regeneration of any AI-created content."
  },
  {
    question: "Which social platforms are supported?",
    answer:
      "FlowCraft currently supports automatic posting to WordPress blogs, Facebook, Twitter, Instagram, and LinkedIn. We're constantly adding more platforms based on user feedback and demand."
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Yes! We offer a 7-day free trial with full access to all features. After your trial period, if you're not completely satisfied with our service, we offer a 30-day money-back guarantee, no questions asked."
  }
];

const FAQ = () => {
  return (
    <section className="py-24 relative" id="faq">
      {/* Background */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 right-1/4 w-96 h-96 bg-gradient-to-r from-neon-orange/8 to-transparent rounded-full blur-3xl"></div>
        <div className="absolute bottom-1/4 left-1/4 w-96 h-96 bg-gradient-to-r from-neon-electric/8 to-transparent rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-6xl font-bold mb-6">
            <span className="text-white">Frequently Asked </span>
            <span className="gradient-text">Questions</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto leading-relaxed">
            Get answers to the most common questions about 
            <span className="neon-text font-semibold"> FlowCraft</span>.
          </p>
        </div>
        
        <div className="max-w-4xl mx-auto">
          <Accordion type="single" collapsible className="space-y-6">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="glass-card border-white/20 rounded-2xl overflow-hidden hover:border-white/40 transition-all duration-300"
              >
                <AccordionTrigger className="px-8 py-6 hover:no-underline text-white hover:text-neon-electric transition-colors">
                  <span className="text-left font-semibold text-lg">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-8 pb-6 pt-2 text-gray-300 leading-relaxed">
                  {item.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  );
};

export default FAQ;
