import {
  Box,
  Button,
  Flex,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react";
import { FiShield } from "react-icons/fi";

const MAROON = "#800000";
const MAROON_HOVER = "#A52A2A";
const MAROON_LIGHT = "#FFF5F5";
const DARK_GRAY = "#616161";

const PrivacyPolicyModal = ({ isOpen, onClose }) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="xl"
      motionPreset="slideInBottom"
      isCentered
    >
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(4px)" />
      <ModalContent
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="2xl"
        mx={{ base: 4, md: 0 }}
      >
        {/* HEADER */}
        <ModalHeader
          px={6}
          pt={5}
          pb={3}
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          <Flex gap={3} align="center">
            <Box
              bg={`${MAROON}15`}
              color={MAROON}
              borderRadius="full"
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <FiShield size={24} />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold" color={MAROON}>
                Privacy Policy
              </Text>
              <Text color="gray.600" fontSize="sm">
                Last updated: {new Date().toLocaleDateString()}
              </Text>
            </Box>
          </Flex>
        </ModalHeader>

        <ModalCloseButton
          size="md"
          _hover={{ bg: MAROON_LIGHT }}
          color={DARK_GRAY}
          borderRadius="full"
          mt={2}
        />

        <ModalBody px={6} py={4} bg="gray.50" maxH="60vh" overflowY="auto">
          <Text fontSize="sm" color="gray.700" mb={4}>
            At ReQuestor, we take your privacy seriously. This Privacy Policy
            describes how we collect, use, and share your personal information
            when you use our platform.
          </Text>

          <Box mb={5}>
            <Text fontWeight="bold" color={MAROON} mb={2}>
              1. Information We Collect
            </Text>
            <Text fontSize="sm" color="gray.700" pl={2}>
              We collect information you provide directly to us, such as when
              you create an account, submit a request, or contact us for
              support. This may include your name, email address, university
              affiliation, and equipment usage details.
            </Text>
          </Box>

          <Box mb={5}>
            <Text fontWeight="bold" color={MAROON} mb={2}>
              2. How We Use Your Information
            </Text>
            <Text fontSize="sm" color="gray.700" pl={2}>
              We use the information we collect to:
              <br />• Process and manage your equipment requests
              <br />• Communicate with you about your requests
              <br />• Improve our services and user experience
              <br />• Ensure the security of our platform
            </Text>
          </Box>

          <Box mb={5}>
            <Text fontWeight="bold" color={MAROON} mb={2}>
              3. Information Sharing
            </Text>
            <Text fontSize="sm" color="gray.700" pl={2}>
              We do not sell your personal information. We may share your
              information with university administrators and staff only as
              necessary to process your equipment requests and maintain campus
              resources.
            </Text>
          </Box>

          <Box mb={5}>
            <Text fontWeight="bold" color={MAROON} mb={2}>
              4. Data Security
            </Text>
            <Text fontSize="sm" color="gray.700" pl={2}>
              We implement appropriate security measures to protect your
              personal information against unauthorized access, alteration,
              disclosure, or destruction.
            </Text>
          </Box>

          <Box mb={5}>
            <Text fontWeight="bold" color={MAROON} mb={2}>
              5. Your Rights
            </Text>
            <Text fontSize="sm" color="gray.700" pl={2}>
              You have the right to access, correct, or delete your personal
              information. You can manage your account settings or contact us
              directly to exercise these rights.
            </Text>
          </Box>

          <Box>
            <Text fontWeight="bold" color={MAROON} mb={2}>
              6. Contact Us
            </Text>
            <Text fontSize="sm" color="gray.700" pl={2}>
              If you have any questions about this Privacy Policy, please
              contact us at support@requestor.com.
            </Text>
          </Box>
        </ModalBody>

        <ModalFooter
          borderTop="1px solid"
          borderTopColor="gray.100"
          px={6}
          py={4}
          bg="white"
        >
          <Button
            flex={1}
            bg={MAROON}
            color="white"
            _hover={{ bg: MAROON_HOVER }}
            _active={{ bg: MAROON }}
            onClick={onClose}
          >
            I Understand
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default PrivacyPolicyModal;
