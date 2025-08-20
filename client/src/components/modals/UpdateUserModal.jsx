import {
  Badge,
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
import { FiEdit, FiMail, FiUser } from "react-icons/fi";
import { ModalDropdown } from "@/components/dropdowns/ModalDropdown";
import { useEffect, useState } from "react";
import { useUserStore } from "@/store/usersStore";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/utils/toast";
import { getUserColor } from "@/utils/getColorScheme";
import _ from "lodash";

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
];

const roleOptions = ["Admin", "Student"];
const statusOptions = ["Active", "Inactive", "Suspended"];

const UpdateUserModal = ({ isOpen, onClose, users }) => {
  const updateUser = useUserStore((state) => state.updateUser);
  const setUserId = useUserStore((state) => state.setUserId);
  const { user } = useAuth();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [form, setForm] = useState({
    name: "",
    email: "",
    role: "",
    status: "",
  });

  const compareForm = {
    name: users?.name || "",
    email: users?.email || "",
    role: users?.role || "",
    status: users?.status || "",
  };

  const [errors, setErrors] = useState({
    name: false,
    email: false,
  });

  useEffect(() => {
    if (users) {
      setForm({
        name: users.name,
        email: users.email,
        role: users.role,
        status: users.status,
      });
    }
  }, [users]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));

    if (value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleUpdate = async () => {
    setUserId(user.id);
    setIsSubmitting(true);

    const areUserEqual = _.isEqual(form, compareForm);
    if (areUserEqual) {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
      showToast(
        "No changes detected. Please make sure to update at least one field.",
        "info"
      );
      setIsSubmitting(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay

      const result = await updateUser(users.id, form); // Direct call to Zustand store

      if (result.message.includes("All")) {
        setErrors({
          name: !form.name.trim(),
          email: !form.email.trim(),
        });
        showToast(result.message, "error");
        return;
      }

      showToast(result.message, result.success ? "success" : "error");

      if (result.success) {
        onClose();
      }
    } catch (error) {
      showToast("Failed to update user. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setErrors({
      name: false,
      email: false,
    });

    setForm({
      name: users.name,
      email: users.email,
      role: users.role,
      status: users.status,
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
              <FiEdit size={24} />
            </Box>
            <Box>
              <Heading size="md" fontWeight="bold">
                Edit User Details
              </Heading>
              <Text fontSize="sm" opacity={0.85}>
                Modify and update user details
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
              {/* USER DETAILS */}
              {userFields.map((field) => (
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

              {/* ROLE DROPDOWN */}
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
                  <FormControl>
                    <FormLabel fontWeight="semibold">Selected Role</FormLabel>
                    <Box
                      border="1px"
                      borderColor={MAROON_HOVER}
                      focusBorderColor={MAROON}
                      _hover={{ borderColor: "gray.300" }}
                      transition={"all 0.2s"}
                      borderRadius={"md"}
                      h="38px"
                    >
                      <Badge
                        bg={getUserColor(form.role)}
                        border="1px"
                        color={form.role !== "Admin" ? "black" : "white"}
                        borderColor={
                          form.role === "Admin" ? "maroon" : "gray.300"
                        }
                        borderRadius="xl"
                        pl={2}
                        pr={2}
                        pb={0.5}
                        mt={2}
                        ml={2}
                      >
                        {form.role || "No Selected Role"}
                      </Badge>
                    </Box>
                  </FormControl>
                </Flex>
              </GridItem>

              {/* STATUS DROPDOWN */}
              <GridItem colSpan={2}>
                <Flex gap={5}>
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
                  <FormControl>
                    <FormLabel fontWeight="semibold">Selected Role</FormLabel>
                    <Box
                      border="1px"
                      borderColor={MAROON_HOVER}
                      focusBorderColor={MAROON}
                      _hover={{ borderColor: "gray.300" }}
                      transition={"all 0.2s"}
                      borderRadius={"md"}
                      h="38px"
                    >
                      <Badge
                        colorScheme={getUserColor(form.status)}
                        borderRadius="xl"
                        pl={2}
                        pr={2}
                        pb={0.5}
                        mt={2}
                        ml={2}
                      >
                        {form.status || "No Selected Status"}
                      </Badge>
                    </Box>
                  </FormControl>
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
            onClick={handleUpdate}
          >
            Update User
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default UpdateUserModal;
