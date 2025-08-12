import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Text,
  FormControl,
  FormLabel,
} from "@chakra-ui/react";
import { RiArrowDropDownLine } from "react-icons/ri";
import { FiCheck } from "react-icons/fi";
import { useState, useEffect } from "react";

const MAROON = "#800000";
const MAROON_HOVER = "#A52A2A";

export function ModalDropdown({
  value = "",
  onChange,
  roles,
  w = "100%",
  menuItemWidth = "185%",
  label,
  placeholder,
  isRequired = true,
}) {
  const [selectedRole, setSelectedRole] = useState(value);

  // keep internal state synced if parent changes value
  useEffect(() => {
    if (value !== selectedRole) {
      setSelectedRole(value);
    }
  }, [value]);

  const handleSelect = (role) => {
    setSelectedRole(role);
    onChange && onChange(role);
    console.log(role);
  };

  return (
    <FormControl isRequired={isRequired}>
      <FormLabel fontWeight="semibold">{label}</FormLabel>
      <Menu>
        <MenuButton
          aria-label="Select role"
          as={Button}
          rightIcon={<RiArrowDropDownLine size={20} />}
          borderRadius="md"
          borderColor={MAROON_HOVER}
          focusBorderColor={MAROON}
          variant="outline"
          color="black"
          fontSize="15px"
          _hover={{ borderColor: "gray.300", bg: "#f7eaea" }}
          _active={{ borderColor: "gray.300", bg: "#f7eaea" }}
          transition={"all 0.2s"}
          w={w}
          textAlign="left"
          fontWeight="normal"
        >
          {selectedRole || placeholder}
        </MenuButton>
        <MenuList borderRadius="xl" p={1} w={menuItemWidth}>
          {roles.map((role) => {
            const isSelected = selectedRole === role;
            return (
              <MenuItem
                key={role}
                onClick={() => handleSelect(role)}
                bg={isSelected ? "#800000" : "transparent"}
                color={isSelected ? "white" : "black"}
                borderRadius="lg"
                pr={3}
                pl={3}
                _hover={
                  isSelected
                    ? {
                        bg: "#800000",
                        borderRadius: "lg",
                      }
                    : {
                        bg: "#f7eaea",
                        borderRadius: "lg",
                      }
                }
                py={2}
              >
                <Flex align="center" justify="space-between" w="100%">
                  <Text fontSize="14px">{role}</Text>
                  {isSelected && <FiCheck />}
                </Flex>
              </MenuItem>
            );
          })}
        </MenuList>
      </Menu>
    </FormControl>
  );
}
