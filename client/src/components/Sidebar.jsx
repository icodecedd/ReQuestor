import { useState, useEffect } from "react";
import { NavLink } from "react-router-dom";
import {
  Box,
  IconButton,
  VStack,
  Text,
  Flex,
  Tooltip,
  Image,
  Divider,
  Heading,
} from "@chakra-ui/react";
import { FiLogOut } from "react-icons/fi";
import logo from "@/assets/requestor.svg";
import { LuPanelLeftClose, LuPanelRightClose } from "react-icons/lu";
import { useAuth } from "@/hooks/useAuth";
import { useSidebar } from "@/hooks/useSidebar";

const Sidebar = ({ navItems, isDrawer = false, onClose }) => {
  const { logout } = useAuth();
  const { collapsed, setCollapsed } = useSidebar();
  const [showText, setShowText] = useState(!collapsed);

  {/* For Drawer, this will override the `collapsed` state */}
  const effectiveCollapsed = isDrawer ? false : collapsed;

  useEffect(() => {
    let t;
    if (!effectiveCollapsed) t = setTimeout(() => setShowText(true), 200);
    else setShowText(false);
    return () => clearTimeout(t);
  }, [effectiveCollapsed]);

  return (
    <Box
      w={effectiveCollapsed ? "60px" : "230px"}
      transition="width 0.2s ease-in-out"
      h="100vh"
      bg="#f5f5f6"
      borderRight="1px solid #dbe2e9ff"
      position={isDrawer ? "relative" : "sticky"}
      top="0"
      overflow="hidden"
      display={isDrawer ? "block" : { base: "none", md: "block" }}
    >
      {/* Header */}
      <Flex
        justify={effectiveCollapsed ? "center" : "space-between"}
        align="center"
        borderBottom="1px solid #dbe2e9ff"
        p={3}
        position="relative"
      >
        {!effectiveCollapsed && (
          <Flex align="center" minW="160px">
            <Image src={logo} boxSize="40px" mr={2} />
            <Text
              fontWeight="bold"
              fontSize={20}
              bgGradient="linear(to bottom, #800020 0%, #b86575 100%)"
              bgClip="text"
            >
              ReQuestor
            </Text>
          </Flex>
        )}

        <IconButton
          icon={
            effectiveCollapsed ? (
              <LuPanelRightClose fontSize={20} />
            ) : (
              <LuPanelLeftClose fontSize={20} />
            )
          }
          size="sm"
          variant="ghost"
          onClick={() => setCollapsed(!effectiveCollapsed)}
          _hover={{ bg: "#f7eaea" }}
          aria-label="Toggle sidebar"
          borderRadius="md"
          position={effectiveCollapsed ? "relative" : "absolute"}
          right={effectiveCollapsed ? "auto" : 3}
          display={isDrawer ? "none" : "flex"}
        />
      </Flex>

      {/* Navigation */}
      <VStack
        align="stretch"
        spacing={2}
        px={effectiveCollapsed ? 1 : 2}
        mt={2}
      >
        {showText && (
          <Heading fontSize="13px" color="gray" ml={2} mb={1}>
            General
          </Heading>
        )}

        {navItems.map(({ label, icon: Icon, path }) => (
          <Tooltip
            key={label}
            label={effectiveCollapsed ? label : undefined}
            placement="right"
            borderRadius="lg"
            px={3}
            py={2}
            bg="#800000"
            color="white"
            fontSize="sm"
            fontWeight="medium"
            boxShadow="lg"
            openDelay={200}
            isDisabled={!effectiveCollapsed}
          >
            <NavLink to={path}>
              {({ isActive }) => (
                <Flex
                  align="center"
                  gap={4}
                  p={3}
                  w="full"
                  borderRadius="lg"
                  transition="background 0.2s"
                  fontWeight={isActive ? "bold" : "medium"}
                  bg={isActive ? "#800000" : "transparent"}
                  color={isActive ? "white" : "gray.600"}
                  _hover={{
                    bg: isActive ? "#832222" : "#f7eaea",
                    color: isActive ? "white" : "#800000",
                  }}
                  onClick={isDrawer ? onClose : undefined}
                >
                  {/* Icon always stays fixed */}
                  <Box flexShrink={0} pl={1}>
                    <Icon size={18} />
                  </Box>

                  {/* Label slides in/out */}
                  <Box
                    overflow="hidden"
                    whiteSpace="nowrap"
                    transition="opacity 0.2s ease, width 0.2s ease"
                    opacity={showText ? 1 : 0}
                    width={showText ? "auto" : 0}
                  >
                    <Text fontSize="90%">{label}</Text>
                  </Box>
                </Flex>
              )}
            </NavLink>
          </Tooltip>
        ))}
      </VStack>

      {/* Footer */}
      <Box
        pos="absolute"
        bottom="5"
        left="0"
        right="0"
        px={effectiveCollapsed ? 1 : 2}
      >
        <Divider my={3} borderColor="#dbe2e9ff" />
        <Tooltip
          label={effectiveCollapsed ? "Logout" : undefined}
          placement="right"
          borderRadius="lg"
          px={3}
          py={2}
          bg="#800000"
          color="white"
          fontSize="sm"
          fontWeight="medium"
          boxShadow="lg"
          openDelay={200}
          isDisabled={!effectiveCollapsed}
        >
          <Box
            as="button"
            onClick={() => {
              logout();
            }}
            w="full"
          >
            <Flex
              align="center"
              gap={4}
              p={3}
              w="full"
              borderRadius="lg"
              transition="background 0.2s"
              fontWeight="medium"
              color="gray.600"
              _hover={{ bg: "#f7eaea", color: "#800000" }}
            >
              <Box flexShrink={0} pl={1}>
                <FiLogOut size={18} />
              </Box>

              <Box
                overflow="hidden"
                whiteSpace="nowrap"
                transition="opacity 0.2s ease, width 0.2s ease"
                opacity={showText ? 1 : 0}
                width={showText ? "auto" : 0}
              >
                <Text fontSize="90%">Logout</Text>
              </Box>
            </Flex>
          </Box>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Sidebar;
