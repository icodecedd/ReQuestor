import { Box, Heading, Text, Flex, VStack } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import ActivityLogItem from "../../../components/AcvitivyLogItem";

const ActivityLogs = () => {
  // TODO: Finish This Activity Logs
  const log = [
    {
      action: "Approved",
      target: "Request",
      timestamp: "2025-07-14 14:42:00",
    },
    {
      action: "Created",
      target: "Equipment",
      timestamp: "2025-07-14 14:21:00",
    },
    {
      action: "Status_Changed",
      target: "Equipment",
      timestamp: "2025-07-14 16:42:00",
    },
    {
      action: "Updated",
      target: "Equipment",
      timestamp: "2025-07-14 14:21:00",
    },
    {
      action: "Denied",
      target: "Request",
      timestamp: "2025-07-14 16:42:00",
    },
  ];
  return (
    <Box bg="white" borderRadius="2xl" boxShadow="md" w="100%" h="550px">
      <Flex
        justify="space-between"
        p={5}
        mb={5}
        borderBottom="1px"
        color="gray.100"
      >
        <VStack>
          <Heading size="md" mb={-2} mr={3} textColor="black">
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
            mt={3}
          >
            View all
          </Text>
        </NavLink>
      </Flex>
      <VStack>
        {log.length > 0 ? (
          log.map((log, index) => <ActivityLogItem key={index} log={log} />)
        ) : (
          <Heading fontSize="14px" color="#4a5568">No Activities Yet</Heading>
        )}
      </VStack>
    </Box>
  );
};

export default ActivityLogs;
