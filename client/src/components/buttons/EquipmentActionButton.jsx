import { IconButton, Flex, Tooltip } from "@chakra-ui/react";
import { FiEdit, FiEye, FiTrash } from "react-icons/fi";

const EquipmentActionButton = ({ onEdit, onViewDetails, onDelete }) => {
  const actions = [
    {
      key: "edit",
      icon: <FiEdit />,
      label: "Edit",
      onClick: onEdit,
    },
    {
      key: "view",
      icon: <FiEye />,
      label: "View Details",
      onClick: onViewDetails,
    },
    {
      key: "delete",
      icon: <FiTrash />,
      label: "Delete",
      onClick: onDelete,
    },
  ];

  return (
    <Flex gap={2} w="full" justify="center">
      {actions.map(({ key, label, icon, onClick }) => (
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
            colorScheme={key === "delete" ? "red" : "gray"}
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

export default EquipmentActionButton;
