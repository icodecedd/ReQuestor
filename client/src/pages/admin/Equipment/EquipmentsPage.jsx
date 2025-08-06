import Navbar from "@/components/Navbar";
import EquipmentBanner from "./EquipmentBanner";
import EquipmentStats from "./EquipmentStats";
import EquipmentTable from "./EquipmentTable";

const Equipments = () => {
  return (
    <>
      <Navbar pageName={"Equipment"} />
      <EquipmentBanner />
      <EquipmentStats />
      <EquipmentTable />
    </>
  );
};

export default Equipments;
