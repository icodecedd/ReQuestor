import { Box, Button, Flex, Heading, Stack, Text } from "@chakra-ui/react";
import { MdOutlineErrorOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const NotFoundPage = () => {
  const navigate = useNavigate();

  // Color palette
  const colors = {
    primary: "#800000",
    lightPrimary: "#a04040",
    palePrimary: "#f5f5f6",
    darkPrimary: "#600000",
    slate: "#2D3748",
    maroonHover: "#A52A2A",
  };

  return (
    <Flex
      minH="100vh"
      align="center"
      justify="center"
      bg={colors.palePrimary}
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
          shadow="0px 4px 20px rgba(0, 0, 0, 0.08)"
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
            bg={colors.primary}
            color="white"
            mx="auto"
            mb={6}
          >
            <MdOutlineErrorOutline size={32} />
          </Flex>

          <Heading
            as="h1"
            fontSize={{ base: "2xl", md: "3xl" }}
            fontWeight="600"
            color={colors.slate}
            mb={3}
          >
            Page Not Found
          </Heading>

          <Text fontSize="md" color="gray.600" lineHeight="tall" mb={2}>
            We couldn't find the page you're looking for.
          </Text>

          <Text fontSize="sm" color="gray.500" mb={8}>
            The page may have been moved, deleted, or doesn't exist.
          </Text>

          <Stack spacing={4}>
            <Button
              colorScheme="maroon"
              bg={colors.primary}
              _hover={{
                bg: colors.maroonHover,
                transform: "translateY(-1px)",
                boxShadow: "lg",
              }}
              _active={{
                bg: colors.maroonHover,
                transform: "translateY(0)",
              }}
              size="md"
              onClick={() => navigate("/")}
            >
              Return Home
            </Button>
          </Stack>
        </Box>
      </motion.div>
    </Flex>
  );
};

export default NotFoundPage;
