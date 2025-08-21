import ForgotPasswordPage from "@/pages/authentication/ForgotPasswordPage";
import LoginPage from "@/pages/authentication/LoginPage";
import SignupPage from "@/pages/authentication/SignupPage";
import ResetPasswordPage from "@/pages/authentication/ResetPasswordPage";
import VerificationPage from "@/pages/authentication/VerificationPage";
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
