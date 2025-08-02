import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import "@/assets/global.css";
import { useAuth } from "./hooks/useAuth";
import VerificationSuccessPage from "./pages/VerificationSuccessPage";
import LoginPage from "./pages/LoginPage";
import SignupPage from "./pages/SignupPage";
import PublicRoute from "./components/routes/PublicRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import UnauthorizedPage from "./pages/UnauthorizedPage";

function App() {
  const { user, loading } = useAuth();

  if (loading) return null;

  return (
    <Routes>
      {(!user || user.status === "Inactive") && (
        <Route path="/*" element={<AuthRoutes />} />
      )}

      <Route
        path="/login"
        element={
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        }
      />

      <Route
        path="/signup"
        element={
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        }
      />

      <Route
        path="/verification-success"
        element={
          <PublicRoute>
            <VerificationSuccessPage />
          </PublicRoute>
        }
      />

      {/* Admin Routes */}
      <Route
        path="/*"
        element={
          <PrivateRoute allowedRoles={["Admin"]}>
            <AdminRoutes />
          </PrivateRoute>
        }
      />

      {/* Student Routes */}
      <Route
        path="/*"
        element={
          <PrivateRoute allowedRoles={["Student"]}>
            <StudentRoutes />
          </PrivateRoute>
        }
      />

      {/* Fallback route */}
      <Route path="*" element={<UnauthorizedPage />} />
    </Routes>
  );
}

export default App;
