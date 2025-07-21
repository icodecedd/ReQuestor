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
import { useEffect, useState } from "react";
import { FiTrash } from "react-icons/fi";

const DeleteUserModal = ({ isOpen, onClose, user }) => {
  const toast = useToast();
  const [form, setForm] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        email: user.email,
      });
    }
  }, [user]);

  const handleDelete = async () => {
    console.log("handle delete");
  };

  return (
    <Modal isOpen={isOpen} onClose={onClose} size="lg">
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
            Are you sure you want to delete "{form.email}"? This action cannot
            be undone.
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
            p="4"
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
