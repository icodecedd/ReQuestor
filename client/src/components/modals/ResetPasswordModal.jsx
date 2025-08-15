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
import { useUserStore } from "@/store/usersStore";
import { TbCancel } from "react-icons/tb";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/utils/toast";
import { MdOutlineLockReset } from "react-icons/md";

const WARNING_RED = "#E53E3E";
const WARNING_RED_DARK = "#C53030";
const WARNING_RED_HOVER = "#F56565";
const DARK_GRAY = "#616161";

const ResetPasswordModal = ({ isOpen, onClose, users }) => {
  const resetPassword = useUserStore((state) => state.resetPassword);
  const setUserId = useUserStore((state) => state.setUserId);
  const { user } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleResetPassword = async () => {
    setUserId(user.id);
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
      const result = await resetPassword(users.id);

      showToast(result.message, result.success ? "success" : "error");

      if (result.success) {
        onClose();
      }
    } catch (error) {
      showToast("Failed to reset password. Please try again.", "error");
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
              bg={`${WARNING_RED}15`}
              color={WARNING_RED}
              borderRadius="full"
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <MdOutlineLockReset size={24} />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold" color={WARNING_RED_DARK}>
                Reset Password
              </Text>
              <Text color="gray.600" fontSize="sm">
                Reset password for <strong>{users?.email}</strong>
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
          >
            <HStack spacing={3}>
              <FiAlertOctagon color={WARNING_RED} fontSize="20px" />
              <Text fontWeight="medium">
                <strong>Security Warning: </strong>
              </Text>
            </HStack>
            <Text pl={8} fontSize="14px" mt={1}>
              Resetting this password will immediately revoke current access for{" "}
              <strong>"{users?.email}"</strong>. A temporary password will be
              emailed, and the user will be required to set a new password upon
              next login.
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
            bg={WARNING_RED}
            color="white"
            _hover={{ bg: WARNING_RED_HOVER }}
            _active={{ bg: WARNING_RED_DARK }}
            isLoading={isSubmitting}
            loadingText="Resetting..."
            onClick={handleResetPassword}
          >
            Cancel Request
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResetPasswordModal;
