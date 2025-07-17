import {
  Box,
  Heading,
  Text,
  Flex,
  VStack,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import ActivityLogItem from "@/components/cards/ActivityLogCard";
import { useRecentActivitiesStore } from "@/store/recentStore";
import { useEffect } from "react";

const ActivityLogs = () => {
  const { /*recentActivities*/ loading, fetchRecentActivities } =
    useRecentActivitiesStore();

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

  useEffect(() => {
    fetchRecentActivities();
  }, [fetchRecentActivities]);

  if (loading) {
    return <Skeleton height="100%" width="100%" borderRadius="xl" mx="auto" />;
  }

  return (
    <Box bg="white" borderRadius="2xl" boxShadow="md" w="100%" h="100%">
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
          <Button
            fontWeight="medium"
            fontSize="14px"
            variant="outline"
            borderRadius="xl"
            _hover={{ bg: "#f7f1f1" }}
          >
            View all
          </Button>
        </NavLink>
      </Flex>
      <VStack>
        {data.length > 0 ? (
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
