// routes/PrivateRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const PrivateRoute = ({ children, allowedRoles = [] }) => {
  const { user, loading } = useAuth();

  if (loading) return null;

  const isAuthenticated = user && user.status === "Active";
  const isAuthorized = allowedRoles.includes(user?.role);

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAuthorized) {
    return <Navigate to="/unauthorized" replace />; // Optional: add this page
  }
  return children;
};

export default PrivateRoute;
