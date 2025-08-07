import { useRequestsStore } from "@/store/requestsStore";
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
import { useState } from "react";
import { FaCheck } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

const MarkRequestModal = ({ isOpen, onClose, request }) => {
  const updateRequestStatus = useRequestsStore(
    (state) => state.updateRequestStatus
  );
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

  const handleMarkComplete = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const result = await updateRequestStatus(request.id, {
        status: "Completed",
      });

      showToast(result.message, result.success ? "success" : "error");

      if (result.success) {
        onClose();
      }
    } catch (error) {
      showToast("Failed to mark request as complete. Please try again.", "error");
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
              <FaCheck color="#059669" />
            </Box>
            <Box>
              <Text fontSize="lg" mt={0.5}>
                Mark as Complete
              </Text>
              <Text color="gray.700" fontWeight="normal" fontSize="14px">
                This will mark the request as completed.
              </Text>
            </Box>
          </Flex>
          <Divider w="110%" ml={-6} />
        </ModalHeader>
        <ModalCloseButton
          size="md"
          _hover={{ bg: "#f0f9f4" }}
          borderRadius="lg"
        />
        <ModalBody>
          <Box
            bg="#f0f9f4"
            color="#16a34a"
            border="1px"
            borderColor="#bbf7d0"
            borderRadius="xl"
            p="2.5"
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "lg",
            }}
          >
            <HStack>
              <FiCheckCircle color="#16a34a" fontSize="20px" />
              <Text color="#16a34a">
                <strong>Confirmation:</strong>
              </Text>
            </HStack>
            <Text color="#166534" pl={7} fontSize="14px">
              Marking this request as complete will finish the process and
              update the equipment status. This action is final.
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter borderTop="1px solid #e2e8f0" mt={4}>
          <Button
            bg="#059669"
            color="white"
            borderRadius="lg"
            w="100%"
            isLoading={isSubmitting}
            loadingText="Marking as Complete..."
            _hover={{ bg: "#047857" }}
            transition="background-color 0.2s ease-in-out"
            onClick={handleMarkComplete}
          >
            Mark as Complete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default MarkRequestModal;
