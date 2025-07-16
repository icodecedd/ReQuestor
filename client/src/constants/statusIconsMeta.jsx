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

export const statusMeta = {
  approved: {
    icon: <FiCheckCircle color="white" />,
    bg: "green.500",
  },
  denied: {
    icon: <FiXCircle color="white" />,
    bg: "red.500",
  },
  created: {
    icon: <FiPlusCircle color="white" />,
    bg: "blue.500",
  },
  returned: {
    icon: <FiCornerDownLeft color="white" />,
    bg: "teal.500",
  },
  cancelled: {
    icon: <FiSlash color="white" />,
    bg: "gray.500",
  },
  updated: {
    icon: <FiArrowUpCircle color="white" />,
    bg: "orange.400",
  },
  deleted: {
    icon: <FiTrash2 color="white" />,
    bg: "red.600",
  },
  status_changed: {
    icon: <FiRefreshCw color="white" />,
    bg: "purple.500",
  },
  default: {
    icon: <FiInfo color="white" />,
    bg: "gray.400",
  },
};

// Optional utility for accessing with fallback:
export const getStatusIconStyle = (status) =>
  statusMeta[status?.toLowerCase()] || statusMeta.default;
