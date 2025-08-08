import {
  Box,
  Heading,
  Text,
  Flex,
  VStack,
  Skeleton,
  Button,
  Center,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import ActivityLogItem from "@/components/cards/ActivityLogCard";
import { useRecentActivitiesStore } from "@/store/recentStore";
import { useEffect } from "react";

const ActivityLogs = () => {
  const { recentActivities, loading, fetchRecentActivities } = useRecentActivitiesStore();

  useEffect(() => {
    fetchRecentActivities();
  }, [fetchRecentActivities]);

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      boxShadow="0px 2px 12px rgba(0, 0, 0, 0.08)"
      border="1px solid"
      borderColor="gray.100"
      w="100%"
      h="100%"
      overflow="hidden"
    >
      {/* Header */}
      <Flex
        justify="space-between"
        align="center"
        p={6}
        pb={4}
        borderBottom="1px solid"
        borderColor="gray.100"
      >
        <VStack align="flex-start" spacing={0}>
          <Heading size="md" fontWeight="semibold" color="maroon.600" mb={1}>
            Activity Logs
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Recent system activities
          </Text>
        </VStack>

        <NavLink to="/admin/activity">
          <Button
            variant="outline"
            size="sm"
            borderRadius="lg"
            colorScheme="maroon"
            _hover={{
              bg: "#f7eaea",
            }}
            _active={{
              bg: "#f0d8d8",
            }}
          >
            View All
          </Button>
        </NavLink>
      </Flex>

      {/* Content */}
      <VStack mt={7}>
        {loading ? (
          [1, 2, 3, 4, 5].map((i) => (
            <Skeleton
              key={i}
              height="86px"
              width="90%"
              p={4}
              borderRadius="xl"
              mx="auto"
              mb={1}
            />
          ))
        ) : recentActivities.length > 0 ? (
          recentActivities.map((log, index) => (
            <ActivityLogItem key={index} log={log} />
          ))
        ) : (
          <Center h="300px">
            <VStack spacing={2}>
              <Heading size="sm" color="gray.500">
                No recent activities
              </Heading>
              <Text fontSize="sm" color="gray.400">
                System activities will appear here
              </Text>
            </VStack>
          </Center>
        )}
      </VStack>
    </Box>
  );
};

export default ActivityLogs;
