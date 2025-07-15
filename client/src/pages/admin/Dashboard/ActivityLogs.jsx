import { Box, Heading, Text, Flex, VStack, Skeleton } from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import ActivityLogItem from "@/components/AcvitivyLogItem";
import { useRecentActivities } from "@/hooks/useRecentActivities";

const ActivityLogs = () => {
  const { loading } = useRecentActivities();

  const data = [
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
    <Box bg="white" borderRadius="2xl" boxShadow="md" w="100%" h="578px">
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
        {loading ? (
          [1, 2, 3, 4, 5].map(() => (
            <Skeleton
              height="76px"
              width="90%"
              borderRadius="lg"
              mx="auto"
              mb={2}
            />
          ))
        ) : data.length > 0 ? (
          data.map((log, index) => <ActivityLogItem key={index} log={log} />)
        ) : (
          <Heading fontSize="14px" color="#4a5568">
            No activity log to display
          </Heading>
        )}
      </VStack>
    </Box>
  );
};

export default ActivityLogs;
