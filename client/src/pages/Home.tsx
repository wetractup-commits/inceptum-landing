import Header from "@/components/Header";
import HeroSection from "@/components/HeroSection";
import SolutionsSlider from "@/components/SolutionsSlider";
import FeaturesGrid from "@/components/FeaturesGrid";
import HowItWorks from "@/components/HowItWorks";
import WhyChooseUs from "@/components/WhyChooseUs";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white via-white to-white/95">
      <Header />
      <HeroSection />
      <SolutionsSlider />
      <FeaturesGrid />
      <HowItWorks />
      <WhyChooseUs />
      <FAQ />
      <Footer />
    </div>
  );
}
