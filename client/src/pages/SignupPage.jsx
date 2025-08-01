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

export const SignupPage = () => {
  const { signup } = useAuth();
  const navigate = useNavigate();
  const toast = useToast();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    student_number: "",
  });
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    name: false,
    student_number: false,
  });
  const [showPassword, setShowPassword] = useState(false);
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

    const requiredFields = ["student_number", "name", "email", "password"];

    const hasMissing = validateRequiredFields(
      formData,
      requiredFields,
      setErrors,
      showToast
    );

    if (hasMissing) return;

    if (!formData.email.includes("@")) {
      setErrors((prev) => ({ ...prev, email: true }));
      showToast("Invalid email format.");
      return;
    }

    if (formData.password.length < 8) {
      setErrors((prev) => ({ ...prev, password: true }));
      showToast("Password must be at least 6 characters.");
      return;
    }

    setIsSubmitting(true);

    try {
      const { success } = await signup(formData);

      if (success) {
        navigate("/verification", {
          state: { email: formData.email },
        });
        console.log("Signup successful");
      } else {
        showToast("Something went wrong.");
      }
    } catch (err) {
      console.error(err);

      const errorMessage =
        err?.response?.data?.message || "Sign up failed. Please try again.";

      showToast(errorMessage);

      // Optionally navigate to verification page again
      if (errorMessage.includes("not verified")) {
        navigate("/verification", {
          state: { email: formData.email },
        });
      }
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
          height="1xl"
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

          {/* RIGHT: Signup Form */}
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
                  Create Account
                </Heading>
                <Text fontSize="sm" color="gray.600">
                  Welcome to ReQuestor. Let's create your account
                </Text>
              </Box>

              <form onSubmit={handleSubmit}>
                <VStack spacing={4}>
                  {/* Student Number */}
                  <FormControl isInvalid={errors.student_number}>
                    <FormLabel>Student Number</FormLabel>
                    <InputGroup>
                      <Input
                        type="text"
                        name="student_number"
                        value={formData.student_number}
                        onChange={handleChange}
                        placeholder="Enter your student number"
                        focusBorderColor="maroon"
                      />
                      <InputRightElement>
                        {errors.student_number && (
                          <WarningIcon color="red.500" />
                        )}
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  {/* Name */}
                  <FormControl isInvalid={errors.name}>
                    <FormLabel>Name</FormLabel>
                    <InputGroup>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Enter your name"
                        focusBorderColor="maroon"
                      />
                      <InputRightElement>
                        {errors.name && <WarningIcon color="red.500" />}
                      </InputRightElement>
                    </InputGroup>
                  </FormControl>

                  {/* Email */}
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

                  {/* Password */}
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

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    variant="solid"
                    isLoading={isSubmitting}
                    color="white"
                    bg="#800000"
                    _hover={{ bg: "#a12828" }}
                    w="full"
                    mt={3}
                  >
                    {isSubmitting ? "Signing up..." : "Sign up"}
                  </Button>
                </VStack>
              </form>

              {/* Already have an account */}
              <Center gap="1" mt={5}>
                <Text fontSize={14}>Have an account?</Text>
                <Link
                  as={RouterLink}
                  to="/login"
                  color="#800000"
                  fontSize={14}
                  fontWeight="medium"
                >
                  Sign in
                </Link>
              </Center>
            </VStack>
          </Box>
        </Flex>
      </motion.div>
    </Flex>
  );
};

export default SignupPage;
