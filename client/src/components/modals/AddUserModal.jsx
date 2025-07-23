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
} from "@chakra-ui/react";
import { FiUserPlus } from "react-icons/fi";
import { ModalDropdown } from "@/components/dropdowns/ModalDropdown";
import { useState } from "react";
import useUserStore from "@/store/usersStore";
import PasswordInput from "../inputs/PasswordInput";

const fields = [
  { name: "username", label: "Username", placeholder: "Enter username" },
  { name: "email", label: "Email", placeholder: "Enter email" },
  { name: "password", label: "Password", placeholder: "Enter password" },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Re-enter password",
  },
];

const roles = ["Admin", "Student"];
const department = ["BSIT", "BSPSYCH", "BSHM", "DIT", "BSA", "BSFM"];
const status = ["Active", "Inactive", "Suspended"];

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
        status: "",
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
            <FiUserPlus color="#800000" />
            <Text fontSize="lg" mt={0.5}>
              Add New User
            </Text>
          </Flex>
          <Text color="gray.700" fontWeight="normal" fontSize="14px">
            Create a new user account for the system.
          </Text>
        </ModalHeader>
        <ModalCloseButton
          size="md"
          _hover={{ bg: "#f7eaea" }}
          borderRadius="lg"
        />
        <ModalBody>
          <Tabs variant="unstyle" size="sm">
            <TabList
              bg="#f4f4f5"
              borderRadius="lg"
              display="inline-flex"
              p={1.5}
              pr={1.5}
              pl={1.5}
            >
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
                {fields.slice(0, 2).map((field, index) => (
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
                {fields.slice(2).map((field, index) => (
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
                      roles={roles}
                      w="238px"
                      label="Role"
                      placeholder="Select role"
                    />
                    <ModalDropdown
                      value={form.status}
                      onChange={(newStatus) =>
                        setForm({ ...form, status: newStatus })
                      }
                      roles={status}
                      w="238px"
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
            _hover={{ bg: "#832222" }}
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
