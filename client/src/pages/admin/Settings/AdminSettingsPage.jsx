import Navbar from "@/components/Navbar";
import AdminSettingsBanner from "./AdminSettingsBanner";
import AdminSettingsTable from "./AdminSettingsTable";

const AdminSettingsPage = () => {
  return (
    <>
      <Navbar pageName={"Settings"} />
      <AdminSettingsBanner />
      <AdminSettingsTable />
    </>
  );
};

export default AdminSettingsPage;
