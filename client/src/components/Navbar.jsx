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

const Navbar = ({ pageName }) => {
  const navigate = useNavigate();

  return (
    <Box mb={10} mt={-4}>
      {/* Header */}
      <Box borderBottom="1px solid #dee6f0ff" pl={8} pr={8} mx={-6}>
        <Flex justify="space-between" align="center" pb={0.5}>
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon fontSize={"20px"} />}
            mb={2}
            fontWeight="medium"
          >
            <BreadcrumbItem>
              <BreadcrumbLink
                href="/dashboard"
                _hover={{ textDecoration: "none" }}
              >
                Dashboard
              </BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#" fontWeight="semibold" color="#800000">
                {pageName}
              </BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          {/* Buttons */}
          <Flex align="center" gap={2} p={1}>
            <IconButton
              icon={<FiBell size={20} />}
              aria-label="Notifications"
              variant="ghost"
              _hover={{ bg: "#f7eaea" }}
              size="md"
            />
            <IconButton
              icon={<FiSettings size={19} />}
              aria-label="Settings"
              variant="ghost"
              size="md"
              _hover={{ bg: "#f7eaea" }}
              onClick={() => navigate("/dashboard/settings")}
            />
            <Box h="25px" w="1px" bg="gray.300" />
            <Menu autoSelect={false}>
              <MenuButton
                as={Button}
                variant="ghost"
                borderRadius="md"
                display="flex"
                alignItems="center"
                gap={2}
                _hover={{ bg: "#f7eaea" }}
                _active={{ bg: "#f7eaea" }}
              >
                {/* Change the name with the actual admin name */}
                <HStack>
                  <Avatar size="sm" name="Cedrick Joseph Mariano" src="" />
                  <VStack align="start">
                    <Text fontSize="14px" mb={-2}>
                      Cedrick Joseph Mariano
                    </Text>
                    <Text fontSize="12px" color="gray.600" fontWeight="normal">
                      Administrator
                    </Text>
                  </VStack>
                  <IoIosArrowDown />
                </HStack>
              </MenuButton>
              <MenuList minW="250px">
                <MenuGroup title="Profile">
                  <MenuItem
                    gap={2}
                    _hover={{
                      bg: "#f7eaea",
                      borderRadius: "lg",
                    }}
                    w="240px"
                    ml={1}
                  >
                    <FiUser size="20px" />
                    My Account
                  </MenuItem>
                  <MenuItem
                    gap={2}
                    _hover={{
                      bg: "#f7eaea",
                      borderRadius: "lg",
                    }}
                    w="240px"
                    ml={1}
                  >
                    <FiLogOut size="19px" />
                    Sign out
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
