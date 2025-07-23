import StatCard from "@/components/cards/StatCard";
import { useEquipmentStore } from "@/store/equipmentStore";
import { SimpleGrid } from "@chakra-ui/react";
import { useEffect } from "react";
import { FiBox, FiCheckCircle, FiMonitor, FiPieChart } from "react-icons/fi";

const EquipmentStats = () => {
  const { stats, loading, fetchEquipment } = useEquipmentStore();
  const { totalEquipment, totalAvailable, totalInUse, utilizationPercentage} = stats()

  const renderCard = (label, value, icon, loading) => (
    <StatCard label={label} value={value} icon={icon} loading={loading} />
  );

  useEffect(() => {
    fetchEquipment();
  }, [fetchEquipment]);

  return (
    <SimpleGrid
      columns={{ base: 1, md: 2, lg: 4 }}
      spacingX="1.8%"
      spacingY="5%"
      w="95%"
      mx="auto"
      mt={6}
    >
      {renderCard("Total Equipment", totalEquipment, FiBox, loading)}
      {renderCard(
        "Total Available",
        totalAvailable,
        FiCheckCircle,
        loading
      )}
      {renderCard("Total In Use", totalInUse, FiMonitor, loading)}
      {renderCard(
        "Equipment Usage %",
        utilizationPercentage + "%",
        FiPieChart,
        loading
      )}
    </SimpleGrid>
  );
};

export default EquipmentStats;
