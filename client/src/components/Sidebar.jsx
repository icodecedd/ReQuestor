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

const Sidebar = ({ navItems }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [showText, setShowText] = useState(!collapsed);

  useEffect(() => {
    let t;
    if (!collapsed) t = setTimeout(() => setShowText(true), 200);
    else setShowText(false);
    return () => clearTimeout(t);
  }, [collapsed]);

  return (
    <Box
      w={collapsed ? "60px" : "230px"}
      transition="width 0.2s ease-in-out"
      h="100vh"
      bg="#f5f5f6"
      borderRight="1px solid #e2e8f0"
      position="sticky"
      top="0"
      overflow="hidden"
    >
      <Flex
        justify={collapsed ? "center" : "left"}
        align="center"
        borderBottom="1px solid #e2e8f0"
        p={3}
      >
        {!collapsed && <Image src={logo} boxSize="40px" />}
        {showText && (
          <Text
            fontWeight="bold"
            mr={5}
            fontSize={20}
            bgGradient="linear-gradient(to bottom, #800020 0%, #b86575 100%)"
            bgClip="text"
          >
            ReQuestor
          </Text>
        )}

        <IconButton
          icon={
            collapsed ? (
              <LuPanelRightClose fontSize={20} />
            ) : (
              <LuPanelLeftClose fontSize={20} />
            )
          }
          size="md"
          variant="ghost"
          onClick={() => setCollapsed(!collapsed)}
          _hover={{ bg: "#f7eaea" }}
          aria-label="Toggle sidebar"
          borderRadius="md"
        />
      </Flex>

      {/* Navigation */}
      <VStack align="stretch" spacing={2} px={collapsed ? 1 : 2} mt={2}>
        {showText && (
          <Heading fontSize="13px" color="gray" ml={2} mb={1}>
            General
          </Heading>
        )}

        {navItems.map(({ label, icon: Icon, path }) => (
          <Tooltip
            label={collapsed ? label : undefined}
            placement="right"
            key={label}
            borderRadius="md"
            p={1}
            pr={3}
            pl={3}
            bg="white"
            color="black"
            border="1px solid #e5e5e5"
            boxShadow="sm"
            isDisabled={!collapsed}
          >
            <NavLink to={path}>
              {({ isActive }) => (
                <Flex
                  align="center"
                  gap={4}
                  p={3}
                  w="full"
                  borderRadius="xl"
                  transition="background 0.2s"
                  fontWeight={isActive ? "bold" : "medium"}
                  bg={isActive ? "#800000" : "transparent"}
                  color={isActive ? "white" : "gray.600"}
                  _hover={{
                    bg: isActive ? "#832222" : "#e0b1b1",
                    color: isActive ? "white" : "#800000",
                  }}
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
      <Box pos="absolute" bottom="5" left="0" right="0" px={collapsed ? 1 : 2}>
        <Divider my={2} />
        <Tooltip
          label={collapsed ? "Logout" : undefined}
          placement="right"
          borderRadius="md"
          p={1}
          bg="white"
          color="black"
          border="1px solid #e5e5e5"
          boxShadow="sm"
          isDisabled={!collapsed}
        >
          <NavLink to="/logout">
            {({ isActive }) => (
              <Flex
                align="center"
                gap={4}
                p={3}
                w="full"
                borderRadius="xl"
                transition="background 0.2s"
                fontWeight={isActive ? "bold" : "medium"}
                bg={isActive ? "#e0b1b1" : "transparent"}
                color={isActive ? "#800000" : "gray.600"}
                _hover={{ bg: "#e0b1b1", color: "#800000" }}
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
            )}
          </NavLink>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Sidebar;
