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

const timeOptions = ["All Time", "Today", "Last Week", "Last Month"];

export function ActivityTimeDropdown({ onChange }) {
  const [selectedTime, setSelectedTime] = useState("All Time");

  const handleSelect = (time) => {
    setSelectedTime(time);
    if (onChange) {
      onChange(time === "All Time" ? "All Time" : time);
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
        w="140px"
        textAlign="left"
      >
        {selectedTime}
      </MenuButton>
      <MenuList borderRadius="xl" p={1} minW="130px">
        {timeOptions.map((time) => {
          const isSelected = selectedTime === time;
          return (
            <MenuItem
              key={time}
              onClick={() => handleSelect(time)}
              bg={isSelected ? "#800000" : "transparent"}
              color={isSelected ? "white" : "black"}
              borderRadius="lg"
              w="130px"
              _hover={
                isSelected
                  ? { bg: "#800000", borderRadius: "lg" }
                  : { bg: "#f7eaea", borderRadius: "lg" }
              }
              py={2}
            >
              <Flex align="center" justify="space-between" w="100%">
                <Text fontSize="14px">{time}</Text>
                {isSelected && <FiCheck />}
              </Flex>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
