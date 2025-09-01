import MaintenanceBanner from "@/components/MaintenanceBanner";
import Navbar from "@/components/Navbar";
import { Box } from "@chakra-ui/react";
import DashboardBanner from "./DashboardBanner";
import DashboardStats from "./DashboardStats";
import { ScheduleXCalendar, useCalendarApp } from "@schedule-x/react";
import {
  createViewMonthAgenda,
  createViewMonthGrid,
} from "@schedule-x/calendar";
import "temporal-polyfill/global";
import "@schedule-x/theme-shadcn/dist/index.css";
import "@schedule-x/theme-default/dist/index.css";
import { createEventModalPlugin } from "@schedule-x/event-modal";
import { useRequestsStore } from "@/store/requestsStore";
import { useEffect } from "react";
import { getDateOnly } from "@/utils/getDate";

const formatRequestsId = (id) => {
  return `REQ-${String(id).padStart(3, "0")}`;
};

const formatTitle = (status) => {
  switch (status) {
    case "Pending":
      return "Pending Request";
    case "Reserved":
      return "Approved Request";
    case "Rejected":
      return "Rejected Request";
    case "Cancelled":
      return "Cancelled Request";
    default:
      return "Unknown Status";
  }
};

const DashboardPage = () => {
  const { userRequest, loading, fetchRequests } = useRequestsStore();

  const {
    requestByUser,
    totalUserRequest,
    totalApproved,
    totalPending,
    totalRejected,
  } = userRequest();

  useEffect(() => {
    fetchRequests();
  }, [fetchRequests]);

  // Define the views for base and md breakpoints
  const views = {
    base: createViewMonthAgenda(),
    md: createViewMonthGrid(),
  };

  console.log("Request by user", requestByUser);

  // Define the calendar events from the requests
  const requests = requestByUser.map((request) => ({
    id: formatRequestsId(request.id),
    title: formatTitle(request.status),
    start: Temporal.PlainDate.from(getDateOnly(request.date_use)),
    end: Temporal.PlainDate.from(getDateOnly(request.date_use)),
    description: request.purpose,
    status: request.status,
  }));

  // Initialize the calendar with both views
  const calendar = useCalendarApp({
    views: [views.base, views.md],
    events: requests,
    plugins: [createEventModalPlugin()],
    theme: "shadcn",
  });

  return (
    <>
      <Navbar pageName={"Overview"} />
      <Box
        mt={{ base: "56px", md: "40px" }}
        bg="#f5f5f6"
        minH="100vh"
        p={{ base: 2, md: 8 }}
      >
        <MaintenanceBanner />
        <DashboardBanner />
        <DashboardStats
          totalUserRequest={totalUserRequest}
          totalApproved={totalApproved}
          totalPending={totalPending}
          totalRejected={totalRejected}
          loading={loading}
        />
        <ScheduleXCalendar calendarApp={calendar} />
      </Box>
    </>
  );
};

export default DashboardPage;
