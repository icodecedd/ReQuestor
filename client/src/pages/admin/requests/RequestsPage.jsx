import Navbar from "@/components/Navbar";
import React from "react";
import RequestsBanner from "./RequestsBanner";
import RequestsTable from "./RequestsTable";
import { Box } from "@chakra-ui/react";

const Requests = () => {
  return (
    <>
      <Navbar pageName={"Requests"} />
      <Box
        mt={{ base: "56px", md: "40px" }}
        bg="#f5f5f6"
        minH="100vh"
        p={{ base: 2, md: 8 }}
      >
        <RequestsBanner />
        <RequestsTable />
      </Box>
    </>
  );
};

export default Requests;
