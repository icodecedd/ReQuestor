import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  Input,
  FormControl,
  FormLabel,
  useToast,
  InputGroup,
  InputRightElement,
  useColorModeValue,
  InputLeftElement,
  IconButton,
} from "@chakra-ui/react";
import { MdOutlineLockReset } from "react-icons/md";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { FiEye, FiEyeOff, FiLock } from "react-icons/fi";
import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/utils/toast";

const ResetPasswordPage = () => {
  // Modern color palette
  const colors = {
    primary: "#800000",
    lightPrimary: "#a04040",
    palePrimary: "#f5f5f6",
    darkPrimary: "#600000",
    slate: "#2D3748",
    maroonHover: "#A52A2A",
  };

  const { resetPassword } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [searchParams] = useSearchParams();
  const resetToken = searchParams.get("token");

  if (!resetToken) return <Navigate to="/forgot-password" />;

  // Modern card shadow
  const cardShadow = useColorModeValue(
    "0px 4px 20px rgba(0, 0, 0, 0.08)",
    "0px 4px 20px rgba(0, 0, 0, 0.2)"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      showToast("Passwords do not match.", "error");
      return;
    }

    if (password.length < 6) {
      showToast("Password must be at least 6 characters.", "error");
      return;
    }

    setIsLoading(true);
    try {
      if (!resetToken) {
        showToast("Invalid reset token.", "error");
      }

      // Simulate API call
      const response = await resetPassword(resetToken, password);
      if (!response.success) {
        showToast(
          response.message || "An error occurred. Please try again.",
          "error"
        );
      }

      showToast(
        response.message || "Password updated successfully.",
        "success"
      );
      setPassword("");
      setConfirmPassword("");
      navigate("/login");
    } catch (error) {
      console.error(error);
      showToast(
        error.message || "An error occurred. Please try again.",
        "error"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={colors.palePrimary}
      px={4}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ width: "100%", maxWidth: "480px" }}
      >
        <Box
          as="form"
          onSubmit={handleSubmit}
          bg="white"
          rounded="2xl"
          p={8}
          shadow={cardShadow}
          textAlign="center"
          borderWidth={1}
          borderColor="rgba(0, 0, 0, 0.05)"
        >
          <Flex
            align="center"
            justify="center"
            w={20}
            h={20}
            rounded="full"
            bg={colors.primary}
            color="white"
            mx="auto"
            mb={6}
          >
            <MdOutlineLockReset size={32} />
          </Flex>

          <Heading
            as="h1"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="600"
            color={colors.slate}
            mb={3}
          >
            Create New Password
          </Heading>

          <Text fontSize="md" color="gray.600" lineHeight="tall" mb={6}>
            Choose a strong, secure password for your account
          </Text>

          <Stack spacing={5}>
            <FormControl>
              <FormLabel
                fontSize="sm"
                fontWeight="500"
                color={colors.slate}
                textAlign="left"
              >
                New Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.400">
                  <FiLock />
                </InputLeftElement>
                <Input
                  type={showPassword ? "text" : "password"}
                  placeholder="At least 6 characters"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  focusBorderColor={colors.primary}
                  borderColor={colors.lightPrimary}
                  _hover={{ borderColor: colors.primary }}
                  borderRadius="lg"
                  _placeholder={{ color: "gray.400" }}
                  minLength={6}
                  required
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                    icon={showPassword ? <FiEyeOff /> : <FiEye />}
                    aria-label="Toggle password visibility"
                    color="gray.500"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <FormControl>
              <FormLabel
                fontSize="sm"
                fontWeight="500"
                color={colors.slate}
                textAlign="left"
              >
                Confirm Password
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.400">
                  <FiLock />
                </InputLeftElement>
                <Input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  focusBorderColor={colors.primary}
                  borderColor={colors.lightPrimary}
                  _hover={{ borderColor: colors.primary }}
                  borderRadius="lg"
                  _placeholder={{ color: "gray.400" }}
                  minLength={6}
                  required
                />
                <InputRightElement>
                  <IconButton
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    icon={showPassword ? <FiEyeOff /> : <FiEye />}
                    aria-label="Toggle password visibility"
                    color="gray.500"
                  />
                </InputRightElement>
              </InputGroup>
            </FormControl>

            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="Updating password..."
              bg={colors.primary}
              color="white"
              _hover={{
                bg: colors.maroonHover,
                transform: "translateY(-1px)",
                boxShadow: "lg",
              }}
              _active={{
                bg: colors.maroonHover,
                transform: "translateY(0)",
              }}
              size="md"
              borderRadius="lg"
              fontWeight="500"
            >
              Update Password
            </Button>
          </Stack>

          <Text mt={6} textAlign="center" color="gray.500" fontSize="sm">
            Remembered your password?{" "}
            <Button
              variant="link"
              color={colors.primary}
              fontWeight="500"
              onClick={() => navigate("/login")}
            >
              Sign in instead
            </Button>
          </Text>
        </Box>
      </motion.div>
    </Flex>
  );
};

export default ResetPasswordPage;
