import { getEqStatusColor } from "@/utils/getColorScheme";
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
} from "@chakra-ui/react";
import React from "react";
import { BsProjector } from "react-icons/bs";
import { MdOutlineViewInAr } from "react-icons/md";

const ViewEquipmentModal = ({ isOpen, onClose, equipment }) => {
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
                <BsProjector size="32px" color="white" />
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
                borderRadius="xl"
                pl={2}
                pr={2}
                mb={8}
              >
                {equipment.type}
              </Badge>
            </HStack>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
};

export default ViewEquipmentModal;
