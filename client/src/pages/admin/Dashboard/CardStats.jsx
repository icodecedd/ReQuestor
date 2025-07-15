import { useStats } from "@/hooks/useStatistics";
import { FiFileText, FiMonitor, FiUser } from "react-icons/fi";
import StatCard from "@/components/StatCard";
import { SimpleGrid } from "@chakra-ui/react";

const OverviewStats = () => {
  const { data, loading } = useStats();

  const renderCard = (label, value, icon, loading) => (
    <StatCard label={label} value={value} icon={icon} loading={loading} />
  );

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 4 }}
      spacingX="20px"
      spacingY="10px"
      w="95%"
      mx="auto"
      mt={6}
    >
      {renderCard("Total Requests", data?.totalRequests, FiFileText, loading)}
      {renderCard(
        "Active Equipment",
        data?.availableEquipment,
        FiMonitor,
        loading
      )}
      {renderCard("Approved Requests", data?.approvedRequests, FiUser, loading)}
      {renderCard(
        "Pending Approvals",
        data?.pendingApprovals,
        FiFileText,
        loading
      )}
    </SimpleGrid>
  );
};

export default OverviewStats;
