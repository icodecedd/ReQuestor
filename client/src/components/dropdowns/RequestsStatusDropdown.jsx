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

const statuses = ["All Status", "Pending", "Approved", "Rejected"];

export function RequestsStatusDropdown({ onChange }) {
  const [selectedReqStatus, setSelectedReqStatus] = useState("All Status");

  const handleSelect = (status) => {
    setSelectedReqStatus(status);
    if (onChange) {
      onChange(status === "All Status" ? "All Status" : status);
    }
  };

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
        _hover={{ bg: "#f7eaea" }}
        w="130px"
        textAlign="left"
      >
        {selectedReqStatus}
      </MenuButton>
      <MenuList borderRadius="xl" p={1} minW="120px">
        {statuses.map((status) => {
          const isSelected = selectedReqStatus === status;
          return (
            <MenuItem
              key={status}
              onClick={() => handleSelect(status)}
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
                <Text fontSize="14px">{status}</Text>
                {isSelected && <FiCheck />}
              </Flex>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
