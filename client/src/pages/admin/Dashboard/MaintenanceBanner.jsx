import { useState, useEffect } from "react";
import {
  Alert,
  AlertIcon,
  Text,
  Flex,
  CloseButton,
  Box,
} from "@chakra-ui/react";
import { FiClock } from "react-icons/fi";
import { useSettingsStore } from "@/store/settingsStore";

const MaintenanceBanner = () => {
  const { settings } = useSettingsStore();
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Only show if maintenance is active and not dismissed
    if (settings?.maintenance) {
      const lastDismissed = localStorage.getItem("maintenanceDismissed");
      if (!lastDismissed || Date.now() - lastDismissed > 86400000) {
        // 24h
        setIsVisible(true);
      }
    } else {
      setIsVisible(false);
    }
  }, [settings?.maintenance]);

  const handleClose = () => {
    localStorage.setItem("maintenanceDismissed", Date.now().toString());
    setIsVisible(false);
  };

  if (!isVisible || !settings?.maintenance) return null;

  return (
    <Alert
      status="warning"
      variant="subtle"
      borderRadius="xl"
      boxShadow={"0 4px 12px rgba(140, 142, 24, 0.25)"}
      transition="all 0.4s cubic-bezier(0.215, 0.61, 0.355, 1)"
      _hover={{
        transform: "translateY(-2px)",
      }}
      w="95%"
      mx="auto"
      mb={4}
      py={2}
    >
      <AlertIcon boxSize={5} />
      <Box flex="1" p={1}>
        <Text fontSize="15px" fontWeight="bold">
          {settings.maintenance_message ||
            "We're performing scheduled maintenance. Some features may be unavailable."}
        </Text>
        {settings.grace_period && (
          <Flex align="center" fontSize="xs">
            <FiClock size={12} />
            <Text ml={1}>
              Maintenance will start in {settings.grace_period} minutes
            </Text>
          </Flex>
        )}
      </Box>
      <CloseButton
        size="sm"
        onClick={handleClose}
        position="absolute"
        borderRadius="full"
        _hover={{ bg: "#efdcb8ff" }}
        right={2}
        top={2}
      />
    </Alert>
  );
};

export default MaintenanceBanner;
