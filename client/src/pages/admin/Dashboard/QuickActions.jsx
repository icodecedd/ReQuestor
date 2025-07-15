import {
  Box,
  Heading,
  SimpleGrid,
  VStack,
  Text,
  Icon,
  useBreakpointValue,
} from "@chakra-ui/react";
import { FiPlus, FiMonitor, FiUserPlus, FiClock, FiBox } from "react-icons/fi";
import { useNavigate } from "react-router-dom";

const QuickActions = () => {
  const columns = useBreakpointValue({ base: 2, md: 3, lg: 5 });

  const navigate = useNavigate();

  const actions = [
    {
      label: "Create Request",
      icon: FiPlus,
      color: "blue.500",
      onClick: () => console.log("Open Create Request Modal"),
    },
    {
      label: "Add Equipment",
      icon: FiMonitor,
      color: "green.500",
      onClick: () => console.log("Open Add Equipment Modal"),
    },
    {
      label: "Manage Users",
      icon: FiUserPlus,
      color: "purple.500",
      onClick: () => navigate("/dashboard/users"),
    },
    {
      label: "Inventory Check",
      icon: FiBox,
      color: "pink.500",
      onClick: () => navigate("/dashboard/equipment"), // navigate to equipment
    },
    {
      label: "Pending Approvals",
      icon: FiClock,
      color: "red.500",
      onClick: () => navigate("/dashboard/requests"),
    },
  ];

  return (
    <Box bg="white" borderRadius="2xl" p={5} boxShadow="md" h="100%" w="100%">
      <Heading size="md" mb={4}>
        Quick Actions
      </Heading>

      <SimpleGrid columns={columns} spacing={4}>
        {actions.map((action, index) => (
          <Box
            key={index}
            onClick={action.onClick}
            cursor="pointer"
            borderRadius="xl"
            p={3}
            bg="gray.50"
            textAlign="center"
            transition="all 0.2s"
            _hover={{ bg: "gray.100", boxShadow: "md" }}
          >
            <VStack spacing={2}>
              <Icon as={action.icon} boxSize={6} color={action.color} />
              <Text fontSize="sm" fontWeight="medium">
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
