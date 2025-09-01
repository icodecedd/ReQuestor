import Sidebar from "@/components/Sidebar";
import { useSidebar } from "@/hooks/useSidebar";
import {
  Box,
  Drawer,
  DrawerContent,
  DrawerOverlay,
  Flex,
} from "@chakra-ui/react";
import React from "react";
import { FiFileText, FiMonitor, FiSettings } from "react-icons/fi";
import { LuLayoutDashboard } from "react-icons/lu";
import { Outlet } from "react-router-dom";

const studentNavItems = [
  { label: "Dashboard", icon: LuLayoutDashboard, path: "/student/dashboard" },
  { label: "Reserve Projector", icon: FiMonitor, path: "/student/reserve" },
  { label: "My Reservations", icon: FiFileText, path: "/student/reservations" },
  { label: "Settings", icon: FiSettings, path: "/student/settings" },
];

const StudentLayout = () => {
  const { isOpen, onClose } = useSidebar();

  return (
    <Flex>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        {/* The maxW value should be the same as the width of the sidebar */}
        <DrawerContent maxW="230px">
          <Sidebar navItems={studentNavItems} isDrawer onClose={onClose} />
        </DrawerContent>
      </Drawer>

      {/* Only visible on Desktop and Tablet */}
      <Box display={{ base: "none", md: "block" }}>
        <Sidebar navItems={studentNavItems} />
      </Box>
      <Box flex="1" p={6} bg="#f5f5f6" minH="100vh">
        {/* Main Content */}
        <Outlet />
      </Box>
    </Flex>
  );
};

export default StudentLayout;
