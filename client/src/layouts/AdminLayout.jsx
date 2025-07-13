import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "../components/Sidebar";
import { Outlet } from "react-router-dom";
import { FiHome, FiFileText, FiMonitor, FiSettings, FiList } from "react-icons/fi";

const DashboardLayout = () => {
  const navItems = [
    { label: "Overview", icon: FiHome, path: "/dashboard/overview" },
    { label: "Requests", icon: FiFileText, path: "/dashboard/requests" },
    { label: "Equipment", icon: FiMonitor, path: "/dashboard/equipment" },
    { label: "Activity Log", icon: FiList, path: "/dashboard/activity" },
    { label: "Settings", icon: FiSettings, path: "/dashboard/settings" },
  ];

  return (
    <Flex>
      <Sidebar navItems={navItems} />
      <Box flex="1" p={6} bg="#f5f5f6" minH="100vh">
        <Outlet />
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
