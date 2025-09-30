import Navbar from "@/components/Navbar";
import AdminSettingsBanner from "./AdminSettingsBanner";
import AdminSettingsTable from "./AdminSettingsTable";
import { Box } from "@chakra-ui/react";

const AdminSettingsPage = () => {
  return (
    <>
      <Navbar pageName={"Settings"} />
      <Box
        mt={{ base: "56px", md: "40px" }}
        bg="#f5f5f6"
        minH="100vh"
        p={{ base: 2, md: 8 }}
      >
        <AdminSettingsBanner />
        <AdminSettingsTable />
      </Box>
    </>
  );
};

export default AdminSettingsPage;
