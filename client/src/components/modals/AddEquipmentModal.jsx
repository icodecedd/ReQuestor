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
  Badge,
  Textarea,
  InputGroup,
  InputLeftElement,
  InputRightElement,
  Show,
} from "@chakra-ui/react";
import { FiAlertCircle, FiBox, FiHash, FiMapPin, FiTag } from "react-icons/fi";
import { ModalDropdown } from "@/components/dropdowns/ModalDropdown";
import { useState } from "react";
import useEquipmentStore from "@/store/equipmentStore";
import { getEqConditionColor, getEqStatusColor } from "@/utils/getColorScheme";

const equipmentFields = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter equipment name",
    icon: <FiBox />,
  },
  {
    name: "serial_number",
    label: "Serial Number",
    placeholder: "Enter serial number",
    icon: <FiHash />,
  },
  {
    name: "type",
    label: "Type",
    placeholder: "Enter equipment type",
    icon: <FiTag />,
  },
  {
    name: "location",
    label: "Location",
    placeholder: "Enter equipment location",
    icon: <FiMapPin />,
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
  const [errors, setErrors] = useState({
    name: false,
    type: false,
    location: false,
    serial_number: false,
  });

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Clear the error as soon as the field gets a value
    if (value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const showToast = (message, status) => {
    toast({
      title: message,
      status: status,
      duration: 2000,
      position: "top-right",
      variant: "subtle",
    });
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const result = await addEquipment(form);

      if (result.message.includes("All")) {
        setErrors({
          name: !form.name.trim(),
          type: !form.type.trim(),
          location: !form.location.trim(),
          serial_number: !form.serial_number.trim(),
          condition: !form.condition.trim(),
        });
        showToast(result.message, "error");
        return;
      }

      showToast(result.message, result.success ? "success" : "error");
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
    } catch (error) {
      showToast("An error occurred while adding equipment", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setForm({
      name: "",
      type: "",
      status: "Available",
      location: "",
      serial_number: "",
      condition: "",
      description: "",
    });

    setErrors({
      name: false,
      type: false,
      location: false,
      serial_number: false,
      condition: false,
    });

    onClose(); // actually close the modal
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="2xl"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent borderRadius="2xl" overflow="hidden">
        <ModalHeader>
          <Flex color="gray.900" gap={3} align="center" mb={3}>
            <Box
              bg="white"
              color="#f0f0f0ff"
              borderRadius="md"
              boxShadow="0 2px 8px rgba(0,0,0,0.12)"
              border="1px solid #e2e8f0"
              p={2}
              transition="all 0.3s ease"
              _hover={{
                transform: "scale(1.02)",
                boxShadow: "lg",
              }}
            >
              <FiBox color="#800000" />
            </Box>
            <Box>
              <Text fontSize="lg" mt={0.5}>
                Add New Equipment
              </Text>
              <Text color="gray.700" fontWeight="normal" fontSize="14px">
                Add new equipment to the inventory.
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
                  <FormControl
                    mb={4}
                    key={index}
                    isInvalid={errors[field.name]}
                  >
                    <FormLabel fontSize={14}>{field.label}</FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.400">
                        {field.icon}
                      </InputLeftElement>
                      <Input
                        name={field.name}
                        placeholder={field.placeholder}
                        focusBorderColor="maroon"
                        borderRadius="lg"
                        borderColor="gray.400"
                        onChange={handleChange}
                      />
                      {errors[field.name] && (
                        <InputRightElement>
                          <FiAlertCircle color="maroon" />
                        </InputRightElement>
                      )}
                    </InputGroup>
                  </FormControl>
                ))}
              </TabPanel>
              <TabPanel>
                {/* Condition Field */}
                <Flex gap={5}>
                  <ModalDropdown
                    value={form.condition}
                    onChange={(newCondition) =>
                      setForm({ ...form, condition: newCondition })
                    }
                    roles={conditionOptions}
                    w={"100%"}
                    label="Condition"
                    placeholder="Select condition"
                    isRequired={false}
                    isInvalid={errors.condition}
                  />
                  <FormControl>
                    <FormLabel fontSize={14}>Selected Condition</FormLabel>
                    <Box
                      border="1px"
                      borderRadius="lg"
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

                {/* Status Field */}
                <Flex gap={5} mt={4}>
                  <ModalDropdown
                    value={form.status}
                    onChange={(newStatus) =>
                      setForm({ ...form, status: newStatus })
                    }
                    roles={statusOptions}
                    w={"100%"}
                    label="Status (Optional)"
                    placeholder="Select status"
                    isRequired={false}
                  />
                  <FormControl>
                    <FormLabel fontSize={14}>Selected Status</FormLabel>
                    <Box
                      border="1px"
                      borderRadius="lg"
                      h="38px"
                      borderColor="gray.400"
                    >
                      <Badge
                        colorScheme={getEqStatusColor(form.status)}
                        borderRadius="xl"
                        pl={2}
                        pr={2}
                        pb={0.5}
                        mt={2}
                        ml={2}
                      >
                        {form.status || "No Selected Condition"}
                      </Badge>
                    </Box>
                  </FormControl>
                </Flex>
                <FormControl mt={4}>
                  <FormLabel fontSize={14}>
                    Description & Specifications (Optional)
                  </FormLabel>
                  <Textarea
                    name="description"
                    focusBorderColor="maroon"
                    borderRadius="lg"
                    h="140px"
                    borderColor="gray.400"
                    placeholder="Equipment description, specifications, and additional details..."
                    onChange={handleChange}
                  />
                </FormControl>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter borderTop="1px solid #e2e8f0">
          <Button
            mr={3}
            variant="outline"
            borderRadius="lg"
            onClick={handleClose}
            _hover={{ bg: "#f7eaea" }}
          >
            Close
          </Button>
          <Button
            isLoading={isSubmitting}
            loadingText="Creating..."
            bg="#800000"
            color="white"
            borderRadius="lg"
            _hover={{ bg: "#a12828" }}
            transition="background-color 0.2s ease-in-out"
            onClick={handleSubmit}
          >
            Create Equipment
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddEquipmentModal;
