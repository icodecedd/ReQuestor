import { Box, Heading, Text, Flex, VStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const ActivityLogs = () => {
  // TODO: Finish This Activity Logs
  const data = [{}];
  return (
    <Box bg="white" borderRadius="2xl" p={5} boxShadow="md" w="100%" h="600px">
      <Flex justify="space-between" mb={3}>
        <VStack>
          <Heading size="md" mb={-2} mr={3}>
            Activity Logs
          </Heading>
          <Text fontSize="13px" textColor="gray.500">
            Recent system activities
          </Text>
        </VStack>
        <NavLink to="/dashboard/activity">
          <Text
            textColor="#0c759eff"
            fontWeight="medium"
            fontSize="14px"
            mt={1.5}
          >
            View all
          </Text>
        </NavLink>
      </Flex>
    </Box>
  );
};

export default ActivityLogs;
