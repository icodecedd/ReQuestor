import Navbar from "@/components/Navbar";
import EquipmentBanner from "./EquipmentBanner";
import EquipmentStats from "./EquipmentStats";
import EquipmentTable from "./EquipmentTable";
import { Box } from "@chakra-ui/react";

const Equipments = () => {
  return (
    <>
      <Navbar pageName={"Equipment"} />
      <Box
        mt={{ base: "56px", md: "40px" }}
        bg="#f5f5f6"
        minH="100vh"
        p={{ base: 2, md: 8 }}
      >
        <EquipmentBanner />
        <EquipmentStats />
        <EquipmentTable />
      </Box>
    </>
  );
};

export default Equipments;
