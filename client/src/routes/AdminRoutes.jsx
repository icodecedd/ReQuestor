import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard/DashboardPage";
import ManageUsers from "@/pages/admin/ManageUsers/ManageUsersPage";
import Requests from "@/pages/admin/RequestsPage";
import Equipment from "@/pages/admin/Equipment/EquipmentsPage";
import Activity from "@/pages/admin/ActivityLogsPage";
import Settings from "@/pages/admin/SettingsPage";

const adminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminLayout />}>
        {/* Default */}
        <Route index element={<Dashboard />} />
        {/* Sidebar */}
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="requests" element={<Requests />} />
        <Route path="equipment" element={<Equipment />} />
        <Route path="activity" element={<Activity />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default adminRoutes;
