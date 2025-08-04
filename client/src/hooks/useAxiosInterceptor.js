// src/hooks/useAxiosInterceptor.js
import {useEffect} from "react";
import {useAuth} from "@/hooks/useAuth";
import api from "@/api/index"

export const useAxiosInterceptor = () => {
    const {logout} = useAuth();

    useEffect(() => {
        const interceptor = api.interceptors.response.use(
            res => res,
            err => {
                if (err.response?.status === 401) {
                    logout(); // Clear context + redirect
                }
                return Promise.reject(err);
            }
        );

        return () => api.interceptors.response.eject(interceptor);
    }, [logout]);
};
