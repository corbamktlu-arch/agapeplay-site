import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import HeroSection from "@/components/sections/HeroSection";
import WhySection from "@/components/sections/WhySection";
import ResourcesSection from "@/components/sections/ResourcesSection";
import AudioPacksSection from "@/components/sections/AudioPacksSection";
import ModulesSection from "@/components/sections/ModulesSection";
import PlansSection from "@/components/sections/PlansSection";
import ReviewsSection from "@/components/sections/ReviewsSection";
import SegmentsSection from "@/components/sections/SegmentsSection";
import FAQSection from "@/components/sections/FAQSection";
import ContactSection from "@/components/sections/ContactSection";

const Index = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <HeroSection />
      <WhySection />
      <ResourcesSection />
      <AudioPacksSection />
      <ModulesSection />
      <PlansSection />
      <ReviewsSection />
      <SegmentsSection />
      <FAQSection />
      <ContactSection />
      <Footer />
    </div>
  );
};

export default Index;
