import { CategoryDropdown } from "@/components/dropdowns/CategoryDropdown";
import { EquipmentStatusDropdown } from "@/components/dropdowns/EquipmentStatusDropdown";
import { useEquipmentStore } from "@/store/equipmentStore";
import { equipment } from "@/data/equipment";
import {
  Badge,
  Box,
  Button,
  Flex,
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
  Th,
  Thead,
  Tr,
  useDisclosure,
} from "@chakra-ui/react";
import { useEffect, useMemo, useState } from "react";
import { FiSearch } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import EquipmentActionButton from "@/components/buttons/EquipmentActionButton";
import ViewEquipmentModal from "@/components/modals/ViewEquipmentModal";
import {
  getEqStatusColor,
  getEqConditionColor,
} from "@/utils/getColorScheme";

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
  {
    /* Global State of Users */
  }

  // const { equipment, loading, fetchEquipment } = useEquipmentStore();

  // useEffect(() => {
  //   fetchEquipment();
  // }, []);

  {
    /* Equipment Filters */
  }
  const [statusFilter, setStatusFilter] = useState("All Status");

  const [categoryFilter, setCategoryFilter] = useState("All Categories");

  const [searchFilter, setSearchFilter] = useState("");

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

  const [selectedEquipment, setSelectedEquipment] = useState("");

  const {
    isOpen: isViewOpen,
    onOpen: onViewOpen,
    onClose: onViewClose,
  } = useDisclosure();

  const handleViewDetails = (eq) => {
    setSelectedEquipment(eq);
    onViewOpen();
  };

  return (
    <Box w="99.5%" mx="auto" p={8}>
      {/* Right: Search, Filter, Add User */}
      <Flex align="flex-end" justify="flex-end" gap={3} w="100%">
        <InputGroup w="400px">
          <InputLeftElement color="gray.500">
            <FiSearch />
          </InputLeftElement>
          <Input
            placeholder="Search by equipment id or name"
            focusBorderColor="maroon"
            borderRadius="xl"
            borderColor="gray.400"
            value={searchFilter}
            onChange={(e) => setSearchFilter(e.target.value)}
          />
        </InputGroup>

        {/*Filter Button*/}
        <EquipmentStatusDropdown onChange={setStatusFilter} />
        <CategoryDropdown onChange={setCategoryFilter} />

        {/*Add User Button*/}
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
                      size="sm"
                      sx={{
                        Th: { textAlign: "center", fontSize: "14px" },
                        Td: { textAlign: "center", fontSize: "14px" },
                      }}
                    >
                      <Thead h="50px">
                        <Tr bg="#f7f9fb">
                          <Th>Equipment ID</Th>
                          <Th>Name</Th>
                          <Th>Category</Th>
                          <Th>Location</Th>
                          <Th>Status</Th>
                          <Th>Condition</Th>
                          <Th>Action</Th>
                        </Tr>
                      </Thead>
                      {false ? (
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
                                  colorScheme={getEqConditionColor(eq.condition)}
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
                                  onViewDetails={() => handleViewDetails(eq)}
                                />
                              </Td>
                            </Tr>
                          ))}
                        </Tbody>
                      ) : (
                        <TableCaption
                          mt={20}
                          mb={20}
                          fontSize="14px"
                          fontWeight="bold"
                        >
                          No recent user to display.
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
      {/* Modals will be placed here */}
      <ViewEquipmentModal
        isOpen={isViewOpen}
        onClose={onViewClose}
        equipment={selectedEquipment}
      />
    </Box>
  );
};

export default EquipmentTable;
