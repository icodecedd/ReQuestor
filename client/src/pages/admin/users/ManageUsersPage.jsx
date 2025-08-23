import Navbar from "@/components/Navbar";
import UsersBanner from "./UsersBanner";
import UsersTable from "./UsersTable";
import { Box } from "@chakra-ui/react";

const ManageUsersPage = () => {
  return (
    <>
      <Navbar pageName={"Manage Users"} />
      <Box pt="64px" bg="#f5f5f6" minH="100vh">
        <UsersBanner />
        <UsersTable />
      </Box>
    </>
  );
};

export default ManageUsersPage;
