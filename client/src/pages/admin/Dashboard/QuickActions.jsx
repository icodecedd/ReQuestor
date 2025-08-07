import {
  Box,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiPlus, FiMonitor, FiUsers, FiClock, FiBox } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const columns = useBreakpointValue({ base: 2, md: 3, lg: 5 });
  const navigate = useNavigate();

  const actions = [
    {
      label: "Create Request",
      icon: FiPlus,
      color: "#5a0000", // Dark maroon
      hoverBg: "#f7eaea",
      onClick: () => navigate("/dashboard/requests/new"),
    },
    {
      label: "Add Equipment",
      icon: FiMonitor,
      color: "#800000", // Classic maroon
      hoverBg: "#f7eaea",
      onClick: () => navigate("/dashboard/equipment/new"),
    },
    {
      label: "Manage Users",
      icon: FiUsers,
      color: "#c87c7c", // Light maroon
      hoverBg: "#f7eaea",
      onClick: () => navigate("/admin/users"),
    },
    {
      label: "View Inventory",
      icon: FiBox,
      color: "#e0b1b1", // Lightest maroon
      hoverBg: "#f7eaea",
      onClick: () => navigate("/admin/equipment"),
    },
    {
      label: "View Requests",
      icon: FiClock,
      color: "#f5d3d3", // Very light maroon
      hoverBg: "#f7eaea",
      onClick: () => navigate("/admin/requests"),
    },
  ];

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      p={6}
      boxShadow="sm"
      border="1px solid"
      borderColor="gray.200"
      w="100%"
    >
      <VStack align="flex-start" spacing={0} mb={6}>
        <Heading size="md" fontWeight="semibold" color="maroon.600">
          Quick Actions
        </Heading>
        <Text fontSize="sm" color="gray.500">
          Frequently used shortcuts
        </Text>
      </VStack>

      <SimpleGrid columns={columns} spacing={4}>
        {actions.map((action, index) => (
          <Box
            key={index}
            onClick={action.onClick}
            cursor="pointer"
            borderRadius="xl"
            p={4}
            bg="white"
            border="1px solid"
            borderColor="gray.200"
            textAlign="center"
            transition="all 0.2s ease"
            _hover={{
              bg: action.hoverBg,
              borderColor: action.color,
              transform: "translateY(-2px)",
              boxShadow: "0 4px 8px rgba(122, 0, 2, 0.1)",
            }}
          >
            <VStack spacing={2}>
              <Icon as={action.icon} boxSize={6} color={action.color} />
              <Text fontSize="sm" fontWeight="medium" color="gray.700">
                {action.label}
              </Text>
            </VStack>
          </Box>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default QuickActions;
