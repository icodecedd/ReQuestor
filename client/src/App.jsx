import { Route, Routes } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import StudentRoutes from "./routes/StudentRoutes";
import "@/assets/global.css";
import { useAuth } from "./hooks/useAuth";
import VerificationSuccessPage from "./pages/authentication/VerificationSuccessPage";
import LoginPage from "./pages/authentication/LoginPage";
import SignupPage from "./pages/authentication/SignupPage";
import PublicRoute from "./components/routes/PublicRoute";
import PrivateRoute from "./components/routes/PrivateRoute";
import { useAxiosInterceptor } from "./hooks/useAxiosInterceptor";
import ResetPasswordPage from "./pages/authentication/ResetPasswordPage";
import VerificationPage from "./pages/authentication/VerificationPage";
import ForgotPasswordPage from "./pages/authentication/ForgotPasswordPage";
import NotFoundPage from "./pages/authentication/NotFoundPage";
import { ToastContainer, Bounce } from "react-toastify";
import HomePage from "./pages/homepage/HomePage";

function App() {
  const { loading } = useAuth();
  useAxiosInterceptor();

  if (loading) return null;

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover
        theme="light"
        transition={Bounce}
        stacked
      />

      <Routes>
        {/* Public Routes - Always accessible */}
        <Route
          path="/"
          element={
            <PublicRoute>
              <HomePage />
            </PublicRoute>
          }
        />
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
          path="/verification"
          element={
            <PublicRoute>
              <VerificationPage />
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
        <Route
          path="/forgot-password"
          element={
            <PublicRoute>
              <ForgotPasswordPage />
            </PublicRoute>
          }
        />
        <Route
          path="/reset-password"
          element={
            <PublicRoute>
              <ResetPasswordPage />
            </PublicRoute>
          }
        />

        {/* Protected Routes */}
        <Route
          path="/admin/*"
          element={
            <PrivateRoute allowedRoles={["Admin"]}>
              <AdminRoutes />
            </PrivateRoute>
          }
        />
        <Route
          path="/student/*"
          element={
            <PrivateRoute allowedRoles={["Student"]}>
              <StudentRoutes />
            </PrivateRoute>
          }
        />

        {/* Fallback route */}
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </>
  );
}

export default App;
