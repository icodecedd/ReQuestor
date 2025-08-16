import {
  IconButton,
  Flex,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Icon,
  Text,
} from "@chakra-ui/react";
import { FaEye } from "react-icons/fa";
import { FiEye, FiMoreHorizontal, FiXCircle } from "react-icons/fi";
import { MdCheckCircleOutline } from "react-icons/md";
import { TbCancel, TbChecklist } from "react-icons/tb";

// Color constants
const MAROON = "#800000";
const MAROON_XLIGHT = "#f5e8e8";
const SUCCESS_GREEN = "#38A169";
const ERROR_RED = "#E53E3E";
const WARNING_ORANGE = "#DD6B20";
const RADIUS = "8px";
const ICON_SIZE = "18px";

const RequestActionButton = ({
  status,
  onMarkComplete,
  onViewDetails,
  onCancel,
  onApprove,
  onReject,
}) => {
  const menuBg = "white";
  const menuBorder = "gray.200";
  const hoverBg = MAROON_XLIGHT;

  const getAvailableActions = (status) => {
    const actions = [];

    // Always include view details as first action
    actions.push({
      key: "view",
      icon: <Icon as={FiEye} color={MAROON} boxSize={ICON_SIZE} />,
      label: "View Details",
      onClick: onViewDetails,
      color: "gray.700",
    });

    if (["Pending"].includes(status)) {
      actions.push({
        key: "approve",
        icon: (
          <Icon
            as={MdCheckCircleOutline}
            color={SUCCESS_GREEN}
            boxSize={ICON_SIZE}
          />
        ),
        label: "Approve Request",
        onClick: onApprove,
        color: SUCCESS_GREEN,
      });
      actions.push({
        key: "reject",
        icon: <Icon as={FiXCircle} color={ERROR_RED} fontSize={17} />,
        label: "Reject Request",
        onClick: onReject,
        color: ERROR_RED,
      });
    }

    if (["In Use"].includes(status)) {
      actions.push({
        key: "complete",
        icon: (
          <Icon as={TbChecklist} color={SUCCESS_GREEN} boxSize={ICON_SIZE} />
        ),
        label: "Mark Complete",
        onClick: onMarkComplete,
        color: SUCCESS_GREEN,
      });
    }

    if (["Pending", "Reserved"].includes(status)) {
      actions.push({
        key: "cancel",
        icon: <Icon as={TbCancel} color={WARNING_ORANGE} boxSize={ICON_SIZE} />,
        label: "Cancel Request",
        onClick: onCancel,
        color: WARNING_ORANGE,
      });
    }

    return actions;
  };

  const actions = getAvailableActions(status);

  return (
    <Flex gap={2} justify="flex-start" pl={5}>
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

      {/* Dropdown menu for other actions */}
      {actions.length > 1 && (
        <Menu autoSelect={false} placement="bottom-end">
          <MenuButton
            as={IconButton}
            icon={<Icon as={FiMoreHorizontal} boxSize={5} />}
            aria-label="More actions"
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
          >
            {actions.slice(1).map(({ key, icon, label, onClick, color }) => (
              <MenuItem
                key={key}
                onClick={onClick}
                icon={icon}
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
                <Text fontSize="sm" fontWeight="medium" color={color}>
                  {label}
                </Text>
              </MenuItem>
            ))}
          </MenuList>
        </Menu>
      )}
    </Flex>
  );
};

export default RequestActionButton;
