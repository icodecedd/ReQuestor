import { Box, Grid, GridItem } from "@chakra-ui/react";
import Navbar from "@/components/Navbar";
import CardStats from "./CardStats";
import HeaderBanner from "./HeaderBanner";
import BarGraph from "./BarGraph";
import PieGraph from "./PieGraph";
import RecentRequests from "./RecentRequests";
import ActivityLogs from "./ActivityLogs";
import QuickActions from "./QuickActions";

// TODO: Requests Overview (Approvals vs Pendings)
// TODO: Equipment by Category (Number of Equipment [projector])
// TODO: Recent Requests
// TODO: Activity Logs or Feed

const OverviewPage = () => {
  return (
    <Box>
      <Navbar pageName={"Overview"} />
      <HeaderBanner />
      <CardStats />
      <Grid
        templateColumns={{
          base: "1fr", // Mobile: single column
          md: "repeat(2, 1fr)", // Tablet: two columns
          lg: "repeat(6, 1fr)", // Desktop: six columns
        }}
        templateRows={{
          base: "repeat(6, auto)", // More rows for stacking on mobile
          md: "repeat(3, auto)",
          lg: "repeat(3, auto)",
        }}
        mx="auto"
        mt={6}
        w="95%"
        gap={6}
      >
        <GridItem colSpan={{ base: 1, md: 2, lg: 4 }}>
          <BarGraph />
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
  );
};

export default OverviewPage;
