import useEquipmentStore from "@/store/equipmentStore";
import {
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
  useToast,
} from "@chakra-ui/react";
import React, { useEffect, useState } from "react";
import { ModalDropdown } from "../dropdowns/ModalDropdown";
import { FiEdit } from "react-icons/fi";
import { getEqConditionColor } from "@/utils/getColorScheme";

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
  {
    name: "location",
    label: "Location",
    placeholder: "Enter equipment location",
  },
];

const statusOptions = ["Available", "In Use", "Reserved", "Under Repair"];
const conditionOptions = ["Excellent", "Good", "Fair", "Poor", "Broken"];

const UpdateEquipmentModal = ({ isOpen, onClose, equipment }) => {
  const updateEquipment = useEquipmentStore((state) => state.updateEquipment);
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

  useEffect(() => {
    if (equipment) {
      setForm({
        name: equipment.name,
        type: equipment.type,
        status: equipment.status,
        location: equipment.location,
        serial_number: equipment.serial_number,
        condition: equipment.condition,
        description: equipment.description,
      });
    }
  }, [equipment]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    console.log({ [name]: value });
  };

  const handleUpdate = async () => {
    const result = await updateEquipment(equipment.id, form);

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
              <FiEdit color="#800000" />
            </Box>
            <Box>
              <Text fontSize="lg" mt={0.5}>
                Update Equipment
              </Text>
              <Text color="gray.700" fontWeight="normal" fontSize="14px">
                Modify details or status of this equipment.
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
                General Info
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
                Additional Details
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {equipmentFields.map((field, index) => (
                  <FormControl isRequired mb={4} key={index}>
                    <FormLabel>{field.label}</FormLabel>
                    <Input
                      name={field.name}
                      value={form[`${field.name}`]}
                      placeholder={field.placeholder}
                      focusBorderColor="maroon"
                      borderRadius="xl"
                      borderColor="gray.400"
                      onChange={handleChange}
                    />
                  </FormControl>
                ))}
                <Flex gap={5}>
                  <ModalDropdown
                    value={form.condition}
                    onChange={(newCondition) =>
                      setForm({ ...form, condition: newCondition })
                    }
                    roles={conditionOptions}
                    w={206}
                    label="Condition"
                    placeholder="Select condition"
                  />
                  <FormControl>
                    <FormLabel>Selected Condition</FormLabel>
                    <Box
                      border="1px"
                      borderRadius="xl"
                      h="38px"
                      borderColor="gray.400"
                    >
                      <Badge
                        colorScheme={getEqConditionColor(form.condition)}
                        borderRadius="xl"
                        pl={2}
                        pr={2}
                        pb={0.5}
                        mt={2}
                        ml={2}
                      >
                        {form.condition || "No Selected Condition"}
                      </Badge>
                    </Box>
                  </FormControl>
                </Flex>
              </TabPanel>
              <TabPanel>
                <Box>
                  <Flex gap={5}>
                    <ModalDropdown
                      value={form.status}
                      onChange={(newStatus) =>
                        setForm({ ...form, status: newStatus })
                      }
                      roles={statusOptions}
                      w={206}
                      label="Status"
                      placeholder="Select status"
                      isRequired={false}
                    />
                    <FormControl mb={4}>
                      <FormLabel>Serial Number</FormLabel>
                      <Input
                        name="serial_number"
                        value={form.serial_number}
                        placeholder="Enter serial number"
                        focusBorderColor="maroon"
                        borderRadius="xl"
                        borderColor="gray.400"
                        onChange={handleChange}
                      />
                    </FormControl>
                  </Flex>
                  <FormControl>
                    <FormLabel>Description & Specifications</FormLabel>
                    <Textarea
                      focusBorderColor="maroon"
                      name="description"
                      value={form.description}
                      borderRadius="xl"
                      borderColor="gray.400"
                      placeholder="Equipment description, specifications, and additional details..."
                      onChange={handleChange}
                    />
                  </FormControl>
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
            _hover={{ bg: "#a12828" }}
            transition="background-color 0.2s ease-in-out"
            onClick={handleUpdate}
          >
            Update Equipment
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateEquipmentModal;
