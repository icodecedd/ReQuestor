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
  Tabs,
  Tab,
  TabList,
  TabPanels,
  TabPanel,
  useToast,
  Box,
  Divider,
} from "@chakra-ui/react";
import { FiUserPlus } from "react-icons/fi";
import { ModalDropdown } from "@/components/dropdowns/ModalDropdown";
import { useState } from "react";
import useUserStore from "@/store/usersStore";
import PasswordInput from "../inputs/PasswordInput";

const userFields = [
  { name: "username", label: "Username", placeholder: "Enter username" },
  { name: "email", label: "Email", placeholder: "Enter email" },
  { name: "password", label: "Password", placeholder: "Enter password" },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Re-enter password",
  },
];

const roleOptions = ["Admin", "Student"];
const statusOptions = ["Active", "Inactive", "Suspended"];

const AddUserModal = ({ isOpen, onClose }) => {
  const addUser = useUserStore((state) => state.addUser);
  const toast = useToast();

  const [form, setForm] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    role: "",
    status: "Active",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
    console.log({ [name]: value });
  };

  const handleSubmit = async () => {
    const result = await addUser(form); // Direct call to Zustand store

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
        password: "",
        confirmPassword: "",
        role: "",
        status: "Active",
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
              <FiUserPlus color="#800000" />
            </Box>
            <Box>
              <Text fontSize="lg" mt={0.5}>
                Add New User
              </Text>
              <Text color="gray.700" fontWeight="normal" fontSize="14px">
                Create a new user account for the system.
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
          <Tabs isFitted variant="unstyle" size="sm">
            <TabList bg="#e9e9e9ff" borderRadius="lg" p={1.5} pr={1.5} pl={1.5}>
              <Tab
                _selected={{
                  bg: "white",
                  color: "black",
                  borderRadius: "md",
                  boxShadow: "0 0.5px 1px rgba(0, 0, 0, 0.15)",
                }}
                borderRadius="md"
                color="#71717e"
                fontWeight="bold"
              >
                Account Details
              </Tab>
              <Tab
                _selected={{
                  bg: "white",
                  color: "black",
                  borderRadius: "md",
                  boxShadow: "0 0.5px 1px rgba(0, 0, 0, 0.15)",
                }}
                borderRadius="md"
                color="#71717e"
                fontWeight="bold"
              >
                Role & Status
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {userFields.slice(0, 2).map((field, index) => (
                  <FormControl isRequired mb={4} key={index}>
                    <FormLabel>{field.label}</FormLabel>
                    <Input
                      name={field.name}
                      placeholder={field.placeholder}
                      focusBorderColor="maroon"
                      borderRadius="xl"
                      borderColor="gray.400"
                      onChange={handleChange}
                    />
                  </FormControl>
                ))}
                {userFields.slice(2).map((field, index) => (
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
              </TabPanel>
              <TabPanel>
                <Box h="170px">
                  <Flex gap={5}>
                    <ModalDropdown
                      value={form.role}
                      onChange={(newRole) =>
                        setForm({ ...form, role: newRole })
                      }
                      roles={roleOptions}
                      w={206}
                      label="Role"
                      placeholder="Select role"
                    />
                    <ModalDropdown
                      value={form.status}
                      onChange={(newStatus) =>
                        setForm({ ...form, status: newStatus })
                      }
                      roles={statusOptions}
                      w={206}
                      label="Status"
                      placeholder="Select status"
                      isRequired={false}
                    />
                  </Flex>
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
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
            onClick={handleSubmit}
          >
            Create User
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddUserModal;
