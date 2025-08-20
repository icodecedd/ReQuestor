import Navbar from "@/components/Navbar";
import React from "react";
import RequestsBanner from "./RequestsBanner";
import RequestsTable from "./RequestsTable";
import { Box } from "@chakra-ui/react";

const Requests = () => {
  return (
    <>
      <Navbar pageName={"Requests"} />
      <Box pt="64px" bg="#f5f5f6" minH="100vh">
        <RequestsBanner />
        <RequestsTable />
      </Box>
    </>
  );
};

export default Requests;
