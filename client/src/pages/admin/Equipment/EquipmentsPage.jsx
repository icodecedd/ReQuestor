import Navbar from "@/components/Navbar"
import { Box } from "@chakra-ui/react"
import EquipmentBanner from "./EquipmentBanner"
import EquipmentStats from "./EquipmentStats"

const Equipments = () => {
  return (
    <Box>
      <Navbar pageName={"Equipment"} />
      <EquipmentBanner />
      <EquipmentStats />
    </Box>
  )
}

export default Equipments