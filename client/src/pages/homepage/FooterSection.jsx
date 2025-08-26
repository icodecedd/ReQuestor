import PrivacyPolicyModal from "@/components/modals/PrivacyPolicyModal";
import TermsConditionsModal from "@/components/modals/TermsConditionsModal";
import {
  Box,
  Flex,
  Heading,
  SimpleGrid,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import { FiMail } from "react-icons/fi";
import { HiOutlineLocationMarker } from "react-icons/hi";
import { Link as ScrollLink } from "react-scroll";

const FooterSection = () => {
  const {
    isOpen: isPrivacyModalOpen,
    onOpen: onPrivacyModalOpen,
    onClose: onPrivacyModalClose,
  } = useDisclosure();

  const {
    isOpen: isTermsModalOpen,
    onOpen: onTermsModalOpen,
    onClose: onTermsModalClose,
  } = useDisclosure();

  return (
    <Box
      as="footer"
      minH={{ base: "auto", md: "50vh" }}
      py={{ base: 12, md: 16, lg: 20 }}
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      width="100%"
      bg="#4c0000"
      color="#fafafa"
      px={{ base: 4, md: 6, lg: 8 }}
    >
      {/* ReQuestor Footer */}
      <SimpleGrid
        columns={{ base: 1, md: 3 }}
        spacing={{ base: 8, md: 10, lg: 12 }}
        width="100%"
        maxWidth="1200px"
        mx="auto"
      >
        {/* Requestor About */}
        <Box>
          <Heading as="h3" size="lg" mb={4}>
            Requestor
          </Heading>
          <Text mb={4} lineHeight="tall">
            ReQuestor is a paperless, efficient platform designed to simplify
            campus resource and equipment requests. By streamlining reservations
            and promoting responsible use, it supports learning, teaching, and
            collaboration across the university community.
          </Text>
          <Text fontSize="sm" opacity={0.9}>
            Serving 100+ students{" "}
            <span style={{ fontWeight: "bold", padding: "0 5px" }}>
              &middot;
            </span>{" "}
            99.9% uptime guaranteed
          </Text>
        </Box>

        {/* Quick Links */}
        <Box>
          <Heading as="h3" size="lg" mb={4}>
            Quick Links
          </Heading>
          <SimpleGrid columns={2} spacing={4}>
            <ScrollLink
              to="home"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              style={{ cursor: "pointer" }}
            >
              <Text _hover={{ color: "gray.300", textDecoration: "underline" }}>
                Home
              </Text>
            </ScrollLink>

            <ScrollLink
              to="features"
              spy={true}
              smooth={true}
              offset={-70}
              duration={500}
              style={{ cursor: "pointer" }}
            >
              <Text _hover={{ color: "gray.300", textDecoration: "underline" }}>
                Features
              </Text>
            </ScrollLink>

            <ScrollLink
              to="how-it-works"
              spy={true}
              smooth={true}
              offset={-60}
              duration={500}
              style={{ cursor: "pointer" }}
            >
              <Text _hover={{ color: "gray.300", textDecoration: "underline" }}>
                How It Works
              </Text>
            </ScrollLink>

            <Text
              _hover={{
                color: "gray.300",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => onPrivacyModalOpen()}
            >
              Privacy
            </Text>

            <Text
              _hover={{
                color: "gray.300",
                textDecoration: "underline",
                cursor: "pointer",
              }}
              onClick={() => onTermsModalOpen()}
            >
              Terms
            </Text>
          </SimpleGrid>
        </Box>

        {/* Get In Touch */}
        <Box>
          <Heading as="h3" size="lg" mb={4}>
            Get In Touch
          </Heading>
          <Text mb={4}>Questions? Suggestions? Reach out to us!</Text>

          <Flex alignItems="center" mb={3}>
            <FiMail size={20} style={{ marginRight: "8px" }} />
            <Text
              as="a"
              href="mailto:support@requestor.com"
              _hover={{ color: "gray.300", textDecoration: "underline" }}
            >
              support@requestor.com
            </Text>
          </Flex>

          <Flex alignItems="center">
            <HiOutlineLocationMarker size={20} style={{ marginRight: "8px" }} />
            <Text>223 Ortega, San Juan City, Metro Manila</Text>
          </Flex>
        </Box>
      </SimpleGrid>

      {/* Copyright */}
      <Box
        mt={12}
        pt={6}
        borderTop="1px solid rgba(255,255,255,0.2)"
        width="100%"
        maxWidth="1200px"
        textAlign="center"
      >
        <Text fontSize="sm" opacity={0.8}>
          © {new Date().getFullYear()} ReQuestor. For official campus use only.
          Data is protected under university policy. All rights reserved.
        </Text>
      </Box>

      {/* Modals */}
      <PrivacyPolicyModal
        isOpen={isPrivacyModalOpen}
        onClose={onPrivacyModalClose}
      />
      <TermsConditionsModal
        isOpen={isTermsModalOpen}
        onClose={onTermsModalClose}
      />
    </Box>
  );
};

export default FooterSection;
