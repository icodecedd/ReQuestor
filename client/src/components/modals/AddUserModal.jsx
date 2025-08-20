import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Grid,
  GridItem,
  Heading,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FiMail, FiUser, FiUserPlus } from "react-icons/fi";
import { ModalDropdown } from "@/components/dropdowns/ModalDropdown";
import { useState } from "react";
import { useUserStore } from "@/store/usersStore";
import { PasswordInput } from "../inputs/PasswordInput";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/utils/toast";

const MAROON = "#800000";
const MAROON_HOVER = "#A52A2A";

const userFields = [
  {
    name: "name",
    label: "Name",
    placeholder: "Enter name",
    icon: <FiUser />,
    errorMessage: "Please enter a name",
  },
  {
    name: "email",
    label: "Email",
    placeholder: "Enter email",
    icon: <FiMail />,
    errorMessage: "Please enter an email",
  },
  {
    name: "password",
    label: "Password",
    placeholder: "Enter password",
    icon: <PasswordInput />,
    errorMessage: "Please enter a password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Re-enter password",
    icon: <PasswordInput />,
    errorMessage: "Please re-enter the password",
  },
];

const roleOptions = ["Admin", "Student"];
const statusOptions = ["Active", "Inactive", "Suspended"];

const AddUserModal = ({ isOpen, onClose }) => {
  const addUser = useUserStore((state) => state.addUser);
  const setUserId = useUserStore((state) => state.setUserId);
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    status: "Active",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
    confirmPassword: false,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async () => {
    setUserId(user.id);
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
      const result = await addUser(form); // Direct call to Zustand store

      if (result.message.includes("All")) {
        setErrors({
          name: !form.name.trim(),
          email: !form.email.trim(),
          password: !form.password.trim(),
          confirmPassword: !form.confirmPassword.trim(),
        });
        showToast(result.message, "error");
        return;
      }

      showToast(result.message, result.success ? "success" : "error");

      if (result.success) {
        onClose();
        setForm({
          name: "",
          email: "",
          password: "",
          confirmPassword: "",
          role: "",
          status: "Active",
        });
      }
    } catch (error) {
      showToast("Failed to add user. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setForm({
      name: "",
      email: "",
      password: "",
      confirmPassword: "",
      role: "",
      status: "Active",
    });

    setErrors({
      name: false,
      email: false,
      password: false,
      confirmPassword: false,
    });

    onClose(); // actually close the modal
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={handleClose}
      size="2xl"
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(4px)" />
      <ModalContent borderRadius="2xl" overflow="hidden" boxShadow="2xl">
        {/* HEADER */}
        <ModalHeader
          bgGradient="linear(to-br, #800000, #A52A2A)"
          color="white"
          py={5}
          px={6}
        >
          <Flex align="center" gap={3}>
            <Box bg="whiteAlpha.200" p={3} borderRadius="full">
              <FiUserPlus size={24} />
            </Box>
            <Box>
              <Heading size="md" fontWeight="bold">
                Add New User
              </Heading>
              <Text fontSize="sm" opacity={0.85}>
                Create a new user account for the system
              </Text>
            </Box>
          </Flex>
        </ModalHeader>
        <ModalCloseButton
          color="white"
          _hover={{ bg: "whiteAlpha.300" }}
          borderRadius="full"
        />

        <ModalBody>
          <Box>
            <Grid templateColumns="repeat(2, 1fr)" gap={5}>
              {userFields.slice(0, 2).map((field) => (
                <GridItem key={field.name} colSpan={2}>
                  <FormControl isInvalid={errors[field.name]}>
                    <FormLabel fontWeight="semibold">{field.label}</FormLabel>
                    <Input
                      name={field.name}
                      value={form[field.name]}
                      onChange={handleChange}
                      placeholder={field.placeholder}
                      focusBorderColor={MAROON}
                      borderColor={MAROON_HOVER}
                    />
                  </FormControl>
                  {errors[field.name] && (
                    <Text color="#B03060" fontSize="xs">
                      {field.errorMessage}
                    </Text>
                  )}
                </GridItem>
              ))}
              {userFields.slice(2).map((field) => (
                <GridItem key={field.name} colSpan={1}>
                  <FormControl isInvalid={errors[field.name]}>
                    <FormLabel fontWeight="semibold">{field.label}</FormLabel>
                    <PasswordInput
                      name={field.name}
                      value={form[field.name]}
                      placeholder={field.placeholder}
                      onChange={(password) =>
                        setForm({ ...form, [field.name]: password })
                      }
                      focusBorderColor={MAROON}
                      borderColor={MAROON_HOVER}
                    />
                  </FormControl>
                  {errors[field.name] && (
                    <Text color="#B03060" fontSize="xs">
                      {field.errorMessage}
                    </Text>
                  )}
                </GridItem>
              ))}
              <GridItem colSpan={2}>
                <Flex gap={5}>
                  <ModalDropdown
                    value={form.role}
                    onChange={(newRole) => setForm({ ...form, role: newRole })}
                    roles={roleOptions}
                    w={"100%"}
                    menuItemWidth={"135%"}
                    label="Role"
                    placeholder="Select role"
                    isRequired={false}
                  />
                  <ModalDropdown
                    value={form.status}
                    onChange={(newStatus) =>
                      setForm({ ...form, status: newStatus })
                    }
                    roles={statusOptions}
                    w={"100%"}
                    menuItemWidth={"135%"}
                    label="Status (Optional)"
                    placeholder="Select status"
                    isRequired={false}
                  />
                </Flex>
              </GridItem>
            </Grid>
          </Box>
        </ModalBody>

        <ModalFooter borderTop="1px solid" borderColor="gray.200" gap={3}>
          <Button
            flex={1}
            variant="outline"
            color={MAROON}
            borderColor={MAROON}
            _hover={{ bg: `${MAROON}10` }}
            onClick={handleClose}
          >
            Cancel
          </Button>
          <Button
            flex={1}
            bg={MAROON}
            color="white"
            isLoading={isSubmitting}
            loadingText="Creating..."
            _hover={{ bg: MAROON_HOVER }}
            onClick={handleSubmit}
          >
            Add User
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddUserModal;
