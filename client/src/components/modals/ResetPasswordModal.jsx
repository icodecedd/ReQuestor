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
import { MdOutlineLockReset } from "react-icons/md";
import useUserStore from "@/store/usersStore";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const ResetPasswordModal = ({ isOpen, onClose, users }) => {
  const resetPassword = useUserStore((state) => state.resetPassword);
  const setUserId = useUserStore((state) => state.setUserId);
  const { user } = useAuth();
  const toast = useToast();
  const [isSubmitting, setSubmitting] = useState(false);
  const handleResetPassword = async () => {
    setUserId(user.id);
    setSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
      const result = await resetPassword(users.id, users.email);

      toast({
        title: result.message,
        status: result.success ? "success" : "error",
        duration: 2000,
        position: "top-right",
        variant: "subtle",
      });

      if (result.success) {
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error resetting password. Please try again.",
        status: "error",
        duration: 2000,
        position: "top-right",
        variant: "subtle",
      });
    } finally {
      setSubmitting(false);
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
              <MdOutlineLockReset color="#800000" />
            </Box>
            <Box>
              <Text fontSize="lg" mt={0.5}>
                Reset Password
              </Text>
              <Text color="gray.700" fontWeight="normal" fontSize="14px">
                Reset password for <strong>{users?.email}</strong>
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
            bg="#fef6e0"
            color="#eab308"
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
                <strong>Security Notice:</strong>
              </Text>
            </HStack>
            <Text color="#92400e" pl={7} fontSize="14px">
              Resetting this password will immediately revoke current access for{" "}
              <strong>"{users?.email}"</strong>. A temporary password will be
              emailed, and the user will be required to set a new password upon
              next login.
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter borderTop="1px solid #e2e8f0" mt={4}>
          <Button
            bg="#800000"
            color="white"
            borderRadius="lg"
            w="full"
            isLoading={isSubmitting}
            loadingText="Resetting..."
            _hover={{ bg: "#a12828" }}
            transition="background-color 0.2s ease-in-out"
            onClick={handleResetPassword}
          >
            Reset Password
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ResetPasswordModal;
