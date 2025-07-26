import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
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
import { FiAlertTriangle, FiShield } from "react-icons/fi";
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
    forceLogin: false,
    sendNotification: true
  });

  useEffect(() => {
    if (user) {
      setForm({
        password: "",
        confirmPassword: "",
        forceLogin: false,
        sendNotification: true,
      });
    }
  }, [user]);

  const handleCheckbox =(e) => {
    const {name, checked} = e.target;
    setForm((prev) => ({...prev, [name]: checked}))
  }

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
        forceLogin: false,
        sendNotification: true,
      });
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      motionPreset="slideInBottom"
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
            >
              <FiAlertTriangle color="#800000" />
            </Box>
            <Box>
              <Text fontSize="lg" mt={0.5}>
                Reset Password
              </Text>
              <Text color="gray.700" fontWeight="normal" fontSize="14px">
                Reset password for <strong>{user?.email}</strong>
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
          <Box pb={4}>
            <Checkbox
              colorScheme="red"
              fontWeight="medium"
              name="forceLogin"
              onChange={handleCheckbox}
              sx={{
                "& span.chakra-checkbox__control": {
                  borderRadius: "full",
                },
              }}
            >
              Force password change on next login
            </Checkbox>
            <Text pl={6} fontSize="xs" color="gray.500">
              User will be required to set a new password when they next sign
              in.
            </Text>
          </Box>

          <Box pb={4}>
            <Checkbox
              defaultChecked
              name="sendNotification"
              colorScheme="red"
              fontWeight="medium"
              onChange={handleCheckbox}
              sx={{
                "& span.chakra-checkbox__control": {
                  borderRadius: "full",
                },
              }}
            >
              Send password reset notification
            </Checkbox>
            <Text pl={6} fontSize="xs" color="gray.500">
              User will receive an email notification about the password change.
            </Text>
          </Box>

          <Box
            bg="#fffbeb"
            color="#ffe372ff"
            border="1px"
            borderRadius="xl"
            p={2.5}
          >
            <HStack>
              <FiShield color="#92400e" fontSize="20px" />
              <Text color="#92400e">
                <strong>Security Notice:</strong>
              </Text>
            </HStack>
            <Text color="#bd6826" pl={7} fontSize="14px">
              The user will be automatically logged out of all active sessions
              after the password reset.
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
