import {
  Box,
  Flex,
  Heading,
  Text,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Button,
  Link,
  VStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon, WarningIcon } from "@chakra-ui/icons";
import { useState } from "react";

export default function LoginPage({ onLogin }) {
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [errors, setErrors] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" }); // Clear error on change
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!formData.username)
      newErrors.username = "Username or email is required.";
    if (!formData.password) newErrors.password = "Password is required.";
    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    setIsSubmitting(true);

    // Simulate login process
    setTimeout(() => {
      setIsSubmitting(false);
      alert("Login successful (demo)");
    }, 1000);
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={useColorModeValue("gray.50", "gray.800")}
    >
      <Box w="full" maxW="md" p={8} bg="white" boxShadow="lg" borderRadius="lg">
        <VStack spacing={6} align="stretch">
          <Box textAlign="center">
            <Heading fontSize="2xl" color="maroon.700">
              Welcome Back
            </Heading>
            <Text fontSize="sm" color="gray.600">
              Please sign in to your account
            </Text>
          </Box>

          <form onSubmit={handleSubmit}>
            <VStack spacing={4}>
              <FormControl isInvalid={errors.username}>
                <FormLabel>Username or Email</FormLabel>
                <InputGroup>
                  <Input
                    type="text"
                    name="username"
                    value={formData.username}
                    onChange={handleChange}
                    placeholder="Enter your username or email"
                    autoComplete="username"
                    focusBorderColor="maroon.500"
                  />
                  {errors.username && (
                    <InputRightElement pointerEvents="none">
                      <WarningIcon color="red.500" />
                    </InputRightElement>
                  )}
                </InputGroup>
                <FormErrorMessage>{errors.username}</FormErrorMessage>
              </FormControl>

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
                    focusBorderColor="maroon.500"
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
                <FormErrorMessage>{errors.password}</FormErrorMessage>
              </FormControl>

              <Box w="full" textAlign="right">
                <Link
                  color="maroon.600"
                  fontSize="sm"
                  _hover={{ textDecoration: "underline" }}
                >
                  Forgot password?
                </Link>
              </Box>

              <Button
                type="submit"
                colorScheme="maroon"
                isFullWidth
                isLoading={isSubmitting}
              >
                {isSubmitting ? "Signing in..." : "Sign in"}
              </Button>
            </VStack>
          </form>
        </VStack>
      </Box>
    </Flex>
  );
}
