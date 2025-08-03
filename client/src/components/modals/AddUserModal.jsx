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
  Badge,
} from "@chakra-ui/react";
import { FiUserPlus } from "react-icons/fi";
import { ModalDropdown } from "@/components/dropdowns/ModalDropdown";
import { useState } from "react";
import useUserStore from "@/store/usersStore";
import PasswordInput from "../inputs/PasswordInput";
import { getUserColor } from "@/utils/getColorScheme";

const userFields = [
  { name: "name", label: "Name", placeholder: "Enter name" },
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
    name: "",
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
      title: result.message,
      status: result.success ? "success" : "error",
      duration: 3000,
      isClosable: true,
      variant: "top-accent",
      position: "top-right",
    });

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
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      motionPreset="slideInBottom"
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
                  <FormControl mb={4} key={index}>
                    <FormLabel fontSize={15}>{field.label}</FormLabel>
                    <Input
                      name={field.name}
                      placeholder={field.placeholder}
                      focusBorderColor="maroon"
                      borderRadius="lg"
                      borderColor="gray.400"
                      onChange={handleChange}
                    />
                  </FormControl>
                ))}
                {userFields.slice(2).map((field, index) => (
                  <FormControl mb="4" key={index}>
                    <FormLabel fontSize={15}>{field.label}</FormLabel>
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
                <Box h="250px">
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
                      isRequired={false}
                    />
                    <FormControl>
                      <FormLabel fontSize={15}>Selected Role</FormLabel>
                      <Box
                        border="1px"
                        borderRadius="lg"
                        h="38px"
                        borderColor="gray.400"
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
                  <Flex gap={5} mt={5}>
                    <ModalDropdown
                      value={form.status}
                      onChange={(newStatus) =>
                        setForm({ ...form, status: newStatus })
                      }
                      roles={statusOptions}
                      w={206}
                      label="Status (Optional)"
                      placeholder="Select status"
                      isRequired={false}
                    />
                    <FormControl>
                      <FormLabel>Selected Status</FormLabel>
                      <Box
                        border="1px"
                        borderRadius="lg"
                        h="38px"
                        borderColor="gray.400"
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
                </Box>
              </TabPanel>
            </TabPanels>
          </Tabs>
        </ModalBody>

        <ModalFooter>
          <Button
            mr={3}
            variant="outline"
            borderRadius="lg"
            onClick={onClose}
            _hover={{ bg: "#f7eaea" }}
          >
            Close
          </Button>
          <Button
            bg="#800000"
            color="white"
            borderRadius="lg"
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
