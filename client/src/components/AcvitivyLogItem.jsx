import { Box, Text, HStack } from "@chakra-ui/react";
import { getStatusIconStyle } from "@/constants/statusIcons";
import { activityMeta } from "@/constants/activityLogMeta";
import { timeAgo } from "@/utils/timeAgo";
import { FiClock } from "react-icons/fi";

const ActivityLogItem = ({ log }) => {
  const meta = activityMeta?.[log.target]?.[log.action] || {
    title: "Unknown Activity",
    description: `No metadata available for "${log.action}" on "${log.target}".`,
  };
  const { title, description } = meta;
  const { icon, bg } =
    meta.title !== "Unknown Activity"
      ? getStatusIconStyle(log.action)
      : getStatusIconStyle("unknown");

  return (
    <HStack
      align="center"
      spacing={4}
      p={3}
      bg="gray.50"
      borderRadius="md"
      w="90%"
      mb={1.5}
    >
      <Box
        bg={bg}
        p={2}
        borderRadius="lg"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {icon}
      </Box>
      <Box>
        <Text fontSize="14px" fontWeight="medium">
          {title}
        </Text>
        <Text fontSize="12px" color="gray.600">
          {description}
        </Text>
        <HStack spacing={1} fontSize="10px" color="gray.500" align="center">
          <FiClock size="10px" />
          <Text>{timeAgo(log.timestamp)}</Text>
        </HStack>
      </Box>
    </HStack>
  );
};

export default ActivityLogItem;
