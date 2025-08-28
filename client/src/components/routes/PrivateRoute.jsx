// routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { useSettingsStore } from "@/store/settingsStore";
import { useEffect } from "react";
import { useAxiosInterceptor } from "@/hooks/useAxiosInterceptor";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();
  const { fetchSettings } = useSettingsStore();

  // Attach Axios interceptor only when user is authenticated
  useAxiosInterceptor();

  // fetch settings as the dashboard page loads
  useEffect(() => {
    if (user) {
      fetchSettings();
    }
  }, [user, fetchSettings]);

  if (loading) return null;

  const isAuthenticated = user && user.status === "Active" && user.is_verified;

  // IMPORTANT: Check authentication FIRST, before role checking
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Only check roles if user is authenticated AND allowedRoles is specified
  if (allowedRoles.length > 0 && !allowedRoles.includes(user.role)) {
    return <Navigate to="/unauthorized" replace />;
  }

  return children;
};

export default PrivateRoute;
