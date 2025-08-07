import { create } from "zustand";
import axios from "axios";
import { toTitleCase } from "@/utils/toTitleCase";

export const useRequestsStore = create((set, get) => ({
  requests: [],
  loading: false,
  error: null,

  fetchRequests: async () => {
    set({ loading: true, error: null });

    try {
      const res = await axios.get("/api/requests");
      set({ requests: res.data.data, loading: false });
      console.log(res.data.data);
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

    // Apply the requirement for request of at least 3 days in advance
    const dateNow = new Date();
    const dateUse = new Date(date_use);

    dateNow.setHours(0, 0, 0, 0);
    dateUse.setHours(0, 0, 0, 0);

    const dayDiff = (dateUse - dateNow) / (1000 * 60 * 60 * 24);

    if (dayDiff < 3) {
      return {
        success: false,
        message:
          "You must request equipment at least 3 days before the intended use.",
        target: "date_use",
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
        available: res.data.available,
      };
    } catch (error) {
      return {
        success: false,
        message:
          error.response?.data?.message ||
          "Failed to check availability. Please try again.",
        available: error.response?.data?.available || [],
        unavailable: error.response?.data?.unavailable || [],
      };
    }
  },

  addRequest: async (newRequest) => {
    const name = newRequest.username?.trim() || "";
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
      !username ||
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
        username,
        course_section,
        faculty_in_charge,
        equipment_list,
        date_use,
        time_from,
        time_to,
        purpose,
      };

      const res = await axios.post("/api/requests", requestPayload);
      set((state) => ({
        requests: [res.data.data, ...state.requests],
      }));
      return {
        success: true,
        message: "New request added successfully.",
      };
    } catch (error) {
      console.error(
        "Add request error:",
        error.response?.data || error.message
      );

      return {
        success: false,
        message: "Failed to add request. Please try again.",
      };
    }
  },

  cancelRequest: async (id) => {
    try {
      const res = await axios.patch(`/api/requests/${id}/cancel`);

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

  updateRequestStatus: async (id, status) => {
    try {
      const res = await axios.patch(`/api/requests/${id}/set-status`, status);

      set((state) => ({
        requests: state.requests.map((req) =>
          req.id === id ? { ...req, status: res.data.data.status } : req
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
        "Update request's status error:",
        error.response?.data || error.message
      );

      return {
        success: false,
        message: "Failed to update request's status. Please try again.",
      };
    }
  },
}));
