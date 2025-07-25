import {
  Box,
  Button,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Flex,
  Text,
  useToast,
} from "@chakra-ui/react";
import { FiUserCheck, FiUserX } from "react-icons/fi";
import useUserStore from "@/store/usersStore";

const ToggleStatusModal = ({ isOpen, onClose, user }) => {
  const toggleStatus = useUserStore((state) => state.toggleStatus);
  const toast = useToast();
  const isActive = user?.status === "Active";
  const label = isActive ? "Deactivate" : "Activate";

  const handleToggleStatus = async () => {
    const result = await toggleStatus(user.id);

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
      <ModalContent borderRadius="xl">
        <ModalHeader>
          <Flex color="gray.900" gap={3} align="center">
            {isActive ? (
              <FiUserX color="#800000" />
            ) : (
              <FiUserCheck color="#800000" />
            )}
            <Text fontSize="lg" mt={0.5}>
              {label} Account
            </Text>
          </Flex>
          <Text color="gray.700" fontWeight="normal" fontSize="14px">
            Are you sure you want to <strong>{label.toLowerCase()}</strong> the
            account of <strong>{user?.email}</strong>?
          </Text>
        </ModalHeader>
        <ModalCloseButton
          size="md"
          _hover={{ bg: "#f7eaea" }}
          borderRadius="lg"
        />
        <ModalBody>
          <Box
            bg={isActive ? "#FFF5F5" : "#ECFDF5"} // light red for deactivate, light green for activate
            border="1px"
            borderColor={isActive ? "#FCA5A5" : "#6EE7B7"}
            borderRadius="xl"
            p="2.5"
          >
            <Text color={isActive ? "#DC2626" : "#047857"}>
              <strong>Important:</strong>{" "}
              {isActive
                ? "Deactivating this account will restrict the user from accessing their account until it is reactivated."
                : "Reactivating this account will allow the user to access their account again."}
            </Text>
          </Box>
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
            bg={isActive ? "#ef4444" : "#10b981"}
            color="white"
            borderRadius="xl"
            _hover={{ bg: isActive ? "#cc5a5a" : "#059669" }}
            onClick={handleToggleStatus}
          >
            {label}
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ToggleStatusModal;
