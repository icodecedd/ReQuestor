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

const ViewEquipmentModal = ({ isOpen, onClose, equipment }) => {
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
            >
              <MdOutlineViewInAr color="#800000" />
            </Box>
            <Box>
              <Text fontSize="lg" mt={0.5}>
                Equipment Details
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
          <Box border="2px" borderRadius="xl" borderColor="#800000" p={2}>
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
                <Heading as="h3" fontSize="15px" fontWeight="bold">
                  {equipment.name}
                </Heading>
                <Text fontSize="12px" color="gray.600" mt={0.5}>
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
          <Box p={4}>
            <VStack align="start" spacing={4}>
              <HStack spacing={12} align="start" w="full">
                {/* Description */}
                <VStack align="start" spacing={1}>
                  <HStack>
                    <FiInfo />
                    <Text fontWeight="semibold" color="gray.600">
                      Description
                    </Text>
                  </HStack>
                  <Text fontSize="sm">{equipment.description}</Text>
                </VStack>
              </HStack>

              <HStack spacing={12} align="start" w="full">
                {/* Location */}
                <VStack align="start" spacing={1}>
                  <HStack>
                    <FiMapPin />
                    <Text fontWeight="semibold" color="gray.600">
                      Location
                    </Text>
                  </HStack>
                  <Text fontSize="sm">{equipment.location}</Text>
                </VStack>

                {/* Status */}
                <VStack align="start" spacing={1}>
                  <HStack>
                    <FiCheckCircle />
                    <Text fontWeight="semibold" color="gray.600">
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
                </VStack>

                {/* Condition */}
                <VStack align="start" spacing={1}>
                  <HStack>
                    <FiActivity />
                    <Text fontWeight="semibold" color="gray.600">
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
                </VStack>
              </HStack>
            </VStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewEquipmentModal;
