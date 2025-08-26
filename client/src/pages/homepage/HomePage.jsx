import { Box } from "@chakra-ui/react";
import HomeNabvar from "./HomeNabvar";
import HeroSection from "./HeroSection";
import FeatureSection from "./FeatureSection";
import HowItWorksSection from "./HowItWorksSection";
import CTASection from "./CTASection";
import FooterSection from "./FooterSection";

const HomePage = () => {
  return (
    <Box>
      <HomeNabvar />
      <HeroSection />
      <FeatureSection />
      <HowItWorksSection />
      <CTASection />
      <FooterSection />
    </Box>
  );
};

export default HomePage;
