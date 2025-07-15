import { Box, Text } from "@chakra-ui/react";
import overviewBg from "@/assets/overview.webp";

const OverviewBanner = () => {
  return (
    <Box
      w="95%"
      mx="auto"
      h="200px"
      borderRadius="2xl"
      overflow="hidden"
      position="relative"
      bgImage={`url(${overviewBg})`}
      bgSize="cover"
      bgPosition="50% 65%"
      transition="box-shadow 0.2s"
    >
      {/* Maroon Overlay */}
      <Box
        position="absolute"
        top="0"
        left="0"
        w="100%"
        h="100%"
        bg="rgba(97, 0, 0, 0.7)"
        zIndex={1}
      />
      <Box
        position="relative"
        zIndex={2}
        p={4}
        color="white"
        align="center"
        mt={8}
      >
        <Text fontSize="5xl" fontWeight="bold">
          Admin Dashboard
        </Text>
        <Text>
          Welcome back, <b>Cedrick Joseph Mariano</b>
        </Text>
      </Box>
    </Box>
  );
};

export default OverviewBanner;
