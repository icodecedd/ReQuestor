import { Box, Container, Flex, Heading, Text, Button } from "@chakra-ui/react";
import { FiCheckCircle } from "react-icons/fi";
import { FaArrowRightLong } from "react-icons/fa6";

const ctaWords = [
  "No setup required",
  "Instant approval",
  "Use instantly",
  "Cancel anytime",
];

const CTASection = () => {
  return (
    <Box
      as="section"
      minH={{ base: "auto", md: "70vh" }}
      py={{ base: 12, md: 16, lg: 20 }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      bg="#840404"
      color="#fafafa"
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
        <Box mb={{ base: 6, md: 8, lg: 10 }}>
          <Heading
            as="h2"
            size={{ base: "xl", sm: "2xl" }}
            fontWeight="bold"
            lineHeight="1.2"
            textAlign="center"
          >
            Simplify your request process today.
          </Heading>
        </Box>

        {/* Description */}
        <Text
          fontSize={{ base: "md", md: "lg" }}
          textAlign="center"
          maxW={{ base: "100%", sm: "90%", md: "80%", lg: "70%" }}
          px={{ base: 2, sm: 0 }}
          lineHeight="1.6"
          mb={{ base: 8, md: 10, lg: 12 }}
          mx="auto" // Center the text block
        >
          Join students, faculty, and staff across the university already using
          ReQuestor to simplify resource requests. Start your journey toward a
          smarter, paperless campus today
        </Text>

        {/* CTA keywords */}
        <Flex
          mb={{ base: 8, md: 10, lg: 12 }}
          gap={4}
          textAlign="center"
          width="100%"
          flexWrap="wrap"
          justifyContent="center"
        >
          {ctaWords.map((word, index) => (
            <Flex key={index} alignItems="center">
              <FiCheckCircle color="#86efac" />
              <Text
                key={index}
                fontSize={{ base: "md", md: "lg" }}
                lineHeight="1.6"
                display="inline-block"
                px={{ base: 2, sm: 4 }}
              >
                {word}
              </Text>
            </Flex>
          ))}
        </Flex>

        {/* CTA button */}
        <a href="/signup">
          <Button
            bg="#fafafa"
            color="#840404"
            variant="solid"
            size={{ base: "md", sm: "lg" }}
            borderRadius="full"
            px={{ base: 6, sm: 8, md: 10 }}
            py={{ base: 4, sm: 5 }}
            fontSize={{ base: "sm", md: "lg" }}
            fontWeight="medium"
            _hover={{ bg: "#f4e7e7", transform: "translateY(-2px)" }}
            _active={{ bg: "#f4e7e7" }}
            transition="all 0.2s"
            w="200px"
          >
            <Flex
              w="100%"
              align="center"
              justify="space-between"
              pl={{ base: 4, md: 0 }}
            >
              Get Started
              <Box
                ml={8}
                bg="#840404"
                color="#fafafa"
                borderRadius="full"
                p={1.5}
                display="flex"
                alignItems="center"
                justifyContent="center"
              >
                <FaArrowRightLong size={14} />
              </Box>
            </Flex>
          </Button>
        </a>
      </Container>
    </Box>
  );
};
export default CTASection;
