import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("/api/auth/me", { withCredentials: true });
        setUser(res.data.data);
        console.log("Logged in user:", res.data.data);
      } catch {
        setUser(null);
      } finally {
        setLoading(false);
      }
    };

    checkAuth();
  }, []);

  const login = async (data) => {
    await axios.post("/api/auth/login", data, { withCredentials: true });
    const userRes = await axios.get("/api/auth/me", { withCredentials: true });
    setUser(userRes.data.data);
    return { success: userRes.data.success, data: userRes.data.data };
  };

  const signup = async (data) => {
    await axios.post("/api/auth/register", data, { withCredentials: true });
    const userRes = await axios.get("/api/auth/me", { withCredentials: true });
    setUser(userRes.data.data);
    return { success: userRes.data.success, data: userRes.data.data };
  };

  const logout = async () => {
    await axios.post("/api/auth/logout", {}, { withCredentials: true });
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, loading }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;