import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Overview from "../pages/admin/Overview/OverviewPage";
import Requests from "../pages/admin/RequestsPage";
import Equipment from "../pages/admin/EquipmentsPage";
import Activity from "../pages/admin/ActivityLogsPage"
import Settings from "../pages/admin/SettingsPage";

const adminRoutes = () => {
  return (
    <Routes>
      <Route path="/dashboard" element={<AdminLayout />}>
        {/* Default */}
        <Route index element={<Overview />} />

        {/* Sidebar */}
        <Route path="overview" element={<Overview />} />
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
