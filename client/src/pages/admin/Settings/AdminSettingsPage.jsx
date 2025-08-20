import Navbar from "@/components/Navbar";
import AdminSettingsBanner from "./AdminSettingsBanner";
import AdminSettingsTable from "./AdminSettingsTable";
import { Box } from "@chakra-ui/react";

const AdminSettingsPage = () => {
  return (
    <>
      <Navbar pageName={"Settings"} />
      <Box pt="64px" bg="#f5f5f6" minH="100vh">
        <AdminSettingsBanner />
        <AdminSettingsTable />
      </Box>
    </>
  );
};

export default AdminSettingsPage;
