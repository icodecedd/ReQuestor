import {
  Badge,
  Box,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  Table,
  TableContainer,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  VStack,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { getActivityColor } from "@/utils/getColorScheme";
import { ActivityCategoryDropdown } from "@/components/dropdowns/ActivityCategoryDropdown";
import { ActivityTimeDropdown } from "@/components/dropdowns/ActivityTimeDropdown";
import { getTimeLabel } from "@/utils/formatTime";
import { useActivityStore } from "@/store/activityStore";
import { activityMeta } from "@/constants/activityLogsMeta";
import { toTitleCase } from "@/utils/toTitleCase";

const ActivityTable = () => {
  const { logs, loading, fetchLogs } = useActivityStore();

  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [timeFilter, setTimeFilter] = useState("All Time");

  const [searchFilter, setSearchFilter] = useState("");

  const filteredActivity = useMemo(() => {
    return logs.filter((log) => {
      const matchesCategory =
        categoryFilter === "All Categories"
          ? true
          : toTitleCase(log.category) === categoryFilter;

      const matchesTime =
        timeFilter === "All Time"
          ? true
          : getTimeLabel(log.timestamp) === timeFilter;

      const matchesSearch = searchFilter
        ? log.action.toLowerCase().includes(searchFilter.toLowerCase()) ||
          log.category.toLowerCase().includes(searchFilter.toLowerCase())
        : true;

      return matchesCategory && matchesTime && matchesSearch;
    });
  }, [logs, categoryFilter, timeFilter, searchFilter]);

  useEffect(() => {
    fetchLogs();
  }, []);

  return (
    <Box w="99.5%" mx="auto" p={8}>
      {/* Right: Search, Filter, Add Equipment */}
      <Flex align="flex-end" justify="flex-end" gap={3} w="100%">
        <InputGroup w="400px">
          <InputLeftElement color="gray.500">
            <FiSearch />
          </InputLeftElement>
          <Input
            placeholder="Search by action or category name"
            focusBorderColor="maroon"
            borderRadius="lg"
            borderColor="gray.400"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </InputGroup>

        {/*Filter Button*/}
        <ActivityCategoryDropdown onChange={setCategoryFilter} />
        <ActivityTimeDropdown onChange={setTimeFilter} />
      </Flex>

      {/* Table */}
      <Box mt={2}>
        <TableContainer borderRadius="xl" border="1px" color="gray.300">
          <Table
            variant="simple"
            borderTop="1px"
            color="gray.100"
            sx={{
              Th: { textAlign: "center", fontSize: "13px" },
              Td: { textAlign: "center", fontSize: "13px", py: 2 },
            }}
          >
            <Thead>
              <Tr>
                <Th fontSize="xs" color="gray.600" fontWeight="semibold" py={4}>
                  TIMESTAMP
                </Th>
                <Th fontSize="xs" color="gray.600" fontWeight="semibold">
                  USER
                </Th>
                <Th fontSize="xs" color="gray.600" fontWeight="semibold">
                  ACTION
                </Th>
                <Th fontSize="xs" color="gray.600" fontWeight="semibold">
                  TARGET
                </Th>
                <Th fontSize="xs" color="gray.600" fontWeight="semibold">
                  CATEGORY
                </Th>
                <Th fontSize="xs" color="gray.600" fontWeight="semibold">
                  DETAILS
                </Th>
              </Tr>
            </Thead>
            {loading ? (
              <Tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Tr key={i}>
                    {[1, 2, 3, 4, 5, 6].map((j) => (
                      <Td key={j} py={3}>
                        <Skeleton height="20px" width="90%" borderRadius="md" />
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            ) : filteredActivity.length > 0 ? (
              <Tbody>
                {filteredActivity.map((log) => {
                  const meta = activityMeta?.[log.category]?.[log.action] || {
                    title: "Unknown Activity",
                    description: `No metadata available for "${log.action}" on "${log.target}".`,
                  };
                  const { title, description } = meta;

                  const getTarget = () => {
                    if (log.category === "USERS") {
                      return `STU-${String(log.target_id).padStart(3, "0")}`;
                    } else if (log.category === "REQUESTS") {
                      return `REQ-${String(log.target_id).padStart(3, "0")}`;
                    } else if (log.category === "EQUIPMENT") {
                      return `EQ-${String(log.target_id).padStart(3, "0")}`;
                    }
                  };

                  return (
                    <Tr key={log.id} textColor="blackAlpha.900" bg="#f7f9fb">
                      <Td>{log.timestamp}</Td>
                      <Td>
                        {log.role === "Admin" ? "Admin System" : log.user}
                      </Td>
                      <Td>{title}</Td>
                      <Td>{getTarget()}</Td>
                      <Td>
                        <Badge
                          colorScheme={getActivityColor(log.category)}
                          variant={"outline"}
                          borderRadius="xl"
                          pl={2}
                          pr={2}
                          pb={0.5}
                        >
                          {log.category}
                        </Badge>
                      </Td>
                      <Td>{description}</Td>
                    </Tr>
                  );
                })}
              </Tbody>
            ) : (
              <Tbody>
                <Tr>
                  <Td colSpan={7} h="200px" textAlign="center">
                    <VStack spacing={2}>
                      <Heading fontSize="sm" color="gray.500">
                        No activity found
                      </Heading>
                      <Text fontSize="sm" color="gray.400">
                        {searchFilter
                          ? "Try a different search"
                          : "Try a different filter option or category name"}
                      </Text>
                    </VStack>
                  </Td>
                </Tr>
              </Tbody>
            )}
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default ActivityTable;
