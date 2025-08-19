import { useState, useEffect } from "react";
import api from "@/api/index";
import AuthContext from "./AuthContext";

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

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
          }
        } else {
          setUser(null);
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

  const logout = async () => {
    await api.post("/auth/logout", {});
    setUser(null);
    localStorage.removeItem("maintenanceDismissed");
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
    const result = await api.post("/auth/refresh-token", {});
    return result.data;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        signup,
        logout,
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
