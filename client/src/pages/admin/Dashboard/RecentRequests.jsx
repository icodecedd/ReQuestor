import {
  Box,
  Flex,
  Heading,
  Text,
  VStack,
  Badge,
  TableContainer,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  Skeleton,
  Button,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useRecentRequestsStore } from "@/store/recentStore";
import { useEffect } from "react";

const RecentRequests = () => {
  const data = [
    {
      id: 11,
      user: "Cedrick Mariano",
      equipment: "BenQ MW535",
      status: "Approved",
      date: "2025-07-04",
    },
    {
      id: 12,
      user: "Borgy Palermo",
      equipment: "Epson EB-X41",
      status: "Pending",
      date: "2025-07-07",
    },
    {
      id: 13,
      user: "Harold dela Pena",
      equipment: "Motorized Screen 100in",
      status: "Pending",
      date: "2025-07-07",
    },
    {
      id: 14,
      user: "Rj Jack Florida",
      equipment: "AVR-2",
      status: "Approved",
      date: "2025-06-29",
    },
    {
      id: 15,
      user: "Cydoel Tomas",
      equipment: "Sony VPL-DX240",
      status: "Pending",
      date: "2025-07-03",
    },
  ];

  const getColorScheme = (status) => {
    switch (status) {
      case "Approved":
        return "green";
      case "Pending":
        return "yellow";
      case "Denied":
        return "red";
      default:
        return "gray";
    }
  };

  const formatRequestsId = (id) => {
    return `REQ-${String(id).padStart(3, "0")}`;
  };

  const { /*recentRequests,*/ loading, fetchRecentRequests } =
    useRecentRequestsStore();

  useEffect(() => {
    fetchRecentRequests();
  }, [fetchRecentRequests]);

  return (
    <Box
      overflow="hidden"
      bg="white"
      borderRadius="2xl"
      boxShadow="md"
      w="100%"
      h="100%"
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
            Recent Requests
          </Heading>
          <Text fontSize="sm" color="gray.500">
            Latest equipment requests
          </Text>
        </VStack>

        <NavLink to="/admin/requests">
          <Button
            variant="outline"
            size="sm"
            borderRadius="lg"
            colorScheme="maroon"
            _hover={{
              bg: "#f7eaea",
            }}
          >
            View All
          </Button>
        </NavLink>
      </Flex>
      <TableContainer borderRadius={"xl"}>
        <Table
          variant="simple"
          borderTop="1px"
          color="gray.100"
          sx={{
            Th: { textAlign: "center", fontSize: "14px" },
            Td: { textAlign: "center", fontSize: "14px" },
          }}
        >
          <Thead>
            <Tr bg="gray.50">
              <Th fontSize="xs" color="gray.600" fontWeight="semibold" py={3}>
                REQUEST ID
              </Th>
              <Th fontSize="xs" color="gray.600" fontWeight="semibold">
                REQUESTER
              </Th>
              <Th fontSize="xs" color="gray.600" fontWeight="semibold">
                EQUIPMENT
              </Th>
              <Th fontSize="xs" color="gray.600" fontWeight="semibold">
                STATUS
              </Th>
              <Th fontSize="xs" color="gray.600" fontWeight="semibold">
                DATE
              </Th>
            </Tr>
          </Thead>
          {loading ? (
            <Tbody>
              {[1, 2, 3, 4, 5].map((i) => (
                <Tr key={i}>
                  {[1, 2, 3, 4, 5].map((j) => (
                    <Td key={j} py={3}>
                      <Skeleton height="20px" width="90%" borderRadius="md" />
                    </Td>
                  ))}
                </Tr>
              ))}
            </Tbody>
          ) : data.length > 0 ? (
            <Tbody>
              {data.map((req, index) => (
                <Tr key={index} textColor="blackAlpha.900">
                  <Td textColor="#157fc5ff" fontWeight="medium">
                    {formatRequestsId(req.id)}
                  </Td>
                  <Td>{req.user}</Td>
                  <Td>{req.equipment}</Td>
                  <Td>
                    <Badge colorScheme={getColorScheme(req.status)}>
                      {req.status}
                    </Badge>
                  </Td>
                  <Td>{req.date}</Td>
                </Tr>
              ))}
            </Tbody>
          ) : (
            <Tbody>
              <Tr>
                <Td colSpan={5} py={10} textAlign="center">
                  <VStack spacing={2}>
                    <Heading fontSize="sm" color="gray.500">
                      No recent requests found
                    </Heading>
                    <Text fontSize="sm" color="gray.400">
                      New requests will appear here
                    </Text>
                  </VStack>
                </Td>
              </Tr>
            </Tbody>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecentRequests;
