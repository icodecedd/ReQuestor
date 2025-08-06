import Navbar from "@/components/Navbar";
import React from "react";
import RequestsBanner from "./RequestsBanner";
import RequestsTable from "./RequestsTable";

const Requests = () => {
  return (
    <>
      <Navbar pageName={"Requests"} />
      <RequestsBanner />
      <RequestsTable />
    </>
  );
};

export default Requests;
