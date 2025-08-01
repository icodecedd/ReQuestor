import {
  Box,
  Button,
  Divider,
  Flex,
  Heading,
  Stack,
  Text,
} from "@chakra-ui/react";
import { MdLockOutline } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";

const UnauthorizedPage = () => {
  const navigate = useNavigate();

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
            bg="red.500"
            color="white"
            mx="auto"
            mb={4}
          >
            <MdLockOutline size={32} />
          </Flex>

          <Heading fontSize={{ base: "2xl", md: "3xl" }} color="red.600">
            Unauthorized Access
          </Heading>

          <Text mt={2} fontSize="md" color="gray.600">
            You do not have permission to view this page.
          </Text>

          <Text fontSize="sm" color="gray.500" mt={1}>
            Please login with the appropriate account.
          </Text>

          <Divider my={6} />

          <Stack spacing={4}>
            <Button
              colorScheme="red"
              onClick={() => navigate("/login")}
              w="100%"
            >
              Go to Login
            </Button>
            <Button
              variant="outline"
              onClick={() => navigate("/")}
              w="100%"
              _hover={{ bg: "gray.100" }}
            >
              Back to Homepage
            </Button>
          </Stack>
        </Box>
      </motion.div>
    </Flex>
  );
};

export default UnauthorizedPage;
