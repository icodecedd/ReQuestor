import { create } from "zustand";
import axios from "axios";
import { toTitleCase } from "@/utils/toTitleCase";

const useUserStore = create((set) => ({
  users: [],
  loading: false,
  error: null,

  fetchUsers: async () => {
    set({ loading: true, error: null });
    try {
      const res = await axios.get("/api/users");
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
        message:
          "All fields are required",
      };
    }

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match",
      };
    }

    if(password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters"
      }
    }

    try {
      const payload = {
        name,
        email,
        password_hash: password,
        role,
        status,
      };

      const res = await axios.post("/api/users", payload);
      set((state) => ({
        users: [res.data.data, ...state.users], // prepend new user
      }));
      return {
        success: true,
        message: "New account added successfully",
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
          message: "Failed to add account. Please try again",
        };
      }
    }
  },

  updateUser: async (id, updatedUser) => {
    const username = updatedUser.username?.trim() || "";
    const email = updatedUser.email?.trim() || "";
    const role = toTitleCase(updatedUser.role?.trim() || "");
    const status = toTitleCase(updatedUser.status || "");

    if (!username || !email || !role) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    try {
      const updatedPayload = {
        username,
        email,
        role,
        status,
      };

      const res = await axios.put(`/api/users/${id}`, updatedPayload);
      set((state) => ({
        users: state.users.map((user) =>
          user.id === id ? res.data.data : user
        ),
      }));
      return {
        success: true,
        message: "Account updated successfully",
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
      } else if (err.errorCode === "USERNAME_EXISTS") {
        return {
          success: false,
          message: err.message,
        };
      } else {
        return {
          success: false,
          message: "Failed to update account. Please try again",
        };
      }
    }
  },

  deleteUser: async (id) => {
    try {
      const res = await axios.delete(`/api/users/${id}`);

      set((state) => ({
        users: state.users.filter((user) => user.id !== id),
      }));

      return {
        success: true,
        message: "Account deleted successfully",
      };
    } catch (error) {
      console.error(
        "Delete account error:",
        error.response?.data || error.message
      );

      return {
        success: false,
        message: "Failed to delete account. Please try again",
      };
    }
  },

  resetPassword: async (id, newPassword) => {
    const password = newPassword.password || "";
    const confirmPassword = newPassword.confirmPassword || "";
    const forceLogin = newPassword.forceLogin;
    const sendNotification = newPassword.sendNotification;

    if (!password || !confirmPassword) {
      return {
        success: false,
        message: "password and confirm password are required",
      };
    }

    if (password.length < 6) {
      return {
        success: false,
        message: "Password must be at least 6 characters",
      };
    }

    if (password && confirmPassword && password !== confirmPassword) {
      return {
        success: false,
        message: "Passwords do not match",
      };
    }

    // Note: Add a notification email logic here
    if (sendNotification) {
      console.log("Email has been sent to the user");
    }

    try {
      const resetPayload = {
        password,
        confirmPassword,
        must_change_password: forceLogin,
      };

      const res = await axios.patch(
        `/api/users/${id}/set-password`,
        resetPayload
      );
      return {
        success: true,
        message: "Account's password reset successfully",
      };
    } catch (error) {
      console.error(
        "Reset account's password error:",
        error.response?.data || error.message
      );

      const err = error.response?.data;
      if (err.errorCode === "REQUIRED_PASSWORD") {
        return {
          success: false,
          message: err.message,
        };
      } else if (err.errorCode === "DO_NOT_MATCH") {
        return {
          success: false,
          message: "Passwords do not match",
        };
      }
      return {
        success: false,
        message: "Failed to reset account's password. Please try again",
      };
    }
  },

  toggleStatus: async (id) => {
    try {
      const res = await axios.patch(`/api/users/${id}/set-status`);

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
          message: "Something went wrong",
        };
      }
    } catch (error) {
      console.error(
        "Toggle account's status error:",
        error.response?.data || error.message
      );

      return {
        success: false,
        message: "Failed to reset account's password. Please try again",
      };
    }
  },
}));

export default useUserStore;
