import {
  Box,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Link,
  Stack,
  IconButton,
  Center,
  Image,
  useColorModeValue,
  InputLeftElement,
} from "@chakra-ui/react";
import { FiEye, FiEyeOff, FiLock, FiMail } from "react-icons/fi";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import logoWhite from "@/assets/requestor-white.svg";
import logo from "@/assets/requestor.svg";
import overviewBg from "@/assets/overview.webp";
import { showToast } from "@/utils/toast";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  // Modern color palette
  const colors = {
    maroon: "#800000",
    lightMaroon: "#a04040",
    paleMaroon: "#f5f5f6",
    darkMaroon: "#600000",
    slate: "#2D3748",
    maroonHover: "#A52A2A",
  };

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [errors, setErrors] = useState({
    email: false,
    password: false,
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));

    // Clear the error as soon as the field gets a value
    if (value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      setErrors({
        email: !formData.email,
        password: !formData.password,
      });
      showToast("Please fill in all fields.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const { success, data } = await login(formData);
      if (success) {
        showToast("Login successful! Welcome back.", "success");
        navigate(data.role === "Admin" ? "/admin/dashboard" : "/student");
      }
    } catch (err) {
      console.error(err);
      const error = err.response?.data || {
        message: "Login failed. Please try again.",
      };
      showToast(error.message, "error");
    } finally {
      setIsSubmitting(false);
    }
  };

  // Modern card shadow
  const cardShadow = useColorModeValue(
    "0px 4px 20px rgba(0, 0, 0, 0.08)",
    "0px 4px 20px rgba(0, 0, 0, 0.2)"
  );

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={colors.paleMaroon}
      px={4}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, ease: "easeOut" }}
        style={{ width: "100%", maxWidth: "1000px" }}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          bg="white"
          borderRadius="2xl"
          boxShadow={cardShadow}
          overflow="hidden"
          w="full"
        >
          {/* LEFT: Branding Section */}
          <Box
            w={{ base: "100%", md: "50%", lg: "55%" }}
            bgImage={`url(${overviewBg})`}
            bgSize="cover"
            bgPosition="center"
            position="relative"
            display={{ base: "none", md: "block" }}
          >
            <Box
              position="absolute"
              top="0"
              left="0"
              w="full"
              h="full"
              bg="rgba(97, 0, 0, 0.7)"
              zIndex={1}
            />
            <Box
              position="absolute"
              bottom="8"
              left="8"
              zIndex={2}
              color="white"
              maxW="80%"
            >
              <Image src={logoWhite} boxSize="60px" mb={4} />
              <Heading fontSize="2xl" fontWeight="600" mb={2}>
                Welcome Back
              </Heading>
              <Text fontSize="md" opacity={0.95} mb={2}>
                Streamline your workflow with our powerful platform.
              </Text>
              <Text fontSize="sm" opacity={0.85} mb={2}>
                Manage projector requests, track usage, and collaborate with
                your team efficiently.
              </Text>
              <Text fontSize="sm" opacity={0.8}>
                Secure, reliable, and designed for your productivity.
              </Text>
            </Box>
          </Box>

          {/* RIGHT: Login Form */}
          <Box
            w={{ base: "100%", md: "50%", lg: "45%" }}
            p={{ base: 8, md: 10, lg: 12 }}
            bg="white"
            zIndex={2}
          >
            <Stack spacing={8}>
              {/* Mobile Logo */}
              <Box display={{ base: "block", md: "none" }} textAlign="center">
                <Image src={logo} boxSize="60px" mx="auto" />
              </Box>

              <Box>
                <Heading
                  fontSize="2xl"
                  fontWeight="600"
                  color={colors.slate}
                  mb={1}
                >
                  Sign in to your account
                </Heading>
                <Text fontSize="sm" color="gray.500">
                  Enter your credentials to continue
                </Text>
              </Box>

              <form onSubmit={handleSubmit}>
                <Stack spacing={5}>
                  {/* Email Field */}
                  <FormControl isInvalid={errors.email}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="500"
                      color={colors.slate}
                    >
                      Email address
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.400">
                        <FiMail />
                      </InputLeftElement>
                      <Input
                        type="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        autoComplete="email"
                        focusBorderColor={colors.maroon}
                        borderRadius="lg"
                        _placeholder={{ color: "gray.400" }}
                      />
                    </InputGroup>
                    {errors.email && (
                      <Text color="#B03060" fontSize="xs">
                        Please enter a valid email address.
                      </Text>
                    )}
                  </FormControl>

                  {/* Password Field */}
                  <FormControl isInvalid={errors.password}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="500"
                      color={colors.slate}
                    >
                      Password
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.400">
                        <FiLock />
                      </InputLeftElement>
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        focusBorderColor={colors.maroon}
                        borderRadius="lg"
                        _placeholder={{ color: "gray.400" }}
                      />
                      <InputRightElement>
                        <IconButton
                          size="sm"
                          variant="ghost"
                          onClick={togglePasswordVisibility}
                          icon={showPassword ? <FiEyeOff /> : <FiEye />}
                          aria-label="Toggle password visibility"
                          color="gray.500"
                        />
                      </InputRightElement>
                    </InputGroup>
                    {errors.password && (
                      <Text color="#B03060" fontSize="xs">
                        Please enter a valid password.
                      </Text>
                    )}
                  </FormControl>

                  {/* Forgot Password */}
                  <Box textAlign="right">
                    <Link
                      as={RouterLink}
                      to="/forgot-password"
                      fontSize="sm"
                      fontWeight="500"
                      color={colors.maroon}
                      _hover={{ textDecoration: "underline" }}
                    >
                      Forgot password?
                    </Link>
                  </Box>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Signing in..."
                    bg={colors.maroon}
                    color="white"
                    size="md"
                    borderRadius="lg"
                    fontWeight="500"
                    _hover={{
                      bg: colors.maroonHover,
                      transform: "translateY(-1px)",
                      boxShadow: "lg",
                    }}
                    _active={{
                      bg: colors.maroonHover,
                      transform: "translateY(0)",
                    }}
                  >
                    Sign in
                  </Button>
                </Stack>
              </form>

              {/* Sign Up Prompt */}
              <Center fontSize="sm" color="gray.500" gap={1}>
                <Text>Don't have an account?</Text>
                <Link
                  as={RouterLink}
                  to="/signup"
                  color={colors.maroon}
                  fontWeight="500"
                  _hover={{ textDecoration: "underline" }}
                >
                  Sign up
                </Link>
              </Center>
            </Stack>
          </Box>
        </Flex>
      </motion.div>
    </Flex>
  );
};

export default LoginPage;
