import { Routes, Route, Navigate } from "react-router-dom";
import AdminLayout from "../layouts/AdminLayout";
import Overview from "../pages/admin/Overview/OverviewPage";
import Requests from "../pages/admin/RequestsPage";
import Equipments from "../pages/admin/EquipmentsPage";
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
        <Route path="equipments" element={<Equipments />} />
        <Route path="settings" element={<Settings />} />
      </Route>

      <Route path="*" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
};

export default adminRoutes;
