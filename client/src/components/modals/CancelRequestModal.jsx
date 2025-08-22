import {
  Box,
  Button,
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
import { FiAlertOctagon } from "react-icons/fi";
import { useRequestsStore } from "@/store/requestsStore";
import { TbCancel } from "react-icons/tb";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/utils/toast";

// Color Palette Constants
const WARNING_ORANGE = "#DD6B20"; // Primary warning color
const WARNING_ORANGE_DARK = "#C05621"; // Darker shade
const WARNING_ORANGE_HOVER = "#ED8936"; // Hover state
const WARNING_ORANGE_LIGHT = "#FFFAF0"; // Light background
const DARK_GRAY = "#616161"; // Neutral text/close button

const CancelRequestModal = ({ isOpen, onClose, request }) => {
  const cancelRequest = useRequestsStore((state) => state.cancelRequest);
  const setUserId = useRequestsStore((state) => state.setUserId);
  const { user } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleCancel = async () => {
    setUserId(user.id);
    setIsSubmitting(true);

    try {
      const result = await cancelRequest(request);
      showToast(result.message, result.success ? "success" : "error");
      if (result.success) onClose();
    } catch (error) {
      showToast("Failed to cancel request. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(4px)" />
      <ModalContent borderRadius="2xl" overflow="hidden" boxShadow="2xl">
        {/* HEADER */}
        <ModalHeader
          px={6}
          pt={5}
          pb={3}
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          <Flex gap={3} align="center">
            <Box
              bg={`${WARNING_ORANGE}15`}
              color={WARNING_ORANGE}
              borderRadius="full"
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TbCancel size={24} />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold" color={WARNING_ORANGE_DARK}>
                Cancel Request
              </Text>
              <Text color="gray.600" fontSize="sm">
                This action will cancel the request
              </Text>
            </Box>
          </Flex>
        </ModalHeader>

        <ModalCloseButton
          size="md"
          _hover={{ bg: WARNING_ORANGE_LIGHT }}
          color={DARK_GRAY}
          borderRadius="full"
          mt={2}
        />

        <ModalBody px={6} py={4} bg="gray.50">
          <Box
            bg={WARNING_ORANGE_LIGHT}
            color="orange.800"
            border="1px solid"
            borderColor="orange.200"
            borderRadius="xl"
            p={4}
          >
            <HStack spacing={3}>
              <FiAlertOctagon color={WARNING_ORANGE} size="20px" />
              <Text fontWeight="medium">
                <strong>Notice:</strong>
              </Text>
            </HStack>
            <Text pl={8} fontSize="14px" mt={1}>
              Canceling this request will stop its processing.
              {request?.canBeRecreated
                ? " You can submit a new request later if needed."
                : " This action cannot be reversed."}
            </Text>
          </Box>
        </ModalBody>

        <ModalFooter
          borderTop="1px solid"
          borderTopColor="gray.100"
          px={6}
          py={4}
          bg="white"
        >
          <Button
            flex={1}
            bg={WARNING_ORANGE}
            color="white"
            _hover={{ bg: WARNING_ORANGE_HOVER }}
            _active={{ bg: WARNING_ORANGE_DARK }}
            isLoading={isSubmitting}
            loadingText="Cancelling..."
            onClick={handleCancel}
          >
            Cancel Request
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default CancelRequestModal;
