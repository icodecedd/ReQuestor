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
import { FiFileText } from "react-icons/fi";

const MAROON = "#800000";
const MAROON_HOVER = "#A52A2A";
const MAROON_LIGHT = "#FFF5F5";
const DARK_GRAY = "#616161";

const TermsConditionsModal = ({ isOpen, onClose }) => {
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
              <FiFileText size={24} />
            </Box>
            <Box>
              <Text fontSize="lg" fontWeight="bold" color={MAROON}>
                Terms & Conditions
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
            Welcome to ReQuestor. By accessing or using our platform, you agree
            to be bound by these Terms and Conditions. Please read them
            carefully.
          </Text>

          <Box mb={5}>
            <Text fontWeight="bold" color={MAROON} mb={2}>
              1. Acceptance of Terms
            </Text>
            <Text fontSize="sm" color="gray.700" pl={2}>
              By using ReQuestor, you agree to comply with and be bound by these
              Terms and Conditions. If you do not agree to these terms, please
              do not use our services.
            </Text>
          </Box>

          <Box mb={5}>
            <Text fontWeight="bold" color={MAROON} mb={2}>
              2. User Accounts
            </Text>
            <Text fontSize="sm" color="gray.700" pl={2}>
              You are responsible for maintaining the confidentiality of your
              account credentials and for all activities that occur under your
              account. You must provide accurate and complete information when
              creating your account.
            </Text>
          </Box>

          <Box mb={5}>
            <Text fontWeight="bold" color={MAROON} mb={2}>
              3. Equipment Usage
            </Text>
            <Text fontSize="sm" color="gray.700" pl={2}>
              Users are responsible for the proper use and care of borrowed
              equipment. Any damage or loss must be reported immediately. You
              agree to comply with all university policies regarding equipment
              usage.
            </Text>
          </Box>

          <Box mb={5}>
            <Text fontWeight="bold" color={MAROON} mb={2}>
              4. Reservation Policies
            </Text>
            <Text fontSize="sm" color="gray.700" pl={2}>
              Equipment reservations are subject to availability and approval.
              We reserve the right to cancel or modify reservations due to
              maintenance, emergencies, or policy violations.
            </Text>
          </Box>

          <Box mb={5}>
            <Text fontWeight="bold" color={MAROON} mb={2}>
              5. Prohibited Activities
            </Text>
            <Text fontSize="sm" color="gray.700" pl={2}>
              You agree not to:
              <br />• Misuse or damage university equipment
              <br />• Submit false information
              <br />• Attempt to circumvent reservation systems
              <br />• Use equipment for illegal or unauthorized purposes
            </Text>
          </Box>

          <Box mb={5}>
            <Text fontWeight="bold" color={MAROON} mb={2}>
              6. Intellectual Property
            </Text>
            <Text fontSize="sm" color="gray.700" pl={2}>
              All content, features, and functionality of ReQuestor are owned by
              us or our licensors and are protected by copyright, trademark, and
              other intellectual property laws.
            </Text>
          </Box>

          <Box mb={5}>
            <Text fontWeight="bold" color={MAROON} mb={2}>
              7. Limitation of Liability
            </Text>
            <Text fontSize="sm" color="gray.700" pl={2}>
              ReQuestor is not liable for any indirect, incidental, or
              consequential damages arising from your use of our platform or
              borrowed equipment, to the fullest extent permitted by law.
            </Text>
          </Box>

          <Box mb={5}>
            <Text fontWeight="bold" color={MAROON} mb={2}>
              8. Changes to Terms
            </Text>
            <Text fontSize="sm" color="gray.700" pl={2}>
              We may modify these Terms and Conditions at any time. We will
              notify users of significant changes. Continued use of ReQuestor
              after changes constitutes acceptance of the modified terms.
            </Text>
          </Box>

          <Box>
            <Text fontWeight="bold" color={MAROON} mb={2}>
              9. Governing Law
            </Text>
            <Text fontSize="sm" color="gray.700" pl={2}>
              These Terms and Conditions are governed by the laws of the
              Republic of the Philippines. Any disputes shall be resolved in the
              courts of San Juan City, Metro Manila.
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
            I Agree
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default TermsConditionsModal;
