import ForgotPasswordPage from "@/pages/ForgotPasswordPage";
import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import ResetPasswordPage from "@/pages/ResetPasswordPage";
import VerificationPage from "@/pages/VerificationPage";
import { useLocation, Navigate, Routes, Route } from "react-router-dom";
import VerificationSuccessPage from "@/pages/VerificationSuccessPage";

// Wrapper to protect VerificationPage from missing email
const ProtectedVerification = () => {
  const location = useLocation();
  const email = location.state?.email;

  return email ? <VerificationPage /> : <Navigate to="/signup" />;
};

const ProtectedResetPassword = () => {
  const location = useLocation();
  const token = location.state?.token;
  return token ? <ResetPasswordPage /> : <Navigate to="/forgot-password" />;
};

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignupPage />} />
      <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      <Route path="/reset-password" element={<ProtectedResetPassword />} />
      <Route path="/verification" element={<VerificationPage />} />
      <Route path="/verification-success" element={<VerificationSuccessPage />} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AuthRoutes;
