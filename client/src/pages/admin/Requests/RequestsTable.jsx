import RequestActionButton from "@/components/buttons/RequestActionButton";
import { CategoryDropdown } from "@/components/dropdowns/CategoryDropdown";
import { RequestsStatusDropdown } from "@/components/dropdowns/RequestsStatusDropdown";
import AddRequestModal from "@/components/modals/AddRequestModal";
import CancelRequestModal from "@/components/modals/CancelRequestModal";
import MarkRequestModal from "@/components/modals/MarkRequestModal";
import ViewRequestModal from "@/components/modals/ViewRequestModal";
import { useRequestsStore } from "@/store/requestsStore";
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
  useDisclosure,
  Tooltip,
  VStack,
  HStack,
  IconButton,
  Heading,
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
    title: "Approved",
    filter: (req) => req.status === "Approved",
  },
  {
    title: "Rejected",
    filter: (req) => req.status === "Rejected",
  },
  {
    title: "Completed",
    filter: (req) => req.status === "Completed",
  },
  {
    title: "Cancelled",
    filter: (req) => req.status === "Cancelled",
  },
];

const RequestsTable = () => {
  const { requests, loading, fetchRequests } = useRequestsStore();
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedRequest, setSelectedRequest] = useState("");

  const filteredRequests = useMemo(() => {
    return requests.filter((req) => {
      const matchesStatus =
        statusFilter === "All Status" ? true : req.status === statusFilter;

      // finds the information about specific equipment
      const reqEquipment = req.equipment_list.map((eq) => eq.equipment_type);

      const matchesCategory =
        categoryFilter === "All Categories"
          ? true
          : reqEquipment?.some((eq) => eq === categoryFilter);

      const matchesSearch = searchFilter
        ? req?.username.toLowerCase().includes(searchFilter.toLowerCase()) ||
          formatRequestsId(req.id)
            .toLowerCase()
            .includes(searchFilter.toLowerCase())
        : true;

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [requests, statusFilter, categoryFilter, searchFilter]);

  useEffect(() => {
    fetchRequests();
  }, []);

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();

  const {
    isOpen: isCancelOpen,
    onOpen: onCancelOpen,
    onClose: onCancelClose,
  } = useDisclosure();

  const {
    isOpen: isMarkCompleteOpen,
    onOpen: onMarkCompleteOpen,
    onClose: onMarkCompleteClose,
  } = useDisclosure();

  const handleViewDetails = (req) => {
    setSelectedRequest(req);
    onViewOpen();
  };

  const handleCancel = (req) => {
    setSelectedRequest(req);
    onCancelOpen();
  };

  const handleMarkComplete = (req) => {
    setSelectedRequest(req);
    onMarkCompleteOpen();
  };

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
            borderRadius="lg"
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
          borderRadius="lg"
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
        <Tabs isFitted variant="unstyle" size="sm">
          <TabList bg="#e9e9e9ff" borderRadius="lg" p={1.5} pr={1.5} pl={1.5}>
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
            {tabConfigs.map((tab, index) => {
              const filteredTabData = useMemo(() => {
                return filteredRequests.filter(tab.filter);
              }, [requests, statusFilter, categoryFilter, searchFilter]);
              return (
                <TabPanel key={index} mt={2} p={0}>
                  <TableContainer
                    borderRadius="xl"
                    border="1px"
                    color="gray.300"
                  >
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
                          <Th
                            fontSize="xs"
                            color="gray.600"
                            fontWeight="semibold"
                            py={4}
                          >
                            Request ID
                          </Th>
                          <Th
                            fontSize="xs"
                            color="gray.600"
                            fontWeight="semibold"
                          >
                            Name
                          </Th>
                          <Th
                            fontSize="xs"
                            color="gray.600"
                            fontWeight="semibold"
                          >
                            SECTION
                          </Th>
                          <Th
                            fontSize="xs"
                            color="gray.600"
                            fontWeight="semibold"
                          >
                            FACULTY-IN-CHARGE
                          </Th>
                          <Th
                            fontSize="xs"
                            color="gray.600"
                            fontWeight="semibold"
                          >
                            EQUIPMENT
                          </Th>
                          <Th
                            fontSize="xs"
                            color="gray.600"
                            fontWeight="semibold"
                          >
                            DATE & TIME
                          </Th>
                          <Th
                            fontSize="xs"
                            color="gray.600"
                            fontWeight="semibold"
                          >
                            STATUS
                          </Th>
                          <Th
                            fontSize="xs"
                            color="gray.600"
                            fontWeight="semibold"
                          >
                            ACTIONS
                          </Th>
                        </Tr>
                      </Thead>
                      {loading ? (
                        <Tbody>
                          {[1, 2, 3, 4, 5].map((i) => (
                            <Tr key={i}>
                              {[1, 2, 3, 4, 5, 6, 7, 8].map((j) => (
                                <Td key={j} py={3}>
                                  <Skeleton
                                    height="20px"
                                    width="90%"
                                    borderRadius="md"
                                  />
                                </Td>
                              ))}
                            </Tr>
                          ))}
                        </Tbody>
                      ) : filteredTabData.length > 0 ? (
                        <Tbody>
                          {filteredTabData.map((req) => (
                            <Tr
                              key={req.id}
                              textColor="blackAlpha.900"
                              bg="#f7f9fb"
                            >
                              <Td>{formatRequestsId(req.id)}</Td>
                              <Td>{req.name}</Td>
                              <Td>{req.course_section}</Td>
                              <Td>{req.faculty_in_charge}</Td>
                              <Td>
                                <VStack>
                                  {req.equipment_list.map((eq, index) => (
                                    <Badge
                                      key={index}
                                      color="black"
                                      border="1px"
                                      borderColor="gray.300"
                                      borderRadius="xl"
                                      pl={2}
                                      pr={2}
                                      pb={0.5}
                                    >
                                      {eq.equipment_name}
                                    </Badge>
                                  ))}
                                </VStack>
                              </Td>
                              <Td>
                                <Text mb={1}>{getDateOnly(req.date_use)}</Text>
                                <Text>
                                  {`${formatTime(req.time_from)} - ${formatTime(
                                    req.time_to
                                  )}`}
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
                              <Td>
                                <RequestActionButton
                                  status={req.status}
                                  onViewDetails={() => handleViewDetails(req)}
                                  onCancel={() => handleCancel(req)}
                                  onMarkComplete={() => handleMarkComplete(req)}
                                />
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      ) : (
                        <Tbody>
                          <Tr>
                            <Td colSpan={8} h="200px" textAlign="center">
                              <VStack spacing={2}>
                                <Heading fontSize="sm" color="gray.500">
                                  No requests found
                                </Heading>
                                <Text fontSize="sm" color="gray.400">
                                  {searchFilter
                                    ? "Try a different search"
                                    : "Add a new request to get started"}
                                </Text>
                              </VStack>
                            </Td>
                          </Tr>
                        </Tbody>
                      )}
                    </Table>
                  </TableContainer>
                </TabPanel>
              );
            })}
          </TabPanels>
        </Tabs>
      </Box>
      <AddRequestModal isOpen={isAddOpen} onClose={onAddClose} />
      <ViewRequestModal
        isOpen={isViewOpen}
        onClose={onViewClose}
        request={selectedRequest}
      />
      <CancelRequestModal
        isOpen={isCancelOpen}
        onClose={onCancelClose}
        request={selectedRequest}
      />
      <MarkRequestModal
        isOpen={isMarkCompleteOpen}
        onClose={onMarkCompleteClose}
        request={selectedRequest}
      />
    </Box>
  );
};

export default RequestsTable;
