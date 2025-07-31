import {create} from "zustand";
import axios from "axios";

export const useAuthStore = create((set) => ({
    user: null,
    loading: false,
    error: null,

    login: async (userCredentials) => {
        set({ loading: true, error: null });
        try {
            const res = await axios.post("/api/auth/login", userCredentials);
            set({ user: res.data.data, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },

    logout: async () => {
        set({ loading: true, error: null });
        try {
            await axios.get("/api/auth/logout");
            set({ user: null, loading: false });
        } catch (error) {
            set({ error: error.message, loading: false });
        }
    },
}));
