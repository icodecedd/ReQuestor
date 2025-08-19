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
import { FiAlertOctagon, FiTrash } from "react-icons/fi";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/utils/toast";
import { useUserStore } from "@/store/usersStore";

const WARNING_RED = "#E53E3E";
const WARNING_RED_DARK = "#C53030";
const WARNING_RED_HOVER = "#F56565";
const DARK_GRAY = "#616161";

const DeleteUserModal = ({ isOpen, onClose, users }) => {
  const deleteUser = useUserStore((state) => state.deleteUser);
  const setUserId = useUserStore((state) => state.setUserId);
  const { user } = useAuth();

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleDelete = async () => {
    setUserId(user.id);
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
      const result = await deleteUser(users.id);

      showToast(result.message, result.success ? "success" : "error");

      if (result.success) {
        onClose();
      }
    } catch (error) {
      showToast("Failed to delete user. Please try again.", "error");
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
              <FiTrash size={24} />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold" color={WARNING_RED_DARK}>
                Delete User
              </Text>
              <Text color="gray.600" fontSize="sm">
                This will permanently delete <strong>"{users?.email}"</strong>
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
                <strong>Security Notice:</strong>
              </Text>
            </HStack>
            <Text pl={8} fontSize="14px" mt={1}>
              Deleting this account is permanent and cannot be undone. All
              access and related data will be lost.
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
            loadingText="Deleting..."
            onClick={handleDelete}
          >
            Delete User
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteUserModal;
