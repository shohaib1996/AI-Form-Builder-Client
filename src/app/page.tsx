
import { CTASection } from "@/components/Home/CTASection";
import { FAQSection } from "@/components/Home/FAQSection";
import { FeaturesSection } from "@/components/Home/FeaturesSection";
import { HeroSection } from "@/components/Home/HeroSection";
import { TestimonialsSection } from "@/components/Home/TestimonialsSection";
import { TrustIndicators } from "@/components/Home/TrustIndicators";
import { UseCasesSection } from "@/components/Home/UseCasesSection";
import { WhoIsThisForSection } from "@/components/Home/WhoIsThisForSection";

export default function Home() {
  return (
    <div>
      {/* <Navbar /> */}
      <HeroSection/>
      <TrustIndicators/>
      <FeaturesSection/>
      <UseCasesSection/>
      <WhoIsThisForSection/>
      <TestimonialsSection/>
      <CTASection/>
      <FAQSection/>
      {/* <Footer/> */}
    </div>
  );
}
