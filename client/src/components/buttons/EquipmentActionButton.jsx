import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import {
  FiEdit,
  FiEye,
  FiTrash,
  FiMoreHorizontal,
} from "react-icons/fi";

const hoverStyle = {
  bg: "#f7eaea",
  borderRadius: "lg",
};

const EquipmentActionButton = ({
  onEdit,
  onViewDetails,
  onDelete,
}) => {

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
    <Menu autoSelect={false}>
      <MenuButton
        as={IconButton}
        icon={<FiMoreHorizontal />}
        variant={"ghost"}
        _hover={{ bg: "#f7eaea" }}
        _active={{ bg: "#f7eaea" }}
        aria-label="Equipment actions"
      />
      <MenuList minW="170px" p={1}>
        {actions.map(({ key, icon, label, onClick }) => (
          <MenuItem
            key={key}
            onClick={onClick}
            gap={2}
            borderRadius="lg"
            w="160px"
            _hover={hoverStyle}
          >
            {icon} {label}
          </MenuItem>
        ))}
      </MenuList>
    </Menu>
  );
};

export default EquipmentActionButton;
