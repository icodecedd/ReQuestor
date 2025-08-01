import { useAuth } from "@/hooks/useAuth";
import {
  Flex,
  Box,
  Stack,
  Button,
  Text,
  Divider,
  Heading,
  Icon,
  useBreakpointValue,
  useToast,
} from "@chakra-ui/react";
import axios from "axios";
import { motion } from "framer-motion";
import { MdEmail } from "react-icons/md";
import { useLocation } from "react-router-dom";

const VerificationPage = () => {
  const location = useLocation();
  const email = location.state?.email || "";
  const toast = useToast();

const handleResentVerification = async () => {
  try {
    const { data } = await axios.post("/api/auth/resend-verification", {
      email,
    });

    if (data?.success) {
      toast({
        title: data.message || "Verification email resent.",
        status: "success",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        variant: "top-accent",
      });
    } else {
      toast({
        title: data.message || "Failed to resend verification email.",
        status: "error",
        duration: 3000,
        isClosable: true,
        position: "top-right",
        variant: "top-accent",
      });
    }
  } catch (error) {
    toast({
      title: "Something went wrong. Please try again.",
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
        <Flex
          direction="column"
          align="center"
          justify="center"
          minH="100vh"
          px={4}
          bg="gray.50"
        >
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
              bg="maroon"
              color="white"
              mx="auto"
              mb={4}
            >
              <Icon as={MdEmail} boxSize={8} />
            </Flex>

            <Heading
              fontSize={useBreakpointValue({ base: "2xl", md: "3xl" })}
              mb={2}
            >
              Verify your email address
            </Heading>

            <Text fontSize="md" color="gray.600">
              We've sent a verification link to{" "}
              <Text as="span" fontWeight="bold" color="maroon">
                {email}
              </Text>
            </Text>

            <Text mt={2} fontSize="sm" color="gray.500">
              Click the link in the email to complete your registration and
              access your account.
            </Text>

            <Divider my={6} />

            <Stack
              direction={{ base: "column", sm: "row" }}
              spacing={4}
              justify="center"
            >
              <Button
                bg="maroon"
                color="white"
                w="100%"
                _hover={{ bg: "#a12828" }}
                transition="background-color 0.2s ease-in-out"
                onClick={() => window.open("https://mail.google.com", "_blank")}
              >
                Open Email App
              </Button>
              <Button
                variant="outline"
                w="100%"
                _hover={{ bg: "#f7eaea" }}
                onClick={() => handleResentVerification()}
              >
                Resend Verification Email
              </Button>
            </Stack>
          </Box>
        </Flex>
      </motion.div>
    </Flex>
  );
};

export default VerificationPage;
