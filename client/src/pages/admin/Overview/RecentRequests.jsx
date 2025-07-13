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
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";

const OverviewRecentRequests = () => {
  // TODO: Change With Real Data
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
      case "Rejected":
        return "red";
      default:
        return "gray";
    }
  };

  return (
    <Box
      overflow="hidden"
      bg="white"
      borderRadius="2xl"
      boxShadow="md"
      w="100%"
      h="397px"
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
      <TableContainer>
        <Table
          variant="simple"
          borderTop="1px"
          color="gray.100"
          sx={{
            th: { textAlign: "center", fontSize: "14px" },
            td: { textAlign: "center", fontSize: "14px" },
          }}
        >
          <Thead>
            <Tr bg="#f7f9fb">
              <Th>Request ID</Th>
              <Th>User</Th>
              <Th>Equipment</Th>
              <Th>Status</Th>
              <Th>Date</Th>
            </Tr>
          </Thead>
          <Tbody>
            {data?.length > 0 ? (
              data.map((req, index) => (
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
              ))
            ) : (
              <Tr>
                <Td>No Requests Yet</Td>
              </Tr>
            )}
          </Tbody>
        </Table>
      </TableContainer>
    </Box>
  );
};

export default OverviewRecentRequests;
