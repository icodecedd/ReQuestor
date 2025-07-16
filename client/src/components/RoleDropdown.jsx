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

export function RoleDropdown() {
  const [selectedRole, setSelectedRole] = useState("All Roles");

  return (
    <Menu>
      <MenuButton
        as={Button}
        rightIcon={<GoFilter size={20} />}
        borderRadius="xl"
        borderColor="gray.400"
        variant="outline"
        color="black"
        fontSize="15px"
        _hover={{ bg: "#f7f1f1" }}
        w="150px"
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
              onClick={() => setSelectedRole(role)}
              bg={isSelected ? "#800000" : "transparent"}
              color={isSelected ? "white" : "black"}
              borderRadius="lg"
              w="140px"
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
