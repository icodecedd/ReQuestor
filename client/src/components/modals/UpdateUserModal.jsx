import {
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
  Input,
  useToast,
  Box,
  Divider,
} from "@chakra-ui/react";
import { FiEdit } from "react-icons/fi";
import { ModalDropdown } from "@/components/dropdowns/ModalDropdown";
import { useState, useEffect } from "react";
import useUserStore from "@/store/usersStore";

const fields = [
  { name: "username", label: "Username", placeholder: "Enter username" },
  { name: "email", label: "Email", placeholder: "Enter email" },
];

const roles = ["Admin", "Student"];
const department = ["BSIT", "BSPSYCH", "BSHM", "DIT", "BSA", "BSFM"];
const status = ["Active", "Inactive", "Suspended"];

const UpdateUserModal = ({ isOpen, onClose, user }) => {
  const updateUser = useUserStore((state) => state.updateUser);
  const toast = useToast();

  const [form, setForm] = useState({
    username: "",
    email: "",
    role: "",
    status: "",
  });

  useEffect(() => {
    if (user) {
      setForm({
        username: user.username,
        email: user.email,
        role: user.role,
        status: user.status,
      });
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    console.log({ [name]: value });
  };

  const handleUpdate = async () => {
    const result = await updateUser(user.id, form); // Direct call to Zustand store

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
        username: "",
        email: "",
        role: "",
        status: "",
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
              transition="all 0.3s ease"
              _hover={{
                transform: "scale(1.02)",
                boxShadow: "lg",
              }}
            >
              <FiEdit color="#800000" />
            </Box>
            <Box>
              <Text fontSize="lg" mt={0.5}>
                Edit User
              </Text>
              <Text color="gray.700" fontWeight="normal" fontSize="14px">
                Modify user information and permissions.
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
        <ModalBody mt={-2}>
          {fields.map((field, index) => (
            <FormControl isRequired key={index} p={2}>
              <FormLabel>{field.label}</FormLabel>
              <Input
                name={field.name}
                value={form[`${field.name}`]}
                placeholder={field.placeholder}
                focusBorderColor="maroon"
                borderRadius="xl"
                borderColor="gray.400"
                onChange={handleChange}
              />
            </FormControl>
          ))}
          <Flex gap={5} p={2}>
            <ModalDropdown
              value={form.role}
              onChange={(newRole) => setForm({ ...form, role: newRole })}
              roles={roles}
              w={206}
              label="Role"
              placeholder="Select role"
            />
            <ModalDropdown
              value={form.status}
              onChange={(newStatus) => setForm({ ...form, status: newStatus })}
              roles={status}
              w={206}
              label="Status"
              placeholder="Select status"
              isRequired={false}
            />
          </Flex>
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
