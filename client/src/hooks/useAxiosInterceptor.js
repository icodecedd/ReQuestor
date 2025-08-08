// src/hooks/useAxiosInterceptor.js
import { useEffect } from "react";
import { useAuth } from "@/hooks/useAuth";
import api from "@/api/index";
import { toast } from "react-toastify"; // Or any toast library you like

export const useAxiosInterceptor = () => {
  const { logout, refreshToken } = useAuth();

  useEffect(() => {
    const interceptor = api.interceptors.response.use(
      (res) => res,
      async (err) => {
        const originalRequest = err.config;

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
              toast.error("Your session has expired. Please log in again.");
              setTimeout(() => logout(), 2000); // delay logout so message shows
            }
          }
        }

        return Promise.reject(err);
      }
    );

    return () => api.interceptors.response.eject(interceptor);
  }, [logout]);
};
