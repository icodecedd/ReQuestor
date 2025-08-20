// routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSettingsStore } from "@/store/settingsStore";
import { useEffect } from "react";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  const { fetchSettings } = useSettingsStore();

  // fetch settings as the dashboard page loads
  useEffect(() => {
    fetchSettings();
  }, []);

  if (loading) return null;

  const isAuthenticated = user && user.status === "Active" && user.is_verified;

  if (allowedRoles.length > 0 && !allowedRoles.includes(user?.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default PrivateRoute;
