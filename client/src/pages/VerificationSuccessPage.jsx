import {
  Flex,
  Box,
  Stack,
  Button,
  Text,
  Divider,
  Heading,
  Icon,
  useToast,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdMarkEmailRead } from "react-icons/md";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";
import axios from "axios";

const VerificationSuccessPage = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const verified = searchParams.get("verified");

  if (verified !== "true" || !email) {
    return <Navigate to="/login" replace />;
  }

  const handleResend = async () => {
    try {
      const { data } = await axios.post("/api/auth/resend-verification", {
        email,
      });

      toast({
        title: data?.message || "Verification email resent.",
        status: data?.success ? "success" : "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        variant: "top-accent",
      });
    } catch (err) {
      toast({
        title: "Error sending email. Try again later.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        variant: "top-accent",
      });
    }
  };

  return (
    <Flex minH="100vh" align="center" justify="center" bg="gray.50" px={4}>
      <motion.div>
        <Box
          maxW="lg"
          w="full"
          bg="white"
          rounded="xl"
          shadow="lg"
          p={8}
          textAlign="center"
        >
          <Flex
            align="center"
            justify="center"
            w={16}
            h={16}
            rounded="full"
            bg="green.500"
            color="white"
            mx="auto"
            mb={4}
          >
            <Icon as={MdMarkEmailRead} boxSize={8} />
          </Flex>

          <Heading fontSize={useBreakpointValue({ base: "2xl", md: "3xl" })}>
            Email Verified Successfully
          </Heading>

          <Text mt={2} fontSize="md" color="gray.600">
            Your email{" "}
            <Text as="span" fontWeight="bold">
              {email}
            </Text>{" "}
            has been verified.
          </Text>

          <Text fontSize="sm" color="gray.500" mt={1}>
            You can now log in to your account.
          </Text>

          <Divider my={6} />

          <Stack spacing={4}>
            <Button
              colorScheme="green"
              onClick={() => navigate("/login")}
              w="100%"
            >
              Go to Login
            </Button>
            <Button
              variant="outline"
              onClick={handleResend}
              w="100%"
              _hover={{ bg: "gray.100" }}
            >
              Resend Email Again
            </Button>
          </Stack>
        </Box>
      </motion.div>
    </Flex>
  );
};

export default VerificationSuccessPage;
