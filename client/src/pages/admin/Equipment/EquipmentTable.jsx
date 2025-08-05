import {
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Input,
  InputGroup,
  InputLeftElement,
  Skeleton,
  Tab,
  Table,
  TableCaption,
  TableContainer,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Tbody,
  Td,
  Text,
  Th,
  Thead,
  Tr,
  useDisclosure,
  VStack,
} from "@chakra-ui/react";
import { CategoryDropdown } from "@/components/dropdowns/CategoryDropdown";
import { EquipmentStatusDropdown } from "@/components/dropdowns/EquipmentStatusDropdown";
import useEquipmentStore from "@/store/equipmentStore";
import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import EquipmentActionButton from "@/components/buttons/EquipmentActionButton";
import ViewEquipmentModal from "@/components/modals/ViewEquipmentModal";
import { getEqStatusColor, getEqConditionColor } from "@/utils/getColorScheme";
import AddEquipmentModal from "@/components/modals/AddEquipmentModal";
import UpdateEquipmentModal from "@/components/modals/UpdateEquipmentModal";
import DeleteEquipmentModal from "@/components/modals/DeleteEquipmentModal";

const formatEquipmentId = (id) => {
  return `EQ-${String(id).padStart(3, "0")}`;
};

const tabConfigs = [
  {
    title: "All Equipment",
    filter: () => true,
  },
  {
    title: "Available",
    filter: (eq) => eq.status === "Available",
  },
  {
    title: "In Use",
    filter: (eq) => eq.status === "In Use",
  },
  {
    title: "Reserved",
    filter: (eq) => eq.status === "Reserved",
  },
];

const EquipmentTable = () => {
  const { equipment, loading, fetchEquipment } = useEquipmentStore();

  const [statusFilter, setStatusFilter] = useState("All Status");
  const [categoryFilter, setCategoryFilter] = useState("All Categories");
  const [searchFilter, setSearchFilter] = useState("");
  const [selectedEquipment, setSelectedEquipment] = useState("");

  const filteredEquipment = useMemo(() => {
    return equipment.filter((eq) => {
      const matchesStatus =
        statusFilter === "All Status" ? true : eq.status === statusFilter;

      const matchesCategory =
        categoryFilter === "All Categories" ? true : eq.type === categoryFilter;

      const matchesSearch = searchFilter
        ? eq.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
          formatEquipmentId(eq.id)
            .toLowerCase()
            .includes(searchFilter.toLowerCase())
        : true;

      return matchesStatus && matchesCategory && matchesSearch;
    });
  }, [equipment, statusFilter, categoryFilter, searchFilter]);

  useEffect(() => {
    fetchEquipment();
  }, []);

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const handleEdit = (eq) => {
    setSelectedEquipment(eq);
    onEditOpen();
  };

  const handleViewDetails = (eq) => {
    setSelectedEquipment(eq);
    onViewOpen();
  };

  const handleDelete = (eq) => {
    setSelectedEquipment(eq);
    onDeleteOpen();
  };

  return (
    <Box w="99.5%" mx="auto" p={8}>
      {/* Right: Search, Filter, Add Equipment */}
      <Flex align="flex-end" justify="flex-end" gap={3} w="100%">
        <InputGroup w="400px">
          <InputLeftElement color="gray.500">
            <FiSearch />
          </InputLeftElement>
          <Input
            placeholder="Search by equipment id or name"
            focusBorderColor="maroon"
            borderRadius="lg"
            borderColor="gray.400"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </InputGroup>

        {/*Filter Button*/}
        <EquipmentStatusDropdown onChange={setStatusFilter} />
        <CategoryDropdown onChange={setCategoryFilter} />

        {/*Add Equipment Button*/}
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
          Add Equipment
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
            {tabConfigs.map((tab, index) => {
              const filteredTabData = useMemo(() => {
                return filteredEquipment.filter(tab.filter);
              }, [equipment, statusFilter, categoryFilter, searchFilter]);
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
                            EQUIPMENT ID
                          </Th>
                          <Th
                            fontSize="xs"
                            color="gray.600"
                            fontWeight="semibold"
                          >
                            NAME
                          </Th>
                          <Th
                            fontSize="xs"
                            color="gray.600"
                            fontWeight="semibold"
                          >
                            CATEGORY
                          </Th>
                          <Th
                            fontSize="xs"
                            color="gray.600"
                            fontWeight="semibold"
                          >
                            ROOM
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
                            CONDITION
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
                              {[1, 2, 3, 4, 5, 6, 7].map((j) => (
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
                          {filteredTabData.map((eq) => (
                            <Tr
                              key={eq.id}
                              textColor="blackAlpha.900"
                              bg="#f7f9fb"
                            >
                              <Td>{formatEquipmentId(eq.id)}</Td>
                              <Td>{eq.name}</Td>
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
                                  {eq.type}
                                </Badge>
                              </Td>
                              <Td>{eq.location}</Td>
                              <Td>
                                <Badge
                                  bg={getEqStatusColor(eq.status)}
                                  color="white"
                                  borderRadius="xl"
                                  pl={2}
                                  pr={2}
                                  pb={0.5}
                                >
                                  {eq.status}
                                </Badge>
                              </Td>
                              <Td>
                                <Badge
                                  colorScheme={getEqConditionColor(
                                    eq.condition
                                  )}
                                  borderRadius="xl"
                                  pl={2}
                                  pr={2}
                                  pb={0.5}
                                >
                                  {eq.condition}
                                </Badge>
                              </Td>
                              <Td>
                                <EquipmentActionButton
                                  onEdit={() => handleEdit(eq)}
                                  onViewDetails={() => handleViewDetails(eq)}
                                  onDelete={() => handleDelete(eq)}
                                />
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      ) : (
                        <Tbody>
                          <Tr>
                            <Td colSpan={7} h="200px" textAlign="center">
                              <VStack spacing={2}>
                                <Heading fontSize="sm" color="gray.500">
                                  No equipment found
                                </Heading>
                                <Text fontSize="sm" color="gray.400">
                                  {searchFilter
                                    ? "Try a different search"
                                    : "Add a new equipment to get started"}
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
      
      {/* Modals will be placed here */}
      <AddEquipmentModal isOpen={isAddOpen} onClose={onAddClose} />
      <UpdateEquipmentModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        equipment={selectedEquipment}
      />
      <ViewEquipmentModal
        isOpen={isViewOpen}
        onClose={onViewClose}
        equipment={selectedEquipment}
      />
      <DeleteEquipmentModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        equipment={selectedEquipment}
      />
    </Box>
  );
};

export default EquipmentTable;
