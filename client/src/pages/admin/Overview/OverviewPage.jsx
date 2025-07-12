import { Box } from "@chakra-ui/react";
import Navbar from "../../../components/Navbar";
import OverviewStats from "./OverviewStats";
import OverviewBanner from "./OverviewBanner";

// TODO: Requests Overview (Approvals vs Pendings)
// TODO: Equipment by Category (Number of Equipment [projector])
// TODO: Recent Requests
// TODO: Activity Logs or Feed
// TODO: Optional: Top Equipment

const OverviewPage = () => {
  return (
    <Box>
      <Navbar pageName={"Overview"} />
      <OverviewBanner />
      <OverviewStats />
    </Box>
  );
};

export default OverviewPage;
