import { Box, Grid, GridItem } from "@chakra-ui/react";
import Navbar from "../../../components/Navbar";
import CardStats from "./CardStats";
import HeaderBanner from "./HeaderBanner";
import BarGraph from "./BarGraph";
import PieGraph from "./PieGraph";
import RecentRequests from "./RecentRequests";
import ActivityLogs from "./ActivityLogs";

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
        templateColumns="repeat(6, 1fr)"
        templateRows="repeat(3, auto)"
        mx="auto"
        mt={6}
        w="95%"
        gap={6}
      >
        <GridItem colSpan={4}>
          <BarGraph />
        </GridItem>
        <GridItem colSpan={2}>
          <PieGraph />
        </GridItem>
        <GridItem colSpan={4}>
          <RecentRequests />
        </GridItem>
        <GridItem rowSpan={2} colSpan={2}>
          <ActivityLogs />
        </GridItem>
      </Grid>
    </Box>
  );
};

export default OverviewPage;
