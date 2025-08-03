import Navbar from "@/components/Navbar";
import { Box } from "@chakra-ui/react";
import UsersBanner from "./UsersBanner";
import UsersTable from "./UsersTable";

const ManageUsersPage = () => {
  return (
    <Box>
      <Navbar pageName={"Manage Users"} />
      <UsersBanner />
      <UsersTable />
    </Box>
  );
};

export default ManageUsersPage;
