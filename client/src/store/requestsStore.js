import { create } from "zustand";
import axios from "axios";
import { toTitleCase } from "@/utils/toTitleCase";
import {
  useRecentRequestsStore,
  useRecentActivitiesStore,
} from "./recentStore";

export const useRequestsStore = create((set, get) => ({
  requests: [],
  loading: false,
  error: null,
  userId: null,
  setUserId: (id) => set({ userId: id }),

  fetchRequests: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get("/api/requests");
      set({ requests: res.data.data, loading: false });
    } catch (error) {
      set({ error: error.message, loading: false });
    }
  },

  stats: () => {
    const req = get().requests;

    const totalRequests = req.length;
    const totalPending = req.filter((e) => e.status === "Pending").length;
    const totalApproved = req.filter((e) => e.status === "Approved").length;
    const totalRejected = req.filter((e) => e.status === "Rejected").length;

    return {
      totalRequests,
      totalPending,
      totalApproved,
      totalRejected,
    };
  },

  checkAvailability: async (dateDetails) => {
    const equipment_list = dateDetails?.equipment_list || [];
    const date_use = dateDetails?.date_use || "";
    const time_from = dateDetails?.time_from || "";
    const time_to = dateDetails?.time_to || "";

    if (
      !equipment_list ||
      !Array.isArray(equipment_list) ||
      equipment_list.length === 0 ||
      !date_use ||
      !time_from ||
      !time_to
    ) {
      return {
        success: false,
        message: "All fields are required.",
        target: "all",
      };
    }

    const timeFromHours = parseInt(time_from.split(":")[0]);
    const timeToHours = parseInt(time_to.split(":")[0]);
    if (timeToHours < timeFromHours) {
      return {
        success: false,
        message: "Invalid time range. Time range cannot span across two days.",
        target: "time",
      };
    }

    // Apply the requirement for request of at least 3 days in advance
    const dateNow = new Date();
    const dateUse = new Date(date_use);

    dateNow.setHours(0, 0, 0, 0);
    dateUse.setHours(0, 0, 0, 0);

    const dayDiff = (dateUse - dateNow) / (1000 * 60 * 60 * 24);

    if (dayDiff < 3) {
      return {
        success: false,
        message: "Invalid date. Date must be at least 3 days in advance.",
        target: "date",
      };
    }

    const requestPayload = {
      equipment_list,
      date_use,
      time_from,
      time_to,
    };

    try {
      const res = await axios.post(
        "/api/requests/check-availability",
        requestPayload
      );

      return {
        success: res.data.success,
        message: res.data.message,
        data: res.data.data,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to check availability. Please try again.",
      };
    }
  },

  addRequest: async (newRequest) => {
    const name = newRequest.name?.trim() || "";
    const course_section =
      newRequest.course_section?.trim()?.toUpperCase() || "";
    const faculty_in_charge =
      toTitleCase(newRequest.faculty_in_charge?.trim()) || "";
    const equipment_list = newRequest?.equipment_list || [];
    const date_use = newRequest?.date_use || "";
    const time_from = newRequest?.time_from || "";
    const time_to = newRequest?.time_to || "";
    const purpose = newRequest?.purpose || "";

    if (
      !name ||
      !course_section ||
      !faculty_in_charge ||
      !equipment_list ||
      !Array.isArray(equipment_list) ||
      equipment_list.length === 0 ||
      !date_use ||
      !time_from ||
      !time_to
    ) {
      return {
        success: false,
        message: "All fields are required.",
      };
    }

    try {
      const requestPayload = {
        name,
        course_section,
        faculty_in_charge,
        equipment_list,
        date_use,
        time_from,
        time_to,
        purpose,
        user_id: get().userId,
      };

      const res = await axios.post("/api/requests", requestPayload);
      set((state) => ({
        requests: [res.data.data, ...state.requests],
      }));
      useRecentRequestsStore.getState().addRecentRequest(res.data.data);
      useRecentActivitiesStore.getState().addActivityLog(res.data.activity);
      return {
        success: true,
        message: "New request added successfully.",
      };
    } catch (error) {
      console.error(
        "Add request error:",
        error.response?.data || error.message
      );

      if (error.response?.data?.message) {
        return {
          success: false,
          message: error.response?.data?.message,
        };
      }

      return {
        success: false,
        message: "Failed to add request. Please try again.",
      };
    }
  },

  approveRequest: async (id) => {
    try {
      const res = await axios.patch(`/api/requests/${id}/approve`, {
        user_id: get().userId,
      });

      set((state) => ({
        requests: state.requests.map((req) =>
          req.id === id ? { ...req, status: res.data.data.status } : req
        ),
      }));

      const result = res?.data;

      if (result.success) {
        return {
          success: result.success,
          message: "Request approved successfully.",
        };
      } else {
        return {
          success: result.success,
          message: "Something went wrong.",
        };
      }
    } catch (error) {
      console.error(
        "Approve request error:",
        error.response?.data || error.message
      );

      return {
        success: false,
        message: "Failed to approve request. Please try again.",
      };
    }
  },

  rejectRequest: async (id, rejectionReason) => {
    try {
      const res = await axios.patch(`/api/requests/${id}/reject`, {
        user_id: get().userId,
        rejectionReason,
      });

      set((state) => ({
        requests: state.requests.map((req) =>
          req.id === id ? { ...req, status: res.data.data.status } : req
        ),
      }));

      const result = res?.data;

      if (result.success) {
        return {
          success: result.success,
          message: "Request rejected successfully.",
        };
      } else {
        return {
          success: result.success,
          message: "Something went wrong.",
        };
      }
    } catch (error) {
      console.error(
        "Reject request error:",
        error.response?.data || error.message
      );

      return {
        success: false,
        message: "Failed to reject request. Please try again.",
      };
    }
  },

  cancelRequest: async (id) => {
    try {
      const res = await axios.patch(`/api/requests/${id}/cancel`, {
        user_id: get().userId,
      });

      set((state) => ({
        requests: state.requests.map((req) =>
          req.id === id ? { ...req, status: res.data.data.status } : req
        ),
      }));

      const result = res?.data;

      if (result.success) {
        return {
          success: result.success,
          message: "Request cancelled successfully.",
        };
      } else {
        return {
          success: result.success,
          message: "Something went wrong.",
        };
      }
    } catch (error) {
      console.error(
        "Cancel request error:",
        error.response?.data || error.message
      );

      return {
        success: false,
        message: "Failed to cancel request. Please try again.",
      };
    }
  },

  markCompleteRequest: async (id) => {
    try {
      const res = await axios.patch(`/api/requests/${id}/complete`, {
        user_id: get().userId,
      });

      set((state) => ({
        requests: state.requests.map((req) =>
          req.id === id ? { ...req, status: res.data.data.status } : req
        ),
      }));

      const result = res?.data;

      if (result.success) {
        return {
          success: result.success,
          message: "Request marked as complete successfully.",
        };
      } else {
        return {
          success: result.success,
          message: "Something went wrong.",
        };
      }
    } catch (error) {
      console.error(
        "Mark complete request error:",
        error.response?.data || error.message
      );

      return {
        success: false,
        message: "Failed to mark request. Please try again.",
      };
    }
  },
}));
