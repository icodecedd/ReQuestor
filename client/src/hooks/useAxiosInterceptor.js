// src/hooks/useAxiosInterceptor.js
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import { useLocation } from "react-router-dom";
import api from "@/api/index";
import { showToast } from "@/utils/toast";

export const useAxiosInterceptor = () => {
  const { logout, refreshToken, user } = useAuth();
  const location = useLocation();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err.config;

        // ======= MAINTENANCE ENFORCEMENT =======
        if (
          err.response?.status === 403 &&
          err.response?.data?.message === "Maintenance in progress"
        ) {
          showToast(
            "Maintenance in progress. Please try again later.",
            "error"
          );
          logout();
          return Promise.reject(err);
        }

        // ======= TOKEN REFRESH HANDLING =======
        // Only handle 401s if user is logged in AND on protected routes
        const isProtectedRoute =
          location.pathname.startsWith("/admin") ||
          location.pathname.startsWith("/student");

        if (
          err.response?.status === 401 &&
          user &&
          user.is_verified &&
          isProtectedRoute &&
          !originalRequest._retry
        ) {
          originalRequest._retry = true;
          try {
            await refreshToken();
            return api(originalRequest);
          } catch (refreshErr) {
            const status = refreshErr.response?.status;
            if (status === 400 || status === 401 || status === 403) {
              logout();
              return Promise.reject(refreshErr);
            }
          }
        }

        // For 401s on public routes or when not logged in, just reject
        // Don't trigger logout
        return Promise.reject(err);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [logout, refreshToken, user, location.pathname]);
};
