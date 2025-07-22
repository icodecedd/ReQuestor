import {
  Box,
  Button,
  Flex,
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
import { FiTrash } from "react-icons/fi";
import useUserStore from "@/store/usersStore";

const DeleteUserModal = ({ isOpen, onClose, user }) => {
  const deleteUser = useUserStore((state) => state.deleteUser);
  const toast = useToast();

  const handleDelete = async () => {
    const result = await deleteUser(user.id);

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
      <ModalContent borderRadius="xl">
        <ModalHeader>
          <Flex color="gray.900" gap={3} align="center">
            <FiTrash color="#800000" />
            <Text fontSize="lg" mt={0.5}>
              Delete Account
            </Text>
          </Flex>
          <Text color="gray.700" fontWeight="normal" fontSize="14px">
            Are you sure you want to delete <strong>"{user?.email}"</strong>?
            This action cannot be undone.
          </Text>
        </ModalHeader>
        <ModalCloseButton
          size="md"
          _hover={{ bg: "#f7eaea" }}
          borderRadius="lg"
        />
        <ModalBody>
          <Box
            bg="#fdecec"
            color="#fda8a8ff"
            border="1px"
            borderRadius="xl"
            p="3"
          >
            <Text color="#ef4444">
              <strong>Warning:</strong> This action is permanent and cannot be
              reversed.
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            mr={3}
            variant="outline"
            borderRadius="xl"
            onClick={onClose}
            _hover={{ bg: "#f7eaea" }}
          >
            Close
          </Button>
          <Button
            bg="#ef4444"
            color="white"
            borderRadius="xl"
            _hover={{ bg: "#cc5a5aff" }}
            onClick={handleDelete}
          >
            Delete
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteUserModal;
