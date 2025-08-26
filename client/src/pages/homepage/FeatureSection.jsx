import { FeatureCard } from "@/components/cards/FeatureCard";
import { Box, Heading, SimpleGrid, Text } from "@chakra-ui/react";
import { FiBarChart2, FiClock, FiFile, FiShield } from "react-icons/fi";

const features = [
  {
    icon: FiFile,
    title: "Paperless Process",
    description: "Complete all your requests digitally without any paperwork.",
  },
  {
    icon: FiClock,
    title: "Smart Scheduling",
    description:
      "Effortlessly schedule your requests with advanced conflict detection.",
  },
  {
    icon: FiShield,
    title: "Secure & Encrypted",
    description: "All your data is protected with enterprise-grade security.",
  },
  {
    icon: FiBarChart2,
    title: "Smart Analytics",
    description:
      "Gain insights from your request history and approval patterns.",
  },
];

const FeatureSection = () => {
  return (
    <Box
      as="section"
      id="features"
      minH={{ base: "auto", md: "100vh" }}
      px={{ base: 4, sm: 6, md: 8, lg: 16, xl: 24 }}
      py={{ base: 8, md: 12 }}
      display="flex"
      alignItems="center"
      justifyContent="center"
      flexDirection="column"
      bg="#f5f5f5"
    >
      {/* Header */}
      <Box
        mb={{ base: 6, md: 8, lg: 10 }}
        textAlign="center"
        maxW={{ base: "100%", md: "90%", lg: "80%" }}
      >
        <Heading
          as="h2"
          size={{ base: "xl", sm: "2xl" }}
          fontWeight="bold"
          lineHeight="1.2"
        >
          Powerful Features for
        </Heading>
        <Heading
          as="h2"
          size={{ base: "xl", sm: "2xl" }}
          color="#800000"
          fontWeight="bold"
          lineHeight="1.2"
        >
          Modern Organization
        </Heading>
      </Box>

      {/* Description */}
      <Text
        fontSize={{ base: "md", md: "lg" }}
        color="gray.600"
        textAlign="center"
        maxW={{ base: "100%", sm: "90%", md: "80%", lg: "60%" }}
        px={{ base: 2, sm: 0 }}
        lineHeight="1.6"
      >
        Our platform offers a wide range of features to help you manage your
        organization effectively. Whether you're a small startup or a large
        corporation, we've got you covered.
      </Text>

      {/* Features */}
      <Box width="100%" px={{ base: 4, md: 6, lg: 8 }} py={8}>
        <SimpleGrid
          columns={{ base: 1, md: 2, lg: 4 }} // Responsive columns
          spacing={{ base: 6, md: 6, lg: 8 }} // Equal spacing on all sides
          width="100%"
          maxWidth="1200px" // Optional: constrain max width
          mx="auto" // Center the grid
        >
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </SimpleGrid>
      </Box>
    </Box>
  );
};

export default FeatureSection;
