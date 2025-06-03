
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import TrustSignals from "@/components/TrustSignals";
import VisualComparison from "@/components/VisualComparison";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import LiveStats from "@/components/LiveStats";
import InteractiveDemo from "@/components/InteractiveDemo";
import TestimonialsCarousel from "@/components/TestimonialsCarousel";
import Pricing from "@/components/Pricing";
import FAQ from "@/components/FAQ";
import StickyCTA from "@/components/StickyCTA";
import Footer from "@/components/Footer";

const Index = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main>
        <Hero />
        <TrustSignals />
        <VisualComparison />
        <HowItWorks />
        <WhyChooseUs />
        <LiveStats />
        <InteractiveDemo />
        <TestimonialsCarousel />
        <Pricing />
        <FAQ />
      </main>
      <Footer />
      <StickyCTA />
    </div>
  );
};

export default Index;
