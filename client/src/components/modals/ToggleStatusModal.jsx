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
import {
  FiCheckCircle,
  FiUserX,
  FiUserCheck,
  FiAlertCircle,
} from "react-icons/fi";
import { useUserStore } from "@/store/usersStore";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/utils/toast";

// Color Palette Constants
const DARK_GRAY = "#616161";
const SUCCESS_GREEN = "#38A169"; // For activation/positive actions
const SUCCESS_GREEN_DARK = "#2F855A";
const SUCCESS_GREEN_HOVER = "#48BB78";
const WARNING_ORANGE = "#DD6B20"; // For reversible destructive actions (deactivate)
const WARNING_ORANGE_DARK = "#C05621";
const WARNING_ORANGE_HOVER = "#ED8936";

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
      await new Promise((resolve) => setTimeout(resolve, 500));
      const result = await toggleStatus(users.id);
      showToast(result.message, result.success ? "success" : "error");
      if (result.success) onClose();
    } catch (error) {
      showToast("Failed to toggle status. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Dynamic styles based on action type
  const actionStyles = {
    deactivate: {
      icon: FiUserX,
      color: WARNING_ORANGE,
      colorDark: WARNING_ORANGE_DARK,
      colorHover: WARNING_ORANGE_HOVER,
      bgLight: `${WARNING_ORANGE}15`,
      borderColor: WARNING_ORANGE,
      noticeIcon: FiAlertCircle,
    },
    activate: {
      icon: FiUserCheck,
      color: SUCCESS_GREEN,
      colorDark: SUCCESS_GREEN_DARK,
      colorHover: SUCCESS_GREEN_HOVER,
      bgLight: `${SUCCESS_GREEN}15`,
      borderColor: SUCCESS_GREEN,
      noticeIcon: FiCheckCircle,
    },
  };

  const styles = isActive ? actionStyles.deactivate : actionStyles.activate;

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
              bg={styles.bgLight}
              color={styles.color}
              borderRadius="full"
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <styles.icon size={24} />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold" color={styles.colorDark}>
                {label} Account
              </Text>
              <Text color="gray.600" fontSize="sm">
                Confirm to{" "}
                <Text fontWeight="semibold" as="span" color={styles.color}>
                  {label.toLowerCase()}
                </Text>{" "}
                the account of <strong>{users?.email}</strong>?
              </Text>
            </Box>
          </Flex>
        </ModalHeader>

        <ModalCloseButton
          size="md"
          _hover={{ bg: styles.bgLight }}
          color={DARK_GRAY}
          borderRadius="full"
          mt={2}
        />

        <ModalBody px={6} py={4} bg="gray.50">
          <Box
            bg={styles.bgLight}
            color={styles.color}
            border="1px solid"
            borderColor={styles.borderColor}
            borderRadius="xl"
            p={4}
            transition="all 0.3s ease"
            _hover={{ transform: "scale(1.02)", boxShadow: "sm" }}
          >
            <HStack spacing={3}>
              <styles.noticeIcon color={styles.color} size="20px" />
              <Text fontWeight="medium">
                <strong>{label} Notice:</strong>
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
            bg={styles.color}
            color="white"
            _hover={{ bg: styles.colorHover }}
            _active={{ bg: styles.colorDark }}
            isLoading={isSubmitting}
            loadingText={`${label}...`}
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
