import {
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Button,
  Flex,
  Text,
} from "@chakra-ui/react";
import { GoFilter } from "react-icons/go";
import { FiCheck } from "react-icons/fi";
import { useState } from "react";

const roles = ["All Roles", "Admin", "Student"];

export function UserRoleDropdown({ onChange }) {
  const [selectedRole, setSelectedRole] = useState("All Roles");

  const handleSelect = (role) => {
    setSelectedRole(role);
    if (onChange) {
      onChange(role === "All Roles" ? "All Roles" : role);
    }
  };

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<GoFilter size={20} />}
        borderRadius="lg"
        borderColor="gray.400"
        variant="outline"
        color="black"
        fontSize="15px"
        _hover={{ bg: "#f7eaea" }}
        _active={{ bg: "#f7eaea" }}
        w="130px"
        textAlign="left"
      >
        {selectedRole}
      </MenuButton>
      <MenuList borderRadius="xl" p={1} minW="120px">
        {roles.map((role) => {
          const isSelected = selectedRole === role;
          return (
            <MenuItem
              key={role}
              onClick={() => handleSelect(role)}
              bg={isSelected ? "#800000" : "transparent"}
              color={isSelected ? "white" : "black"}
              borderRadius="lg"
              w="120px"
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
  );
}
