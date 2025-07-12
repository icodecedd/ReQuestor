import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";

const DashboardLayout = () => {
  return (
    <Flex>
      <Sidebar />
      <Box flex="1" p={6} bg="#f5f5f6" minH="100vh">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
