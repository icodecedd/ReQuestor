import {
  IconButton,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Box,
  Text,
} from "@chakra-ui/react";
import {
  FiEdit,
  FiKey,
  FiUserX,
  FiUserCheck,
  FiTrash,
  FiMoreVertical,
} from "react-icons/fi";

// Color constants
const MAROON = "#800000";
const MAROON_XLIGHT = "#f7eaea";
const ERROR_RED = "#E53E3E";
const WARNING_ORANGE = "#DD6B20";
const SUCCESS_GREEN = "#38A169";
const RADIUS = "8px";
const ICON_SIZE = "18px";

const UserActionButton = ({
  status,
  onEdit,
  onResetPassword,
  onToggleStatus,
  onDelete,
}) => {
  const isActive = status === "Active";
  const menuBg = "white";
  const menuBorder = "gray.200";
  const hoverBg = "#f5f5f5";

  // Action definitions with consistent icon styling
  const actionDefinitions = {
    edit: {
      icon: <Icon as={FiEdit} boxSize={ICON_SIZE} />,
      label: "Edit User",
      onClick: onEdit,
      color: "gray.700",
    },
    reset: {
      icon: <Icon as={FiKey} boxSize={ICON_SIZE} />,
      label: "Reset Password",
      onClick: onResetPassword,
      color: "gray.700",
    },
    toggle: {
      icon: isActive ? (
        <Icon as={FiUserX} boxSize={ICON_SIZE} color={WARNING_ORANGE} />
      ) : (
        <Icon as={FiUserCheck} boxSize={ICON_SIZE} color={SUCCESS_GREEN} />
      ),
      label: isActive ? "Deactivate User" : "Activate User",
      onClick: onToggleStatus,
      color: isActive ? WARNING_ORANGE : SUCCESS_GREEN,
    },
    delete: {
      icon: <Icon as={FiTrash} boxSize={ICON_SIZE} color={ERROR_RED} />,
      label: "Delete User",
      onClick: onDelete,
      color: ERROR_RED,
      hoverColor: MAROON_XLIGHT,
    },
  };

  const actions = [
    actionDefinitions.reset,
    actionDefinitions.toggle,
    actionDefinitions.delete,
  ];

  return (
    <Flex gap={2} justify="center">
      {/* Always visible view button */}
      <IconButton
        icon={<Icon as={FiEdit} boxSize={4} />}
        aria-label="Edit user"
        onClick={onEdit}
        size="sm"
        variant="ghost"
        borderRadius={RADIUS}
        color={MAROON}
        _hover={{
          bg: MAROON_XLIGHT,
          transform: "translateY(-1px)",
        }}
        _active={{
          bg: MAROON_XLIGHT,
        }}
        transition="all 0.2s ease"
      />

      <Menu autoSelect={false} placement="bottom-end">
        <MenuButton
          as={IconButton}
          icon={<Icon as={FiMoreVertical} boxSize={5} />}
          aria-label="User actions"
          size="sm"
          variant="ghost"
          borderRadius={RADIUS}
          color={MAROON}
          _hover={{
            bg: MAROON_XLIGHT,
            transform: "translateY(-1px)",
          }}
          _active={{
            bg: MAROON_XLIGHT,
          }}
        />

        <MenuList
          minW="180px"
          p={1}
          bg={menuBg}
          borderColor={menuBorder}
          boxShadow="md"
          borderRadius={RADIUS}
          zIndex="dropdown"
        >
          {actions.map((action) => (
            <MenuItem
              key={action.label}
              onClick={action.onClick}
              icon={<Box boxSize={5}>{action.icon}</Box>}
              py={2}
              px={3}
              borderRadius={RADIUS}
              _hover={{
                bg: action.hoverColor || hoverBg,
              }}
              _focus={{
                bg: action.hoverColor || hoverBg,
              }}
            >
              <Text fontSize="sm" fontWeight="medium" color={action.color}>
                {action.label}
              </Text>
            </MenuItem>
          ))}
        </MenuList>
      </Menu>
    </Flex>
  );
};

export default UserActionButton;
