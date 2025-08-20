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
  Skeleton,
  Button,
} from "@chakra-ui/react";
import { NavLink } from "react-router-dom";
import { useRecentRequestsStore } from "@/store/recentStore";
import { useEffect } from "react";
import { getDateOnly } from "@/utils/getDate";
import { formatTimeOnly } from "@/utils/formatTime";
import { getRequestStatusColor } from "@/utils/getColorScheme";

const RecentRequests = () => {
  const { recentRequests, loading, fetchRecentRequests } =
    useRecentRequestsStore();

  const formatRequestsId = (id) => {
    return `REQ-${String(id).padStart(3, "0")}`;
  };

  useEffect(() => {
    fetchRecentRequests();
  }, [fetchRecentRequests]);

  const numberOfRequests = recentRequests.length;

  return (
    <Box
      bg="white"
      borderRadius="2xl"
      boxShadow="md"
      w="100%"
      h={numberOfRequests === 5 ? "100%" : "380px"}
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
                DATE
              </Th>
              <Th fontSize="xs" color="gray.600" fontWeight="semibold">
                TIME
              </Th>
              <Th fontSize="xs" color="gray.600" fontWeight="semibold">
                STATUS
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
          ) : recentRequests.length > 0 ? (
            <Tbody>
              {recentRequests.map((req, index) => (
                <Tr key={index} textColor="blackAlpha.900">
                  <Td textColor="#157fc5ff" fontWeight="medium">
                    {formatRequestsId(req.id)}
                  </Td>
                  <Td>{req.name}</Td>
                  <Td>
                    <Text mb={1}>{getDateOnly(req.date_use)}</Text>
                  </Td>
                  <Td>{`${formatTimeOnly(req.time_from)} - ${formatTimeOnly(
                    req.time_to
                  )}`}</Td>
                  <Td>
                    <Badge
                      colorScheme={getRequestStatusColor(req.status)}
                      borderRadius="xl"
                      pl={2}
                      pr={2}
                      pb={0.5}
                    >
                      {req.status}
                    </Badge>
                  </Td>
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
