import { useStatsStore } from "@/store/statsStore";
import { FiFileText, FiMonitor, FiUser } from "react-icons/fi";
import StatCard from "@/components/StatCard";
import { SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";

const DashboardStats = () => {
  const { stats, loading, fetchStats } = useStatsStore();

  const renderCard = (label, value, icon, loading) => (
    <StatCard label={label} value={value} icon={icon} loading={loading} />
  );

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 4 }}
      spacingX="1.8%"
      spacingY="5%"
      w="95%"
      mx="auto"
      mt={6}
    >
      {renderCard("Total Requests", stats?.totalRequests, FiFileText, loading)}
      {renderCard(
        "Active Equipment",
        stats?.availableEquipment,
        FiMonitor,
        loading
      )}
      {renderCard(
        "Approved Requests",
        stats?.approvedRequests,
        FiUser,
        loading
      )}
      {renderCard(
        "Pending Approvals",
        stats?.pendingApprovals,
        FiFileText,
        loading
      )}
    </SimpleGrid>
  );
};

export default DashboardStats;
