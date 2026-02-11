import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import PricingSection from "@/components/PricingSection";
import FeaturesGrid from "@/components/FeaturesGrid";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQ from "@/components/FAQ";
import LeadCaptureForm from "@/components/LeadCaptureForm";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-white/95">
      <Header />
      <HeroSection />
      <PricingSection />
      <FeaturesGrid />
      <HowItWorks />
      <WhyChooseUs />
      <FAQ />
      <LeadCaptureForm />
      <Footer />
    </div>
  );
}
