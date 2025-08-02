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
  VStack,
  IconButton,
  Center,
  Image,
  useToast,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, WarningIcon } from "@chakra-ui/icons";
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import logo from "@/assets/requestor.svg";
import overviewBg from "@/assets/overview.webp";
import { validateRequiredFields } from "@/utils/validateRequiredFields";

export const LoginPage = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();

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

  const showToast = (message, status = "error") => {
    toast({
      title: message,
      status,
      duration: 3000,
      isClosable: true,
      position: "top-right",
      variant: "top-accent",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const requiredFields = ["email", "password"];

    const hasMissing = validateRequiredFields(
      formData,
      requiredFields,
      setErrors,
      showToast
    );

    if (hasMissing) return;

    setIsSubmitting(true);

    try {
      const { success, data } = await login(formData);
      if (success) {
        showToast("Successfully login.")
        navigate(data.role === "Admin" ? "/admin/dashboard" : "/student");
      } else {
        showToast("Invalid email or password.");
      }
    } catch (err) {
      console.error(err);
      showToast("Login failed. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" px={4}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        style={{ width: "100%", maxWidth: "1000px" }}
      >
        <Flex
          direction={{ base: "column", md: "row" }}
          bg="white"
          borderRadius="xl"
          boxShadow="lg"
          overflow="hidden"
          w="full"
        >
          {/* LEFT: Background Image */}
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
          </Box>

          {/* RIGHT: Login Form */}
          <Box
            w={{ base: "100%", md: "50%", lg: "45%" }}
            p={{ base: 6, sm: 8, md: 10 }}
            bg="white"
            zIndex={2}
          >
            <VStack spacing={6} align="stretch">
              <Box textAlign="center">
                <Image src={logo} boxSize="50px" mx="auto" />
                <Heading fontSize="2xl" color="maroon">
                  Welcome Back
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Please sign in to your account
                </Text>
              </Box>

              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  {/* Email Field */}
                  <FormControl isInvalid={errors.email}>
                    <FormLabel>Email</FormLabel>
                    <InputGroup>
                      <Input
                        type="text"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="Enter your email"
                        autoComplete="email"
                        focusBorderColor="maroon"
                      />
                      <InputRightElement>
                        {errors.email && <WarningIcon color="red.500" />}
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  {/* Password Field */}
                  <FormControl isInvalid={errors.password}>
                    <FormLabel>Password</FormLabel>
                    <InputGroup>
                      <Input
                        type={showPassword ? "text" : "password"}
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        placeholder="Enter your password"
                        autoComplete="current-password"
                        focusBorderColor="maroon"
                      />
                      <InputRightElement>
                        <IconButton
                          size="sm"
                          variant="ghost"
                          onClick={togglePasswordVisibility}
                          icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                          aria-label="Toggle password visibility"
                        />
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  {/* Forgot Password */}
                  <Box w="full" textAlign="right">
                    <Link
                      color="#800000"
                      fontSize="sm"
                      fontWeight="medium"
                      _hover={{ textDecoration: "underline" }}
                    >
                      Forgot password?
                    </Link>
                  </Box>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="solid"
                    isLoading={isSubmitting}
                    color="white"
                    bg="#800000"
                    _hover={{ bg: "#a12828" }}
                    w="full"
                  >
                    {isSubmitting ? "Signing in..." : "Sign in"}
                  </Button>
                </VStack>
              </form>

              {/* Sign Up Prompt */}
              <Center gap="1" mt={5}>
                <Text fontSize={14}>Don't have an account?</Text>
                <Link
                  as={RouterLink}
                  to="/signup"
                  color="#800000"
                  fontSize={14}
                  fontWeight="medium"
                >
                  Sign up
                </Link>
              </Center>
            </VStack>
          </Box>
        </Flex>
      </motion.div>
    </Flex>
  );
};

export default LoginPage;
