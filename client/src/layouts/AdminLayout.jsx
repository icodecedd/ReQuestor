import { Box, Flex } from "@chakra-ui/react";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";
import {
  FiFileText,
  FiMonitor,
  FiSettings,
  FiUsers,
  FiActivity
} from "react-icons/fi";
import { LuLayoutDashboard } from "react-icons/lu";

const DashboardLayout = () => {
  const navItems = [
    { label: "Dashboard", icon: LuLayoutDashboard, path: "/dashboard/dashboard" },
    { label: "Manage Users", icon: FiUsers, path: "/dashboard/users" },
    { label: "Requests", icon: FiFileText, path: "/dashboard/requests" },
    { label: "Equipment", icon: FiMonitor, path: "/dashboard/equipment" },
    { label: "Activity Logs", icon: FiActivity, path: "/dashboard/activity" },
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
