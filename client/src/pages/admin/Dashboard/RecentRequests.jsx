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

  const { /*recentRequests,*/ loading, fetchRecentRequests } =
    useRecentRequestsStore();

  useEffect(() => {
    fetchRecentRequests();
  }, [fetchRecentRequests]);

  // if (loading) {
  //   return <Skeleton height="400px" width="100%" borderRadius="xl" mx="auto" />;
  // }

  return (
    <Box
      overflow="hidden"
      bg="white"
      borderRadius="2xl"
      boxShadow="md"
      w="100%"
      h="100%"
    >
      <Flex justify="space-between" p={5}>
        <VStack>
          <Heading size="md" mb={-2}>
            Recent Requests
          </Heading>
          <Text fontSize="13px" textColor="gray.500">
            Latest equipment requests
          </Text>
        </VStack>
        <NavLink to="/dashboard/requests">
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
            <Tr bg="#f7f9fb">
              <Th w="20%">Request ID</Th>
              <Th w="20%">User</Th>
              <Th w="20%">Equipment</Th>
              <Th w="20%">Status</Th>
              <Th w="20%">Date</Th>
            </Tr>
          </Thead>
          {loading ? (
            <TableCaption mt={3}>
              {[1, 2, 3, 4, 5].map((i) => (
                <Skeleton
                  key={i}
                  height="41px"
                  width="95%"
                  borderRadius="xl"
                  mx="auto"
                  mb={2}
                />
              ))}
            </TableCaption>
          ) : data.length > 0 ? (
            <Tbody>
              {data.map((req, index) => (
                <Tr key={index} textColor="blackAlpha.900">
                  <Td textColor="#157fc5ff" fontWeight="medium">
                    #{req.id}
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
            <TableCaption mt={20} fontSize="14px" fontWeight="bold">
              No recent requests to display.
            </TableCaption>
          )}
        </Table>
      </TableContainer>
    </Box>
  );
};

export default RecentRequests;
