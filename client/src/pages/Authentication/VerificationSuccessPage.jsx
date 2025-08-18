import {
  Flex,
  Box,
  Stack,
  Button,
  Text,
  Heading,
  Icon,
  useColorModeValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { MdMarkEmailRead, MdLogin } from "react-icons/md";
import { Navigate, useNavigate, useSearchParams } from "react-router-dom";

const VerificationSuccessPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const email = searchParams.get("email");
  const verified = searchParams.get("verified");

  if (verified !== "true" || !email) {
    return <Navigate to="/login" replace />;
  }

  // Modern color palette
  const colors = {
    success: "#38A169",
    lightSuccess: "#9AE6B4",
    paleSuccess: "#F0FFF4",
    darkSuccess: "#25855A",
    slate: "#2D3748",
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
      bg={colors.paleSuccess}
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
            bg={colors.success}
            color="white"
            mx="auto"
            mb={6}
          >
            <Icon as={MdMarkEmailRead} boxSize={8} />
          </Flex>

          <Heading
            as="h1"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="600"
            color={colors.slate}
            mb={3}
          >
            Email Verified!
          </Heading>

          <Text fontSize="md" color="gray.600" lineHeight="tall" mb={2}>
            Your email{" "}
            <Text as="span" fontWeight="600" color={colors.success}>
              {email}
            </Text>{" "}
            has been successfully verified.
          </Text>

          <Text fontSize="sm" color="gray.500" mb={8}>
            You can now access all features of your account.
          </Text>

          <Stack spacing={4}>
            <Button
              leftIcon={<MdLogin />}
              colorScheme="green"
              bg={colors.success}
              _hover={{
                bg: colors.darkSuccess,
                transform: "translateY(-1px)",
                boxShadow: "lg",
              }}
              _active={{
                bg: colors.darkSuccess,
                transform: "translateY(0)",
              }}
              size="md"
              onClick={() => navigate("/login")}
            >
              Continue to Dashboard
            </Button>
          </Stack>
        </Box>
      </motion.div>
    </Flex>
  );
};

export default VerificationSuccessPage;
