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
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FiBell } from "react-icons/fi";
import { MdHistory } from "react-icons/md";
import { IoIosArrowDown } from "react-icons/io";

const Navbar = ({ pageName }) => {
  return (
    <Box mb={10} mt={-4}>
      {/* Header */}
      <Box borderBottom="1px solid #dee6f0ff" pl={8} pr={8} mx={-6}>
        <Flex justify="space-between" align="center" pb={0.5}>
          <Breadcrumb
            spacing="8px"
            separator={<ChevronRightIcon color="gray.500" />}
            mb={2}
          >
            <BreadcrumbItem>
              <BreadcrumbLink href="/dashboard">Dashboard</BreadcrumbLink>
            </BreadcrumbItem>

            <BreadcrumbItem isCurrentPage>
              <BreadcrumbLink href="#">{pageName}</BreadcrumbLink>
            </BreadcrumbItem>
          </Breadcrumb>
          {/* Buttons */}
          <Flex align="center" gap={2} p={1}>
            <IconButton
              icon={<MdHistory size={22} />}
              aria-label="History"
              variant="ghost"
              size="md"
            />
            <IconButton
              icon={<FiBell size={20} />}
              aria-label="Notifications"
              variant="ghost"
              size="md"
            />
            <Menu>
              <MenuButton
                as={Button}
                variant="ghost"
                px={2}
                py={1}
                display="flex"
                alignItems="center"
                gap={2}
                _hover={{ bg: "gray.100" }}
              >
                <HStack>
                  <Avatar size="sm" name="Admin Test" src="" />
                  <IoIosArrowDown />
                </HStack>
              </MenuButton>
              <MenuList>
                <MenuItem>Profile</MenuItem>
                <MenuItem>Logout</MenuItem>
              </MenuList>
            </Menu>
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Navbar;
