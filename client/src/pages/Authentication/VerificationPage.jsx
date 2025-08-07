import {
  Flex,
  Box,
  Stack,
  Button,
  Text,
  Heading,
  Icon,
  useToast,
  useColorModeValue,
} from "@chakra-ui/react";
import axios from "axios";
import { motion } from "framer-motion";
import { MdEmail, MdOutlineMarkEmailRead } from "react-icons/md";
import { useLocation } from "react-router-dom";

const VerificationPage = () => {
  const location = useLocation();
  const email = location.state?.email || "";
  const toast = useToast();

  // Modern color palette
  const colors = {
    maroon: "#800000",
    lightMaroon: "#a04040",
    paleMaroon: "#f8e8e8",
    darkMaroon: "#600000",
    slate: "#2D3748",
  };

  const handleResendVerification = async () => {
    try {
      const { data } = await axios.post("/api/auth/resend-verification", {
        email,
      });

      toast({
        title: data?.message || "Verification email resent. Check your inbox.",
        status: "success",
        duration: 1800,
        position: "top-right",
        variant: "subtle",
      });
    } catch (error) {
      toast({
        title:
          error.response?.data?.message ||
          "Failed to resend verification. Please try again.",
        status: "error",
        duration: 1800,
        position: "top-right",
        variant: "subtle",
      });
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
        style={{ width: "100%", maxWidth: "480px" }}
      >
        <Box
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
            bg={colors.maroon}
            color="white"
            mx="auto"
            mb={6}
          >
            <Icon as={MdOutlineMarkEmailRead} boxSize={8} />
          </Flex>

          <Heading
            as="h1"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="600"
            color={colors.slate}
            mb={3}
          >
            Verify your email
          </Heading>

          <Text fontSize="md" color="gray.600" lineHeight="tall" mb={6}>
            We've sent a verification link to{" "}
            <Text as="span" fontWeight="600" color={colors.maroon}>
              {email}
            </Text>
          </Text>

          <Text fontSize="sm" color="gray.500" mb={8}>
            Check your inbox and click the link in the email to complete your
            registration. The link will expire in 24 hours.
          </Text>

          <Stack spacing={4}>
            <Button
              leftIcon={<MdEmail />}
              colorScheme="maroon"
              bg={colors.maroon}
              _hover={{ bg: colors.darkMaroon }}
              _active={{ bg: colors.darkMaroon }}
              size="md"
              onClick={() => window.open("https://mail.google.com", "_blank")}
            >
              Open Email App
            </Button>

            <Button
              variant="outline"
              color={colors.maroon}
              borderColor={colors.lightMaroon}
              _hover={{ bg: colors.paleMaroon }}
              size="md"
              onClick={handleResendVerification}
            >
              Resend Verification Email
            </Button>
          </Stack>

          <Text mt={8} fontSize="sm" color="gray.500">
            Didn't receive the email? Check your spam folder or{" "}
            <Button
              variant="link"
              color={colors.maroon}
              fontWeight="500"
              onClick={handleResendVerification}
            >
              resend it
            </Button>
          </Text>
        </Box>
      </motion.div>
    </Flex>
  );
};

export default VerificationPage;
