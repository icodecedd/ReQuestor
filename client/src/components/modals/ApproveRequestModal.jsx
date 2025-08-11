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
import { FiCheckCircle } from "react-icons/fi";
import { useRequestsStore } from "@/store/requestsStore";
import { TbCheck } from "react-icons/tb";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/utils/toast";

const MAROON = "#800000";
const DARK_GRAY = "#616161";
const SUCCESS_GREEN = "#38A169";
const SUCCESS_GREEN_DARK = "#2F855A";
const SUCCESS_GREEN_HOVER = "#48BB78";
const SUCCESS_LIGHT = "#F0F9F4";

const ApproveRequestModal = ({ isOpen, onClose, request }) => {
  const approveRequest = useRequestsStore((state) => state.approveRequest);
  const setUserId = useRequestsStore((state) => state.setUserId);
  const { user } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleApprove = async () => {
    setUserId(user.id);
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
      const result = await approveRequest(request.id);

      showToast(result.message, result.success ? "success" : "error");

      if (result.success) {
        onClose();
      }
    } catch (error) {
      showToast("Failed to approve request. Please try again.", "error");
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
              bg={`${SUCCESS_GREEN}15`}
              color={SUCCESS_GREEN}
              borderRadius="full"
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TbCheck size={24} />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold" color={SUCCESS_GREEN_DARK}>
                Approve Request
              </Text>
              <Text color="gray.600" fontSize="sm">
                Confirm approval of this equipment request
              </Text>
            </Box>
          </Flex>
        </ModalHeader>

        <ModalCloseButton
          size="md"
          _hover={{ bg: SUCCESS_LIGHT }}
          color={DARK_GRAY}
          borderRadius="full"
          mt={2}
        />

        <ModalBody px={6} py={4} bg="gray.50">
          <Box
            bg="green.50"
            color="green.800"
            border="1px solid"
            borderColor="green.100"
            borderRadius="xl"
            p={4}
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "sm",
            }}
          >
            <HStack spacing={3}>
              <FiCheckCircle color={SUCCESS_GREEN} fontSize="20px" />
              <Text fontWeight="medium">
                <strong>Confirmation:</strong>
              </Text>
            </HStack>
            <Text pl={8} fontSize="14px" mt={1}>
              Approving this request will confirm the reservation and notify the
              requestor. Please verify all details before approving.
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
          <HStack spacing={4} w="full">
            <Button
              flex={1}
              variant="outline"
              color={MAROON}
              borderColor={MAROON}
              _hover={{ bg: `${MAROON}10` }}
              onClick={onClose}
            >
              Review Again
            </Button>
            <Button
              flex={1}
              bg={SUCCESS_GREEN}
              color="white"
              _hover={{ bg: SUCCESS_GREEN_HOVER }}
              _active={{ bg: SUCCESS_GREEN_DARK }}
              isLoading={isSubmitting}
              loadingText="Approving..."
              onClick={handleApprove}
            >
              Approve Request
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ApproveRequestModal;
