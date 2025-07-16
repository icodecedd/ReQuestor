import Navbar from "@/components/Navbar";
import { Box } from "@chakra-ui/react";
import ManageUsersBanner from "./UsersBanner";
import UsersTable from "./UsersTable";

const ManageUsersPage = () => {
  return (
    <Box>
      <Navbar pageName={"Manage Users"} />
      <ManageUsersBanner />
      <UsersTable />
    </Box>
  );
};

export default ManageUsersPage;
