import { Box, Flex, Text, Icon, StatLabel, StatNumber, Stat } from "@chakra-ui/react";

const StatCard = ({ label, value, icon }) => {
  return (
    <Box
      bg="white"
      border="1px solid"
      borderColor="gray.200"
      borderRadius="xl"
      p={5}
      w="100%"
      boxShadow="sm"
      transition="box-shadow 0.2s"
      _hover={{ boxShadow: "md" }}
    >
      <Flex justify="space-between" align="center">
        <Box>
          <Stat>
            <StatLabel fontSize="sm" color="gray.500">
                {label}
            </StatLabel>
          <StatNumber fontSize="2xl" fontWeight="bold">
            {value}
          </StatNumber>
          </Stat>
        </Box>
        {icon && (
          <Box
            bg="gray.100"
            p={2}
            borderRadius="md"
            color="blue.500"
            fontSize="xl"
          >
            <Icon as={icon} />
          </Box>
        )}
      </Flex>
    </Box>
  );
};

export default StatCard;
