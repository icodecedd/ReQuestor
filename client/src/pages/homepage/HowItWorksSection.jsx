import TimelineCard from "@/components/cards/TimelineCard";
import { Box, Flex, Heading, Text, Container } from "@chakra-ui/react";
import React from "react";
import { FiBell, FiCalendar, FiSearch, FiSend } from "react-icons/fi";

const steps = [
  {
    icon: FiCalendar,
    title: "Choose Date/Time",
    description:
      "Pick your preferred time slot with smart conflict detection and suggestions.",
    step: "01",
  },
  {
    icon: FiSearch,
    title: "Select Item",
    description:
      "Browse available equipment and facilities with real-time availability status.",
    step: "02",
  },
  {
    icon: FiSend,
    title: "Submit Request",
    description:
      "Send your request through the automated approval workflow system.",
    step: "03",
  },
  {
    icon: FiBell,
    title: "Get Notified",
    description:
      "Receive instant notifications on approval status and pickup instructions.",
    step: "04",
  },
];

const HowItWorksSection = () => {
  return (
    <Box
      as="section"
      id="how-it-works"
      minH={{ base: "auto", md: "100vh" }}
      py={{ base: 12, md: 16, lg: 20 }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
    >
      <Container
        maxW={{ base: "100%", lg: "1200px", xl: "1300px" }}
        px={{ base: 4, sm: 6, md: 8, lg: 6 }}
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
      >
        {/* Header */}
        <Box mb={{ base: 6, md: 8, lg: 10 }} textAlign="center" width="100%">
          <Flex
            gap={2}
            alignItems="center"
            justifyContent="center"
            flexDirection={{ base: "column", sm: "row" }}
          >
            <Heading
              as="h2"
              size={{ base: "xl", sm: "2xl" }}
              fontWeight="bold"
              lineHeight="1.2"
            >
              How
            </Heading>
            <Heading
              as="h2"
              size={{ base: "xl", sm: "2xl" }}
              color="#800000"
              fontWeight="bold"
              lineHeight="1.2"
            >
              ReQuestor Works
            </Heading>
          </Flex>
        </Box>

        {/* Description */}
        <Text
          fontSize={{ base: "md", md: "lg" }}
          color="gray.600"
          textAlign="center"
          maxW={{ base: "100%", sm: "90%", md: "80%", lg: "70%" }}
          px={{ base: 2, sm: 0 }}
          lineHeight="1.6"
          mb={{ base: 8, md: 10, lg: 12 }}
          mx="auto" // Center the text block
        >
          ReQuestor is your university's platform for reserving and borrowing
          campus equipment like projectors, white screens, and other resources
          for academic and student activities.
        </Text>

        {/* How it works - Centered Timeline */}
        <Box width="100%" display="flex" justifyContent="center">
          <TimelineCard steps={steps} />
        </Box>
      </Container>
    </Box>
  );
};

export default HowItWorksSection;
