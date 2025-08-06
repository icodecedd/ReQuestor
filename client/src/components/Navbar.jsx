import {
  Box,
  Flex,
  IconButton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  HStack,
  VStack,
  Text,
  MenuGroup,
} from "@chakra-ui/react";
import { FiBell, FiSettings, FiLogOut, FiUser } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useAuth } from "@/hooks/useAuth";

const Navbar = ({ pageName }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const lightMaroon = "#f7eaea";
  const maroon = "#800000";

  return (
    <Box mb={10} mt={-4}>
      {/* Header */}
      <Box borderBottom="1px solid #dbe2e9ff" pl={8} pr={8} mx={-6}>
        <Flex justify="space-between" align="center" pb={0.4}>
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon fontSize={"20px"} />}
            mb={2}
            fontWeight="medium"
          >
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/admin/dashboard"
                _hover={{ textDecoration: "none" }}
              >
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#" fontWeight="semibold" color={maroon}>
                {pageName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          {/* Buttons */}
          <Flex align="center" gap={2} p={1}>
            {/* Right-side Actions */}
            <Flex align="center" gap={3}>
              {/* Notification & Settings */}
              <HStack spacing={1}>
                <IconButton
                  icon={<FiBell size={18} />}
                  aria-label="Notifications"
                  variant="ghost"
                  borderRadius="full"
                  _hover={{ bg: lightMaroon }}
                  size="sm"
                />
                <IconButton
                  icon={<FiSettings size={17} />}
                  aria-label="Settings"
                  variant="ghost"
                  borderRadius="full"
                  size="sm"
                  _hover={{ bg: lightMaroon }}
                  onClick={() => navigate("/admin/settings")}
                />
              </HStack>
            </Flex>

            {/* Divider */}
            <Box h="25px" w="1px" bg="#c7c7c7ff" />

            {/* User Menu */}
            <Menu autoSelect={false}>
              <MenuButton
                as={Button}
                variant="ghost"
                borderRadius="lg"
                px={2}
                py={1}
                _hover={{ bg: lightMaroon }}
                _active={{ bg: lightMaroon }}
              >
                <HStack spacing={2}>
                  <Avatar
                    size="sm"
                    name={user.name}
                    bg={maroon}
                    color="white"
                    fontWeight="bold"
                  />
                  <VStack spacing={0} align="start">
                    <Text fontSize="13px" fontWeight="medium" lineHeight="1.2">
                      {user.name}
                    </Text>
                    <Text
                      fontSize="11px"
                      color="gray.600"
                      fontWeight="normal"
                      mt={0}
                    >
                      {user.role}
                    </Text>
                  </VStack>
                  <IoIosArrowDown size={14} />
                </HStack>
              </MenuButton>

              <MenuList minW="220px" py={1} boxShadow="md">
                <MenuGroup
                  title="Account"
                  fontSize="xs"
                  fontWeight="semibold"
                  color="gray.500"
                  px={3}
                  py={1}
                >
                  <MenuItem
                    icon={<FiUser size={16} />}
                    _hover={{
                      bg: lightMaroon,
                    }}
                    _focus={{
                      bg: lightMaroon,
                    }}
                    fontSize="sm"
                    py={2}
                  >
                    My Profile
                  </MenuItem>
                  <MenuItem
                    icon={<FiLogOut size={15} />}
                    _hover={{
                      bg: lightMaroon,
                    }}
                    _focus={{
                      bg: lightMaroon,
                    }}
                    fontSize="sm"
                    py={2}
                    onClick={() => {
                      logout();
                    }}
                  >
                    Sign Out
                  </MenuItem>
                </MenuGroup>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Navbar;
