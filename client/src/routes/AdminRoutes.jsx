import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "@/layouts/AdminLayout";
import Dashboard from "@/pages/admin/Dashboard/DashboardPage";
import ManageUsers from "@/pages/admin/ManageUsers/ManageUsersPage";
import Requests from "@/pages/admin/Requests/RequestsPage";
import Equipment from "@/pages/admin/Equipment/EquipmentsPage";
import Activity from "@/pages/admin/ActivityLogsPage";
import Settings from "@/pages/admin/SettingsPage";

const AdminRoutes = () => {
  return (
    <Routes>
      {/* Nested routes under /dashboard */}
      <Route path="/admin" element={<AdminLayout />}>
        <Route index element={<Navigate to="dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="users" element={<ManageUsers />} />
        <Route path="requests" element={<Requests />} />
        <Route path="equipment" element={<Equipment />} />
        <Route path="activity" element={<Activity />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/admin/dashboard" replace />} />
    </Routes>
  );
};

export default AdminRoutes;
