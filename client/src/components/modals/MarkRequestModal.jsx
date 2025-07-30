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
import { FaCheck } from "react-icons/fa";
import { FiCheckCircle } from "react-icons/fi";

const MarkRequestModal = ({ isOpen, onClose, request }) => {
  const updateRequestStatus = useRequestsStore(
    (state) => state.updateRequestStatus
  );
  const toast = useToast();

  const handleMarkComplete = async () => {
    const result = await updateRequestStatus(request.id, {
      status: "Completed",
    });

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
        <ModalFooter>
          <Button
            mr={3}
            variant="outline"
            borderRadius="xl"
            onClick={onClose}
            _hover={{ bg: "#f0f9f4" }}
          >
            Close
          </Button>
          <Button
            bg="#059669"
            color="white"
            borderRadius="xl"
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
