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

const categories = ["All Categories", "Projector", "White Screen", "AVR"];

export function CategoryDropdown({ onChange }) {
  const [selectedCategory, setSelectedCategory] = useState("All Categories");

  const handleSelect = (category) => {
    setSelectedCategory(category);
    if (onChange) {
      onChange(category === "All Categories" ? "All Categories" : category);
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
        w="160px"
        textAlign="left"
      >
        {selectedCategory}
      </MenuButton>
      <MenuList borderRadius="xl" p={1} minW="150px">
        {categories.map((category) => {
          const isSelected = selectedCategory === category;
          return (
            <MenuItem
              key={category}
              onClick={() => handleSelect(category)}
              bg={isSelected ? "#800000" : "transparent"}
              color={isSelected ? "white" : "black"}
              borderRadius="lg"
              w="150px"
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
                <Text fontSize="14px">{category}</Text>
                {isSelected && <FiCheck />}
              </Flex>
            </MenuItem>
          );
        })}
      </MenuList>
    </Menu>
  );
}
