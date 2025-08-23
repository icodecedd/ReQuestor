import { Box } from "@chakra-ui/react";
import MyProfileBanner from "./MyProfileBanner";
import Navbar from "@/components/Navbar";
import MyProfileTabs from "./MyProfileTabs";

const MyProfilePage = () => {
  return (
    <>
      <Navbar pageName={"My Profile"} />
      <Box
        mt={{ base: "56px", md: "40px" }}
        bg="#f5f5f6"
        minH="100vh"
        p={{ base: 2, md: 8 }}
      >
        <MyProfileBanner />
        <MyProfileTabs />
      </Box>
    </>
  );
};

export default MyProfilePage;
