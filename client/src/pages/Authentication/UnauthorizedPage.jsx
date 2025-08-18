import {
  Box,
  Button,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { MdOutlineNoAccounts } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

  // Modern color palette
  const colors = {
    error: "#E53E3E",
    lightError: "#FEB2B2",
    paleError: "#FFF5F5",
    darkError: "#C53030",
    slate: "#2D3748",
    maroonHover: "#A52A2A",
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
      bg={colors.paleError}
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
            bg={colors.error}
            color="white"
            mx="auto"
            mb={6}
          >
            <MdOutlineNoAccounts size={32} />
          </Flex>

          <Heading
            as="h1"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="600"
            color={colors.slate}
            mb={3}
          >
            Access Denied
          </Heading>

          <Text fontSize="md" color="gray.600" lineHeight="tall" mb={2}>
            You don't have permission to view this page.
          </Text>

          <Text fontSize="sm" color="gray.500" mb={8}>
            Please sign in with an authorized account or return to the homepage.
          </Text>

          <Stack spacing={4}>
            <Button
              colorScheme="red"
              bg={colors.error}
              _hover={{
                bg: colors.darkError,
                transform: "translateY(-1px)",
                boxShadow: "lg",
              }}
              _active={{
                bg: colors.darkError,
                transform: "translateY(0)",
              }}
              size="md"
              onClick={() => navigate("/login")} // NOTE: This should be the landing page
            >
              Return Home
            </Button>
          </Stack>
        </Box>
      </motion.div>
    </Flex>
  );
};

export default UnauthorizedPage;
