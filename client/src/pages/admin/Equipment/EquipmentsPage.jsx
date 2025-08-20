import Navbar from "@/components/Navbar";
import EquipmentBanner from "./EquipmentBanner";
import EquipmentStats from "./EquipmentStats";
import EquipmentTable from "./EquipmentTable";
import { Box } from "@chakra-ui/react";

const Equipments = () => {
  return (
    <>
      <Navbar pageName={"Equipment"} />
      <Box pt="64px" bg="#f5f5f6" minH="100vh">
        <EquipmentBanner />
        <EquipmentStats />
        <EquipmentTable />
      </Box>
    </>
  );
};

export default Equipments;
