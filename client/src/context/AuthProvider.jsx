import { useState, useEffect, useRef } from "react";
import api from "@/api/index";
import AuthContext from "./AuthContext";
import { useNavigate } from "react-router-dom";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const isLoggingOut = useRef(false); // 🚨 Prevent multiple logout calls

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await api.get("/auth/me");
        setUser(res.data.data);
        console.log("Logged in user:", res.data.data);
      } catch (err) {
        // If access token expired, try refreshing
        if (err.response?.status === 401) {
          try {
            await refreshToken(); // refresh cookie
            const retryRes = await api.get("/auth/me");
            setUser(retryRes.data.data);
            console.log("Refreshed and logged in user:", retryRes.data.data);
          } catch (refreshErr) {
            console.log("Refresh failed:", refreshErr);
            setUser(null);
            safeLogout(); // ✅ use safeLogout instead of direct logout
          }
        } else {
          setUser(null);
          console.log("Not logged in or error fetching user:", err);
          // If not logged in, redirect to login
          navigate("/login");
        }
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (data) => {
    await api.post("/auth/login", data);
    const userRes = await api.get("/auth/me");
    setUser(userRes.data.data);
    return { success: userRes.data.success, data: userRes.data.data };
  };

  const signup = async (data) => {
    await api.post("/auth/register", data);
    const userRes = await api.get("/auth/me");
    setUser(userRes.data.data);
    return { success: userRes.data.success, data: userRes.data.data };
  };

  const safeLogout = async () => {
    if (isLoggingOut.current) return; // 🚨 Prevent duplicates
    isLoggingOut.current = true;

    try {
      await api.post("/auth/logout", {});
    } catch (err) {
      console.warn("Logout request failed:", err);
    } finally {
      setUser(null);
      localStorage.removeItem("maintenanceDismissed");
      navigate("/login");
      isLoggingOut.current = false; // reset after finishing
    }
  };

  const forgotPassword = async (email) => {
    const result = await api.post("/auth/forgot-password", { email });
    return result.data;
  };

  const resetPassword = async (resetToken, password) => {
    const result = await api.post(`/auth/reset-password/${resetToken}`, {
      password,
    });
    return result.data;
  };

  const refreshToken = async () => {
    const result = await api.post("/auth/refresh-token");
    return result.data.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout: safeLogout,
        forgotPassword,
        resetPassword,
        refreshToken,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
