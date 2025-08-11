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
import { FaEye } from "react-icons/fa";
import { FiEdit, FiTrash, FiMoreVertical, FiEye } from "react-icons/fi";

// Color constants
const MAROON = "#800000";
const MAROON_XLIGHT = "#f5e8e8";
const ERROR_RED = "#E53E3E";
const RADIUS = "8px";
const ICON_SIZE = "18px";

const EquipmentActionButton = ({ onEdit, onViewDetails, onDelete }) => {
  const menuBg = "white";
  const menuBorder = "gray.200";
  const hoverBg = MAROON_XLIGHT;

  // Action definitions with consistent icon styling
  const actionDefinitions = {
    view: {
      icon: <Icon as={FiEye} boxSize={ICON_SIZE} />,
      label: "View Details",
      onClick: onViewDetails,
      color: "gray.700",
    },
    edit: {
      icon: <Icon as={FiEdit} boxSize={"17px"} />,
      label: "Edit Equipment",
      onClick: onEdit,
      color: "gray.700",
    },
    delete: {
      icon: <Icon as={FiTrash} boxSize={ICON_SIZE} color={ERROR_RED} />,
      label: "Delete Equipment",
      onClick: onDelete,
      color: ERROR_RED,
    },
  };

  const actions = [actionDefinitions.edit, actionDefinitions.delete];

  return (
    <Flex gap={2} justify="center">
      {/* Always visible view button */}
      <IconButton
        icon={<Icon as={FaEye} boxSize={4} />}
        aria-label="View details"
        onClick={onViewDetails}
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
          p={2}
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
                bg: hoverBg,
              }}
              _focus={{
                bg: hoverBg,
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

export default EquipmentActionButton;
