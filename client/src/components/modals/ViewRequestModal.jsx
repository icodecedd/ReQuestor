import { getRequestStatusColor, getUserColor } from "@/utils/getColorScheme";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  HStack,
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
} from "@chakra-ui/react";
import React from "react";
import { BsProjector } from "react-icons/bs";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiProjectorScreenChart } from "react-icons/pi";
import {
  FiInfo,
  FiBox,
  FiFileText,
  FiClock,
  FiUser,
  FiBookOpen,
  FiCalendar,
  FiEdit,
} from "react-icons/fi";
import { getDateOnly } from "@/utils/getDate";
import { formatTime } from "@/utils/formatTime";

const selectedCategory = (type) => {
  switch (type) {
    case "Projector":
      return <BsProjector fontSize="32px" color="white" />;
    case "White Screen":
      return <PiProjectorScreenChart fontSize="32px" color="white" />;
    case "AVR":
      return <FaChalkboardTeacher fontSize="32px" color="white" />;
    default:
      return <FiBox fontSize="32px" color="white" />; // fallback icon
  }
};

const formatRequestsId = (id) => {
  return `REQ-${String(id).padStart(3, "0")}`;
};

const formatEquipmentId = (id) => {
  return `EQ-${String(id).padStart(3, "0")}`;
};

const ViewRequestModal = ({ isOpen, onClose, request }) => {
  return (
    request && (
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
                <MdOutlineDocumentScanner color="#800000" />
              </Box>
              <Box>
                <Text fontSize="lg" mt={0.5}>
                  Request Details [#{formatRequestsId(request.id)}]
                </Text>
                <Text color="gray.700" fontWeight="normal" fontSize="14px">
                  View and manage detailed information about the selected
                  request.
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
              <TabList
                bg="#e9e9e9ff"
                borderRadius="lg"
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
                  Requestor Details
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
                  Equipment
                </Tab>
              </TabList>
              <TabPanels>
                <TabPanel>
                  <Box
                    border="1px"
                    borderRadius="xl"
                    borderColor="gray.400"
                    p={4}
                    mb={3}
                    textAlign="center"
                    position="relative"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: "scale(1.02)",
                      boxShadow: "lg",
                    }}
                  >
                    <Box position="absolute" top={3} right={3}>
                      <Badge
                        colorScheme={getRequestStatusColor(request.status)}
                        borderRadius="md"
                        px={3}
                        fontSize="sm"
                      >
                        {request.status}
                      </Badge>
                    </Box>
                    <Avatar
                      size="md"
                      mb={3}
                      mx="auto"
                      bgGradient="linear(to-br, maroon, #c75d5dff)"
                    />
                    <Text fontSize="13px" color="gray.500" mt={0.5}>
                      Requestor Name
                    </Text>
                    <Heading as="h3" fontSize="16px" fontWeight="bold">
                      {request.username}
                    </Heading>
                    <Badge
                      mt={2}
                      border="1px"
                      borderRadius="md"
                      bg={getUserColor(request.role)}
                      color={request.role === "Admin" ? "white" : "black"}
                      borderColor={
                        request.role === "Admin" ? "maroon" : "gray.300"
                      }
                      pl={2}
                      pr={2}
                      pb={0.5}
                    >
                      {request.role}
                    </Badge>
                  </Box>

                  <HStack mb={1}>
                    <FiFileText />
                    <Text
                      fontWeight="semibold"
                      fontSize="15px"
                      color="gray.600"
                    >
                      Request Information
                    </Text>
                  </HStack>
                  <Box
                    border="1px"
                    borderRadius="xl"
                    borderColor="gray.400"
                    p={4}
                    mb={3}
                    position="relative"
                    transition="all 0.3s ease"
                    _hover={{
                      transform: "scale(1.02)",
                      boxShadow: "lg",
                    }}
                  >
                    {/* Request Details */}
                    <SimpleGrid columns={2} spacingY={3} spacingX={10}>
                      <Box>
                        <HStack spacing={1} align="center" mb={0.5}>
                          <FiUser fontSize={12} />
                          <Text fontSize="12px" color="gray.500">
                            Faculty-in-Charge
                          </Text>
                        </HStack>
                        <Text fontWeight="medium" fontSize="15px">
                          {request.faculty_in_charge}
                        </Text>
                      </Box>

                      <Box>
                        <HStack spacing={1} align="center" mb={0.5}>
                          <FiBookOpen fontSize={12} />
                          <Text fontSize="12px" color="gray.500">
                            Course & Section
                          </Text>
                        </HStack>
                        <Text fontWeight="medium" fontSize="15px">
                          {request.course_section}
                        </Text>
                      </Box>

                      <Box>
                        <HStack spacing={1} align="center" mb={0.5}>
                          <FiCalendar fontSize={12} />
                          <Text fontSize="12px" color="gray.500">
                            Date of Use
                          </Text>
                        </HStack>
                        <Text fontWeight="medium" fontSize="15px">
                          {getDateOnly(request.date_use)}
                        </Text>
                      </Box>

                      <Box>
                        <HStack spacing={1} align="center" mb={0.5}>
                          <FiClock fontSize={12} />
                          <Text fontSize="12px" color="gray.500">
                            Time
                          </Text>
                        </HStack>
                        <Text fontWeight="medium" fontSize="15px">
                          {`${formatTime(request.time_from)} - ${formatTime(
                            request.time_to
                          )}`}
                        </Text>
                      </Box>

                      <Box gridColumn="span 2">
                        <HStack spacing={1} align="center" mb={0.5}>
                          <FiEdit fontSize={12} />
                          <Text fontSize="12px" color="gray.500">
                            Purpose
                          </Text>
                        </HStack>
                        <Text fontWeight="medium" fontSize="15px">
                          {request.purpose}
                        </Text>
                      </Box>
                    </SimpleGrid>
                  </Box>
                </TabPanel>
                <TabPanel>
                  {request.equipment_list.map((eq, index) => (
                    <Box
                      key={index}
                      border="2px"
                      borderRadius="xl"
                      borderColor="#800000"
                      p={2}
                      mb={2}
                      transition="all 0.3s ease"
                      _hover={{
                        transform: "scale(1.02)",
                        boxShadow: "lg",
                      }}
                    >
                      <HStack>
                        <Box
                          borderRadius="lg"
                          bgGradient="linear(to-br, maroon, #c75d5dff)"
                          boxShadow="0 2px 8px rgba(0,0,0,0.12)"
                          p={2}
                          mr={2}
                        >
                          {selectedCategory(eq.equipment_type)}
                        </Box>
                        <Box>
                          <Text fontSize="12px" color="gray.500">
                            #{formatEquipmentId(eq.equipment_id)}
                          </Text>
                          <Heading as="h3" fontSize="16px" fontWeight="bold">
                            {eq.equipment_name}
                          </Heading>
                        </Box>
                        <Spacer />
                        <Badge
                          color="black"
                          border="1px"
                          borderColor="gray.300"
                          borderRadius="md"
                          pl={2}
                          pr={2}
                          mb={8}
                        >
                          {eq.equipment_type}
                        </Badge>
                      </HStack>
                    </Box>
                  ))}
                </TabPanel>
              </TabPanels>
            </Tabs>
          </ModalBody>
          <ModalFooter borderTop="1px solid #e2e8f0" mt={4}>
            <Button
              variant="outline"
              borderColor={"#2D3748"}
              borderRadius="lg"
              w="full"
              onClick={onClose}
              _hover={{ bg: "#f7eaea" }}
            >
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    )
  );
};

export default ViewRequestModal;
