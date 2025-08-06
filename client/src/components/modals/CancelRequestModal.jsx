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
  useToast,
} from "@chakra-ui/react";
import { FiAlertTriangle } from "react-icons/fi";
import { useRequestsStore } from "@/store/requestsStore";
import { TbCancel } from "react-icons/tb";
import { useState } from "react";

const CancelRequestModal = ({ isOpen, onClose, request }) => {
  const cancelRequest = useRequestsStore((state) => state.cancelRequest);
  const toast = useToast();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const showToast = (message, status) => {
    toast({
      title: message,
      status: status,
      duration: 2000,
      position: "top-right",
      variant: "subtle",
    });
  };

  const handleCancel = async () => {
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
      const result = await cancelRequest(request.id);

      showToast(result.message, result.success ? "success" : "error");

      if (result.success) {
        onClose();
      }
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
              <TbCancel color="#800000" />
            </Box>
            <Box>
              <Text fontSize="lg" mt={0.5}>
                Cancel Request
              </Text>
              <Text color="gray.700" fontWeight="normal" fontSize="14px">
                This will cancel the request. The equipment will be made
                available again for others to reserve.
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
            bg="#fefce8"
            color="#facc15"
            border="1px"
            borderRadius="xl"
            p="2.5"
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "lg",
            }}
          >
            <HStack>
              <FiAlertTriangle color="#92400e" fontSize="20px" />
              <Text color="#92400e">
                <strong>Notice:</strong>
              </Text>
            </HStack>
            <Text color="#ca8a04" pl={7} fontSize="14px">
              Canceling this request will stop its processing. This action is
              final and cannot be reversed.
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter borderTop="1px solid #e2e8f0" mt={4}>
          <Button
            bg="#800000"
            color="white"
            borderRadius="lg"
            w="100%"
            isLoading={isSubmitting}
            loadingText="Cancelling..."
            _hover={{ bg: "#a12828" }}
            transition="background-color 0.2s ease-in-out"
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
