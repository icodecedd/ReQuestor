// src/hooks/useAxiosInterceptor.js
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/api/index";

export const useAxiosInterceptor = () => {
  const { logout, refreshToken } = useAuth();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err.config;

        // ======= MAINTENANCE ENFORCEMENT =======
        // Backend returns 403 + "Maintenance in progress" when the grace period finishes
        if (
          err.response?.status === 403 &&
          err.response?.data?.message === "Maintenance in progress"
        ) {
          showToast(
            "Maintenance in progress. Please try again later.",
            "error"
          );
          // Immediately force logout of non-admins
          setTimeout(() => logout(), 2000); // delay logout so message shows
          return; // prevent further processing
        }

        // ======= TOKEN REFRESH HANDLING =======
        // Case 1: Access token expired → try refresh
        if (err.response?.status === 401 && !originalRequest._retry) {
          originalRequest._retry = true;
          try {
            await refreshToken(); // backend issues new access token
            return api(originalRequest); // retry request
          } catch (refreshErr) {
            // Case 2: Refresh token also expired → graceful logout
            if (
              refreshErr.response?.status === 401 ||
              refreshErr.response?.status === 403
            ) {
              showToast(
                "Your session has expired. Please log in again.",
                "error"
              );
              setTimeout(() => logout(), 2000); // delay logout so message shows
            }
          }
        }

        return Promise.reject(err);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [logout, refreshToken]); // include refreshToken in deps
};
