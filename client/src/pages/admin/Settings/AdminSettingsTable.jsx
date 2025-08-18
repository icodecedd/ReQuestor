import { useAuth } from "@/hooks/useAuth";
import { useSettingsStore } from "@/store/settingsStore";
import { showToast } from "@/utils/toast";
import {
  Box,
  Button,
  Flex,
  Heading,
  Text,
  Switch,
  Divider,
  FormControl,
  FormLabel,
  NumberInput,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
  NumberInputField,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { FiGlobe, FiSave } from "react-icons/fi";

const MAROON = "#800000";
const MAROON_HOVER = "#A52A2A";
const BORDER_COLOR = "#E2E8F0";
const SUBTLE_TEXT = "#71717E";

const AdminSettingsTable = () => {
  const {
    settings: config,
    updateSettings,
    fetchSettings,
    setUserId,
  } = useSettingsStore();
  const { user } = useAuth();

  const [settings, setSettings] = useState(() => ({
    email_notif: config?.email_notif || false,
    auto_approve: config?.auto_approve || false,
    maintenance: config?.maintenance || false,
    session_timeout: config?.session_timeout || 30,
    max_login: config?.max_login || 5,
  }));
  const [errors, setErrors] = useState({
    session_timeout: false,
    max_login: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (config) {
      setSettings({
        email_notif: config.email_notif ?? false,
        auto_approve: config.auto_approve ?? false,
        maintenance: config.maintenance ?? false,
        session_timeout: config.session_timeout ?? 30,
        max_login: config.max_login ?? 5,
      });
    }
  }, [config]);

  const handleChange = (key, value) => {
    setSettings((prev) => ({ ...prev, [key]: value }));
    if (value.trim()) setErrors((prev) => ({ ...prev, [key]: false }));
  };

  const getSwitchProps = () => ({
    size: "lg",
    colorScheme: "red",
    _focusVisible: {
      boxShadow: `0 0 0 3px ${MAROON}`,
    },
  });

  const handleSaveSettings = async () => {
    setUserId(user.id);
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 500)); // Simulate network delay
      const result = await updateSettings(settings);

      if (result.type === "info") {
        showToast(result.message, "info");
        return;
      }

      showToast(result.message, result.success ? "success" : "error");
    } catch (error) {
      showToast("Failed to update settings. Please try again.", "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Box w="99.5%" mx="auto" p={8}>
      {/* Save Changes Button */}
      <Flex align="flex-end" gap={3} mb={2}>
        <Button
          ml="auto"
          variant="primary"
          bg={MAROON}
          color="white"
          borderRadius="lg"
          _hover={{ bg: MAROON_HOVER }}
          transition="background-color 0.2s ease-in-out"
          gap={1}
          p={3}
          fontSize="95%"
          w="150px"
          onClick={handleSaveSettings}
          isLoading={isSubmitting}
          loadingText="Saving..."
        >
          <FiSave size="20px" />
          Save Changes
        </Button>
      </Flex>

      {/* Settings Card */}
      <Box borderRadius="md" border={"1px solid #e2e8f0"} p={5}>
        {/* General Settings Header */}
        <Flex gap="12px" alignItems="center" marginBottom="8px">
          <FiGlobe size="22px" color={MAROON} />
          <Heading fontSize="24px" fontWeight="600">
            General Settings
          </Heading>
        </Flex>
        <Text fontSize="14px" marginBottom="16px" color={SUBTLE_TEXT}>
          Configure basic system settings and preferences
        </Text>

        <Divider marginY="20px" borderColor={BORDER_COLOR} />

        {/* Notifications Section */}
        <Box marginTop="24px">
          <Heading fontSize="18px" fontWeight="600" marginBottom="16px">
            Notifications
          </Heading>

          <Flex
            alignItems="center"
            justifyContent="space-between"
            paddingY="12px"
          >
            <Box>
              <Text fontSize="15px" fontWeight="500" marginBottom="4px">
                Email Notifications
              </Text>
              <Text fontSize="13px" color={SUBTLE_TEXT}>
                Receive notification via email when new requests are made
              </Text>
            </Box>
            <Switch
              {...getSwitchProps()}
              isChecked={settings.email_notif}
              onChange={(e) => handleChange("email_notif", e.target.checked)}
            />
          </Flex>

          <Flex
            alignItems="center"
            justifyContent="space-between"
            paddingY="12px"
          >
            <Box>
              <Text fontSize="15px" fontWeight="500" marginBottom="4px">
                Auto Approval
              </Text>
              <Text fontSize="13px" color={SUBTLE_TEXT}>
                Automatically approve requests from trusted users
              </Text>
            </Box>
            <Switch
              {...getSwitchProps()}
              isChecked={settings.auto_approve}
              onChange={(e) => handleChange("auto_approve", e.target.checked)}
            />
          </Flex>
        </Box>

        <Divider marginY="20px" borderColor={BORDER_COLOR} />

        {/* Security Section */}
        <Box marginTop="24px">
          <Heading fontSize="18px" fontWeight="600" marginBottom="16px">
            Security
          </Heading>

          <Flex
            alignItems="center"
            justifyContent="space-between"
            paddingY="12px"
          >
            <Box>
              <Text fontSize="15px" fontWeight="500" marginBottom="4px">
                Maintenance Mode
              </Text>
              <Text fontSize="13px" color={SUBTLE_TEXT}>
                Enable maintenance mode to prevent new requests
              </Text>
            </Box>
            <Switch
              {...getSwitchProps()}
              isChecked={settings.maintenance}
              onChange={(e) => handleChange("maintenance", e.target.checked)}
            />
          </Flex>

          <FormControl isInvalid={errors.session_timeout} marginTop="16px">
            <FormLabel fontWeight="500" fontSize="15px" marginBottom="8px">
              Session Timeout (Minutes)
            </FormLabel>
            <NumberInput
              min={15}
              value={settings.session_timeout}
              onChange={(value) =>
                handleChange("session_timeout", parseInt(value))
              }
            >
              <NumberInputField
                borderColor={MAROON_HOVER}
                focusBorderColor={MAROON}
                borderRadius="6px"
                padding="12px"
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>

          <FormControl isInvalid={errors.max_login} marginTop="16px">
            <FormLabel fontWeight="500" fontSize="15px" marginBottom="8px">
              Max Login Attempts
            </FormLabel>
            <NumberInput
              min={1}
              value={settings.max_login}
              onChange={(value) => handleChange("max_login", parseInt(value))}
            >
              <NumberInputField
                borderColor={MAROON_HOVER}
                focusBorderColor={MAROON}
                borderRadius="6px"
                padding="12px"
              />
              <NumberInputStepper>
                <NumberIncrementStepper />
                <NumberDecrementStepper />
              </NumberInputStepper>
            </NumberInput>
          </FormControl>
        </Box>
      </Box>
    </Box>
  );
};

export default AdminSettingsTable;
