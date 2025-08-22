import { useAuth } from "@/hooks/useAuth";
import { showToast } from "@/utils/toast";
import _ from "lodash";
import {
  Box,
  Button,
  Divider,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  IconButton,
  Input,
  InputGroup,
  InputRightElement,
  Text,
  Textarea,
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { CgProfile } from "react-icons/cg";
import { FiEye, FiEyeOff } from "react-icons/fi";

const MAROON = "#800000";
const MAROON_HOVER = "#A52A2A";
const SUBTLE_TEXT = "#71717E";
const BORDER_COLOR = "#BCBCBCFF";

const passwordFields = [
  {
    name: "password",
    label: "Password",
    placeholder: "Enter current password",
    errorMessage: "Please enter your current password",
  },
  {
    name: "newPassword",
    label: "New Password",
    placeholder: "Enter new password",
    errorMessage: "Please enter a new password",
  },
  {
    name: "confirmPassword",
    label: "Confirm Password",
    placeholder: "Enter confirm password",
    errorMessage: "Please confirm your new password",
  },
];

const MyProfileTabs = () => {
  const { user, changeUserInfo, changeUserPassword } = useAuth();
  const [userInfo, setUserInfo] = useState({
    name: "",
    bio: "",
    email: "",
    password: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({
    name: false,
    password: false,
    newPassword: false,
    confirmPassword: false,
  });
  const [isSubmitting, setIsSubmitting] = useState({
    userInfo: false,
    password: false,
  });
  const [showPassword, setShowPassword] = useState({
    password: false,
    newPassword: false,
    confirmPassword: false,
  });

  const [countLength, setCountLength] = useState(0);

  const togglePassword = (field) => {
    setShowPassword((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const compareUserInfo = {
    name: user.name || "",
    bio: user.bio || "",
  };

  useEffect(() => {
    if (user) {
      setUserInfo((prev) => ({
        ...prev,
        name: user.name || "",
        bio: user.bio || "",
        email: user.email || "",
      }));
      setCountLength(user.bio?.length || 0);
    }
  }, [user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));

    if (name === "bio") {
      setCountLength(value.length);
    }

    if (value.trim()) {
      setErrors((prev) => ({ ...prev, [name]: false }));
    }
  };

  const handleChangeInfo = async () => {
    setIsSubmitting((s) => ({ ...s, userInfo: true }));
    // Validate user info
    if (!userInfo.name) {
      setErrors((prev) => ({ ...prev, name: true }));
      setIsSubmitting((s) => ({ ...s, userInfo: false }));
      return;
    }

    const isUserInfoEqual = _.isEqual(
      { name: userInfo.name, bio: userInfo.bio },
      compareUserInfo
    );

    if (isUserInfoEqual) {
      showToast(
        "No changes detected. Please make sure to update at least one field.",
        "info"
      );
      setIsSubmitting((s) => ({ ...s, userInfo: false }));
      return;
    }

    try {
      const data = {
        name: userInfo.name.trim(),
        bio: userInfo.bio.trim(),
      };
      const result = await changeUserInfo(user.id, data);
      showToast(result.message, result.success ? "success" : "error");
      if (result.success) {
        setUserInfo((prev) => ({
          ...prev,
          name: userInfo.name,
          bio: userInfo.bio,
        }));
        setErrors((prev) => ({ ...prev, name: false, bio: false }));
      }
    } catch (error) {
      showToast("Failed to update user info", "error");
    } finally {
      setIsSubmitting((isSubmitting) => ({ ...isSubmitting, userInfo: false }));
    }
  };

  const handleChangePassword = async () => {
    setIsSubmitting((s) => ({ ...s, password: true }));
    // Validate password
    if (
      !userInfo.password ||
      !userInfo.newPassword ||
      !userInfo.confirmPassword
    ) {
      setErrors((prev) => ({
        ...prev,
        password: !userInfo.password,
        newPassword: !userInfo.newPassword,
        confirmPassword: !userInfo.confirmPassword,
      }));
      setIsSubmitting((s) => ({ ...s, password: false }));
      return;
    }

    if (userInfo.newPassword !== userInfo.confirmPassword) {
      showToast(
        "New password and confirm password do not match. Please try again.",
        "error"
      );
      setIsSubmitting((s) => ({ ...s, password: false }));
      return;
    }

    try {
      const data = {
        password: userInfo.password,
        newPassword: userInfo.newPassword,
      };
      const result = await changeUserPassword(user.id, data);
      showToast(result.message, result.success ? "success" : "error");
    } catch (error) {
      showToast("Failed to update user password", "error");
    } finally {
      setIsSubmitting((isSubmitting) => ({ ...isSubmitting, password: false }));
    }
  };

  // Section for user information
  const userInfoSection = (
    <Box marginTop="24px">
      <Heading fontSize="18px" fontWeight="600" marginBottom="16px">
        User Information
      </Heading>

      {/* Name */}
      <FormControl isInvalid={errors.name} marginTop="16px">
        <FormLabel fontWeight="500" fontSize="15px" marginBottom="8px">
          Name
        </FormLabel>
        <Input
          name="name"
          value={userInfo.name}
          onChange={handleChange}
          placeholder="Enter your name"
          focusBorderColor={MAROON}
          borderColor={MAROON_HOVER}
        />
      </FormControl>
      {errors.name && (
        <Text color="#B03060" fontSize="xs">
          Please enter a valid name
        </Text>
      )}

      {/* Email */}
      <FormControl isReadOnly marginTop="16px">
        <FormLabel fontWeight="500" fontSize="15px" marginBottom="8px">
          Email
        </FormLabel>
        <Input
          name="email"
          value={userInfo.email}
          onChange={handleChange}
          placeholder="Enter your email"
          focusBorderColor={MAROON}
          borderColor={MAROON_HOVER}
        />
      </FormControl>

      {/* Bio */}
      <FormControl marginTop="16px">
        <FormLabel fontWeight="500" fontSize="15px" marginBottom="8px">
          <Flex alignItems="center" justifyContent={"space-between"}>
            <Text>Bio (Optional)</Text>
            <Text ml="4px" color={SUBTLE_TEXT} fontSize="12px">
              {countLength}/512
            </Text>
          </Flex>
        </FormLabel>
        <Textarea
          name="bio"
          value={userInfo.bio}
          onChange={handleChange}
          maxLength={512}
          minHeight={"100px"}
          placeholder="Enter your bio here..."
          focusBorderColor={MAROON}
          borderColor={MAROON_HOVER}
        />
      </FormControl>

      {/* Save Button */}
      <Flex marginTop="24px" align="flex-end">
        <Button
          ml="auto"
          variant="primary"
          bg={MAROON}
          color="white"
          borderRadius="lg"
          _hover={{ bg: MAROON_HOVER }}
          transition="background-color 0.2s ease-in-out"
          gap={1}
          p={3}
          fontSize="95%"
          w="150px"
          onClick={handleChangeInfo}
          isLoading={isSubmitting.userInfo}
          loadingText="Updating..."
        >
          Update Profile
        </Button>
      </Flex>
    </Box>
  );

  const passwordSection = (
    <Box marginTop="24px">
      <Heading fontSize="18px" fontWeight="600" marginBottom="16px">
        Password
      </Heading>
      {/* Current Password */}
      <form onSubmit={handleChangePassword}>
        {passwordFields.map((field) => (
          <FormControl
            key={field.name}
            isInvalid={errors[field.name]}
            marginTop="16px"
          >
            <FormLabel fontWeight="500" fontSize="15px" marginBottom="8px">
              {field.label}
            </FormLabel>
            <InputGroup>
              <Input
                type={showPassword[field.name] ? "text" : "password"}
                name={field.name}
                value={userInfo[field.name]}
                placeholder={field.placeholder}
                autoComplete={field.name === "password" ? "on" : "off"}
                onChange={handleChange}
                focusBorderColor={MAROON}
                borderColor={MAROON_HOVER}
              />
              <InputRightElement width="4.5rem" color="gray.500">
                <IconButton
                  variant="unstyled"
                  size="md"
                  onClick={() => togglePassword(field.name)}
                  ml={6}
                  pl={3}
                  h="1.75rem"
                >
                  {showPassword[field.name] ? <FiEyeOff /> : <FiEye />}
                </IconButton>
              </InputRightElement>
            </InputGroup>
            {errors[field.name] && (
              <Text color="#B03060" fontSize="xs">
                {field.errorMessage}
              </Text>
            )}
          </FormControl>
        ))}
      </form>

      {/* Save Button */}
      <Flex marginTop="24px" align="flex-end">
        <Button
          type="submit"
          ml="auto"
          variant="primary"
          bg={MAROON}
          color="white"
          borderRadius="lg"
          _hover={{ bg: MAROON_HOVER }}
          transition="background-color 0.2s ease-in-out"
          gap={1}
          p={3}
          fontSize="95%"
          w="150px"
          isLoading={isSubmitting.password}
          loadingText="Updating..."
        >
          Update Password
        </Button>
      </Flex>
    </Box>
  );

  return (
    <Box w="99.5%" mx="auto" p={8}>
      <Box borderRadius="xl" border="1px" borderColor="gray.300" p={10}>
        <Flex gap="12px" alignItems="center" marginBottom="8px">
          <CgProfile size="24px" color={MAROON} />
          <Heading fontSize="24px" fontWeight="600">
            My Profile
          </Heading>
        </Flex>
        <Text fontSize="14px" marginBottom="16px" color={SUBTLE_TEXT}>
          View and edit your profile information, including your name, email,
          and password.
        </Text>

        <Divider marginY="20px" borderColor={BORDER_COLOR} />

        {userInfoSection}

        <Divider marginY="20px" borderColor={BORDER_COLOR} />

        {passwordSection}
      </Box>
    </Box>
  );
};

export default MyProfileTabs;
