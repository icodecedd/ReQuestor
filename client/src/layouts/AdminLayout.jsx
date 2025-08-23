import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";
import Sidebar from "@/components/Sidebar";
import { Outlet } from "react-router-dom";
import {
  FiFileText,
  FiMonitor,
  FiSettings,
  FiUsers,
  FiActivity,
} from "react-icons/fi";
import { LuLayoutDashboard } from "react-icons/lu";
import { useSidebar } from "@/hooks/useSidebar";

const DashboardLayout = () => {
  const navItems = [
    { label: "Dashboard", icon: LuLayoutDashboard, path: "/admin/dashboard" },
    { label: "Manage Users", icon: FiUsers, path: "/admin/users" },
    { label: "Requests", icon: FiFileText, path: "/admin/requests" },
    { label: "Equipment", icon: FiMonitor, path: "/admin/equipment" },
    { label: "Activity Logs", icon: FiActivity, path: "/admin/activity" },
    { label: "Settings", icon: FiSettings, path: "/admin/settings" },
  ];

  const { isOpen, onClose } = useSidebar();

  return (
    <Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        {/* The maxW value should be the same as the width of the sidebar */}
        <DrawerContent maxW="230px">
          <Sidebar navItems={navItems} isDrawer onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* Only visible on Desktop and Tablet */}
      <Box display={{ base: "none", md: "block" }}>
        <Sidebar navItems={navItems} />
      </Box>
      <Box flex="2" p={6} bg="#f5f5f6" minH="100vh">
        {/* Main Content */}
        <Outlet />
      </Box>
    </Flex>
  );
};

export default DashboardLayout;
