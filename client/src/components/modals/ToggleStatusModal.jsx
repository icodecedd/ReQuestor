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
import {
  FiAlertCircle,
  FiCheckCircle,
  FiUserCheck,
  FiUserX,
} from "react-icons/fi";
import useUserStore from "@/store/usersStore";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";

const ToggleStatusModal = ({ isOpen, onClose, users }) => {
  const toggleStatus = useUserStore((state) => state.toggleStatus);
  const setUserId = useUserStore((state) => state.setUserId);
  const { user } = useAuth();
  const toast = useToast();
  const isActive = user?.status === "Active";
  const label = isActive ? "Deactivate" : "Activate";
  const [isSubmitting, setSubmitting] = useState(false);

  const handleToggleStatus = async () => {
    setUserId(user.id);
    setSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network
      const result = await toggleStatus(users.id);

      toast({
        title: result.message,
        status: result.success ? "success" : "error",
        duration: 2000,
        variant: "subtle",
        position: "top-right",
      });

      if (result.success) {
        onClose();
      }
    } catch (error) {
      toast({
        title: "Error toggling status. Please try again.",
        status: "error",
        duration: 2000,
        position: "top-right",
        variant: "subtle",
      });
    } finally {
      setSubmitting(false);
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
              {isActive ? (
                <FiUserX color="#800000" />
              ) : (
                <FiUserCheck color="#800000" />
              )}
            </Box>
            <Box>
              <Text fontSize="lg" mt={0.5}>
                {label} Account
              </Text>
              <Text color="gray.700" fontWeight="normal" fontSize="14px">
                Confirm to{" "}
                <Text
                  fontWeight="semibold"
                  as="span"
                  color={
                    label.toLowerCase() === "deactivate"
                      ? "red.600"
                      : "green.600"
                  }
                >
                  {label.toLowerCase()}
                </Text>{" "}
                the account of <strong>{users?.email}</strong>?
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
            bg={isActive ? "#FFF5F5" : "#ECFDF5"} // light red for deactivate, light green for activate
            border="1px"
            borderColor={isActive ? "#FCA5A5" : "#6EE7B7"}
            borderRadius="xl"
            p="2.5"
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "lg",
            }}
          >
            <HStack>
              {isActive ? (
                <FiAlertCircle color="#DC2626" size="20px" />
              ) : (
                <FiCheckCircle color="#047857" size="20px" />
              )}
              <Text color={isActive ? "#DC2626" : "#047857"}>
                <strong>
                  {isActive ? "Deactivation Notice:" : "Reactivation Notice:"}
                </strong>
              </Text>
            </HStack>
            <Text
              color={isActive ? "#cf4747ff" : "#18ab81ff"}
              pl={7}
              fontSize="14px"
            >
              {isActive
                ? "Deactivating this account will restrict the user from accessing their account until it is reactivated."
                : "Reactivating this account will allow the user to access their account again."}
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter borderTop="1px solid #e2e8f0" mt={4}>
          <Button
            bg={isActive ? "#ef4444" : "#10b981"}
            color="white"
            w="full"
            isLoading={isSubmitting}
            loadingText={isActive ? "Deactivating..." : "Activating..."}
            borderRadius="lg"
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
