import { getEqStatusColor, getEqConditionColor } from "@/utils/getColorScheme";
import {
  Badge,
  Box,
  Divider,
  Flex,
  Heading,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Spacer,
  Text,
  VStack,
} from "@chakra-ui/react";
import React from "react";
import { BsProjector } from "react-icons/bs";
import { MdOutlineViewInAr } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiProjectorScreenChart } from "react-icons/pi";
import {
  FiInfo,
  FiMapPin,
  FiCheckCircle,
  FiActivity,
  FiBox,
} from "react-icons/fi";
import { TbFileDescription } from "react-icons/tb";

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

const formatEquipmentId = (id) => {
  return `EQ-${String(id).padStart(3, "0")}`;
};

const ViewEquipmentModal = ({ isOpen, onClose, equipment }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      motionPreset="slideInBottom"
      isCentered
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
              <MdOutlineViewInAr color="#800000" />
            </Box>
            <Box>
              <Text fontSize="lg" mt={0.5}>
                Equipment Details [#{formatEquipmentId(equipment.id)}]
              </Text>
              <Text color="gray.700" fontWeight="normal" fontSize="14px">
                View and manage detailed information about the selected
                equipment.
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
          <Box
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
                {selectedCategory(equipment.type)}
              </Box>
              <Box>
                <Heading as="h3" fontSize="16px" fontWeight="bold">
                  {equipment.name}
                </Heading>
                <Text fontSize="13px" color="gray.600" mt={0.5}>
                  {equipment.serial_number}
                </Text>
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
                {equipment.type}
              </Badge>
            </HStack>
          </Box>
          <HStack mt={3} mb={1}>
            <FiInfo />
            <Text fontWeight="semibold" fontSize="15px" color="gray.600">
              Equipment Information
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
            <VStack align="start" spacing={6}>
              {/* Description */}
              <Box>
                <HStack spacing={1} align="center" mb={0.5}>
                  <TbFileDescription fontSize={12} />
                  <Text fontSize="12px" color="gray.500">
                    Description
                  </Text>
                </HStack>
                <Text fontWeight="medium" fontSize="15px">
                  {equipment.description}
                </Text>
              </Box>

              {/* Info Grid: Location, Status, Condition */}
              <SimpleGrid columns={3} spacing={6} w="full">
                {/* Location */}
                <Box>
                  <HStack spacing={1} align="center" mb={0.5}>
                    <FiMapPin fontSize={12} />
                    <Text fontSize="12px" color="gray.500">
                      Location
                    </Text>
                  </HStack>
                  <Text fontWeight="medium" fontSize="15px">
                    {equipment.location}
                  </Text>
                </Box>

                {/* Status */}
                <Box>
                  <HStack spacing={1} align="center" mb={0.5}>
                    <FiCheckCircle fontSize={12} />
                    <Text fontSize="12px" color="gray.500">
                      Status
                    </Text>
                  </HStack>
                  <Badge
                    bg={getEqStatusColor(equipment.status)}
                    color="white"
                    borderRadius="md"
                    px={3}
                    py={1}
                  >
                    {equipment.status}
                  </Badge>
                </Box>

                {/* Condition */}
                <Box>
                  <HStack spacing={1} align="center" mb={0.5}>
                    <FiActivity fontSize={12} />
                    <Text fontSize="12px" color="gray.500">
                      Condition
                    </Text>
                  </HStack>
                  <Badge
                    colorScheme={getEqConditionColor(equipment.condition)}
                    borderRadius="md"
                    px={3}
                    py={1}
                  >
                    {equipment.condition}
                  </Badge>
                </Box>
              </SimpleGrid>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewEquipmentModal;
