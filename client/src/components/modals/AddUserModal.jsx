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
} from "@chakra-ui/react";
import { FiUserPlus } from "react-icons/fi";

const fields = [
  { label: "Username", placeholder: "Enter username" },
  { label: "Email Address", placeholder: "Enter email address" },
  { label: "Password", placeholder: "Enter password" },
  { label: "Confirm Password", placeholder: "Enter confirm password" },
];

const AddUserModal = ({ isOpen, onClose }) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
        <ModalCloseButton size="md" _hover={{ bg: "#f7eaea" }} borderRadius="lg"/>
        <ModalBody>
          <Tabs variant="enclosed" size="md">
            <TabList>
              <Tab _selected={{ bg: "#f7eaea" }}>Account</Tab>
              <Tab _selected={{ bg: "#f7eaea" }}>Role</Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {fields.map((field, index) => (
                  <FormControl isRequired mb={4} key={index}>
                    <FormLabel>{field.label}</FormLabel>
                    <Input
                      placeholder={field.placeholder}
                      focusBorderColor="maroon"
                      borderRadius="xl"
                      borderColor="gray.400"
                    />
                  </FormControl>
                ))}
              </TabPanel>
              <TabPanel>
                <Flex>

                </Flex>
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
          >
            Create User
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddUserModal;
