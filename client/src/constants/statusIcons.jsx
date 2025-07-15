import {
  FiCheckCircle,
  FiXCircle,
  FiPlusCircle,
  FiTrash2,
  FiRefreshCw,
  FiCornerDownLeft,
  FiSlash,
  FiArrowUpCircle,
  FiInfo,
} from "react-icons/fi";

export function getStatusIconStyle(status) {
  const normalized = status?.toLowerCase();

  switch (normalized) {
    case "approved":
      return {
        icon: <FiCheckCircle color="white" />,
        bg: "green.500",
      };
    case "denied":
      return {
        icon: <FiXCircle color="white" />,
        bg: "red.500",
      };
    case "created":
      return {
        icon: <FiPlusCircle color="white" />,
        bg: "blue.500",
      };
    case "returned":
      return {
        icon: <FiCornerDownLeft color="white" />,
        bg: "teal.500",
      };
    case "cancelled":
      return {
        icon: <FiSlash color="white" />,
        bg: "gray.500",
      };
    case "updated":
      return {
        icon: <FiArrowUpCircle color="white" />,
        bg: "orange.400",
      };
    case "deleted":
      return {
        icon: <FiTrash2 color="white" />,
        bg: "red.600",
      };
    case "status_changed":
      return {
        icon: <FiRefreshCw color="white" />,
        bg: "purple.500",
      };
    default:
      return {
        icon: <FiInfo color="white" />, // fallback for unknown
        bg: "gray.400",
      };
  }
}