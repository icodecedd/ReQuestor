import {
  Box,
  Button,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Link,
  VStack,
  IconButton,
  Divider,
} from "@chakra-ui/react";
import { ViewIcon, ViewOffIcon } from "@chakra-ui/icons";
import { AlertIcon } from "@chakra-ui/icons";

function LoginForm({
  handleSubmit,
  formData,
  handleChange,
  errors,
  showPassword,
  togglePasswordVisibility,
  isSubmitting,
}) {
  return (
    <Box as="form" onSubmit={handleSubmit}>
      <VStack spacing={6} align="stretch">
        <FormControl isInvalid={errors.username}>
          <FormLabel htmlFor="username">Username or Email</FormLabel>
          <InputGroup>
            <Input
              id="username"
              name="username"
              type="text"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username or email"
              autoComplete="username"
              focusBorderColor="maroon.500"
            />
            {errors.username && (
              <InputRightElement pointerEvents="none">
                <AlertIcon color="red.500" />
              </InputRightElement>
            )}
          </InputGroup>
          {errors.username && (
            <FormErrorMessage>{errors.username}</FormErrorMessage>
          )}
        </FormControl>

        <FormControl isInvalid={errors.password}>
          <FormLabel htmlFor="password">Password</FormLabel>
          <InputGroup>
            <Input
              id="password"
              name="password"
              type={showPassword ? "text" : "password"}
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              autoComplete="current-password"
              focusBorderColor="maroon.500"
            />
            <InputRightElement>
              <IconButton
                variant="ghost"
                size="sm"
                onClick={togglePasswordVisibility}
                icon={showPassword ? <ViewOffIcon /> : <ViewIcon />}
                aria-label={showPassword ? "Hide password" : "Show password"}
              />
            </InputRightElement>
          </InputGroup>
          {errors.password && (
            <FormErrorMessage>{errors.password}</FormErrorMessage>
          )}
        </FormControl>

        <Box textAlign="right">
          <Link
            fontSize="sm"
            color="maroon.600"
            _hover={{ textDecoration: "underline" }}
          >
            Forgot password?
          </Link>
        </Box>

        <Button
          type="submit"
          isLoading={isSubmitting}
          colorScheme="maroon"
          w="full"
        >
          {isSubmitting ? "Signing in..." : "Sign in"}
        </Button>

        <Divider />
      </VStack>
    </Box>
  );
}