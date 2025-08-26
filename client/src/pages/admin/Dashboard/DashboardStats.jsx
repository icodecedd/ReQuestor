import { useStatsStore } from "@/store/statsStore";
import { FiFileText, FiMonitor, FiUser } from "react-icons/fi";
import { StatCard } from "@/components/cards/StatCard";
import { SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";

const DashboardStats = () => {
  const { stats, loading, fetchStats } = useStatsStore();

  const renderCard = (label, value, icon, loading, text) => (
    <StatCard
      label={label}
      value={value}
      icon={icon}
      loading={loading}
      text={text}
    />
  );

  useEffect(() => {
    fetchStats();
  }, [fetchStats]);

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 4 }}
      spacingX="1.8%"
      spacingY="5%"
      w="100%"
      mx="auto"
      mt={6}
    >
      {renderCard(
        "Total Requests",
        stats?.totalRequests,
        FiFileText,
        loading,
        "Total number of requests made"
      )}
      {renderCard(
        "Active Equipment",
        stats?.availableEquipment,
        FiMonitor,
        loading,
        "Number of equipment currently available"
      )}
      {renderCard(
        "Approved Requests",
        stats?.approvedRequests,
        FiUser,
        loading,
        "Number of requests approved"
      )}
      {renderCard(
        "Pending Approvals",
        stats?.pendingApprovals,
        FiFileText,
        loading,
        "Requests waiting for approval"
      )}
    </SimpleGrid>
  );
};

export default DashboardStats;
