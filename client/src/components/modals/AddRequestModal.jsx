import { useRequestsStore } from "@/store/requestsStore";
import {
  Box,
  Button,
  Checkbox,
  CheckboxGroup,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Text,
  Textarea,
  useToast,
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
  useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { BsProjector } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FiFilePlus } from "react-icons/fi";
import { PiProjectorScreenChart } from "react-icons/pi";
import CheckAvailabilityModal from "./CheckAvailabilityModal";

const requestFields = [
  {
    name: "name",
    label: "Requestor Name",
    placeholder: "Enter requestor name",
  },
  {
    name: "course_section",
    label: "Course & Section",
    placeholder: "Enter course and section",
  },
  {
    name: "faculty_in_charge",
    label: "Faculty In-Charge",
    placeholder: "Enter faculty in-charge",
  },
];

const scheduleFields = [
  {
    name: "time_from",
    label: "Time From",
    placeholder: "Select start time",
    type: "time",
  },
  {
    name: "time_to",
    label: "Time To",
    placeholder: "Select end time",
    type: "time",
  },
];

const equipmentFields = [
  {
    name: "projector",
    label: "Projector",
    icon: <BsProjector color="white" />,
  },
  {
    name: "white_screen",
    label: "White Screen",
    icon: <PiProjectorScreenChart color="white" />,
  },
  {
    name: "avr",
    label: "AVR",
    icon: <FaChalkboardTeacher color="white" />,
  },
];

const AddRequestModal = ({ isOpen, onClose }) => {
  const addRequest = useRequestsStore((state) => state.addRequest);
  const checkAvailability = useRequestsStore(
    (state) => state.checkAvailability
  );
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    name: false,
    course_section: false,
    faculty_in_charge: false,
    equipment_list: false,
    date_use: false,
    time_from: false,
    time_to: false,
    purpose: false,
  });
  const toast = useToast();

  const [form, setForm] = useState({
    name: "",
    course_section: "",
    faculty_in_charge: "",
    equipment_list: [],
    date_use: "",
    time_from: "",
    time_to: "",
    purpose: "",
  });

  const [scheduleDetails, setScheduleDetails] = useState({
    date_use: form.date_use || "",
    time_from: form.time_from || "",
    time_to: form.time_to || "",
    success: false,
    message: "",
    available: null,
    unavailable: null,
  });

  const steps = [
    { title: "Schedule", description: "Select date and time" },
    { title: "Request Details", description: "Fill in request information" },
    { title: "Review", description: "Confirm your request" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    // Reset errors for the field being changed
    if (value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const nextStep = () => {
    if (activeStep < steps.length - 1) {
      setActiveStep(activeStep + 1);
    }
  };

  const prevStep = () => {
    if (activeStep > 0) {
      setActiveStep(activeStep - 1);
    }
  };

  const {
    isOpen: isCheckAvailabilityOpen,
    onOpen: openCheckAvailability,
    onClose: closeCheckAvailability,
  } = useDisclosure();

  const showToast = (message, status) => {
    toast({
      title: message,
      status: status,
      duration: 2000,
      position: "top-right",
      variant: "subtle",
    });
  };

  const handleCheckAvailability = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

      const dateDetails = {
        equipment_list: form.equipment_list,
        date_use: form.date_use,
        time_from: form.time_from,
        time_to: form.time_to,
      };

      const result = await checkAvailability(dateDetails);
      if (result.target === "all") {
        setErrors({
          date_use: !form.date_use.trim(),
          time_from: !form.time_from.trim(),
          time_to: !form.time_to.trim(),
        });
        showToast(result.message, "error");
        return;
      } else if (result.target === "date_use") {
        setErrors({
          date_use: !form.date_use.trim(),
        });
        showToast(result.message, "error");
        return;
      }
      setScheduleDetails({
        success: result.success,
        message: result.message,
        available: result.available,
        unavailable: result.unavailable,
        date_use: form.date_use,
        time_from: form.time_from,
        time_to: form.time_to,
      });

      openCheckAvailability();
    } catch (error) {
      showToast(error.response.data.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleSubmit = async () => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const result = await addRequest(form);

      showToast(result.message, result.success ? "success" : "error");

      if (result.success) {
        onClose();
        setForm({
          name: "",
          course_section: "",
          faculty_in_charge: "",
          equipment_list: [],
          date_use: "",
          time_from: "",
          time_to: "",
          purpose: "",
        });
        setActiveStep(0);
      }
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setForm({
      name: "",
      course_section: "",
      faculty_in_charge: "",
      equipment_list: [],
      date_use: "",
      time_from: "",
      time_to: "",
      purpose: "",
    });

    setErrors({
      name: false,
      course_section: false,
      faculty_in_charge: false,
      equipment_list: false,
      date_use: false,
      time_from: false,
      time_to: false,
      purpose: false,
    });

    onClose(); // actually close the modal
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="4xl"
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
              transition="all 0.3s ease"
              _hover={{
                transform: "scale(1.02)",
                boxShadow: "lg",
              }}
            >
              <FiFilePlus color="#800000" />
            </Box>
            <Box>
              <Text fontSize="lg" mt={0.5}>
                Add Equipment Request
              </Text>
              <Text color="gray.700" fontWeight="normal" fontSize="14px">
                Submit a new request for processing.
              </Text>
            </Box>
          </Flex>
          <Divider w="110%" ml={-6} />
        </ModalHeader>
        <ModalCloseButton
          size="md"
          _hover={{ bg: "#f7eaea" }}
          borderRadius="lg"
          onClick={() => {
            onClose();
            setActiveStep(0);
          }}
        />
        <ModalBody>
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
                <Box flexShrink="0">
                  <StepTitle>{step.title}</StepTitle>
                  <StepDescription>{step.description}</StepDescription>
                </Box>
                <StepSeparator />
              </Step>
            ))}
          </Stepper>

          {/* Step 1: Schedule */}
          {activeStep === 0 && (
            <Box>
              <Heading size="md">Schedule Details</Heading>
              <Text mb={4} fontSize="sm" color="gray.600">
                <b>Note: </b>Availability is subject to change. Your request
                will be confirmed at submission.
              </Text>
              <Grid templateColumns="repeat(2, 1fr)" gap={3}>
                <GridItem colSpan={2}>
                  <FormControl isInvalid={errors.date_use}>
                    <FormLabel fontSize={14}>Date of Use</FormLabel>
                    <Input
                      type="date"
                      name="date_use"
                      value={form.date_use}
                      onChange={handleChange}
                      focusBorderColor="maroon"
                      borderRadius="lg"
                      borderColor="gray.400"
                    />
                  </FormControl>
                </GridItem>
                {scheduleFields.map((field) => (
                  <GridItem key={field.name} colSpan={1}>
                    <FormControl isInvalid={errors[field.name]}>
                      <FormLabel fontSize={14}>{field.label}</FormLabel>
                      <Input
                        type={field.type}
                        name={field.name}
                        value={form[field.name]}
                        onChange={handleChange}
                        focusBorderColor="maroon"
                        borderRadius="lg"
                        borderColor="gray.400"
                        placeholder={field.placeholder}
                      />
                    </FormControl>
                  </GridItem>
                ))}
                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel fontSize={14}>
                      Equipment (Check all that apply)
                    </FormLabel>
                    <Box>
                      <CheckboxGroup
                        onChange={(newValues) =>
                          setForm((prevForm) => ({
                            ...prevForm,
                            equipment_list: newValues,
                          }))
                        }
                      >
                        <SimpleGrid columns={3} spacing="10px" gap={7}>
                          {equipmentFields.map((field, index) => {
                            const isChecked = form.equipment_list.includes(
                              field.label
                            );

                            const handleCheckboxChange = (e) => {
                              const { checked } = e.target;

                              setForm((prev) => ({
                                ...prev,
                                equipment_list: checked
                                  ? [...prev.equipment_list, field.label]
                                  : prev.equipment_list.filter(
                                      (item) => item !== field.label
                                    ),
                              }));
                            };
                            return (
                              <Checkbox
                                key={index}
                                colorScheme="red"
                                fontWeight="medium"
                                name={field.name}
                                isChecked={isChecked}
                                onChange={handleCheckboxChange}
                                sx={{
                                  "& span.chakra-checkbox__control": {
                                    borderRadius: "full",
                                    borderColor: "#800000",
                                    _checked: {
                                      bg: "#800000",
                                      borderColor: "#800000",
                                    },
                                  },
                                }}
                              >
                                <Box
                                  border="1px"
                                  borderRadius="lg"
                                  borderColor="#800000"
                                  w={{
                                    base: "150px",
                                    md: "150px",
                                    lg: "240px",
                                  }}
                                  p={1}
                                  transition="all 0.3s ease"
                                  _hover={{
                                    transform: "scale(1.02)",
                                    boxShadow: "lg",
                                  }}
                                  transform={isChecked ? "scale(1.02)" : "none"}
                                  boxShadow={isChecked ? "lg" : "none"}
                                >
                                  <HStack>
                                    <Box
                                      borderRadius="md"
                                      bgGradient="linear(to-br, maroon, #c75d5dff)"
                                      boxShadow="0 2px 8px rgba(0,0,0,0.12)"
                                      p={2}
                                      mr={2}
                                    >
                                      {field.icon}
                                    </Box>
                                    <Heading fontSize="13px" fontWeight="bold">
                                      {field.label}
                                    </Heading>
                                  </HStack>
                                </Box>
                              </Checkbox>
                            );
                          })}
                        </SimpleGrid>
                      </CheckboxGroup>
                    </Box>
                  </FormControl>
                </GridItem>
                {scheduleDetails && (
                  <CheckAvailabilityModal
                    isOpen={isCheckAvailabilityOpen}
                    onClose={closeCheckAvailability}
                    onClick={() => {
                      closeCheckAvailability();
                      nextStep();
                    }}
                    scheduleDetails={scheduleDetails}
                  />
                )}
              </Grid>
            </Box>
          )}

          {/* Step 2: Request Details */}
          {activeStep === 1 && (
            <Box>
              <Heading size="md">Request Information</Heading>
              <Text mb={4} fontSize="sm" color="gray.600">
                <b>Note: </b>Availability is subject to change. Your request
                will be confirmed at submission.
              </Text>
              <SimpleGrid columns={2} spacing={4}>
                {requestFields.map((field) => (
                  <FormControl key={field.name}>
                    <FormLabel fontSize={14}>{field.label}</FormLabel>
                    <Input
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      focusBorderColor="maroon"
                      borderRadius="lg"
                      borderColor="gray.400"
                      placeholder={field.placeholder}
                    />
                  </FormControl>
                ))}
                <FormControl gridColumn="1 / -1">
                  <FormLabel fontSize={14}>Purpose (Optional)</FormLabel>
                  <Textarea
                    name="purpose"
                    value={form.purpose}
                    onChange={handleChange}
                    focusBorderColor="maroon"
                    borderRadius="lg"
                    borderColor="gray.400"
                    placeholder="Enter purpose or any additional details..."
                  />
                </FormControl>
              </SimpleGrid>
            </Box>
          )}

          {/* Step 3: Review */}
          {activeStep === 2 && (
            <Box>
              <Heading size="md" mb={4}>
                Review Your Request
              </Heading>
              <Box bg="gray.50" p={4} borderRadius="md">
                <Text fontWeight="bold" mb={2}>
                  Schedule
                </Text>
                <Text>
                  Date: {form.date_use} | Time: {form.time_from} -{" "}
                  {form.time_to}
                </Text>

                <Text fontWeight="bold" mt={4} mb={2}>
                  Request Details
                </Text>
                <Text>Requestor: {form.name}</Text>
                <Text>Course & Section: {form.course_section}</Text>
                <Text>Faculty In-Charge: {form.faculty_in_charge}</Text>
                <Text>Purpose: {form.purpose}</Text>

                <Text fontWeight="bold" mt={4} mb={2}>
                  Equipment
                </Text>
                {form.equipment_list.length > 0 ? (
                  <Text>{form.equipment_list.join(", ")}</Text>
                ) : (
                  <Text>No equipment selected</Text>
                )}
              </Box>
            </Box>
          )}
        </ModalBody>
        <ModalFooter borderTop="1px solid #e2e8f0" mt={4}>
          {activeStep > 0 && (
            <Button
              mr={3}
              variant="outline"
              borderRadius="lg"
              onClick={prevStep}
              _hover={{ bg: "#f7eaea" }}
            >
              Back
            </Button>
          )}
          {activeStep === 0 && (
            <>
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
                bg="#800000"
                color="white"
                borderRadius="lg"
                _hover={{ bg: "#a12828" }}
                isLoading={isSubmitting}
                loadingText="Checking..."
                onClick={() => {
                  handleCheckAvailability();
                }}
              >
                Check Availability
              </Button>
            </>
          )}
          {activeStep === 1 && (
            <Button
              bg="#800000"
              color="white"
              borderRadius="lg"
              _hover={{ bg: "#a12828" }}
              onClick={nextStep}
            >
              Proceed to Review
            </Button>
          )}
          {activeStep === 2 && (
            <Button
              bg="#800000"
              color="white"
              isLoading={isSubmitting}
              loadingText="Submitting..."
              borderRadius="lg"
              _hover={{ bg: "#a12828" }}
              onClick={handleSubmit}
            >
              Submit Request
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddRequestModal;
