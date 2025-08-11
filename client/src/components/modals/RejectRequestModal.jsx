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
  Textarea,
} from "@chakra-ui/react";
import { FiAlertOctagon } from "react-icons/fi";
import { useRequestsStore } from "@/store/requestsStore";
import { TbX } from "react-icons/tb";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/utils/toast";

const WARNING_RED = "#E53E3E";
const WARNING_RED_DARK = "#C53030";
const WARNING_RED_HOVER = "#F56565";
const DARK_GRAY = "#616161";
const MAROON = "#800000";

const RejectRequestModal = ({ isOpen, onClose, request }) => {
  const rejectRequest = useRequestsStore((state) => state.rejectRequest);
  const setUserId = useRequestsStore((state) => state.setUserId);
  const { user } = useAuth();
  const [rejectionReason, setRejectionReason] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleReject = async () => {
    if (!rejectionReason.trim()) {
      showToast("Please provide a rejection reason", "error");
      return;
    }

    setUserId(user.id);
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500));
      const result = await rejectRequest(request.id, rejectionReason);

      showToast(result.message, result.success ? "success" : "error");

      if (result.success) {
        onClose();
        setRejectionReason("");
      }
    } catch (error) {
      showToast("Failed to reject request. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setRejectionReason("");
    onClose();
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
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
              bg={`${WARNING_RED}15`}
              color={WARNING_RED}
              borderRadius="full"
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <TbX size={24} />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold" color={WARNING_RED_DARK}>
                Reject Request
              </Text>
              <Text color="gray.600" fontSize="sm">
                Confirm rejection of this equipment request
              </Text>
            </Box>
          </Flex>
        </ModalHeader>

        <ModalCloseButton
          size="md"
          _hover={{ bg: `${WARNING_RED}15` }}
          color={DARK_GRAY}
          borderRadius="full"
          mt={2}
        />

        <ModalBody px={6} py={4} bg="gray.50">
          <Box
            bg="red.50"
            color="red.800"
            border="1px solid"
            borderColor="red.100"
            borderRadius="xl"
            p={4}
            mb={4}
          >
            <HStack spacing={3}>
              <FiAlertOctagon color={WARNING_RED} fontSize="20px" />
              <Text fontWeight="medium">
                <strong>Important:</strong> Please provide a reason for
                rejection
              </Text>
            </HStack>
            <Text pl={8} fontSize="14px" mt={1}>
              The requestor will receive this feedback. Be professional and
              specific.
            </Text>
          </Box>

          <Box>
            <Text mb={2} fontSize="sm" color="gray.600">
              Rejection Reason (Required)
            </Text>
            <Textarea
              placeholder="Explain why this request is being rejected..."
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              borderRadius="lg"
              borderColor="gray.300"
              _hover={{ borderColor: "gray.400" }}
              _focus={{
                borderColor: WARNING_RED,
                boxShadow: `0 0 0 1px ${WARNING_RED}`,
              }}
              minH="120px"
            />
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
              onClick={handleClose}
              color={MAROON}
              borderColor={MAROON}
              _hover={{ bg: `${MAROON}10` }}
            >
              Cancel
            </Button>
            <Button
              flex={1}
              bg={WARNING_RED}
              color="white"
              _hover={{ bg: WARNING_RED_HOVER }}
              _active={{ bg: WARNING_RED_DARK }}
              isLoading={isSubmitting}
              loadingText="Rejecting..."
              onClick={handleReject}
              isDisabled={!rejectionReason.trim()}
            >
              Reject Request
            </Button>
          </HStack>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default RejectRequestModal;
