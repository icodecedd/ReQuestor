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
import { useState } from "react";
import { motion } from "framer-motion";
import { useAuth } from "@/hooks/useAuth";
import { useNavigate, Link as RouterLink } from "react-router-dom";
import logoWhite from "@/assets/requestor-white.svg";
import logo from "@/assets/requestor.svg";
import overviewBg from "@/assets/overview.webp";
import { FiEye, FiEyeOff, FiLock, FiMail, FiUser } from "react-icons/fi";
import { showToast } from "@/utils/toast";

export const SignupPage = () => {
  const { signup } = useAuth();
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

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    name: "",
    student_number: "",
  });

  const [errors, setErrors] = useState({
    name: false,
    email: false,
    password: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (value.trim()) setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.email || !formData.password) {
      setErrors({
        name: !formData.name,
        email: !formData.email,
        password: !formData.password,
      });
      showToast("Please fill in all fields.", "error");
      return;
    }

    if (formData.password.length < 6) {
      setErrors((prev) => ({ ...prev, password: true }));
      showToast("Password must be at least 6 characters.", "error");
      return;
    }

    setIsSubmitting(true);

    try {
      const { success } = await signup(formData);
      if (success) {
        showToast("Account created successfully!", "success");
        navigate("/verification", { state: { email: formData.email } });
      }
    } catch (err) {
      console.error(err);
      const errorMessage =
        err?.response?.data?.message || "Sign up failed. Please try again.";
      showToast(errorMessage, "error");

      if (errorMessage.includes("not verified")) {
        navigate("/verification", { state: { email: formData.email } });
      }
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
                Join Our Community
              </Heading>
              <Text fontSize="md" opacity={0.95} mb={2}>
                Welcome to <b>ReQuestor</b> — your paperless solution for
                projector and equipment reservations.
              </Text>
              <Text fontSize="sm" opacity={0.9} mb={2}>
                Reserve projectors and classroom equipment online, track your
                requests, and enjoy a seamless, eco-friendly experience.
              </Text>
              <Text fontSize="sm" opacity={0.8}>
                Say goodbye to paperwork and manual logs. With ReQuestor,
                managing your equipment needs is just a few clicks away.
              </Text>
            </Box>
          </Box>
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
                  Create your account
                </Heading>
                <Text fontSize="sm" color="gray.500">
                  Get started with just a few details
                </Text>
              </Box>

              <form onSubmit={handleSubmit}>
                <Stack spacing={5}>
                  {/* Name Field */}
                  <FormControl isInvalid={errors.name}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="500"
                      color={colors.slate}
                    >
                      Full Name
                    </FormLabel>
                    <InputGroup>
                      <InputLeftElement pointerEvents="none" color="gray.400">
                        <FiUser />
                      </InputLeftElement>
                      <Input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleChange}
                        placeholder="Your full name"
                        focusBorderColor={colors.maroon}
                        borderRadius="lg"
                        _placeholder={{ color: "gray.400" }}
                      />
                    </InputGroup>
                    {errors.name && (
                      <Text color="#B03060" fontSize="xs">
                        Please enter your full name.
                      </Text>
                    )}
                  </FormControl>

                  {/* Email Field */}
                  <FormControl isInvalid={errors.email}>
                    <FormLabel
                      fontSize="sm"
                      fontWeight="500"
                      color={colors.slate}
                    >
                      Email Address
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
                        placeholder="your@email.com"
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
                        placeholder="At least 6 characters"
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

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    isLoading={isSubmitting}
                    loadingText="Creating account..."
                    colorScheme="maroon"
                    bg={colors.maroon}
                    color="white"
                    size="md"
                    borderRadius="lg"
                    fontWeight="500"
                    mt={3}
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
                    Create Account
                  </Button>
                </Stack>
              </form>

              {/* Login Prompt */}
              <Center fontSize="sm" color="gray.500" gap={1}>
                <Text>Already have an account?</Text>
                <Link
                  as={RouterLink}
                  to="/login"
                  color={colors.maroon}
                  fontWeight="500"
                  _hover={{ textDecoration: "underline" }}
                >
                  Sign in
                </Link>
              </Center>
            </Stack>
          </Box>
        </Flex>
      </motion.div>
    </Flex>
  );
};

export default SignupPage;
