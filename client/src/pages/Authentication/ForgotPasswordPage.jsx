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
  InputGroup,
  InputLeftElement,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlineLockReset } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useState } from "react";
import { useAuth } from "@/hooks/useAuth";
import { FiMail } from "react-icons/fi";
import { showToast } from "@/utils/toast";

const ForgotPasswordPage = () => {
  const { forgotPassword } = useAuth();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState({
    email: false,
  });
  const [isLoading, setIsLoading] = useState(false);

  // Modern color palette
  const colors = {
    primary: "#800000",
    lightPrimary: "#a04040",
    palePrimary: "#f5f5f6",
    darkPrimary: "#600000",
    slate: "#2D3748",
    maroonHover: "#A52A2A",
  };

  // Modern card shadow
  const cardShadow = useColorModeValue(
    "0px 4px 20px rgba(0, 0, 0, 0.08)",
    "0px 4px 20px rgba(0, 0, 0, 0.2)"
  );

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!email) {
      showToast("Please enter your email address.", "error");
      setErrors((prev) => ({ ...prev, email: true }));
      return;
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      showToast("Please enter a valid email address.", "error");
      setErrors((prev) => ({ ...prev, email: true }));
      return;
    }

    setIsLoading(true);

    try {
      const response = await forgotPassword(email);

      if (response.success) {
        showToast(
          "If an account exists with this email, you'll receive a password reset link shortly.",
          "success",
          4000
        );
        setEmail("");
      } else {
        showToast(response.message || "Failed to send reset email", "error");
      }
    } catch (error) {
      showToast("An error occurred. Please try again later.", "error");
    } finally {
      setIsLoading(false);
      setErrors((prev) => ({ ...prev, email: false }));
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
            Reset Your Password
          </Heading>

          <Text fontSize="md" color="gray.600" lineHeight="tall" mb={6}>
            Enter your email address and we'll send you a link to reset your
            password.
          </Text>

          <Stack spacing={5}>
            <FormControl isInvalid={errors.email}>
              <FormLabel
                fontSize="sm"
                fontWeight="500"
                color={colors.slate}
                textAlign="left"
              >
                Email Address
              </FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none" color="gray.400">
                  <FiMail />
                </InputLeftElement>
                <Input
                  type="email"
                  placeholder="your@email.com"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    setErrors((prev) => ({ ...prev, email: false }));
                  }}
                  focusBorderColor={colors.primary}
                  borderColor={colors.lightPrimary}
                  _hover={{ borderColor: colors.primary }}
                  borderRadius="lg"
                  _placeholder={{ color: "gray.400" }}
                />
              </InputGroup>
              {errors.email && (
                <Text color="#B03060" fontSize="xs" align={"left"}>
                  Please enter a valid email address.
                </Text>
              )}
            </FormControl>

            <Button
              type="submit"
              isLoading={isLoading}
              loadingText="Sending reset link..."
              bg={colors.primary}
              color="white"
              _hover={{
                bg: colors.maroonHover,
                transform: "translateY(-2px)",
                boxShadow: "md",
              }}
              _active={{
                bg: colors.maroonHover,
                transform: "translateY(0)",
              }}
              size="md"
              borderRadius="lg"
              fontWeight="500"
            >
              Send Reset Link
            </Button>

            <Button
              variant="outline"
              onClick={() => navigate("/login")}
              color={colors.primary}
              borderColor={colors.lightPrimary}
              _hover={{
                bg: colors.palePrimary,
                borderColor: colors.primary,
              }}
              size="md"
              borderRadius="lg"
            >
              Back to Login
            </Button>
          </Stack>
        </Box>
      </motion.div>
    </Flex>
  );
};

export default ForgotPasswordPage;
