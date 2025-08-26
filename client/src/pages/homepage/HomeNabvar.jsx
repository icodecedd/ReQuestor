import {
  Box,
  Button,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
  IconButton,
  Image,
  Text,
  useDisclosure,
} from "@chakra-ui/react";
import logo from "@/assets/requestor.svg";
import { FiMenu, FiX } from "react-icons/fi";
import { Link as ScrollLink } from "react-scroll";

const navItems = [
  {
    label: "Home",
    id: "home", // matches <section id="home">
  },
  {
    label: "Features",
    id: "features", // matches <section id="features">
  },
  {
    label: "How It Works",
    id: "how-it-works", // matches <section id="how-it-works">
  },
];

const HomeNavbar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box
      position="fixed"
      top="0"
      left="0"
      right="0"
      px={{ base: 4, md: 10 }}
      py={2}
      bg="white"
      zIndex="modal"
    >
      <Flex align="center" justify="space-between">
        {/* Logo and Title - Left */}
        <Flex align="center" minW="160px">
          <Image src={logo} boxSize="45px" mr={2} />
          <Text
            fontWeight="bold"
            fontSize={20}
            bgGradient="linear(to bottom, #800020 0%, #b86575 100%)"
            bgClip="text"
          >
            ReQuestor
          </Text>
        </Flex>

        {/* Navigation links - Center (Desktop only) */}
        <Flex
          gap={6}
          display={{ base: "none", md: "flex" }}
          alignItems="center"
        >
          {navItems.map((item) => (
            <ScrollLink
              key={item.label}
              to={item.id}
              smooth={true}
              duration={600}
              offset={-60} // adjust for fixed navbar height
              spy={true}
            >
              <Text
                fontWeight="medium"
                fontSize={16}
                color="#800000"
                _hover={{ color: "#A52A2A" }}
                _active={{ color: "#A52A2A" }}
                position="relative"
                cursor="pointer"
                py={1}
                _after={{
                  content: '""',
                  position: "absolute",
                  bottom: "0px",
                  left: "0",
                  width: "100%",
                  height: "2px",
                  bg: "#A52A2A",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.3s ease-in-out",
                }}
                sx={{
                  "&:hover::after": {
                    transform: "scaleX(1)",
                  },
                }}
              >
                {item.label}
              </Text>
            </ScrollLink>
          ))}
        </Flex>

        {/* Login and Get Started - Right (Desktop only) */}
        <Flex
          gap={4}
          display={{ base: "none", md: "flex" }}
          alignItems="center"
          minW="160px"
          justify="flex-end"
        >
          <Box>
            <a href="/login" style={{ textDecoration: "none" }}>
              <Text
                fontWeight="medium"
                fontSize={16}
                color="#800000"
                _hover={{ color: "#A52A2A" }}
                _active={{ color: "#A52A2A" }}
                position="relative"
                py={1}
                _after={{
                  content: '""',
                  position: "absolute",
                  bottom: "0px",
                  left: "0",
                  width: "100%",
                  height: "2px",
                  bg: "#A52A2A",
                  transform: "scaleX(0)",
                  transformOrigin: "left",
                  transition: "transform 0.3s ease-in-out",
                }}
                sx={{
                  "&:hover::after": {
                    transform: "scaleX(1)",
                  },
                }}
              >
                Login
              </Text>
            </a>
          </Box>

          <Button
            as="a"
            href="/signup"
            color="white"
            bg="#800000"
            fontSize={16}
            padding="10px 20px"
            borderRadius="full"
            _hover={{ bg: "#A52A2A" }}
            _active={{ bg: "#A52A2A" }}
          >
            Get Started
          </Button>
        </Flex>

        {/* Mobile menu toggle button */}
        <IconButton
          icon={isOpen ? <FiX fontSize={20} /> : <FiMenu fontSize={20} />}
          size="sm"
          variant="ghost"
          onClick={isOpen ? onClose : onOpen}
          _hover={{ bg: "#f7eaea" }}
          aria-label="Toggle mobile menu"
          borderRadius="md"
          display={{ base: "flex", md: "none" }}
        />
      </Flex>

      {/* Mobile Drawer */}
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent maxW="220px" zIndex="modal">
          <Flex direction="column" p={6} height="100%" justify="space-between">
            <Box>
              <Flex justify="flex-end" mb={6}>
                <IconButton
                  icon={<FiX fontSize={20} />}
                  size="sm"
                  variant="ghost"
                  onClick={onClose}
                  aria-label="Close menu"
                  borderRadius="md"
                  _hover={{ bg: "#f7eaea" }}
                />
              </Flex>

              {/* Navigation items */}
              <Flex direction="column" gap={6}>
                {navItems.map((item) => (
                  <Box key={item.label}>
                    <ScrollLink
                      key={item.label}
                      to={item.id}
                      smooth={true}
                      duration={600}
                      offset={-50} // adjust for fixed navbar height
                      spy={true}
                      onClick={onClose}
                    >
                      <Text
                        fontWeight="medium"
                        fontSize={16}
                        color="#800000"
                        _hover={{ color: "#A52A2A" }}
                        position="relative"
                        cursor="pointer"
                        py={1}
                        _after={{
                          content: '""',
                          position: "absolute",
                          bottom: "0px",
                          left: "0",
                          width: "90%",
                          height: "2px",
                          bg: "#A52A2A",
                          transform: "scaleX(0)",
                          transformOrigin: "left",
                          transition: "transform 0.3s ease-in-out",
                        }}
                        sx={{
                          "&:hover::after": {
                            transform: "scaleX(1)",
                          },
                        }}
                      >
                        {item.label}
                      </Text>
                    </ScrollLink>
                  </Box>
                ))}

                {/* Login link in mobile drawer */}
                <Box>
                  <a
                    href="/login"
                    style={{ textDecoration: "none" }}
                    onClick={onClose}
                  >
                    <Text
                      fontWeight="medium"
                      fontSize={16}
                      color="#800000"
                      _hover={{ color: "#A52A2A" }}
                      _active={{ color: "#A52A2A" }}
                    >
                      Login
                    </Text>
                  </a>
                </Box>
              </Flex>
            </Box>

            <Button
              as="a"
              href="/signup"
              color="white"
              bg="#800000"
              fontSize={16}
              px={4}
              py={4}
              borderRadius="full"
              _hover={{ bg: "#A52A2A" }}
              _active={{ bg: "#A52A2A" }}
              onClick={onClose}
              width="100%"
            >
              Get Started
            </Button>
          </Flex>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default HomeNavbar;
