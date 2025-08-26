import { Box, Button, Flex, Heading, Image, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { FaArrowRightLong } from "react-icons/fa6";
import heroBg from "@/assets/hero-requestor.webp";
import { IoCheckmark } from "react-icons/io5";

const MotionBox = motion(Box);
const MotionFlex = motion(Flex);

const animatedWords = [
  "Projectors",
  "AVRs",
  "White Screens",
  "Classroom Ready",
  "Seamless",
  "On Time",
  "Hassle-Free",
];

// Reusable fade-up
const fadeInUp = {
  hidden: { opacity: 0, y: 30 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.7, ease: "easeOut" } },
};

// Page load container stagger
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.3,
    },
  },
};

// Floating idle animation for cards
const floatAnimation = {
  y: [0, -10, 0],
  transition: {
    duration: 2,
    ease: "easeInOut",
    repeat: Infinity,
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
      as="section"
      id="home"
      minH={{ base: "auto", md: "100vh" }}
      px={{ base: 4, sm: 6, md: 8, lg: 16, xl: 24 }}
      py={{ base: 8, md: 12 }}
      display="flex"
      alignItems="center"
      justifyContent="center"
    >
      <MotionFlex
        direction={{ base: "column", md: "row" }}
        align="center"
        justify="center"
        gap={{ base: 8, md: 0 }}
        w="100%"
        maxW="1200px"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
      >
        {/* Left: Text */}
        <MotionBox
          flex="1"
          textAlign={{ base: "center", md: "left" }}
          maxW={{ base: "100%", md: "50%" }}
          variants={fadeInUp}
        >
          <Heading
            as="h2"
            size={{
              base: "xl",
              sm: "2xl",
              md: "3xl",
            }}
            fontWeight="extrabold"
            lineHeight="1.2"
            color="gray.800"
          >
            Reserve. Use. Return.
          </Heading>
          <Heading
            as="h2"
            fontSize={{ base: "lg", sm: "xl", md: "2xl", lg: "3xl" }}
            color="#800000"
            fontWeight="bold"
            mt={{ base: 3, sm: 4 }}
          >
            Campus Equipment Made Simple.
          </Heading>
          <Text
            mt={{ base: 4, sm: 5 }}
            fontSize={{ base: "sm", sm: "md", md: "lg" }}
            color="gray.600"
            maxW={{ base: "100%", md: "90%" }}
            mx={{ base: "auto", md: 0 }}
            lineHeight="1.6"
          >
            Quickly reserve projectors, AVRs, and white screens for your classes
            or events. Manage all reservations in one place with real-time
            updates.
          </Text>

          <Flex
            mt={{ base: 5, sm: 6 }}
            gap={1}
            align="center"
            justify={{ base: "center", md: "flex-start" }}
            flexWrap="wrap"
          >
            <Text fontSize={{ base: "sm", md: "lg" }} color="gray.600">
              Reserve equipment that’s
            </Text>
            <motion.div
              key={currentWord}
              variants={fadeInUp}
              initial="hidden"
              animate="visible"
            >
              <Text
                fontSize={{ base: "sm", md: "lg" }}
                color="#800000"
                fontWeight="semibold"
                display="inline"
              >
                {currentWord}
              </Text>
            </motion.div>
          </Flex>

          <motion.div variants={fadeInUp}>
            <a href="/login">
              <Button
                mt={{ base: 6, sm: 8 }}
                bg="#800000"
                color="white"
                size={{ base: "md", sm: "lg" }}
                borderRadius="full"
                px={{ base: 6, sm: 8, md: 10 }}
                py={{ base: 4, sm: 5 }}
                fontSize={{ base: "sm", md: "lg" }}
                fontWeight="medium"
                _hover={{ bg: "#A52A2A", transform: "translateY(-2px)" }}
                _active={{ bg: "#A52A2A" }}
                transition="all 0.2s"
                w="200px"
              >
                <Flex w="100%" align="center" justify="space-between">
                  Get Started
                  <Box
                    ml={8}
                    bg="#fafafa"
                    color="#800000"
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
          </motion.div>
        </MotionBox>

        {/* Right: Image */}
        <MotionBox
          flex="1"
          w="100%"
          position="relative"
          maxW={{ base: "100%", md: "50%" }}
          variants={fadeInUp}
        >
          <Image
            src={heroBg}
            alt="Reservation Dashboard"
            width="100%"
            height="auto"
            borderRadius="2xl"
            boxShadow="lg"
            objectFit="cover"
            maxH={{ base: "280px", sm: "360px", md: "500px" }}
          />

          {/* Floating Card Top */}
          <MotionBox
            position="absolute"
            top="-4"
            right="-4"
            bg="white"
            borderRadius="lg"
            p={3}
            boxShadow="md"
            border="1px"
            borderColor="gray.200"
            animate={floatAnimation}
            display={{ base: "none", sm: "block" }}
          >
            <Text fontSize="sm" fontWeight="semibold" color="blue.500">
              <IoCheckmark style={{ display: "inline", marginRight: "4px" }} />
              Reservation Confirmed
            </Text>
            <Text fontSize="xs" color="gray.500">
              Projector ready for pickup
            </Text>
          </MotionBox>

          {/* Floating Card Bottom */}
          <MotionBox
            position="absolute"
            bottom="-6"
            left="-6"
            bg="white"
            borderRadius="lg"
            p={3}
            boxShadow="md"
            border="1px"
            borderColor="gray.200"
            animate={{
              ...floatAnimation,
              transition: { ...floatAnimation.transition, delay: 0.5 },
            }}
            display={{ base: "none", sm: "block" }}
          >
            <Text fontSize="sm" fontWeight="semibold" color="blue.500">
              📅 Availability Checker
            </Text>
            <Text fontSize="xs" color="gray.500">
              Find open slots instantly
            </Text>
          </MotionBox>
        </MotionBox>
      </MotionFlex>
    </Box>
  );
};

export default HeroSection;
