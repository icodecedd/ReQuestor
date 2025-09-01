import { Box, Grid, GridItem } from "@chakra-ui/react";
import MaintenanceBanner from "@/components/MaintenanceBanner";
import Navbar from "@/components/Navbar";
import DashboardStats from "./DashboardStats";
import DashboardBanner from "./DashboardBanner";
import LineGraph from "./LineGraph";
import PieGraph from "./PieGraph";
import RecentRequests from "./RecentRequests";
import ActivityLogs from "./ActivityLogs";
import QuickActions from "./QuickActions";

const DashboardPage = () => {
  return (
    <>
      <Navbar pageName={"Overview"} />
      <Box
        mt={{ base: "56px", md: "40px" }}
        bg="#f5f5f6"
        minH="100vh"
        p={{ base: 2, md: 8 }}
      >
        {/* Banners and Stats */}
        <MaintenanceBanner />
        <DashboardBanner />
        <DashboardStats />
        <Grid
          templateColumns={{
            base: "1fr", // Mobile: single column
            md: "repeat(2, 1fr)", // Tablet: two columns
            lg: "repeat(6, 1fr)", // Desktop: six columns
          }}
          templateRows={{
            base: "repeat(6, auto)",
            md: "repeat(3, auto)",
            lg: "repeat(3, auto)",
          }}
          mx="auto"
          mt={6}
          w="100%"
          gap={6}
        >
          <GridItem colSpan={{ base: 1, md: 2, lg: 4 }}>
            <LineGraph />
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2, lg: 2 }}>
            <PieGraph />
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2, lg: 4 }}>
            <QuickActions />
          </GridItem>
          <GridItem
            rowSpan={{ base: 1, md: 2, lg: 2 }}
            colSpan={{ base: 1, md: 2, lg: 2 }}
          >
            <ActivityLogs />
          </GridItem>
          <GridItem colSpan={{ base: 1, md: 2, lg: 4 }}>
            <RecentRequests />
          </GridItem>
        </Grid>
      </Box>
    </>
  );
};

export default DashboardPage;
