import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
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
import { useState, useEffect } from "react";
import useUserStore from "@/store/usersStore";
import PasswordInput from "../inputs/passwordInput";

const fields = [
  { name: "password", label: "Password", placeholder: "Enter new password" },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Re-enter password",
  },
];

const ResetPasswordModal = ({ isOpen, onClose, user }) => {
  const resetPassword = useUserStore((state) => state.resetPassword);
  const toast = useToast();
  const [form, setForm] = useState({
    password: "",
    confirmPassword: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        password: "",
        confirmPassword: "",
      });
    }
  }, [user]);

  const handleResetPassword = async () => {
    const result = await resetPassword(user.id, form);

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
      setForm({
        password: "",
        confirmPassword: "",
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      motionPreset="slideInBottom"
    >
      <ModalOverlay />
      <ModalContent borderRadius="xl">
        <ModalHeader>
          <Flex color="gray.900" gap={3} align="center">
            <FiAlertTriangle color="#800000" />
            <Text fontSize="lg" mt={0.5}>
              Reset Password
            </Text>
          </Flex>
          <Text color="gray.700" fontWeight="normal" fontSize="14px">
            Reset password for <strong>{user?.email}</strong>
          </Text>
        </ModalHeader>
        <ModalCloseButton
          size="md"
          _hover={{ bg: "#f7eaea" }}
          borderRadius="lg"
        />
        <ModalBody>
          {fields.map((field, index) => (
            <FormControl isRequired mb="4" key={index}>
              <FormLabel>{field.label}</FormLabel>
              <PasswordInput
                name={field.name}
                placeholder={field.placeholder}
                onChange={(password) =>
                  setForm({ ...form, [field.name]: password })
                }
              />
            </FormControl>
          ))}
          <Box
            bg="#fffbeb"
            color="#ffe372ff"
            border="1px"
            borderRadius="xl"
            p={2.5}
          >
            <Text color="#998431ff">
              <strong>Important:</strong> After the password reset, the user will be logged out
              of all sessions and must change their password on the next login.
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
            bg="#800000"
            color="white"
            borderRadius="xl"
            _hover={{ bg: "#832222" }}
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
