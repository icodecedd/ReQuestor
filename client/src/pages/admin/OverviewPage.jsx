import { Box, SimpleGrid } from "@chakra-ui/react";
import Navbar from "../../components/Navbar";
import axios from "axios";
import { useEffect, useState } from "react";
import { FiFileText, FiMonitor, FiUser } from "react-icons/fi";
import StatCard from "../../components/StatCard";

const OverviewPage = () => {
  const [stats, setStats] = useState({
    totalRequests: 0,
    availableEquipment: 0,
    approvedRequests: 0,
    pendingApprovals: 0,
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("http://localhost:5001/api/stats");
        setStats(res.data);
      } catch (error) {
        console.error("Error fetching dashboard stats", error);
      }
    };
    fetchStats();
  }, []); // emptyt [] means run this effect only once

  return (
    <Box>
      <Navbar pageName={"Overview"} />

      {/* Page Content */}
      <SimpleGrid
        columns={{ base: 1, md: 2, lg: 4 }}
        spacingX="20px"
        spacingY="10px"
        w="90%"
        mx="auto"
      >
        <StatCard
          label="Total Requests"
          value={stats.totalRequests}
          icon={FiFileText}
        />
        <StatCard
          label="Active Equipment"
          value={stats.availableEquipment}
          icon={FiMonitor}
        />
        <StatCard
          label="Approved Requests"
          value={stats.approvedRequests}
          icon={FiUser}
        />
        <StatCard
          label="Pending Approvals"
          value={stats.pendingApprovals}
          icon={FiFileText}
        />
      </SimpleGrid>
    </Box>
  );
};

export default OverviewPage;
