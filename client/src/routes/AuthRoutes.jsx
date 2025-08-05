import ForgotPasswordPage from "@/pages/Authentication/ForgotPasswordPage";
import LoginPage from "@/pages/Authentication/LoginPage";
import SignupPage from "@/pages/Authentication/SignupPage";
import ResetPasswordPage from "@/pages/Authentication/ResetPasswordPage";
import VerificationPage from "@/pages/Authentication/VerificationPage";
import { useLocation, Navigate, Routes, Route } from "react-router-dom";

// Wrapper to protect VerificationPage from missing email
const ProtectedVerification = () => {
  const location = useLocation();
  const email = location.state?.email;

  return email ? <VerificationPage /> : <Navigate to="/signup" />;
};

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
      <Route path="/verification" element={<ProtectedVerification />} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AuthRoutes;
