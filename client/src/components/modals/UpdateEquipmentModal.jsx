import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Textarea,
  Step,
  StepDescription,
  StepIcon,
  StepIndicator,
  StepNumber,
  StepSeparator,
  StepStatus,
  StepTitle,
  Stepper,
  useSteps,
  Grid,
  GridItem,
  VStack,
  Badge,
  SimpleGrid,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import {
  FiHash,
  FiBox,
  FiMapPin,
  FiTag,
  FiFilePlus,
  FiTool,
  FiLayers,
  FiActivity,
  FiInfo,
  FiAlignLeft,
} from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/utils/toast";
import { getEqConditionColor, getEqStatusColor } from "@/utils/getColorScheme";
import { ModalDropdown } from "../dropdowns/ModalDropdown";
import { useEquipmentStore } from "@/store/equipmentStore";
import _ from "lodash";

const MAROON = "#800000";
const MAROON_HOVER = "#A52A2A";
const DARK_GRAY = "#616161";

const equipmentFields = [
  {
    name: "name",
    label: "Equipment Name",
    placeholder: "Enter equipment name",
    icon: <FiBox />,
    errorMessage: "Please enter an equipment name",
  },
  {
    name: "serial_number",
    label: "Serial Number",
    placeholder: "Enter serial number",
    icon: <FiHash />,
    errorMessage: "Please enter a serial number",
  },
  {
    name: "type",
    label: "Type",
    placeholder: "Enter equipment type",
    icon: <FiTag />,
    errorMessage: "Please enter an equipment type",
  },
  {
    name: "location",
    label: "Location",
    placeholder: "Enter equipment location",
    icon: <FiMapPin />,
    errorMessage: "Please enter an equipment location",
  },
];

const statusOptions = ["Available", "In Use", "Reserved", "Under Repair"];
const conditionOptions = ["Excellent", "Good", "Fair", "Poor", "Broken"];

const UpdateEquipmentModal = ({ isOpen, onClose, equipment }) => {
  const updateEquipment = useEquipmentStore((state) => state.updateEquipment);
  const setUserId = useEquipmentStore((state) => state.setUserId);
  const { user } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [form, setForm] = useState({
    name: "",
    type: "",
    status: "Available",
    location: "",
    serial_number: "",
    condition: "",
    description: "",
  });

  const compareForm = {
    name: equipment.name || "",
    type: equipment.type || "",
    status: equipment.status || "Available",
    location: equipment.location || "",
    serial_number: equipment.serial_number || "",
    condition: equipment.condition || "",
    description: equipment.description || "",
  };

  const [errors, setErrors] = useState({
    name: false,
    type: false,
    location: false,
    serial_number: false,
  });

  useEffect(() => {
    if (equipment) {
      setForm({
        name: equipment.name || "",
        type: equipment.type || "",
        status: equipment.status || "Available",
        location: equipment.location || "",
        serial_number: equipment.serial_number || "",
        condition: equipment.condition || "",
        description: equipment.description || "",
      });
    }
  }, [equipment]);

  const steps = [
    {
      title: "General Information",
      description: "Fill in general information",
    },
    {
      title: "Additional Information",
      description: "Fill in additional information",
    },
    {
      title: "Equipment Summary",
      description: "Summary of the equipment",
    },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (value.trim()) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleClose = () => {
    setForm({
      name: equipment.name || "",
      type: equipment.type || "",
      status: equipment.status || "Available",
      location: equipment.location || "",
      serial_number: equipment.serial_number || "",
      condition: equipment.condition || "",
      description: equipment.description || "",
    });

    setErrors({
      name: false,
      type: false,
      location: false,
      serial_number: false,
      condition: false,
    });

    setActiveStep(0);
    onClose();
  };

  const validateDateDetails = (num) => {
    if (!form.name || !form.serial_number || !form.type || !form.location) {
      setErrors((prev) => ({
        ...prev,
        name: !form.name,
        serial_number: !form.serial_number,
        type: !form.type,
        location: !form.location,
      }));
      showToast("Please fill in all required fields", "error");
      return;
    }

    if (!form.condition && num === 2) {
      showToast("Please select a condition", "error");
      return;
    }

    return setActiveStep(num);
  };

  const handleUpdate = async () => {
    setUserId(user.id);
    setIsSubmitting(true);

    const areEquipmentEqual = _.isEqual(form, compareForm);
    if (areEquipmentEqual) {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
      showToast(
        "No changes detected. Please make sure to update at least one field.",
        "info"
      );
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const result = await updateEquipment(equipment.id, form);

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
        setActiveStep(0);
      }
    } catch (error) {
      showToast("An error occurred while updating equipment.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const DetailItem = ({ icon, label, value, valueStyle = {} }) => (
    <Flex align="flex-start" gap={3}>
      <Box color={MAROON} mt={0.5}>
        {icon}
      </Box>
      <Box>
        <Text fontSize="sm" fontWeight="medium" color={DARK_GRAY} mb={0.5}>
          {label}
        </Text>
        {["condition", "status", "equipment type"].includes(
          label.toLowerCase()
        ) ? (
          makeBadge(label, value)
        ) : (
          <Text fontSize="md" {...valueStyle}>
            {value}
          </Text>
        )}
      </Box>
    </Flex>
  );

  const makeBadge = (field, value) => {
    let fieldUsed = ""; // use let so we can reassign

    switch (field) {
      case "Condition":
        fieldUsed = getEqConditionColor(value);
        break;
      case "Status":
        fieldUsed = getEqStatusColor(value);
        break;
      default:
        return (
          <Badge
            color="black"
            border="1px"
            borderColor="gray.300"
            borderRadius="xl"
            pl={2}
            pr={2}
            pb={0.5}
          >
            {value}
          </Badge>
        );
    }

    return (
      <Badge colorScheme={fieldUsed} borderRadius="xl" pl={2} pr={2} pb={0.5}>
        {value}
      </Badge>
    );
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="4xl"
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(4px)" />
      <ModalContent borderRadius="2xl" overflow="hidden" boxShadow="2xl">
        {/* HEADER */}
        <ModalHeader
          bgGradient="linear(to-br, #800000, #A52A2A)"
          color="white"
          py={5}
          px={6}
        >
          <Flex align="center" gap={3}>
            <Box bg="whiteAlpha.200" p={3} borderRadius="full">
              <FiFilePlus size={24} />
            </Box>
            <Box>
              <Heading size="md" fontWeight="bold">
                Add New Equipment
              </Heading>
              <Text fontSize="sm" opacity={0.85}>
                Add new equipment to the inventory
              </Text>
            </Box>
          </Flex>
        </ModalHeader>
        <ModalCloseButton
          color="white"
          _hover={{ bg: "whiteAlpha.300" }}
          borderRadius="full"
        />

        {/* BODY */}
        <ModalBody py={6} px={6} bg="white">
          {/* STEPPER */}
          <Stepper index={activeStep} colorScheme="red" mb={6}>
            {steps.map((step, index) => (
              <Step key={index}>
                <StepIndicator>
                  <StepStatus
                    complete={<StepIcon />}
                    incomplete={<StepNumber />}
                    active={<StepNumber />}
                  />
                </StepIndicator>
                <Box>
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>
          {/* STEP 1 */}
          {activeStep === 0 && (
            <Box>
              <Heading size="md" mb={2}>
                General Details
              </Heading>
              <Text fontSize="sm" color="gray.600" mb={4}>
                <b>Note:</b> All fields in this step are required to add a new
                equipment to the inventory.
              </Text>

              <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                {equipmentFields.map((field) => {
                  const columnSpan = !["type", "location"].includes(field.name)
                    ? 2
                    : 1;
                  return (
                    <GridItem key={field.name} colSpan={columnSpan}>
                      <FormControl isInvalid={errors[field.name]}>
                        <FormLabel fontWeight="semibold">
                          {field.label}
                        </FormLabel>
                        <Input
                          name={field.name}
                          value={form[field.name]}
                          onChange={handleChange}
                          placeholder={field.placeholder}
                          focusBorderColor={MAROON}
                          borderColor={MAROON_HOVER}
                        />
                      </FormControl>
                      {errors[field.name] && (
                        <Text color="#B03060" fontSize="xs">
                          {field.errorMessage}
                        </Text>
                      )}
                    </GridItem>
                  );
                })}
              </Grid>
            </Box>
          )}
          {/* STEP 2 */}
          {activeStep === 1 && (
            <Box>
              <Heading size="md" mb={2}>
                Additional Equipment Details
              </Heading>
              <Text fontSize="sm" color="gray.600" mb={4}>
                <b>Note:</b> All fields in this step are optional. You can skip
                this step if you don&apos;t want to add any additional details.
              </Text>

              {/* Condition Field */}
              <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                <GridItem>
                  <ModalDropdown
                    value={form.condition}
                    onChange={(newCondition) =>
                      setForm({ ...form, condition: newCondition })
                    }
                    roles={conditionOptions}
                    w={"100%"}
                    menuItemWidth="185%"
                    label="Condition"
                    placeholder="Select condition"
                    isRequired={false}
                    isInvalid={errors.condition}
                  />
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel fontWeight="semibold">
                      Selected Condition
                    </FormLabel>
                    <Box
                      border="1px"
                      borderColor={MAROON_HOVER}
                      focusBorderColor={MAROON}
                      _hover={{ borderColor: "gray.300" }}
                      transition={"all 0.2s"}
                      borderRadius={"md"}
                      h="38px"
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
                </GridItem>

                {/* Status Field */}
                <GridItem>
                  <ModalDropdown
                    value={form.status}
                    onChange={(newStatus) =>
                      setForm({ ...form, status: newStatus })
                    }
                    roles={statusOptions}
                    w={"100%"}
                    menuItemWidth="185%"
                    label="Status (Optional)"
                    placeholder="Select status"
                    isRequired={false}
                  />
                </GridItem>

                <GridItem>
                  <FormControl>
                    <FormLabel fontWeight="semibold">Selected Status</FormLabel>
                    <Box
                      border="1px"
                      borderColor={MAROON_HOVER}
                      focusBorderColor={MAROON}
                      _hover={{ borderColor: "gray.300" }}
                      transition={"all 0.2s"}
                      borderRadius={"md"}
                      h="38px"
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
                </GridItem>

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel fontWeight="semibold">
                      Description & Specifications (Optional)
                    </FormLabel>
                    <Textarea
                      name="description"
                      value={form.description}
                      onChange={handleChange}
                      placeholder="Equipment description, specifications, and additional details..."
                      focusBorderColor={MAROON}
                      borderColor={MAROON_HOVER}
                    />
                  </FormControl>
                </GridItem>
              </Grid>
            </Box>
          )}
          {/* STEP 3 */}
          {activeStep === 2 && (
            <Box>
              <Heading size="md" mb={2}>
                Confirm Equipment Details
              </Heading>

              {/* Request Details Card */}
              <Box
                bg="white"
                border="1px solid"
                borderColor="gray.100"
                borderRadius="xl"
                p={6}
                mb={6}
                boxShadow="md"
              >
                <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                  {/* Column 1 */}
                  <VStack align="start" spacing={4}>
                    <DetailItem
                      icon={<FiTool />}
                      label="Equipment Name"
                      value={form.name}
                    />
                    <DetailItem
                      icon={<FiHash />}
                      label="Serial Number"
                      value={form.serial_number}
                    />
                    <DetailItem
                      icon={<FiLayers />}
                      label="Equipment Type"
                      value={form.type}
                    />
                  </VStack>

                  {/* Column 2 */}
                  <VStack align="start" spacing={4}>
                    <DetailItem
                      icon={<FiMapPin />}
                      label="Location"
                      value={form.location}
                    />
                    <DetailItem
                      icon={<FiActivity />}
                      label="Condition"
                      value={form.condition || "N/A"}
                    />
                    <DetailItem
                      icon={<FiInfo />}
                      label="Status"
                      value={form.status || "N/A"}
                    />
                  </VStack>
                </SimpleGrid>

                {/* Description (full width) */}
                <Box
                  mt={6}
                  pt={4}
                  borderTopWidth="1px"
                  borderTopColor="gray.100"
                >
                  <DetailItem
                    icon={<FiAlignLeft />}
                    label="Description"
                    value={form.description || "No description provided"}
                    valueStyle={{
                      color: !form.description ? "gray.400" : "inherit",
                    }}
                  />
                </Box>
              </Box>
            </Box>
          )}
        </ModalBody>

        {/* FOOTER */}
        <ModalFooter borderTop="1px solid" borderColor="gray.200" gap={3}>
          {activeStep > 0 && (
            <Button
              flex={1}
              variant="outline"
              color={MAROON}
              borderColor={MAROON}
              _hover={{ bg: `${MAROON}10` }}
              onClick={() => setActiveStep(activeStep - 1)}
            >
              Back
            </Button>
          )}
          {activeStep === 0 && (
            <Flex w="full" gap={3}>
              <Button
                flex={1}
                variant="outline"
                color={MAROON}
                borderColor={MAROON}
                _hover={{ bg: `${MAROON}10` }}
                onClick={handleClose}
              >
                Cancel
              </Button>
              <Button
                flex={1}
                bg={MAROON}
                color="white"
                _hover={{ bg: MAROON_HOVER }}
                onClick={() => validateDateDetails(1)}
              >
                Proceed to Additional Information
              </Button>
            </Flex>
          )}
          {activeStep === 1 && (
            <Button
              flex={1}
              bg={MAROON}
              color="white"
              _hover={{ bg: MAROON_HOVER }}
              onClick={() => setActiveStep(2)}
            >
              Proceed to Review
            </Button>
          )}
          {activeStep === 2 && (
            <Button
              flex={1}
              bg={MAROON}
              color="white"
              isLoading={isSubmitting}
              loadingText="Submitting..."
              _hover={{ bg: MAROON_HOVER }}
              onClick={handleUpdate}
            >
              Add Equipment
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateEquipmentModal;
