import Navbar from "@/components/Navbar";
import { Box } from "@chakra-ui/react";
import React from "react";
import RequestsBanner from "./RequestsBanner";
import RequestsTable from "./RequestsTable";

const Requests = () => {
  return (
    <Box>
      <Navbar pageName={"Requests"} />
      <RequestsBanner />
      <RequestsTable />
    </Box>
  );
};

export default Requests;
