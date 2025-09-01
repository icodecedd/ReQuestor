import SidebarProvider from "@/context/SidebarProvider";
import StudentLayout from "@/layouts/StudentLayout";
import MyProfilePage from "@/pages/profile/MyProfilePage";
import DashboardPage from "@/pages/user/dashboard/DashboardPage";
import React from "react";
import { Navigate, Route, Routes } from "react-router-dom";

const StudentRoutes = () => {
  return (
    <SidebarProvider>
      <Routes>
        <Route path="/" element={<StudentLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="dashboard" element={<DashboardPage />} />
          <Route path="profile" element={<MyProfilePage />} />
        </Route>

        <Route
          path="*"
          element={<Navigate to="/student/dashboard" replace />}
        />
      </Routes>
    </SidebarProvider>
  );
};

export default StudentRoutes;
