import { create } from "zustand";
import api from "@/api/index";
import { toTitleCase } from "@/utils/toTitleCase";

export const useUserStore = create((set, get) => ({
  users: [],
  loading: false,
  error: null,
  userId: null,
  setUserId: (id) => set({ userId: id }),

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await api.get("/api/users");
      set({ users: res.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  addUser: async (newUser) => {
    const name = newUser.name?.trim() || "";
    const email = newUser.email?.trim() || "";
    const role = toTitleCase(newUser.role?.trim() || "");
    const password = newUser.password || "";
    const confirmPassword = newUser.confirmPassword || "";
    const status = toTitleCase(newUser.status || "");

    if (!name || !email || !password || !confirmPassword || !role) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match.",
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters.",
      };
    }

    if (!email.includes("@")) {
      return {
        success: false,
        message: "Invalid email format.",
      };
    }

    try {
      const addedPayload = {
        name,
        email,
        password_hash: password,
        role,
        status,
        user_id: get().userId,
      };

      const res = await api.post("/api/users", addedPayload);
      set((state) => ({
        users: [res.data.data, ...state.users], // prepend new user
      }));
      return {
        success: true,
        message: "New account added successfully.",
      };
    } catch (error) {
      console.error(
        "Add account error:",
        error.response?.data || error.message
      );

      const err = error.response?.data;
      if (err.errorCode === "EMAIL_EXISTS") {
        return {
          success: false,
          message: err.message,
        };
      } else if (err.errorCode === "USERNAME_EXISTS") {
        return {
          success: false,
          message: err.message,
        };
      } else {
        return {
          success: false,
          message: "Failed to add account. Please try again.",
        };
      }
    }
  },

  updateUser: async (id, updatedUser) => {
    const name = updatedUser.name?.trim() || "";
    const email = updatedUser.email?.trim() || "";
    const role = toTitleCase(updatedUser.role?.trim() || "");
    const status = toTitleCase(updatedUser.status || "");

    if (!name || !email || !role) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    if (!email.includes("@")) {
      return {
        success: false,
        message: "Invalid email format.",
      };
    }

    try {
      const updatedPayload = {
        name,
        email,
        role,
        status,
        user_id: get().userId,
      };

      const res = await api.put(`/api/users/${id}`, updatedPayload);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? res.data.data : user
        ),
      }));
      return {
        success: true,
        message: "Account updated successfully.",
      };
    } catch (error) {
      console.error(
        "Update account error:",
        error.response?.data || error.message
      );

      const err = error.response?.data;
      if (err?.errorCode === "EMAIL_EXISTS") {
        return {
          success: false,
          message: err.message,
        };
      } else {
        return {
          success: false,
          message: "Failed to update account. Please try again.",
        };
      }
    }
  },

  deleteUser: async (id) => {
    try {
      await api.delete(`/api/users/${id}`, {
        data: { user_id: get().userId },
      });

      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      }));

      return {
        success: true,
        message: "Account deleted successfully.",
      };
    } catch (error) {
      console.error(
        "Delete account error:",
        error.response?.data || error.message
      );

      return {
        success: false,
        message: "Failed to delete account. Please try again.",
      };
    }
  },

  resetPassword: async (id, email) => {
    if (!email) {
      return {
        success: false,
        message: "Email is required.",
      };
    }
    try {
      await api.patch(`/api/users/${id}/set-password`, {
        email,
        user_id: get().userId,
      });

      return {
        success: true,
        message: "User's password was reset successfully.",
      };
    } catch (error) {
      const errMsg =
        error.response?.data?.message || "Unexpected error occurred.";

      console.error("Reset password error:", errMsg);

      return {
        success: false,
        message: "Failed to reset password. Please try again.",
      };
    }
  },

  toggleStatus: async (id) => {
    try {
      const res = await api.patch(`/api/users/${id}/set-status`, {
        user_id: get().userId,
      });

      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? { ...user, status: res.data.data.status } : user
        ),
      }));

      const result = res?.data;
      if (result.success) {
        return {
          success: result.success,
          message: result.message,
        };
      } else {
        return {
          success: result.success,
          message: "Something went wrong.",
        };
      }
    } catch (error) {
      console.error(
        "Toggle account's status error:",
        error.response?.data || error.message
      );

      return {
        success: false,
        message: "Failed to reset account's password. Please try again.",
      };
    }
  },
}));
