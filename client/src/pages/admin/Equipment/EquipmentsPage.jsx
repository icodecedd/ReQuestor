import Navbar from "@/components/Navbar"
import { Box } from "@chakra-ui/react"
import EquipmentBanner from "./EquipmentBanner"
import EquipmentStats from "./EquipmentStats"
import EquipmentTable from "./EquipmentTable"

const Equipments = () => {
  return (
    <Box>
      <Navbar pageName={"Equipment"} />
      <EquipmentBanner />
      <EquipmentStats />
      <EquipmentTable />
    </Box>
  )
}

export default Equipments