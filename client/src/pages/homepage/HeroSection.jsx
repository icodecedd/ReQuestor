import { Box, Button, Flex, Heading, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import heroBg from "@/assets/hero-requestor.webp";
import { IoCheckmark } from "react-icons/io5";

const MotionBox = motion(Box);

const animatedWords = [
  "Paperless",
  "One-Click Away",
  "Real-Time",
  "Secure",
  "Effortless",
  "Smart",
  "Streamlined",
];

// Fade-in-up animation
const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

// Floating animation
const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 2,
    ease: "easeInOut",
    repeat: Infinity,
    repeatType: "loop",
  },
};

const HeroSection = () => {
  const [currentWord, setCurrentWord] = useState(animatedWords[0]);

  useEffect(() => {
    const interval = setInterval(() => {
      const randomIndex = Math.floor(Math.random() * animatedWords.length);
      setCurrentWord(animatedWords[randomIndex]);
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <Box
      minH={{ base: "auto", md: "100vh" }}
      pt={{ base: "60px", md: "80px", lg: "100px" }}
      px={{ base: 4, sm: 6, md: 12, lg: 24 }}
      pb={{ base: 8, md: 0 }}
    >
      <Flex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="space-between"
        minH={{ base: "auto", md: "80vh" }}
        gap={{ base: 6, sm: 8, md: 12 }}
      >
        {/* Left Side */}
        <Box
          flex={1}
          textAlign={{ base: "center", md: "left" }}
          maxW={{ md: "50%" }}
        >
          <Heading
            as="h1"
            fontSize={{
              base: "2xl",
              sm: "3xl",
              md: "4xl",
              lg: "5xl",
              xl: "6xl",
            }}
            fontWeight="extrabold"
            lineHeight="1.2"
            color="gray.800"
          >
            Request. Track. Approve.
          </Heading>
          <Heading
            as="h2"
            fontSize={{
              base: "xl",
              sm: "2xl",
              md: "3xl",
              lg: "4xl",
              xl: "5xl",
            }}
            color="#800000"
            fontWeight="bold"
            mt={{ base: 2, md: 3 }}
          >
            All in One Place.
          </Heading>
          <Text
            mt={{ base: 4, md: 6 }}
            fontSize={{ base: "md", sm: "lg", md: "xl" }}
            color="gray.600"
            maxW={{ base: "100%", sm: "80%", md: "90%" }}
            mx={{ base: "auto", md: 0 }}
          >
            Effortlessly manage your equipment requests, track their status, and
            approve them with just a few clicks.
          </Text>
          <Flex
            mt={{ base: 4, md: 6 }}
            gap={3}
            align="center"
            justify={{ base: "center", md: "flex-start" }}
            flexWrap="wrap"
          >
            <Text
              fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
              color="gray.600"
            >
              Make requests
            </Text>
            <motion.div
              key={currentWord}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <Text
                id="animated-word"
                fontSize={{ base: "md", sm: "lg", md: "xl", lg: "2xl" }}
                color="#800000"
                fontWeight="semibold"
                display="inline"
              >
                {currentWord}
              </Text>
            </motion.div>
          </Flex>
          <motion.div variants={fadeInUp} initial="hidden" animate="visible">
            <a href="/login">
              <Button
                mt={{ base: 6, md: 8 }}
                bg="#800000"
                color="white"
                size={{ base: "md", md: "lg" }}
                borderRadius="full"
                px={{ base: 6, md: 8 }}
                py={{ base: 5, md: 6 }}
                fontSize={{ base: "md", md: "lg" }}
                fontWeight="medium"
                rightIcon={<FaArrowRightLong />}
                _hover={{ bg: "#A52A2A", transform: "translateY(-2px)" }}
                _active={{ bg: "#A52A2A" }}
                transition="all 0.2s"
              >
                Request Now
              </Button>
            </a>
          </motion.div>
        </Box>

        {/* Right Side */}
        <Box
          position="relative"
          h={{ base: "300px", sm: "350px", md: "400px", lg: "500px" }}
          w={{ base: "100%", md: "50%" }}
          borderRadius="2xl"
          overflow="hidden"
          boxShadow={{ base: "md", md: "lg" }}
          mt={{ base: 6, md: 0 }}
        >
          <Box
            position="absolute"
            inset={0}
            backgroundImage={`url(${heroBg})`}
            backgroundSize="cover"
            backgroundPosition="center"
            backgroundRepeat="no-repeat"
          >
            <Box
              position="absolute"
              inset={0}
              bgGradient="linear(to-t, rgba(0,0,0,0.4), transparent)"
            />
          </Box>
        </Box>

        {/* Floating Card: Top-Right */}
        <MotionBox
          animate={floatAnimation}
          display={{ base: "none", lg: "block" }}
          position="absolute"
          top={{ lg: "calc(25% - 80px)", xl: "calc(30% - 100px)" }}
          right={{ lg: "calc(8% - 80px)", xl: "calc(10% - 100px)" }}
          zIndex={10}
        >
          <Box
            w={{ lg: "180px", xl: "200px" }}
            bg="whiteAlpha.900"
            backdropFilter="blur(8px)"
            boxShadow="0 8px 16px rgba(0, 0, 0, 0.1)"
            borderRadius="xl"
            p={{ base: 2, lg: 3, xl: 4 }}
            border="1px solid"
            borderColor="gray.100"
          >
            <Flex align="center" gap={2}>
              <IoCheckmark size={20} color="#800000" />
              <Text
                fontSize={{ base: "xs", lg: "sm" }}
                fontWeight="medium"
                color="gray.800"
              >
                Request Approved
              </Text>
            </Flex>
            <Text fontSize={{ base: "2xs", lg: "xs" }} color="gray.500" mt={1}>
              in 24 hours in 3 easy steps
            </Text>
          </Box>
        </MotionBox>

        {/* Floating Card: Bottom-Left */}
        <MotionBox
          animate={{
            ...floatAnimation,
            transition: { ...floatAnimation.transition, delay: 0.5 },
          }}
          display={{ base: "none", lg: "block" }}
          position="absolute"
          bottom={{ lg: "calc(20% - 80px)", xl: "calc(25% - 100px)" }}
          left={{ lg: "calc(50% - 80px)", xl: "calc(55% - 100px)" }}
          zIndex={10}
        >
          <Box
            w={{ lg: "170px", xl: "180px" }}
            bg="whiteAlpha.900"
            backdropFilter="blur(8px)"
            boxShadow="0 8px 16px rgba(0, 0, 0, 0.1)"
            borderRadius="xl"
            p={{ base: 2, lg: 3, xl: 4 }}
            px={3}
            border="1px solid"
            borderColor="gray.100"
          >
            <Flex align="center" gap={2}>
              <IoCheckmark size={20} color="#800000" />
              <Text
                fontSize={{ base: "xs", lg: "sm" }}
                fontWeight="medium"
                color="gray.800"
              >
                Instant Tracking
              </Text>
            </Flex>
            <Text fontSize={{ base: "2xs", lg: "xs" }} color="gray.500" mt={1}>
              Real-time updates
            </Text>
          </Box>
        </MotionBox>
      </Flex>
    </Box>
  );
};

export default HeroSection;
