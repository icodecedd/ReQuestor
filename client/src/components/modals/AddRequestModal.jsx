import { useRequestsStore } from "@/store/requestsStore";
import {
  Box,
  Button,
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
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { BsProjector } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import {
  FiBookOpen,
  FiCalendar,
  FiCheck,
  FiClock,
  FiCpu,
  FiFilePlus,
  FiTarget,
  FiUser,
  FiUserCheck,
} from "react-icons/fi";
import { PiProjectorScreenChart } from "react-icons/pi";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/utils/toast";
import { formatTime } from "@/utils/formatTime";

const MAROON = "#800000";
const MAROON_HOVER = "#A52A2A";
const MAROON_LIGHT_ACCENT = "#D46A6A";
const DARK_GRAY = "#616161";

const requestFields = [
  {
    name: "name",
    label: "Requestor Name",
    placeholder: "Enter requestor name",
    errorMessage: "Please enter a requestor name",
  },
  {
    name: "course_section",
    label: "Course & Section",
    placeholder: "Enter course and section",
    errorMessage: "Please enter a course and section",
  },
  {
    name: "faculty_in_charge",
    label: "Faculty In-Charge",
    placeholder: "Enter faculty in-charge",
    errorMessage: "Please enter a faculty in-charge",
  },
];

const scheduleFields = [
  {
    name: "time_from",
    label: "Time From",
    placeholder: "Select start time",
    type: "time",
    errorMessage: "Please select a start time",
  },
  {
    name: "time_to",
    label: "Time To",
    placeholder: "Select end time",
    type: "time",
    errorMessage: "Please select an end time",
  },
];

const equipmentFields = [
  {
    name: "projector",
    label: "Projector",
    icon: <BsProjector size={22} />,
  },
  {
    name: "white_screen",
    label: "White Screen",
    icon: <PiProjectorScreenChart size={22} />,
  },
  { name: "avr", label: "AVR", icon: <FaChalkboardTeacher size={22} /> },
];

const AddRequestModal = ({
  isOpen,
  onClose,
  dateUse = "",
  timeFrom = "",
  timeTo = "",
}) => {
  const addRequest = useRequestsStore((state) => state.addRequest);
  const setUserId = useRequestsStore((state) => state.setUserId);
  const { user } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);
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

  const steps = [
    { title: "Schedule", description: "Select date and time" },
    { title: "Request Details", description: "Fill in request information" },
    { title: "Review", description: "Confirm your request" },
  ];

  const { activeStep, setActiveStep } = useSteps({
    index: 0,
    count: steps.length,
  });

  const validateDateDetails = (num) => {
    if (
      !form.date_use ||
      !form.time_from ||
      !form.time_to ||
      !form.equipment_list
    ) {
      setErrors((prev) => ({
        ...prev,
        date_use: !form.date_use,
        time_from: !form.time_from,
        time_to: !form.time_to,
        equipment_list: !form.equipment_list,
      }));
      showToast("Please fill in all required fields", "error");
      return;
    }

    const timeFromHours = parseInt(form.time_from.split(":")[0]);
    const timeToHours = parseInt(form.time_to.split(":")[0]);
    if (timeToHours < timeFromHours) {
      showToast(
        "Invalid time range. Time range cannot span across two days.",
        "error",
        5000
      );
      return;
    }

    // Apply the requirement for request of at least 3 days in advance
    const dateNow = new Date();
    const dateUse = new Date(form.date_use);

    dateNow.setHours(0, 0, 0, 0);
    dateUse.setHours(0, 0, 0, 0);

    const dayDiff = (dateUse - dateNow) / (1000 * 60 * 60 * 24);

    if (dayDiff < 3) {
      showToast(
        "Invalid date. Date must be at least 3 days in advance.",
        "error",
        5000
      );
      return;
    }

    if (
      (!form.name || !form.course_section || !form.faculty_in_charge) &&
      num === 2
    ) {
      setErrors((prev) => ({
        ...prev,
        name: !form.name,
        course_section: !form.course_section,
        faculty_in_charge: !form.faculty_in_charge,
      }));
      showToast("Please fill in all required fields", "error");
      return;
    }

    return setActiveStep(num);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    if (value.trim()) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleEquipmentToggle = (field) => () => {
    setForm((prev) => ({
      ...prev,
      equipment_list: prev.equipment_list.includes(field.label)
        ? prev.equipment_list.filter((item) => item !== field.label)
        : [...prev.equipment_list, field.label],
    }));
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
    setActiveStep(0);
    onClose();
  };

  useEffect(() => {
    setForm((prev) => ({
      ...prev,
      date_use: dateUse || "",
      time_from: timeFrom || "",
      time_to: timeTo || "",
    }));
  }, [dateUse, timeFrom, timeTo]);

  const handleSubmit = async () => {
    setUserId(user.id);
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const result = await addRequest(form);
      showToast(result.message, result.success ? "success" : "error");

      if (result.success) handleClose();
    } catch (error) {
      showToast(error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const renderEquipmentBox = (index, equipment, icon) => {
    return (
      <Flex gap={3} key={index} mr={3} alignItems={"center"}>
        <Box
          bg="white"
          borderRadius="md"
          border="1px solid #e2e8f0"
          p={1}
          px={5}
          transition="all 0.3s ease"
        >
          <Flex gap={1} alignItems={"center"}>
            {icon}
            <Text fontSize="sm" color={DARK_GRAY}>
              {equipment}
            </Text>
          </Flex>
        </Box>
      </Flex>
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
      <ModalContent borderRadius="xl" overflow="hidden" boxShadow="xl">
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
                Add Equipment Request
              </Heading>
              <Text fontSize="sm" opacity={0.85}>
                Submit a new request for processing
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
                Schedule Details
              </Heading>
              <Text fontSize="sm" color="gray.600" mb={4}>
                <b>Note:</b> Availability is subject to change. Your request
                will be confirmed upon submission.
              </Text>

              <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                <GridItem colSpan={2}>
                  <FormControl isInvalid={errors.date_use}>
                    <FormLabel fontWeight="semibold">Date of Use</FormLabel>
                    <Input
                      type="date"
                      name="date_use"
                      value={form.date_use}
                      onChange={handleChange}
                      borderColor={MAROON_HOVER}
                      focusBorderColor={MAROON}
                    />
                    {errors.date_use && (
                      <Text color="#B03060" fontSize="xs">
                        Please select a date of use
                      </Text>
                    )}
                  </FormControl>
                </GridItem>

                {scheduleFields.map((field) => (
                  <GridItem key={field.name}>
                    <FormControl isInvalid={errors[field.name]}>
                      <FormLabel fontWeight="semibold">{field.label}</FormLabel>
                      <Input
                        type={field.type}
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
                ))}
              </Grid>

              {/* Equipment */}
              <Box mt={5}>
                <FormLabel fontWeight="semibold">Select Equipment</FormLabel>
                <SimpleGrid columns={[1, 3]} spacing={4}>
                  {equipmentFields.map((field, index) => {
                    const isChecked = form.equipment_list.includes(field.label);
                    return (
                      <Box
                        w="100%"
                        key={index}
                        onClick={handleEquipmentToggle(field)}
                        cursor="pointer"
                        borderRadius="lg"
                        p={4}
                        border="2px solid"
                        borderColor={isChecked ? MAROON : "gray.200"}
                        bgGradient={
                          isChecked
                            ? "linear(to-br, #800000, #A52A2A)"
                            : "white"
                        }
                        color={isChecked ? "white" : MAROON}
                        boxShadow={isChecked ? "md" : "sm"}
                        transition="all 0.25s"
                        _hover={{
                          transform: "translateY(-3px)",
                          boxShadow: "lg",
                        }}
                      >
                        <Flex align="center" gap={3}>
                          <Box>{field.icon}</Box>
                          <Text fontWeight="medium">{field.label}</Text>
                          {isChecked && (
                            <Box ml="auto">
                              <FiCheck />
                            </Box>
                          )}
                        </Flex>
                      </Box>
                    );
                  })}
                </SimpleGrid>
              </Box>
            </Box>
          )}

          {/* STEP 2 */}
          {activeStep === 1 && (
            <Box>
              <Heading size="md" mb={2}>
                Request Information
              </Heading>
              <Text fontSize="sm" color="gray.600" mb={4}>
                <b>Note:</b> Availability is subject to change. Your request
                will be confirmed upon submission.
              </Text>

              {/* Request Details */}
              <Grid templateColumns="repeat(2, 1fr)" gap={5}>
                <GridItem colSpan={2}>
                  <FormControl isInvalid={errors.name}>
                    <FormLabel fontWeight="semibold">
                      {requestFields[0].label}
                    </FormLabel>
                    <Input
                      name={requestFields[0].name}
                      value={form.name}
                      onChange={handleChange}
                      placeholder={requestFields[0].placeholder}
                      borderColor={MAROON_HOVER}
                      focusBorderColor={MAROON}
                    />
                    {errors.name && (
                      <Text color="#B03060" fontSize="xs">
                        {requestFields[0].errorMessage}
                      </Text>
                    )}
                  </FormControl>
                </GridItem>

                {requestFields.slice(1).map((field) => (
                  <GridItem key={field.name}>
                    <FormControl isInvalid={errors[field.name]}>
                      <FormLabel fontWeight="semibold">{field.label}</FormLabel>
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
                ))}

                <GridItem colSpan={2}>
                  <FormControl>
                    <FormLabel fontWeight="semibold">
                      Purpose (Optional)
                    </FormLabel>
                    <Textarea
                      name="purpose"
                      value={form.purpose}
                      onChange={handleChange}
                      placeholder="Enter purpose or additional details..."
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
              <Heading size="md" mb={4}>
                Review Your Request
              </Heading>

              {/* Schedule Card */}
              <Box
                bg="white"
                border="1px solid"
                borderColor="gray.100"
                borderRadius="lg"
                p={4}
                mb={4}
                boxShadow="sm"
              >
                <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                  <GridItem>
                    <Flex align="center" gap={2}>
                      <FiCalendar color={MAROON} />
                      <Text fontSize="sm" color={DARK_GRAY}>
                        <strong>Date:</strong> {form.date_use}
                      </Text>
                    </Flex>
                  </GridItem>
                  <GridItem>
                    <Flex align="center" gap={2}>
                      <FiClock color={MAROON} />
                      <Text fontSize="sm" color={DARK_GRAY}>
                        <strong>Time:</strong> {formatTime(form.time_from)} -{" "}
                        {formatTime(form.time_to)}
                      </Text>
                    </Flex>
                  </GridItem>
                </Grid>
              </Box>

              {/* Request Details Card */}
              <Box
                bg="white"
                border="1px solid"
                borderColor="gray.100"
                borderRadius="lg"
                p={4}
                mb={4}
                boxShadow="sm"
              >
                <VStack align="start" spacing={2}>
                  <Flex align="center" gap={2}>
                    <FiUser color={MAROON} />
                    <Text fontSize="sm" color={DARK_GRAY}>
                      <strong>Requestor:</strong> {form.name}
                    </Text>
                  </Flex>
                  <Flex align="center" gap={2}>
                    <FiBookOpen color={MAROON} />
                    <Text fontSize="sm" color={DARK_GRAY}>
                      <strong>Course & Section:</strong> {form.course_section}
                    </Text>
                  </Flex>
                  <Flex align="center" gap={2}>
                    <FiUserCheck color={MAROON} />
                    <Text fontSize="sm" color={DARK_GRAY}>
                      <strong>Faculty In-Charge:</strong>{" "}
                      {form.faculty_in_charge}
                    </Text>
                  </Flex>
                  <Flex align="center" gap={2}>
                    <FiTarget color={MAROON} />
                    <Text fontSize="sm" color={DARK_GRAY}>
                      <strong>Purpose:</strong> {form.purpose || "N/A"}
                    </Text>
                  </Flex>
                </VStack>
              </Box>

              {/* Equipment Card */}
              <Box
                bg="white"
                border="1px solid"
                borderColor="gray.100"
                borderRadius="lg"
                p={4}
                boxShadow="sm"
              >
                <Flex align="center" gap={2} mb={2}>
                  <FiCpu color={MAROON} />
                  <Text fontSize="sm" color={DARK_GRAY} fontWeight="bold">
                    Equipment
                  </Text>
                </Flex>
                <Flex color={DARK_GRAY}>
                  {form.equipment_list.length
                    ? form.equipment_list.map((equipment, index) => {
                        if (equipment === "Projector") {
                          return renderEquipmentBox(
                            index,
                            equipment,
                            <BsProjector color={MAROON} />
                          );
                        } else if (equipment === "White Screen") {
                          return renderEquipmentBox(
                            index,
                            equipment,
                            <PiProjectorScreenChart color={MAROON} />
                          );
                        } else {
                          return renderEquipmentBox(
                            index,
                            equipment,
                            <FaChalkboardTeacher color={MAROON} />
                          );
                        }
                      })
                    : "No equipment selected"}
                </Flex>
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
              borderColor={MAROON_HOVER}
              color={MAROON}
              _hover={{ bg: MAROON_LIGHT_ACCENT, color: "white" }}
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
                borderColor={MAROON_HOVER}
                color={MAROON}
                _hover={{ bg: MAROON_LIGHT_ACCENT, color: "white" }}
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
                Proceed to Details
              </Button>
            </Flex>
          )}
          {activeStep === 1 && (
            <Button
              flex={1}
              bg={MAROON}
              color="white"
              _hover={{ bg: MAROON_HOVER }}
              onClick={() => validateDateDetails(2)}
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
