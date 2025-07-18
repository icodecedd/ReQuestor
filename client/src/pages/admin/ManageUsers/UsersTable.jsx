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
  TableCaption,
  Thead,
  Tr,
  Td,
  Th,
  Tbody,
  Badge,
  useDisclosure,
  Skeleton,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { RoleDropdown } from "@/components/dropdowns/RoleFilterDropdown";
import ActionButton from "@/components/buttons/ActionButton";
import { useEffect, useState } from "react";
import AddUserModal from "@/components/modals/AddUserModal";
import useUserStore from "@/store/usersStore";
import { getDateOnly } from "@/utils/getDate";

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
  {
    /* Global State of Users */
  }
  const { users, loading, fetchUsers } = useUserStore();

  useEffect(() => {
    fetchUsers();
  }, []); // this fetch only once

  {
    /* Modal */
  }
  const { isOpen, onOpen, onClose } = useDisclosure();

  {
    /* Role Filter */
  }
  const [roleFilter, setRoleFilter] = useState("All Roles");

  {
    /* Search Filter */
  }
  const [searchFilter, setSearchFilter] = useState("");
  const filteredUsers = users.filter((user) => {
    const matchesRole =
      roleFilter === "All Roles" ? true : user.role === roleFilter;

    const matchesSearch = searchFilter
      ? user.username.toLowerCase().includes(searchFilter.toLowerCase()) ||
        user.email.toLowerCase().includes(searchFilter.toLowerCase())
      : true;

    return matchesRole && matchesSearch;
  });

  return (
    <Box w="99.5%" mx="auto" p={8}>
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
              placeholder="Search by username or email"
              focusBorderColor="maroon"
              borderRadius="xl"
              borderColor="gray.400"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
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
            onClick={onOpen}
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
            {loading ? (
              <TableCaption mt={3}>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton
                    key={i}
                    height="41px"
                    width="95%"
                    borderRadius="xl"
                    mx="auto"
                    mb={2}
                  />
                ))}
              </TableCaption>
            ) : filteredUsers.length > 0 ? (
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
                      <Badge
                        colorScheme={getColorScheme(user.status)}
                        borderRadius="xl"
                        pl={2}
                        pr={2}
                      >
                        {user.status}
                      </Badge>
                    </Td>
                    <Td>{getDateOnly(user.created_at)}</Td>
                    <Td>
                      <ActionButton status={user.status} />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            ) : (
              <TableCaption mt={20} mb={20} fontSize="14px" fontWeight="bold">
                No recent user to display.
              </TableCaption>
            )}
          </Table>
        </TableContainer>
      </Box>
      {/* Modals will be placed here */}
      <AddUserModal isOpen={isOpen} onClose={onClose} />
    </Box>
  );
};

export default UsersTable;
