import { formatTime } from "@/utils/formatTime";
import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { format } from "date-fns";
import {
  FiAlertCircle,
  FiCheckCircle,
  FiXCircle,
} from "react-icons/fi";

const CheckAvailabilityModal = ({
  isOpen,
  onClose,
  onClick,
  scheduleDetails,
}) => {
  const isAvailable = scheduleDetails?.success || false;

  const availableItems = scheduleDetails?.available || [];
  const unavailableItems = scheduleDetails?.unavailable || [];

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent borderRadius="2xl" overflow="hidden" top="5%">
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
              {isAvailable ? (
                <FiCheckCircle color="#800000" />
              ) : (
                <FiXCircle color="#800000" />
              )}
            </Box>
            <Box>
              <Text fontSize="lg" mt={0.5}>
                Equipment Reservation Availability
              </Text>
              <Text color="gray.700" fontWeight="normal" fontSize="14px">
                Check if any items are available for the selected date and time.
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
          <Box
            bg={isAvailable ? "#ECFDF5" : "#FFF5F5"}
            border="1px"
            borderColor={isAvailable ? "#6EE7B7" : "#FCA5A5"}
            borderRadius="xl"
            p="2.5"
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "lg",
            }}
          >
            <HStack>
              {isAvailable ? (
                <FiCheckCircle color="#047857" size="20px" />
              ) : (
                <FiAlertCircle color="#DC2626" size="20px" />
              )}
              <Text color={isAvailable ? "#047857" : "#DC2626"}>
                <strong>
                  {isAvailable
                    ? "Available"
                    : "Partially Available or Unavailable"}
                </strong>
              </Text>
            </HStack>

            <Text
              color={isAvailable ? "#18ab81ff" : "#cf4747ff"}
              pl={7}
              fontSize="14px"
            >
              {scheduleDetails.message} The requested scheduled is on{" "}
              {scheduleDetails.date_use}, from {formatTime(scheduleDetails.time_from)} to{" "}
              {formatTime(scheduleDetails.time_to)}. Please review the details below before
              proceeding.
            </Text>

            <Box pl={7} mt={3}>
              <Text fontSize="14px" fontWeight="bold" color="gray.700" mb={1}>
                ✅ Available Equipment:
              </Text>
              {availableItems?.length > 0 ? (
                availableItems.map((item, index) => (
                  <Text
                    fontSize="14px"
                    color="#18ab81ff"
                    key={`avail-${index}`}
                  >
                    • {item.type}
                  </Text>
                ))
              ) : (
                <Text fontSize="14px" color="gray.500">
                  None
                </Text>
              )}

              <Text
                fontSize="14px"
                fontWeight="bold"
                color="gray.700"
                mt={3}
                mb={1}
              >
                ❌ Unavailable Equipment:
              </Text>
              {unavailableItems?.length > 0 ? (
                unavailableItems.map((item, index) => (
                  <Text
                    fontSize="14px"
                    color="#cf4747ff"
                    key={`unavail-${index}`}
                  >
                    • {item.type}
                  </Text>
                ))
              ) : (
                <Text fontSize="14px" color="gray.500">
                  None
                </Text>
              )}
            </Box>
          </Box>
        </ModalBody>

        <ModalFooter borderTop="1px solid #e2e8f0" mt={4}>
          <Button
            bg={isAvailable ? "#10b981" : "#ef4444"}
            color="white"
            w="full"
            isDisabled={!isAvailable}
            borderRadius="lg"
            _hover={{ bg: isAvailable ? "#059669" : "#cc5a5a" }}
            onClick={onClick}
          >
            Proceed with Reservation
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CheckAvailabilityModal;
