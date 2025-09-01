import { StatCard } from "@/components/cards/StatCard";
import { SimpleGrid } from "@chakra-ui/react";
import { FiBox, FiCheckCircle, FiFileText, FiXCircle } from "react-icons/fi";

const DashboardStats = ({
  totalUserRequest,
  totalApproved,
  totalPending,
  totalRejected,
  loading,
}) => {
  const renderCard = (label, value, icon, loading, text) => (
    <StatCard
      label={label}
      value={value}
      icon={icon}
      loading={loading}
      text={text}
    />
  );

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 4 }}
      spacingX="1.8%"
      spacingY="5%"
      w="100%"
      mx="auto"
      mt={6}
      mb={6}
    >
      {renderCard(
        "Total Requests",
        totalUserRequest,
        FiFileText,
        loading,
        "Total number of requests"
      )}
      {renderCard(
        "Approved",
        totalApproved,
        FiCheckCircle,
        loading,
        "Total number of approved requests"
      )}
      {renderCard(
        "Pending",
        totalPending,
        FiBox,
        loading,
        "Total number of pending requests"
      )}
      {renderCard(
        "Rejected",
        totalRejected,
        FiXCircle,
        loading,
        "Total number of rejected requests"
      )}
    </SimpleGrid>
  );
};

export default DashboardStats;
