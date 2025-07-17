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
  Td,
  Th,
  Tbody,
  Badge,
  useDisclosure,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { RoleDropdown } from "@/components/RoleDropdown";
import { users } from "@/data/users";
import ActionButtons from "@/components/ActionButtons";
import {
  handleAdd,
  handleEdit,
  handleResetPassword,
  handleToggleStatus,
  handleDelete,
} from "@/utils/usersActions";
import { useState } from "react";
import AddUserModal from "@/components/modals/AddUserModal";

const getColorScheme = (status) => {
  switch (status) {
    case "Admin":
      return "red";
    case "Student":
      return "green";
    case "Active":
      return "green";
    case "Inactive":
      return "red";
    default:
      return "gray";
  }
};

const UsersTable = () => {
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const filteredUsers = users.filter((user) =>
    roleFilter === "All Roles" ? true : user.role === roleFilter
  );

  return (
    <Box w="100%" mx="auto" p={8}>
      <Flex justify="space-between" align="center" pb={0.5}>
        {/* Left: Header */}
        <HStack ml={3}>
          <Heading size="md">All users ({users.length})</Heading>
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
          <RoleDropdown onChange={setRoleFilter} />

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
            onClick={<AddUserModal onOpen={true} />}
          >
            <IoAdd size="25px" />
            Add user
          </Button>
        </Flex>
      </Flex>
      <Box mt={2}>
        <TableContainer borderRadius="xl" border="1px" color="gray.300">
          <Table
            variant="simple"
            size="sm"
            sx={{
              Th: { textAlign: "center", fontSize: "14px" },
              Td: { textAlign: "center", fontSize: "14px" },
            }}
          >
            <Thead h="50px">
              <Tr bg="#f7f9fb">
                <Th>Username</Th>
                <Th>Email</Th>
                <Th>Role</Th>
                <Th>Status</Th>
                <Th>Created date</Th>
                <Th>Actions</Th>
              </Tr>
            </Thead>
            <Tbody>
              {filteredUsers.map((user) => (
                <Tr key={user.id} textColor="blackAlpha.900" bg="#f7f9fb">
                  <Td>{user.username}</Td>
                  <Td>{user.email}</Td>
                  <Td>
                    <Badge
                      colorScheme={getColorScheme(user.role)}
                      borderRadius="xl"
                      pl={2}
                      pr={2}
                    >
                      {user.role}
                    </Badge>
                  </Td>
                  <Td>
                    {" "}
                    <Badge
                      colorScheme={getColorScheme(user.status)}
                      borderRadius="xl"
                      pl={2}
                      pr={2}
                    >
                      {user.status}
                    </Badge>
                  </Td>
                  <Td>{user.joinedDate}</Td>
                  <Td>
                    <ActionButtons
                      status={user.status}
                      onEdit={() => handleEdit(user.id)}
                      onResetPassword={() => handleResetPassword(user.id)}
                      onToggleStatus={() => handleToggleStatus(user.id)}
                      onDelete={() => handleDelete(user.id)}
                    />
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </TableContainer>
      </Box>
    </Box>
  );
};

export default UsersTable;
