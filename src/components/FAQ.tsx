
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

const faqItems = [
  {
    question: "How does the AI content generation work?",
    answer:
      "Our advanced AI analyzes your brand voice, audience preferences, and trending topics to create highly engaging, SEO-optimized content. It learns from your past successful posts and adapts to your unique style, ensuring every piece feels authentically yours while maintaining consistent quality."
  },
  {
    question: "Can I review content before it goes live?",
    answer:
      "Absolutely! FlowCraft offers flexible publishing modes. You can set up automatic publishing for hands-off operation, or enable review mode where all content awaits your approval. You can edit, regenerate, or schedule any AI-created content from your dashboard."
  },
  {
    question: "Which platforms does FlowCraft support?",
    answer:
      "FlowCraft seamlessly integrates with all major platforms including WordPress, LinkedIn, Twitter, Instagram, Facebook, TikTok, and YouTube. We're constantly expanding our platform support based on user requests and emerging social networks."
  },
  {
    question: "Is there a satisfaction guarantee?",
    answer:
      "Yes! We offer a comprehensive 14-day free trial with full access to all premium features. After your trial, if you're not completely satisfied with the results, we provide a 30-day money-back guarantee with no questions asked."
  }
];

const FAQ = () => {
  return (
    <section className="py-20 bg-gradient-to-b from-ocean-mist to-white" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-ocean-deep">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get answers to the most common questions about FlowCraft's AI-powered content automation.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-ocean-light rounded-xl overflow-hidden bg-white shadow-lg hover:shadow-xl transition-all duration-300 hover-lift"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-ocean-mist/30 transition-colors">
                  <span className="text-left font-semibold text-ocean-deep">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-600 leading-relaxed">
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
