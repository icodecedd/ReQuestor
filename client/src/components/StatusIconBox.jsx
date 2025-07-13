import { Box } from "@chakra-ui/react";
import { FiCheckCircle, FiClock, FiXCircle } from "react-icons/fi";

const getStatusStyle = (status) => {
  switch (status) {
    case "Approved":
      return {
        icon: <FiCheckCircle color="white" />,
        bg: "green.500",
      };
    case "Pending":
      return {
        icon: <FiClock color="white" />,
        bg: "yellow.400",
      };
    case "Rejected":
      return {
        icon: <FiXCircle color="white" />,
        bg: "red.500",
      };
    default:
      return {
        icon: <FiClock color="white" />,
        bg: "gray.400",
      };
  }
};

const StatusIconBox = ({ status }) => {
  const { icon, bg } = getStatusStyle(status);

  return (
    <Box
      bg={bg}
      borderRadius="md"
      p={2}
      display="flex"
      alignItems="center"
      justifyContent="center"
      w="35px"
      h="35px"
    >
      {icon}
    </Box>
  );
};

export default StatusIconBox;
