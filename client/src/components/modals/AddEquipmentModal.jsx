import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  useToast,
  Box,
  Divider,
} from "@chakra-ui/react";
import { FiUserPlus } from "react-icons/fi";
import { ModalDropdown } from "@/components/dropdowns/ModalDropdown";
import { useState } from "react";
import useEquipmentStore from "@/store/equipmentStore";

const equipmentFields = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter equipment name",
  },
  {
    name: "type",
    label: "Type",
    placeholder: "Enter equipment type",
  },
];

const statusOptions = ["Available", "In Use", "Reserved", "Under Repair"];
const conditionOptions = ["Excellent", "Good", "Fair", "Poor", "Broken"];

const AddEquipmentModal = ({ isOpen, onClose }) => {
  const addEquipment = useEquipmentStore((state) => state.addEquipment);
  const toast = useToast();

  const [form, setForm] = useState({
    name: "",
    type: "",
    status: "Available",
    location: "",
    serial_number: "",
    condition: "",
    description: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    console.log({ [name]: value });
  };

  const handleSubmit = async () => {
    const result = await addEquipment(form); // Direct call to Zustand store

    toast({
      title: result.success ? "Success" : "Error",
      description: result.message,
      status: result.success ? "success" : "error",
      duration: 3000,
      isClosable: true,
      variant: "subtle",
      position: "top-right",
    });

    if (result.success) {
      onClose();
      setForm({
        name: "",
        type: "",
        status: "Available",
        location: "",
        serial_number: "",
        condition: "",
        description: "",
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent borderRadius="xl" overflow="hidden">
        <ModalHeader>
          <Flex color="gray.900" gap={3} align="center" mb={3}>
            <Box
              bg="white"
              color="#f0f0f0ff"
              borderRadius="md"
              boxShadow="0 2px 8px rgba(0,0,0,0.12)"
              border="1px solid #e2e8f0"
              p={2}
            >
              <FiUserPlus color="#800000" />
            </Box>
            <Box>
              <Text fontSize="lg" mt={0.5}>
                Add New Equipment
              </Text>
              <Text color="gray.700" fontWeight="normal" fontSize="14px">
                Create a new user account for the system.
              </Text>
            </Box>
          </Flex>

          <Divider w="110%" ml={-6} />
        </ModalHeader>
        <ModalCloseButton
          size="md"
          _hover={{ bg: "#f7eaea" }}
          borderRadius="lg"
        />
        <ModalBody>
          <Tabs isFitted variant="unstyle" size="sm">
            <TabList bg="#e9e9e9ff" borderRadius="lg" p={1.5} pr={1.5} pl={1.5}>
              <Tab
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
                Account Details
              </Tab>
              <Tab
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
                Role & Status
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {equipmentFields.map((field, index) => (
                  <FormControl isRequired mb={4} key={index}>
                    <FormLabel>{field.label}</FormLabel>
                    <Input
                      name={field.name}
                      placeholder={field.placeholder}
                      focusBorderColor="maroon"
                      borderRadius="xl"
                      borderColor="gray.400"
                      onChange={handleChange}
                    />
                  </FormControl>
                ))}
                <FormControl isRequired mb={4}>
                  <FormLabel>Location</FormLabel>
                  <Input
                    name="location"
                    placeholder="Enter equipment location"
                    focusBorderColor="maroon"
                    borderRadius="xl"
                    borderColor="gray.400"
                    onChange={handleChange}
                  />
                </FormControl>
                <Flex>
                  <ModalDropdown
                    value={form.status}
                    onChange={(newStatus) =>
                      setForm({ ...form, status: newStatus })
                    }
                    roles={conditionOptions}
                    w="238px"
                    label="Status"
                    placeholder="Select status"
                    isRequired={false}
                  />
                  <Box></Box>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Box h="170px">
                  <Flex gap={5}>
                    <ModalDropdown
                      value={form.role}
                      onChange={(newRole) =>
                        setForm({ ...form, role: newRole })
                      }
                      roles={statusOptions}
                      w="238px"
                      label="Role"
                      placeholder="Select role"
                    />
                  </Flex>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            variant="outline"
            borderRadius="xl"
            onClick={onClose}
            _hover={{ bg: "#f7eaea" }}
          >
            Close
          </Button>
          <Button
            bg="#800000"
            color="white"
            borderRadius="xl"
            _hover={{ bg: "#832222" }}
            onClick={handleSubmit}
          >
            Create User
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEquipmentModal;
