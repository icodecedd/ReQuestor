import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Heading,
} from "@chakra-ui/react";
import { FiCalendar, FiCheck } from "react-icons/fi";
import { BsProjector } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiProjectorScreenChart } from "react-icons/pi";
import { useRequestsStore } from "@/store/requestsStore";
import { useState } from "react";
import { showToast } from "@/utils/toast";

const MAROON = "#800000";
const MAROON_HOVER = "#A52A2A";
const MAROON_LIGHT_ACCENT = "#D46A6A";

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
  { name: "projector", label: "Projector", icon: <BsProjector size={22} /> },
  {
    name: "white_screen",
    label: "White Screen",
    icon: <PiProjectorScreenChart size={22} />,
  },
  { name: "avr", label: "AVR", icon: <FaChalkboardTeacher size={22} /> },
];

const CheckAvailabilityModal = ({
  isOpen,
  onClose,
  onOpenSchedule,
  setScheduleDetails,
}) => {
  const checkAvailability = useRequestsStore(
    (state) => state.checkAvailability
  );

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errors, setErrors] = useState({
    date_use: false,
    time_from: false,
    time_to: false,
  });
  const [form, setForm] = useState({
    date_use: "",
    time_from: "",
    time_to: "",
    equipment_list: [],
    success: false,
    message: "",
    data: null,
  });

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
    setForm({ date_use: "", time_from: "", time_to: "", equipment_list: [] });
    setErrors({ date_use: false, time_from: false, time_to: false });
    onClose();
  };

  const handleCheckAvailability = async () => {
    setIsSubmitting(true);
    try {
      const dateDetails = { ...form };
      const result = await checkAvailability(dateDetails);

      if (result.target === "all") {
        setErrors({
          date_use: !form.date_use.trim(),
          time_from: !form.time_from.trim(),
          time_to: !form.time_to.trim(),
        });
        showToast(result.message, "error");
        return;
      } else if (result.target === "date") {
        showToast(result.message, "error", 5000);
        return;
      } else if (result.target === "time") {
        showToast(result.message, "error", 5000);
        return;
      }

      const updatedForm = {
        ...form,
        success: result.success,
        message: result.message,
        data: result.data,
      };
      setForm(updatedForm);
      setScheduleDetails(updatedForm);

      showToast(result.message, "success");
      setForm({ date_use: "", time_from: "", time_to: "", equipment_list: [] });

      onOpenSchedule();
    } catch (error) {
      const err = error.response?.data || {
        message: "Something went wrong.",
      };

      showToast(err.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="2xl"
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
              <FiCalendar size={24} />
            </Box>
            <Box>
              <Heading size="md" fontWeight="bold">
                Check Equipment Availability
              </Heading>
              <Text fontSize="sm" opacity={0.85}>
                Plan your schedule before booking
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
          {/* Date & Time */}
          <Grid templateColumns="repeat(2, 1fr)" gap={5} mb={6}>
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
                  {errors[field.name] && (
                    <Text color="#B03060" fontSize="xs">
                      {field.errorMessage}
                    </Text>
                  )}
                </FormControl>
              </GridItem>
            ))}
          </Grid>

          {/* Equipment */}
          <Box>
            <FormLabel fontWeight="semibold">Select Equipment</FormLabel>
            <SimpleGrid columns={[1, 3]} spacing={4}>
              {equipmentFields.map((field, index) => {
                const isChecked = form.equipment_list.includes(field.label);
                return (
                  <Box
                    key={index}
                    onClick={handleEquipmentToggle(field)}
                    cursor="pointer"
                    borderRadius="lg"
                    p={4}
                    border="2px solid"
                    borderColor={isChecked ? MAROON : "gray.200"}
                    bgGradient={
                      isChecked ? "linear(to-br, #800000, #A52A2A)" : "white"
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
        </ModalBody>

        {/* FOOTER */}
        <ModalFooter bg="gray.50" py={4} px={6}>
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
              onClick={handleCheckAvailability}
              isLoading={isSubmitting}
              loadingText="Checking..."
              rightIcon={<FiCheck />}
            >
              Check Availability
            </Button>
          </Flex>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CheckAvailabilityModal;
