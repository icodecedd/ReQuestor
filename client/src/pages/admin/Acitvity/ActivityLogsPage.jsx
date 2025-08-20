import React from "react";
import ActivityBanner from "./ActivityBanner";
import Navbar from "@/components/Navbar";
import ActivityTable from "./ActivityTable";
import { Box } from "@chakra-ui/react";

const ActivityLogsPage = () => {
  return (
    <>
      <Navbar pageName={"Activity Logs"} />
      <Box pt="64px" bg="#f5f5f6" minH="100vh">
      <ActivityBanner />
      <ActivityTable />
      </Box>
    </>
  );
};

export default ActivityLogsPage;
