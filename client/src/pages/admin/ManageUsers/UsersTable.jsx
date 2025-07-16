import {
  Box,
  Flex,
  InputGroup,
  InputLeftElement,
  Input,
  Button,
  Heading,
  HStack,
  Table,
  TableContainer,
  Thead,
  Tr,
  Th,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { RoleDropdown } from "@/components/RoleDropdown";

const UsersTable = () => {
  return (
    <Box w="100%" mx="auto" p={8}>
      <Flex justify="space-between" align="center" pb={0.5}>
        {/* Left: Header */}
        <HStack ml={3}>
          <Heading size="md">All users ({20})</Heading>
        </HStack>

        {/* Right: Search, Filter, Add User */}
        <Flex align="center" gap={3} w="auto">
          <InputGroup w="400px">
            <InputLeftElement color="gray.500">
              <FiSearch />
            </InputLeftElement>
            <Input
              placeholder="Search for user"
              focusBorderColor="maroon"
              borderRadius="xl"
              borderColor="gray.400"
            />
          </InputGroup>
          {/*Filter Button*/}
          <RoleDropdown />

          {/*Add User Button*/}
          <Button
            variant="primary"
            bg="#800000"
            color="white"
            borderRadius="xl"
            _hover={{ bg: "#832222" }}
            gap={1}
            p={3}
            fontSize="95%"
            w="120px"
          >
            <IoAdd size="25px" />
            Add user
          </Button>
        </Flex>
      </Flex>
      <Box mt={2}>
        <TableContainer borderRadius={"xl"}>
          <Table
            variant="simple"
            borderTop="1px"
            color="gray.100"
            sx={{
              th: { textAlign: "center", fontSize: "14px" },
              td: { textAlign: "center", fontSize: "14px" },
            }}
          >
            <Thead>
              <Tr bg="#f7f9fb">
                <Th>Username</Th>
                <Th >Name</Th>
                <Th>Email</Th>
                <Th >Role</Th>
                <Th >Status</Th>
                <Th >Joined date</Th>
                <Th >Actions</Th>
              </Tr>
            </Thead>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default UsersTable;
