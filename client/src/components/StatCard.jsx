import {
  Box,
  Flex,
  Text,
  Icon,
  Stat,
  StatLabel,
  StatNumber,
  Skeleton,
} from "@chakra-ui/react";

const StatCard = ({ label, value, icon, loading = false }) => {
  return (
    <Box
      borderRadius="2xl"
      p={6}
      w="100%"
      bgGradient="linear(to-br, maroon, #c75d5dff)"
      boxShadow="md"
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: "md" }}
    >
      <Flex justify="space-between" align="center">
        <Box>
          <Stat>
            <StatLabel fontSize="sm" color="white" opacity={0.85}>
              {label}
            </StatLabel>
            {loading ? (
              <Skeleton height="37px" width="40px" mt={2} />
            ) : (
              <StatNumber fontSize="3xl" fontWeight="bold" color="white">
                {value}
              </StatNumber>
            )}
          </Stat>
        </Box>

        {icon && (
          <Box
            bg="whiteAlpha.300"
            p={3}
            borderRadius="full"
            color="white"
            fontSize="2xl"
            display="flex"
            alignItems="center"
            justifyContent="center"
          >
            <Icon as={icon} boxSize={6} />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default StatCard;
