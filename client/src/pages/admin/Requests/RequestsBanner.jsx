import { Box, Text, Flex } from "@chakra-ui/react";
import overviewBg from "@/assets/overview.webp";

const RequestsBanner = () => {
  const maroonColors = {
    900: "#3a0000", // Deepest maroon
    700: "#800000", // Classic maroon
    500: "#c00000", // Vibrant maroon
    300: "#ff7e7e", // Light accent
  };

  return (
    <Box
      w="95%"
      mx="auto"
      h={{ base: "200px", md: "240px" }}
      borderRadius="2xl"
      overflow="hidden"
      position="relative"
      bgImage={`url(${overviewBg})`}
      bgSize="cover"
      bgPosition="center"
      boxShadow="0 4px 24px rgba(122, 0, 2, 0.3)"
      transition="all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1)"
      _hover={{
        transform: "translateY(-2px)",
        boxShadow: "0 6px 28px rgba(122, 0, 2, 0.4)",
      }}
    >
      {/* Gradient Overlay - Dark at top, lighter at bottom */}
      <Box
        position="absolute"
        inset={0}
        bgGradient={`linear(to-b, ${maroonColors[900]}E6, ${maroonColors[700]}B3)`}
        zIndex={1}
      />

      {/* Lightened center area for text contrast */}
      <Box
        position="absolute"
        top="30%"
        left="0"
        w="100%"
        h="40%"
        bgGradient={`linear(to-b, transparent, ${maroonColors[500]}40, transparent)`}
        zIndex={2}
      />

      {/* Content */}
      <Flex
        position="relative"
        zIndex={3}
        direction="column"
        justify="center"
        align="center"
        h="full"
        px={6}
        textAlign="center"
      >
        <Text
          fontSize={{ base: "3xl", md: "5xl" }}
          fontWeight="black"
          letterSpacing="tighter"
          lineHeight="1.1"
          mb={2}
          color="white"
          textShadow={`
            0 2px 4px rgba(0,0,0,0.3),
            0 0 12px ${maroonColors[300]}80
          `}
        >
          REQUEST MANAGEMENT
        </Text>

        <Text
          fontSize={{ base: "md", md: "lg" }}
          fontWeight="medium"
          color="whiteAlpha.900"
          maxW="600px"
          textShadow="0 1px 2px rgba(0,0,0,0.2)"
        >
          Review and manage equipment reservation requests
        </Text>

        {/* Glowing accent line */}
        <Box
          position="absolute"
          bottom={6}
          left="50%"
          transform="translateX(-50%)"
          w="120px"
          h="2px"
          bg="white"
          opacity={0.7}
          borderRadius="full"
          filter="blur(1px)"
          _before={{
            content: '""',
            position: "absolute",
            inset: 0,
            bg: maroonColors[300],
            borderRadius: "full",
            filter: "blur(6px)",
            opacity: 0.6,
          }}
        />
      </Flex>
    </Box>
  );
};

export default RequestsBanner;
