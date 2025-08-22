import { Box } from "@chakra-ui/react"
import MyProfileBanner from "./MyProfileBanner"
import Navbar from "@/components/Navbar"
import MyProfileTabs from "./MyProfileTabs"


const MyProfilePage = () => {
  return (
    <>
    <Navbar pageName={"My Profile"} />
    <Box pt="64px" bg="#f5f5f6" minH="100vh">
    <MyProfileBanner />
    <MyProfileTabs />
    </Box>
    </>
  )
}

export default MyProfilePage