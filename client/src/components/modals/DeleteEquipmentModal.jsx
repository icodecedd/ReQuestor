import {
  Box,
  Button,
  Divider,
  Flex,
  HStack,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FiAlertTriangle, FiTrash } from "react-icons/fi";
import useEquipmentStore from "@/store/equipmentStore";
import { useState } from "react";

const DeleteEquipmentModal = ({ isOpen, onClose, equipment }) => {
  const deleteEquipment = useEquipmentStore((state) => state.deleteEquipment);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const toast = useToast();

  const handleDelete = async () => {
    setIsSubmitting(true);
    try {
      await new Promise((resolve) => setTimeout(resolve, 500));

      const result = await deleteEquipment(equipment.id);

      toast({
        title: result.message,
        status: result.success ? "success" : "error",
        duration: 2000,
        position: "top-right",
        variant: "subtle",
      });

      if (result.success) {
        onClose();
      }
    } catch (error) {
      toast({
        title: "An error occurred while deleting equipment.",
        status: "error",
        duration: 2000,
        position: "top-right",
        variant: "subtle",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      motionPreset="slideInBottom"
      isCentered
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
              <FiTrash color="#800000" />
            </Box>
            <Box>
              <Text fontSize="lg" mt={0.5}>
                Delete Equipment
              </Text>
              <Text color="gray.700" fontWeight="normal" fontSize="14px">
                This will permanently remove the equipment record from the
                system.
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
            bg="#fdecec"
            color="#fda8a8ff"
            border="1px"
            borderRadius="xl"
            p="2.5"
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "lg",
            }}
          >
            <HStack>
              <FiAlertTriangle color="#922323ff" fontSize="20px" />
              <Text color="#922323ff">
                <strong>Security Notice:</strong>
              </Text>
            </HStack>
            <Text color="#ef4444" pl={7} fontSize="14px">
              Deleting this equipment is permanent and cannot be undone. All
              associated records will be lost.
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter borderTop="1px solid #e2e8f0" mt={4}>
          <Button
            bg="#ef4444"
            color="white"
            borderRadius="lg"
            isLoading={isSubmitting}
            loadingText="Deleting..."
            w="full"
            _hover={{ bg: "#cc5a5aff" }}
            onClick={handleDelete}
          >
            Delete Equipment
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default DeleteEquipmentModal;
