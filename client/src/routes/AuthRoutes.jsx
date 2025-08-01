import LoginPage from "@/pages/LoginPage";
import SignupPage from "@/pages/SignupPage";
import VerificationPage from "@/pages/VerificationPage";
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
      <Route path="/verification" element={<ProtectedVerification />} />

      <Route path="*" element={<Navigate to="/login" />} />
    </Routes>
  );
};

export default AuthRoutes;
