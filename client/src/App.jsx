import { Box, useColorModeValue } from "@chakra-ui/react";
import AdminDashboardLayout from "./layouts/AdminDashboardLayout";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { Navigate } from "react-router-dom";
import Overview from "./pages/OverviewPage";
import Requests from "./pages/RequestsPage";
import Equipments from "./pages/EquipmentsPage";
import Settings from "./pages/SettingsPage";

function App() {
  return (
    <Box minH="100vh">
      <Router>
        <Routes>
          <Route path="/dashboard" element={<AdminDashboardLayout />}>
            {/* Default */}
            <Route index element={<Overview />} />

            {/* Sidebar */}
            <Route path="overview" element={<Overview />} />
            <Route path="requests" element={<Requests />} />
            <Route path="equipments" element={<Equipments />} />
            <Route path="settings" element={<Settings />} />
          </Route>

          <Route path="/" element={<Navigate to="/dashboard" />} />
        </Routes>
      </Router>
    </Box>
  );
}

export default App;
