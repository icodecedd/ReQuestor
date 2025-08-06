import Navbar from "@/components/Navbar";
import UsersBanner from "./UsersBanner";
import UsersTable from "./UsersTable";

const ManageUsersPage = () => {
  return (
    <>
      <Navbar pageName={"Manage Users"} />
      <UsersBanner />
      <UsersTable />
    </>
  );
};

export default ManageUsersPage;
