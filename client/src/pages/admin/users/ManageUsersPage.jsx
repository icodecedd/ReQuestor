import Navbar from "@/components/Navbar";
import UsersBanner from "./UsersBanner";
import UsersTable from "./UsersTable";
import { Box } from "@chakra-ui/react";

const ManageUsersPage = () => {
  return (
    <>
      <Navbar pageName={"Manage Users"} />
      <Box
        mt={{ base: "56px", md: "40px" }}
        bg="#f5f5f6"
        minH="100vh"
        p={{ base: 2, md: 8 }}
      >
        <UsersBanner />
        <UsersTable />
      </Box>
    </>
  );
};

export default ManageUsersPage;
