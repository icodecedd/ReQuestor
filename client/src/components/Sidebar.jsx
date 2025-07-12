import { Box, IconButton, VStack, Text, Flex, Tooltip } from "@chakra-ui/react";
import { FiMenu } from "react-icons/fi";
import { NavLink } from "react-router-dom";
import { useState } from "react";

const Sidebar = ({navItems}) => {
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
        justify={collapsed ? "center" : "space-between"}
        align="center"
        p={5}
      >
        {!collapsed && <Text fontWeight="bold">RESERVEQ</Text>}
        <IconButton
          icon={<FiMenu fontSize={20} />}
          size="md"
          onClick={() => setCollapsed(!collapsed)}
          aria-label="Toggle sidebar"
        />
      </Flex>

      <VStack
        align="stretch"
        spacing={2}
        mt={4}
        pl={collapsed ? 0 : 2}
        pr={collapsed ? 0 : 2}
      >
        {navItems.map(({ label, icon, path }) => (
          <Tooltip
            label={collapsed ? label : ""}
            placement="right"
            key={label}
            hasArrow
          >
            <NavLink to={path}>
              {({ isActive }) => (
                <Flex
                  align="center"
                  justify={collapsed ? "center" : "flex-start"}
                  p={3}
                  gap={collapsed ? 0 : 4}
                  w="full"
                  bg={isActive ? "gray.100" : "transparent"}
                  _hover={{ bg: "gray.200" }}
                  borderRadius="xl"
                  transition="background 0.2s"
                >
                  <Box as={icon} boxSize="5" />
                  {!collapsed && <Text>{label}</Text>}
                </Flex>
              )}
            </NavLink>
          </Tooltip>
        ))}
      </VStack>
    </Box>
  );
};

export default Sidebar;
