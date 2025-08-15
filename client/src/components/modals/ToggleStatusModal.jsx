import {
  Box,
  Button,
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
} from "@chakra-ui/react";
import { FiCheckCircle, FiUserX, FiUserCheck, FiAlertCircle } from "react-icons/fi";
import { useUserStore } from "@/store/usersStore";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/utils/toast";

const DARK_GRAY = "#616161";
const SUCCESS_GREEN = "#38A169";
const SUCCESS_GREEN_DARK = "#2F855A";
const SUCCESS_GREEN_HOVER = "#48BB78";
const SUCCESS_LIGHT = "#F0F9F4";
const WARNING_RED = "#E53E3E";
const WARNING_RED_DARK = "#C53030";
const WARNING_RED_HOVER = "#F56565";
const WARNING_LIGHT = "#FFF5F5";

const ToggleStatusModal = ({ isOpen, onClose, users }) => {
  const toggleStatus = useUserStore((state) => state.toggleStatus);
  const setUserId = useUserStore((state) => state.setUserId);
  const { user } = useAuth();
  const isActive = users?.status === "Active";
  const label = isActive ? "Deactivate" : "Activate";

  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleToggleStatus = async () => {
    setUserId(user.id);
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
      const result = await toggleStatus(users.id);

      showToast(result.message, result.success ? "success" : "error");

      if (result.success) {
        onClose();
      }
    } catch (error) {
      showToast("Failed to toggle status. Please try again.", "error");
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
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(4px)" />
      <ModalContent borderRadius="2xl" overflow="hidden" boxShadow="2xl">
        {/* HEADER */}
        <ModalHeader
          px={6}
          pt={5}
          pb={3}
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          <Flex gap={3} align="center">
            <Box
              bg={isActive ? `${WARNING_RED}15` : `${SUCCESS_GREEN}15`}
              color={isActive ? WARNING_RED : SUCCESS_GREEN}
              borderRadius="full"
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              {isActive ? <FiUserX size={24} /> : <FiUserCheck size={24} />}
            </Box>
            <Box>
              <Text
                fontSize="lg"
                fontWeight="bold"
                color={isActive ? WARNING_RED_DARK : SUCCESS_GREEN_DARK}
              >
                {label} Account
              </Text>
              <Text color="gray.600" fontSize="sm">
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
        </ModalHeader>

        <ModalCloseButton
          size="md"
          _hover={{ bg: isActive ? WARNING_LIGHT : SUCCESS_LIGHT }}
          color={DARK_GRAY}
          borderRadius="full"
          mt={2}
        />

        <ModalBody px={6} py={4} bg="gray.50">
          <Box
            bg={isActive ? `${WARNING_RED}15` : `${SUCCESS_GREEN}15`}
            color={isActive ? WARNING_RED : SUCCESS_GREEN}
            border="1px solid"
            borderColor={isActive ? WARNING_RED : SUCCESS_GREEN}
            borderRadius="xl"
            p={4}
            transition="all 0.3s ease"
            _hover={{
              transform: "scale(1.02)",
              boxShadow: "sm",
            }}
          >
            <HStack spacing={3}>
              {isActive ? (
                <FiAlertCircle color={WARNING_RED} size="20px" />
              ) : (
                <FiCheckCircle color={SUCCESS_GREEN} size="20px" />
              )}

              <Text fontWeight="medium">
                <strong>
                  {isActive ? "Deactivation Notice:" : "Reactivation Notice:"}
                </strong>
              </Text>
            </HStack>
            <Text pl={8} fontSize="14px" mt={1}>
              {isActive
                ? "Deactivating this account will restrict the user from accessing their account until it is reactivated."
                : "Reactivating this account will allow the user to access their account again."}
            </Text>
          </Box>
        </ModalBody>
        <ModalFooter
          borderTop="1px solid"
          borderTopColor="gray.100"
          px={6}
          py={4}
          bg="white"
        >
          <Button
            flex={1}
            bg={isActive ? WARNING_RED : SUCCESS_GREEN}
            color="white"
            _hover={{ bg: isActive ? WARNING_RED_HOVER : SUCCESS_GREEN_HOVER }}
            _active={{ bg: isActive ? WARNING_RED_DARK : SUCCESS_GREEN_DARK }}
            isLoading={isSubmitting}
            loadingText={isActive ? "Deactivating..." : "Reactivating..."}
            onClick={handleToggleStatus}
          >
            {label} Account
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ToggleStatusModal;
