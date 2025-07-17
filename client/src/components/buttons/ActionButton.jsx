import {
  Menu,
  MenuList,
  MenuButton,
  MenuItem,
  IconButton,
} from "@chakra-ui/react";
import {
  FiMoreVertical,
  FiEdit,
  FiKey,
  FiUserX,
  FiUserCheck,
  FiTrash,
} from "react-icons/fi";

const hoverStyle = {
  bg: "#f7eaea",
  borderRadius: "lg",
};

const ActionButton = ({
  status,
  onEdit,
  onResetPassword,
  onToggleStatus,
  onDelete,
}) => {
  const isActive = status === "Active";

  const actions = [
    {
      key: "edit",
      icon: <FiEdit />,
      label: "Edit",
      onClick: onEdit,
    },
    {
      key: "reset",
      icon: <FiKey />,
      label: "Reset Password",
      onClick: onResetPassword,
    },
    {
      key: "toggle",
      icon: isActive ? <FiUserX /> : <FiUserCheck />,
      label: isActive ? "Deactivate" : "Activate",
      onClick: onToggleStatus,
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
        icon={<FiMoreVertical />}
        _hover={{ bg: "#f7eaea" }}
        aria-label="User actions"
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

export default ActionButton;
