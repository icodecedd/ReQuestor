import {
  Box,
  Flex,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  Skeleton,
  StatHelpText,
} from "@chakra-ui/react";

const StatCard = ({ label, value, icon, loading = false, text }) => {
  if (false) {
    return <Skeleton w="100%" h="135px" borderRadius="2xl" />;
  }

  return (
    <Box
      borderRadius="2xl"
      p={5}
      w="100%"
      bgGradient="linear(to-br, #800000, #a04545, #c75d5d)"
      boxShadow="0 4px 12px rgba(122, 0, 2, 0.25)"
      transition="all 0.3s cubic-bezier(0.215, 0.61, 0.355, 1)"
      _hover={{
        boxShadow: "0 8px 24px rgba(122, 0, 2, 0.35)",
        transform: "translateY(-3px)",
      }}
      position="relative"
      overflow="hidden"
    >
      {/* Subtle diagonal texture */}
      <Box
        position="absolute"
        inset={0}
        bgImage="repeating-linear-gradient(45deg, rgba(0,0,0,0.03) 0px, rgba(0,0,0,0.03) 1px, transparent 1px, transparent 6px)"
        pointerEvents="none"
      />

      {/* Metallic accent */}
      <Box
        position="absolute"
        top={-10}
        right={-10}
        w="80px"
        h="80px"
        bg="radial-gradient(circle, rgba(255,255,255,0.15) 0%, transparent 60%)"
        borderRadius="full"
      />
      {/* Subtle decorative elements */}
      <Box
        position="absolute"
        top={-10}
        right={-10}
        w="120px"
        h="120px"
        bg="whiteAlpha.100"
        borderRadius="full"
      />
      <Box
        position="absolute"
        bottom={-20}
        left={-20}
        w="160px"
        h="160px"
        bg="whiteAlpha.50"
        borderRadius="full"
        opacity={0.3}
      />

      <Flex justify="space-between" align="flex-start">
        <Box zIndex={1}>
          <Stat>
            <StatLabel
              fontSize="sm"
              fontWeight="medium"
              color="whiteAlpha.900"
              letterSpacing="wide"
              mb={1}
            >
              {label.toUpperCase()}
            </StatLabel>
            <StatNumber
              fontSize={{ base: "2xl", md: "3xl" }}
              fontWeight="extrabold"
              color="white"
              lineHeight="1.2"
              mb={2}
            >
              {value}
            </StatNumber>
            <StatHelpText
              fontSize="xs"
              fontWeight="medium"
              color="whiteAlpha.800"
              mt={1}
            >
              {text}
            </StatHelpText>
          </Stat>
        </Box>

        {icon && (
          <Box
            bg="whiteAlpha.200"
            p={3}
            borderRadius="xl"
            color="white"
            fontSize="2xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
            boxShadow="sm"
            zIndex={1}
            transition="all 0.3s ease"
            _hover={{
              bg: "whiteAlpha.300",
              transform: "scale(1.05)",
            }}
          >
            <Icon as={icon} boxSize={6} />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default StatCard;
