
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import HowItWorks from "@/components/HowItWorks";
import Benefits from "@/components/Benefits";
import Testimonials from "@/components/Testimonials";
import Pricing from "@/components/Pricing";
import Subscription from "@/components/Subscription";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import StickyCTA from "@/components/StickyCTA";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <HowItWorks />
        <Benefits />
        <Testimonials />
        <Pricing />
        <Subscription />
        <FAQ />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default Index;
