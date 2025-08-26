import { Box, Flex, Icon, Text } from "@chakra-ui/react";
import { motion } from "framer-motion";

const MotionBox = motion(Box);

export const FeatureCard = ({ feature, index }) => {
  const { icon, title, description } = feature;

  return (
    <MotionBox
      className="group"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -8 }}
      bg="white"
      borderRadius="xl"
      border="0"
      boxShadow="lg"
      overflow="hidden"
      position="relative"
      w="100%" // Full width to fill grid columns
      h="100%" // Full height to maintain consistency
      _before={{
        content: '""',
        position: "absolute",
        top: 0,
        left: 0,
        right: 0,
        height: "4px",
        bgGradient: "linear(to-r, maroon, #8B0000)",
        opacity: 0,
        transition: "opacity 0.3s ease-in-out",
      }}
      _hover={{
        boxShadow: "xl",
        _before: {
          opacity: 1,
        },
      }}
    >
      <Box
        p={{ base: 6, md: 6, lg: 8 }} // Responsive padding for equal spacing
        textAlign="center"
        height="100%" // Ensure content fills card
        display="flex"
        flexDirection="column"
        justifyContent="center"
      >
        <Flex
          mb={{ base: 5, md: 5, lg: 6 }} // Responsive margin
          alignItems="center"
          justifyContent="center"
          w={{ base: "56px", md: "60px", lg: "64px" }} // Responsive icon container
          h={{ base: "56px", md: "60px", lg: "64px" }}
          borderRadius="xl"
          bgGradient="linear(to-br, #FFF5F5, #FFECEC)"
          mx="auto"
          transition="all 0.3s ease-in-out"
          _groupHover={{
            bgGradient: "linear(to-br, #FDECEC, #FFDADA)",
            transform: "scale(1.05)",
          }}
        >
          <Icon
            as={icon}
            w={{ base: 6, md: 7, lg: 8 }} // Responsive icon size
            h={{ base: 6, md: 7, lg: 8 }}
            color="maroon"
            transition="transform 0.3s ease-in-out"
            _groupHover={{
              transform: "scale(1.1)",
              color: "#8B0000",
            }}
          />
        </Flex>

        <Text
          fontSize={{ base: "lg", md: "xl", lg: "xl" }} // Responsive font size
          fontWeight="semibold"
          mb={{ base: 3, md: 4, lg: 4 }} // Responsive margin
          color="gray.800"
          transition="color 0.3s ease-in-out"
          _groupHover={{
            color: "maroon",
          }}
        >
          {title}
        </Text>

        <Text
          fontSize={{ base: "sm", md: "md", lg: "md" }} // Responsive font size
          color="gray.600"
          lineHeight="relaxed"
        >
          {description}
        </Text>
      </Box>
    </MotionBox>
  );
};
