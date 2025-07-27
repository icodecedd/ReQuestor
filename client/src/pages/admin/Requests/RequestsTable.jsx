import { CategoryDropdown } from "@/components/dropdowns/CategoryDropdown";
import { RequestsStatusDropdown } from "@/components/dropdowns/RequestsStatusDropdown";
import useEquipmentStore from "@/store/equipmentStore";
import { useRequestsStore } from "@/store/requestsStore";
import useUserStore from "@/store/usersStore";
import { formatTime } from "@/utils/formatTime";
import { getRequestStatusColor } from "@/utils/getColorScheme";
import { getDateOnly } from "@/utils/getDate";
import {
  Box,
  Flex,
  Input,
  InputGroup,
  InputLeftElement,
  Tab,
  Table,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Thead,
  Tbody,
  TableCaption,
  TableContainer,
  Td,
  Tr,
  Th,
  Badge,
  Skeleton,
  Button,
  Text,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";

const formatRequestsId = (id) => {
  return `REQ-${String(id).padStart(3, "0")}`;
};

const tabConfigs = [
  {
    title: "All Requests",
    filter: () => true,
  },
  {
    title: "Pending",
    filter: (req) => req.status === "Pending",
  },
  {
    title: "Approved",
    filter: (req) => req.status === "Approved",
  },
  {
    title: "Rejected",
    filter: (req) => req.status === "Rejected",
  },
];

const RequestsTable = () => {
  const { requests, loading, fetchRequests } = useRequestsStore();
  const { equipment, fetchEquipment } = useEquipmentStore();
  const { users, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchRequests();
    fetchEquipment();
    fetchUsers();
  }, []);

  const [statusFilter, setStatusFilter] = useState("All Status");

  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const [searchFilter, setSearchFilter] = useState("");

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesStatus =
        statusFilter === "All Status" ? true : req.status === statusFilter;

      // finds the information about specific equipment
      const reqEquipment = equipment.find((eq) => eq.id === req.equipment_id);

      const reqUser = users.find((user) => user.id === req.user_id);

      const matchesCategory =
        categoryFilter === "All Categories"
          ? true
          : reqEquipment?.type === categoryFilter;

      const matchesSearch = searchFilter
        ? reqUser?.username
            .toLowerCase()
            .includes(searchFilter.toLowerCase()) ||
          formatRequestsId(req.id)
            .toLowerCase()
            .includes(searchFilter.toLowerCase())
        : true;

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [requests, equipment, statusFilter, categoryFilter, searchFilter]);

  const [selectedRequest, setSelectedRequest] = useState("");

  const tabData = useMemo(() => {
    return tabConfigs.map(({ filter }) => filteredRequests.filter(filter));
  }, [filteredRequests]);

  const usersMap = useMemo(
    () => Object.fromEntries(users.map((u) => [u.id, u])),
    [users]
  );

  const equipmentMap = useMemo(
    () => Object.fromEntries(equipment.map((e) => [e.id, e])),
    [equipment]
  );

  return (
    <Box w="99.5%" mx="auto" p={8}>
      <Flex align="flex-end" justify="flex-end" gap={3} w="100%">
        <InputGroup w="400px">
          <InputLeftElement color="gray.500">
            <FiSearch />
          </InputLeftElement>
          <Input
            placeholder="Search by request id or user"
            focusBorderColor="maroon"
            borderRadius="xl"
            borderColor="gray.400"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </InputGroup>

        {/*Filter Button*/}
        <RequestsStatusDropdown onChange={setStatusFilter} />
        <CategoryDropdown onChange={setCategoryFilter} />

        {/*Add Request Button*/}
        <Button
          variant="primary"
          bg="#800000"
          color="white"
          borderRadius="xl"
          _hover={{ bg: "#a12828" }}
          transition="background-color 0.2s ease-in-out"
          gap={1}
          p={3}
          fontSize="95%"
          w="160px"
          onClick={() => onAddOpen()}
        >
          <IoAdd size="25px" />
          Add Request
        </Button>
      </Flex>
      <Box mt={2}>
        <Tabs variant="unstyle" size="sm">
          <TabList
            bg="#e9e9e9ff"
            borderRadius="lg"
            display="inline-flex"
            p={1.5}
            pr={1.5}
            pl={1.5}
          >
            {tabConfigs.map((tab, index) => {
              return (
                <Tab
                  key={index}
                  _selected={{
                    bg: "white",
                    color: "black",
                    borderRadius: "md",
                    boxShadow: "0 0.5px 1px rgba(0, 0, 0, 0.15)",
                  }}
                  borderRadius="md"
                  color="#71717e"
                  fontWeight="bold"
                >
                  {tab.title}
                </Tab>
              );
            })}
          </TabList>
          <TabPanels>
            {tabData.map((tab, index) => {
              return (
                <TabPanel key={index} mt={2} p={0}>
                  <TableContainer
                    borderRadius="xl"
                    border="1px"
                    color="gray.300"
                  >
                    <Table
                      variant="simple"
                      size="sm"
                      sx={{
                        Th: { textAlign: "center", fontSize: "14px" },
                        Td: { textAlign: "center", fontSize: "14px" },
                      }}
                    >
                      <Thead h="50px">
                        <Tr bg="#f7f9fb">
                          <Th>Request ID</Th>
                          <Th>User</Th>
                          <Th>Section</Th>
                          <Th>Faculty-In-Charge</Th>
                          <Th>Equipment</Th>
                          <Th>Date & Time</Th>
                          <Th>Status</Th>
                          <Th>Action</Th>
                        </Tr>
                      </Thead>
                      {loading ? (
                        <TableCaption mt={3}>
                          {[1, 2].map((i) => (
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
                      ) : tab.length > 0 ? (
                        <Tbody>
                          {tab.map((req) => {
                            const user = usersMap[req.user_id];
                            const equip = equipmentMap[req.equipment_id];
                            return (
                              <Tr
                                key={req.id}
                                textColor="blackAlpha.900"
                                bg="#f7f9fb"
                              >
                                <Td>{formatRequestsId(req.id)}</Td>
                                <Td>{user?.username}</Td>
                                <Td>{req.course_section}</Td>
                                <Td>{req.faculty_in_charge}</Td>
                                <Td>
                                  <Badge
                                    color="black"
                                    border="1px"
                                    borderColor="gray.300"
                                    borderRadius="xl"
                                    pl={2}
                                    pr={2}
                                    pb={0.5}
                                  >
                                    {equip?.name}
                                  </Badge>
                                </Td>
                                <Td>
                                  <Text mb={1}>
                                    {getDateOnly(req.date_use)}
                                  </Text>
                                  <Text>
                                    {`${formatTime(
                                      req.time_from
                                    )} - ${formatTime(req.time_to)}`}
                                  </Text>
                                </Td>
                                <Td>
                                  <Badge
                                    colorScheme={getRequestStatusColor(
                                      req.status
                                    )}
                                    borderRadius="xl"
                                    pl={2}
                                    pr={2}
                                    pb={0.5}
                                  >
                                    {req.status}
                                  </Badge>
                                </Td>
                                <Td>Action</Td>
                              </Tr>
                            );
                          })}
                        </Tbody>
                      ) : (
                        <TableCaption
                          mt={20}
                          mb={20}
                          fontSize="14px"
                          fontWeight="bold"
                        >
                          No requests to display.
                        </TableCaption>
                      )}
                    </Table>
                  </TableContainer>
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default RequestsTable;
