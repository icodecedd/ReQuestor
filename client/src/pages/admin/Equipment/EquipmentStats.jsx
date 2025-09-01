import { StatCard } from "@/components/cards/StatCard";
import { useEquipmentStore } from "@/store/equipmentStore";
import { SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { FiBox, FiCheckCircle, FiXCircle, FiPieChart } from "react-icons/fi";

const EquipmentStats = () => {
  const { stats, loading, fetchEquipment } = useEquipmentStore();
  const {
    totalEquipment,
    totalAvailable,
    totalUnavailable,
    utilizationPercentage,
  } = stats();

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

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
    >
      {renderCard(
        "Total Equipment",
        totalEquipment,
        FiBox,
        loading,
        "Total number of equipment managed"
      )}
      {renderCard(
        "Total Available",
        totalAvailable,
        FiCheckCircle,
        loading,
        "Total number of equipment available"
      )}
      {renderCard(
        "Total Unavailable",
        totalUnavailable,
        FiXCircle,
        loading,
        "Total number of equipment unavailable"
      )}
      {renderCard(
        "Equipment Usage %",
        utilizationPercentage + "%",
        FiPieChart,
        loading,
        "Percentage of equipment unavailable"
      )}
    </SimpleGrid>
  );
};

export default EquipmentStats;
