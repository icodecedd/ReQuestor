import {
  Box,
  IconButton,
  VStack,
  Text,
  Flex,
  Tooltip,
  Image,
  Divider,
} from "@chakra-ui/react";
import { FiLogOut, FiSidebar } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useState } from "react";
import logo from "@/assets/requestor.svg";

const Sidebar = ({ navItems }) => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Box
      w={collapsed ? "60px" : "230px"}
      transition="width 0.1s"
      h="100vh"
      bg="#f5f5f6"
      borderRight="1px solid #e2e8f0"
      position="sticky"
      top="0"
    >
      <Flex
        justify={collapsed ? "center" : "left"}
        align="center"
        borderBottom="1px solid #e2e8f0"
        p={3}
      >
        {!collapsed && <Image src={logo} boxSize="40px" />}
        {!collapsed && (
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
          icon={<FiSidebar fontSize={20} />}
          size="md"
          variant="ghost"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
          borderRadius="md"
        />
      </Flex>

      <VStack
        align="stretch"
        spacing={2}
        mt={4}
        pl={collapsed ? 1 : 2}
        pr={collapsed ? 1 : 2}
      >
        {navItems.map(({ label, icon, path }) => (
          <Tooltip
            label={collapsed ? label : ""}
            placement="right"
            key={label}
            borderRadius="md"
            hasArrow
            bg="white"
            color="black"
            border="1px solid #e5e5e5"
            boxShadow="sm"
          >
            <NavLink to={path}>
              {({ isActive }) => (
                <Flex
                  align="center"
                  justify={collapsed ? "center" : "flex-start"}
                  p={3}
                  gap={collapsed ? 0 : 4}
                  w="full"
                  _hover={
                    isActive
                      ? { bg: "#832222", color: "#white" }
                      : { bg: "#e0b1b1", color: "#800000" }
                  }
                  borderRadius="xl"
                  transition="background 0.2s"
                  fontWeight={isActive ? "bold" : "medium"}
                  bg={isActive ? "#800000" : "transparent"}
                  color={isActive ? "white" : "gray.600"}
                >
                  <Box as={icon} boxSize="5" />
                  {!collapsed && <Text fontSize={"90%"}>{label}</Text>}
                </Flex>
              )}
            </NavLink>
          </Tooltip>
        ))}
      </VStack>
      <Box
        pos="absolute"
        bottom="5"
        left="0"
        right="0"
        px={2}
        pl={collapsed ? 1 : 2}
        pr={collapsed ? 1 : 2}
      >
        <Divider my={2} />
        <Tooltip
          label={collapsed ? "Logout" : ""}
          placement="right"
          borderRadius={"md"}
          hasArrow
        >
          <NavLink to={"/logout"}>
            {({ isActive }) => (
              <Flex
                align="center"
                justify={collapsed ? "center" : "flex-start"}
                p={3}
                gap={collapsed ? 0 : 4}
                w="full"
                _hover={{ bg: "#e0b1b1", color: "#800000" }}
                borderRadius="xl"
                transition="background 0.2s"
                fontWeight={isActive ? "bold" : "medium"}
                bg={isActive ? "#e0b1b1" : "transparent"}
                color={isActive ? "#800000" : "gray.600"}
              >
                <Box as={FiLogOut} boxSize="5" />
                {!collapsed && <Text fontSize={"90%"}>Logout</Text>}
              </Flex>
            )}
          </NavLink>
        </Tooltip>
      </Box>
    </Box>
  );
};

export default Sidebar;
