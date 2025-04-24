
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
      "Absolutely! While Glidrclick can fully automate your content, you can set your preference to review posts before publishing. From your dashboard, you can edit, approve, or request a regeneration of any AI-created content."
  },
  {
    question: "Which social platforms are supported?",
    answer:
      "Glidrclick currently supports automatic posting to WordPress blogs, Facebook, Twitter, Instagram, and LinkedIn. We're constantly adding more platforms based on user feedback and demand."
  },
  {
    question: "Is there a money-back guarantee?",
    answer:
      "Yes! We offer a 7-day free trial with full access to all features. After your trial period, if you're not completely satisfied with our service, we offer a 30-day money-back guarantee, no questions asked."
  }
];

const FAQ = () => {
  return (
    <section className="py-20" id="faq">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-3xl md:text-4xl font-bold mb-4">Frequently Asked Questions</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Get answers to the most common questions about Glidrclick.
          </p>
        </div>
        
        <div className="max-w-3xl mx-auto">
          <Accordion type="single" collapsible className="space-y-4">
            {faqItems.map((item, index) => (
              <AccordionItem 
                key={index} 
                value={`item-${index}`}
                className="border border-gray-200 rounded-xl overflow-hidden bg-white"
              >
                <AccordionTrigger className="px-6 py-4 hover:no-underline hover:bg-gray-50">
                  <span className="text-left font-medium">{item.question}</span>
                </AccordionTrigger>
                <AccordionContent className="px-6 pb-4 pt-2 text-gray-600">
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
