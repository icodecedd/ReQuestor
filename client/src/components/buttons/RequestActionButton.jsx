import { IconButton, Tooltip, Flex } from "@chakra-ui/react";
import { FiEye } from "react-icons/fi";
import { HiCheckCircle } from "react-icons/hi";
import { RiCloseCircleLine } from "react-icons/ri";

const RequestActionButton = ({
  status,
  onMarkComplete,
  onViewDetails,
  onCancel,
}) => {
  const getAvailableActions = (status) => {
    const actions = [];

    if (
      ["Pending", "Reserved", "Rejected", "Completed", "Cancelled"].includes(
        status
      )
    ) {
      actions.push({
        key: "view",
        icon: <FiEye />,
        label: "View Details",
        onClick: onViewDetails,
      });
    }

    if (["In Use"].includes(status)) {
      actions.push({
        key: "complete",
        icon: <HiCheckCircle color="#16a34a" />,
        label: "Mark Complete",
        onClick: onMarkComplete,
      });
    }

    if (["Pending", "Reserved"].includes(status)) {
      actions.push({
        key: "cancel",
        icon: <RiCloseCircleLine color="#dc2626" />,
        label: "Cancel",
        onClick: onCancel,
      });
    }

    return actions;
  };

  return (
    <Flex gap={2} w="full" justify="center">
      {getAvailableActions(status).map(({ key, label, icon, onClick }) => (
        <Tooltip
          key={key}
          label={label}
          placement="bottom"
          borderRadius="lg"
          px={3}
          py={2}
          bg="#800000"
          color="white"
          fontSize="sm"
          fontWeight="medium"
          boxShadow="lg"
          openDelay={200}
        >
          <IconButton
            icon={icon}
            aria-label={label}
            onClick={onClick}
            size="sm"
            rounded="lg"
            variant="outline"
            colorScheme={
              key === "complete" ? "green" : key === "cancel" ? "red" : "gray"
            }
            _hover={{
              boxShadow: "md",
              transform: "translateY(-2px)",
            }}
            transition="all 0.2s ease"
          />
        </Tooltip>
      ))}
    </Flex>
  );
};

export default RequestActionButton;
