// components/PublicRoute.jsx
import { Navigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";

const PublicRoute = ({ children }) => {
  const { user } = useAuth();

  if (user && user.status === "Active") {
    const redirectPath = user.role === "Admin" ? "/admin" : "/student";
    return <Navigate to={redirectPath} replace />;
  }

  return children;
};

export default PublicRoute;
