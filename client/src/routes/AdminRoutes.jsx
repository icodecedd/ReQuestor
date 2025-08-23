import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import Dashboard from "@/pages/admin/dashboard/DashboardPage";
import ManageUsers from "@/pages/admin/users/ManageUsersPage";
import Requests from "@/pages/admin/requests/RequestsPage";
import Equipment from "@/pages/admin/equipment/EquipmentsPage";
import Activity from "@/pages/admin/acitvity/ActivityLogsPage";
import Settings from "@/pages/admin/settings/AdminSettingsPage";
import MyProfilePage from "@/pages/profile/MyProfilePage";
import SidebarProvider from "@/context/SidebarProvider";

const AdminRoutes = () => {
  return (
    <SidebarProvider>
    <Routes>
      {/* Nested routes under /dashboard */}
      <Route path="/" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="requests" element={<Requests />} />
        <Route path="equipment" element={<Equipment />} />
        <Route path="activity" element={<Activity />} />
        <Route path="settings" element={<Settings />} />
        <Route path="profile" element={<MyProfilePage />} />
      </Route>

      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
    </SidebarProvider>
  );
};

export default AdminRoutes;
