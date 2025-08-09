import React from "react";
import ActivityBanner from "./ActivityBanner";
import Navbar from "@/components/Navbar";
import ActivityTable from "./ActivityTable";

const ActivityLogsPage = () => {
  return (
    <>
      <Navbar pageName={"Activity Logs"} />
      <ActivityBanner />
      <ActivityTable />
    </>
  );
};

export default ActivityLogsPage;
