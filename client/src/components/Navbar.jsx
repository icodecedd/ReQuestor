import {
  Box,
  Flex,
  IconButton,
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  Divider,
} from "@chakra-ui/react";
import { ChevronRightIcon } from "@chakra-ui/icons";
import { FiBell } from "react-icons/fi";
import { MdHistory } from "react-icons/md";

const Navbar = ({ pageName }) => {
  return (
    <Box mb={10}>
      {/* Header */}
      <Box pl={8} pr={8} mx={-6}>
        <Flex justify="space-between" align="center" pb={2}>
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
          <Flex align="center" gap={1}>
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
          </Flex>
        </Flex>
      </Box>
    </Box>
  );
};

export default Navbar;
