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
import { FiSettings, FiLogOut, FiUser } from "react-icons/fi";
import { IoIosArrowDown } from "react-icons/io";
import { useNavigate } from "react-router-dom";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { useAuth } from "@/hooks/useAuth";

const SIDEBAR_WIDTH = "240px";
const MAROON_LIGHT = "#f7eaea";
const MAROON = "#800000";

const Navbar = ({ pageName }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <Box
      position="fixed"
      top="16px" // ← floating gap from top
      left={`calc(${SIDEBAR_WIDTH} + 16px)`} // ← offset so it doesn't overlap sidebar
      w={`calc(100% - ${SIDEBAR_WIDTH} - 32px)`} // full width minus sidebar and margins
      bg="white"
      boxShadow="0 2px 4px rgba(0, 0, 0, 0.1)"
      borderRadius="full"
      zIndex={1000}
      px={8}
      py={1}
      display="flex"
      alignItems="center"
    >
      <Flex justify="space-between" align="center" w="100%">
        <Breadcrumb
          spacing="8px"
          separator={<ChevronRightIcon fontSize={"20px"} />}
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
            <BreadcrumbLink href="#" fontWeight="semibold" color={MAROON}>
              {pageName}
            </BreadcrumbLink>
          </BreadcrumbItem>
        </Breadcrumb>

        <Flex align="center" gap={3}>
          <IconButton
            icon={<FiSettings size={17} />}
            aria-label="Settings"
            variant="ghost"
            size="sm"
            borderRadius="full"
            _hover={{ bg: MAROON_LIGHT }}
            onClick={() => navigate("/admin/settings")}
          />
          <Box h="25px" w="1px" bg="#c7c7c7ff" />

          <Menu autoSelect={false}>
            <MenuButton
              as={Button}
              variant="ghost"
              borderRadius="lg"
              px={2}
              py={1}
              _hover={{ bg: MAROON_LIGHT }}
              _active={{ bg: MAROON_LIGHT }}
            >
              <HStack spacing={2}>
                <Avatar
                  size="sm"
                  name={user.name}
                  bg={MAROON}
                  color="white"
                  fontWeight="bold"
                />
                <VStack spacing={0} align="start">
                  <Text fontSize="13px" fontWeight="medium">
                    {user.name}
                  </Text>
                  <Text fontSize="11px" color="gray.600">
                    {user.role}
                  </Text>
                </VStack>
                <IoIosArrowDown size={14} />
              </HStack>
            </MenuButton>

            <MenuList
              minW="220px"
              p={1}
              bg="white"
              borderColor={"gray.200"}
              boxShadow="md"
              borderRadius={8}
              zIndex="dropdown"
            >
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
                  borderRadius={8}
                  py={2}
                  px={3}
                  _hover={{
                    bg: MAROON_LIGHT,
                  }}
                  _focus={{
                    bg: MAROON_LIGHT,
                  }}
                  fontSize="sm"
                >
                  My Profile
                </MenuItem>
                <MenuItem
                  icon={<FiLogOut size={15} />}
                  borderRadius={8}
                  py={2}
                  px={3}
                  _hover={{
                    bg: MAROON_LIGHT,
                  }}
                  _focus={{
                    bg: MAROON_LIGHT,
                  }}
                  fontSize="sm"
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
  );
};

export default Navbar;
