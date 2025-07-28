import {
  Box,
  Button,
  Checkbox,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  HStack,
  Input,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Tab,
  TabList,
  TabPanel,
  TabPanels,
  Tabs,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { BsProjector } from "react-icons/bs";
import { FaChalkboardTeacher } from "react-icons/fa";
import { FiFileText } from "react-icons/fi";
import { PiProjectorScreenChart } from "react-icons/pi";

const requestFields = [
  {
    name: "requestor_name",
    label: "Requestor Name",
    placeholder: "Enter requestor name",
  },
  {
    name: "course_section",
    label: "Course & Section",
    placeholder: "Enter course and section",
  },
  {
    name: "faculty_in_charge",
    label: "Faculty In-Charge",
    placeholder: "Enter faculty in-charge",
  },
];

const scheduleFields = [
  {
    name: "time_from",
    label: "Time From",
    placeholder: "Select start time",
    type: "time",
  },
  {
    name: "time_to",
    label: "Time To",
    placeholder: "Select end time",
    type: "time",
  },
];

const equipmentFields = [
  {
    name: "projector",
    label: "Projector",
    icon: <BsProjector color="white" />,
  },
  {
    name: "white_screen",
    label: "White Screen",
    icon: <PiProjectorScreenChart color="white" />,
  },
  {
    name: "avr",
    label: "AVR",
    icon: <FaChalkboardTeacher color="white" />,
  },
];

const AddRequestModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
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
              <FiFileText color="#800000" />
            </Box>
            <Box>
              <Text fontSize="lg" mt={0.5}>
                Add Equipment Request
              </Text>
              <Text color="gray.700" fontWeight="normal" fontSize="14px">
                Submit a new request for processing.
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
                Request Details
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
                Schedule Info
              </Tab>
            </TabList>
            <TabPanels>
              <TabPanel>
                {requestFields.map((field, index) => (
                  <FormControl isRequired mb={4} key={index}>
                    <FormLabel>{field.label}</FormLabel>
                    <Input
                      name={field.name}
                      placeholder={field.placeholder}
                      focusBorderColor="maroon"
                      borderRadius="xl"
                      borderColor="gray.400"
                      //onChange={handleChange}
                    />
                  </FormControl>
                ))}
                <FormControl isRequired>
                  <FormLabel>Equipment</FormLabel>
                  <Box
                    border="1px"
                    borderRadius="xl"
                    borderColor="gray.400"
                    p={4}
                    _hover={{
                      borderColor: "maroon",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    }}
                  >
                    <SimpleGrid columns={2} spacing="10px">
                      {equipmentFields.map((field, index) => (
                        <Checkbox
                          key={index}
                          colorScheme="red"
                          fontWeight="medium"
                          name={field.name}
                          // onChange={handleCheckbox}
                          sx={{
                            "& span.chakra-checkbox__control": {
                              borderRadius: "full",
                            },
                          }}
                        >
                          <Box
                            border="1px"
                            borderRadius="lg"
                            borderColor="#800000"
                            w={200}
                            p={1}
                            transition="all 0.3s ease"
                            _hover={{
                              transform: "scale(1.02)",
                              boxShadow: "lg",
                            }}
                            transform={false ? "scale(1.02)" : "none"}
                            boxShadow={false ? "lg" : "none"}
                          >
                            <HStack>
                              <Box
                                borderRadius="md"
                                bgGradient="linear(to-br, maroon, #c75d5dff)"
                                boxShadow="0 2px 8px rgba(0,0,0,0.12)"
                                p={2}
                                mr={2}
                              >
                                {field.icon}
                              </Box>
                              <Heading fontSize="13px" fontWeight="bold">
                                {field.label}
                              </Heading>
                            </HStack>
                          </Box>
                        </Checkbox>
                      ))}
                    </SimpleGrid>
                  </Box>
                </FormControl>
              </TabPanel>
              <TabPanel>
                <FormControl isRequired mb={4}>
                  <FormLabel>Date of Use</FormLabel>
                  <Input
                    name="date_use"
                    type="date"
                    placeholder="Select date of use"
                    focusBorderColor="maroon"
                    borderRadius="xl"
                    borderColor="gray.400"
                    //onChange={handleChange}
                  />
                </FormControl>
                <Flex gap={5}>
                  {scheduleFields.map((field, index) => (
                    <FormControl isRequired mb={4} key={index}>
                      <FormLabel>{field.label}</FormLabel>
                      <Input
                        name={field.name}
                        type={field.type}
                        placeholder={field.placeholder}
                        focusBorderColor="maroon"
                        borderRadius="xl"
                        borderColor="gray.400"
                        //onChange={handleChange}
                      />
                    </FormControl>
                  ))}
                </Flex>
                <FormControl>
                  <FormLabel>Purpose</FormLabel>
                  <Textarea
                    name="purpose"
                    focusBorderColor="maroon"
                    borderRadius="xl"
                    borderColor="gray.400"
                    placeholder="Enter purpose or any additional details..."
                    //onChange={handleChange}
                  />
                </FormControl>
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
            //onClick={handleSubmit}
          >
            Create Request
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default AddRequestModal;
