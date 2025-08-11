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
  Skeleton,
  VStack,
  Text,
} from "@chakra-ui/react";
import { FiSearch } from "react-icons/fi";
import { IoAdd } from "react-icons/io5";
import { UserRoleDropdown } from "@/components/dropdowns/UserRoleDropdown";
import UserActionButton from "@/components/buttons/UserActionButton";
import { useEffect, useMemo, useState } from "react";
import useUserStore from "@/store/usersStore";
import { getDateOnly } from "@/utils/getDate";
import ResetPasswordModal from "@/components/modals/ResetPasswordModal";
import AddUserModal from "@/components/modals/AddUserModal";
import UpdateUserModal from "@/components/modals/UpdateUserModal";
import DeleteUserModal from "@/components/modals/DeleteUserModal";
import ToggleStatusModal from "@/components/modals/ToggleStatusModal";
import { UserStatusDropdown } from "@/components/dropdowns/UserStatusDropdown";
import { getUserColor } from "@/utils/getColorScheme";

const UsersTable = () => {
  const { users, loading, fetchUsers } = useUserStore();
  const [roleFilter, setRoleFilter] = useState("All Roles");
  const [statusFilter, setStatusFilter] = useState("All Status");
  const [searchFilter, setSearchFilter] = useState("");

  const {
    isOpen: isAddOpen,
    onOpen: onAddOpen,
    onClose: onAddClose,
  } = useDisclosure();

  const {
    isOpen: isEditOpen,
    onOpen: onEditOpen,
    onClose: onEditClose,
  } = useDisclosure();

  const {
    isOpen: isResetOpen,
    onOpen: onResetOpen,
    onClose: onResetClose,
  } = useDisclosure();

  const {
    isOpen: isDeleteOpen,
    onOpen: onDeleteOpen,
    onClose: onDeleteClose,
  } = useDisclosure();

  const {
    isOpen: isStatusOpen,
    onOpen: onStatusOpen,
    onClose: onStatusClose,
  } = useDisclosure();

  useEffect(() => {
    fetchUsers();
  }, []); // this fetch only once

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesRole =
        roleFilter === "All Roles" ? true : user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All Status" ? true : user.status === statusFilter;

      const matchesSearch = searchFilter
        ? user.name.toLowerCase().includes(searchFilter.toLowerCase()) ||
          user.email.toLowerCase().includes(searchFilter.toLowerCase())
        : true;

      return matchesRole && matchesStatus && matchesSearch;
    });
  }, [users, roleFilter, statusFilter, searchFilter]); // Only recalculates when these change

  const [selectedUser, setSelectedUser] = useState(null);

  const handleEdit = (user) => {
    setSelectedUser(user);
    onEditOpen(); // open modal
  };

  const handleResetPassword = (user) => {
    setSelectedUser(user);
    onResetOpen();
  };

  const handleDelete = (user) => {
    setSelectedUser(user);
    onDeleteOpen();
  };

  const handleToggleStatus = (user) => {
    setSelectedUser(user);
    onStatusOpen();
  };

  return (
    <Box w="99.5%" mx="auto" p={8}>
      <Flex justify="space-between" align="center" pb={0.5}>
        {/* Left: Header */}
        <HStack ml={3}>
          <Heading size="md" w="100%">All users ({users.length})</Heading>
        </HStack>

        {/* Right: Search, Filter, Add User */}
        <Flex align="flex-end" justify="flex-end" gap={3} w="90%">
          <InputGroup w="400px">
            <InputLeftElement color="gray.500">
              <FiSearch />
            </InputLeftElement>
            <Input
              placeholder="Search by name or email"
              focusBorderColor="maroon"
              borderRadius="lg"
              borderColor="gray.400"
              value={searchFilter}
              onChange={(e) => setSearchFilter(e.target.value)}
            />
          </InputGroup>

          {/*Filter Button*/}
          <UserRoleDropdown onChange={setRoleFilter} />
          <UserStatusDropdown onChange={setStatusFilter} />

          {/*Add User Button*/}
          <Button
            ml="auto"
            variant="primary"
            bg="#800000"
            color="white"
            borderRadius="lg"
            _hover={{ bg: "#a12828" }}
            transition="background-color 0.2s ease-in-out"
            gap={1}
            p={3}
            fontSize="95%"
            w="120px"
            onClick={() => onAddOpen()}
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
            borderTop="1px"
            color="gray.100"
            sx={{
              Th: { textAlign: "center", fontSize: "13px" },
              Td: { textAlign: "center", fontSize: "13px", py: 2 },
            }}
          >
            <Thead>
              <Tr>
                <Th fontSize="xs" color="gray.600" fontWeight="semibold" py={4}>
                  NAME
                </Th>
                <Th fontSize="xs" color="gray.600" fontWeight="semibold">
                  EMAIL
                </Th>
                <Th fontSize="xs" color="gray.600" fontWeight="semibold">
                  ROLE
                </Th>
                <Th fontSize="xs" color="gray.600" fontWeight="semibold">
                  STATUS
                </Th>
                <Th fontSize="xs" color="gray.600" fontWeight="semibold">
                  CREATED
                </Th>
                <Th fontSize="xs" color="gray.600" fontWeight="semibold">
                  LAST LOGIN
                </Th>
                <Th fontSize="xs" color="gray.600" fontWeight="semibold">
                  ACTIONS
                </Th>
              </Tr>
            </Thead>
            {loading ? (
              <Tbody>
                {[1, 2, 3, 4, 5].map((i) => (
                  <Tr key={i}>
                    {[1, 2, 3, 4, 5, 6, 7].map((j) => (
                      <Td key={j} py={3}>
                        <Skeleton height="20px" width="90%" borderRadius="md" />
                      </Td>
                    ))}
                  </Tr>
                ))}
              </Tbody>
            ) : filteredUsers.length > 0 ? (
              <Tbody>
                {filteredUsers.map((user) => (
                  <Tr key={user.id} textColor="blackAlpha.900" bg="#f7f9fb">
                    <Td>{user.name}</Td>
                    <Td>{user.email}</Td>
                    <Td>
                      <Badge
                        bg={getUserColor(user.role)}
                        border="1px"
                        color={user.role === "Admin" ? "white" : "black"}
                        borderColor={
                          user.role === "Admin" ? "maroon" : "gray.300"
                        }
                        borderRadius="xl"
                        pl={2}
                        pr={2}
                        pb={0.5}
                      >
                        {user.role}
                      </Badge>
                    </Td>
                    <Td>
                      <Badge
                        colorScheme={getUserColor(user.status)}
                        borderRadius="xl"
                        pl={2}
                        pr={2}
                        pb={0.5}
                      >
                        {user.status}
                      </Badge>
                    </Td>
                    <Td>{getDateOnly(user.created_at)}</Td>
                    <Td>{getDateOnly(user.last_login)}</Td>
                    <Td>
                      <UserActionButton
                        status={user.status}
                        onEdit={() => handleEdit(user)}
                        onResetPassword={() => handleResetPassword(user)}
                        onDelete={() => handleDelete(user)}
                        onToggleStatus={() => handleToggleStatus(user)}
                      />
                    </Td>
                  </Tr>
                ))}
              </Tbody>
            ) : (
              <Tbody>
                <Tr>
                  <Td colSpan={7} h="200px" textAlign="center">
                    <VStack spacing={2}>
                      <Heading fontSize="sm" color="gray.500">
                        No users found
                      </Heading>
                      <Text fontSize="sm" color="gray.400">
                        {searchFilter
                          ? "Try a different search"
                          : "Add a new user to get started"}
                      </Text>
                    </VStack>
                  </Td>
                </Tr>
              </Tbody>
            )}
          </Table>
        </TableContainer>
      </Box>

      {/* Modals will be placed here */}
      <AddUserModal isOpen={isAddOpen} onClose={onAddClose} />
      <UpdateUserModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        users={selectedUser}
      />
      <ResetPasswordModal
        isOpen={isResetOpen}
        onClose={onResetClose}
        users={selectedUser}
      />
      <DeleteUserModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        users={selectedUser}
      />
      <ToggleStatusModal
        isOpen={isStatusOpen}
        onClose={onStatusClose}
        users={selectedUser}
      />
    </Box>
  );
};

export default UsersTable;
