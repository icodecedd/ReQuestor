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

const getColorScheme = (status) => {
  switch (status) {
    case "Admin":
      return "maroon";
    case "Student":
      return "white";
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

  {
    /* User Filters */
  }
  const [roleFilter, setRoleFilter] = useState("All Roles");

  const [statusFilter, setStatusFilter] = useState("All Status");

  const [searchFilter, setSearchFilter] = useState("");

  const filteredUsers = useMemo(() => {
    return users.filter((user) => {
      const matchesRole =
        roleFilter === "All Roles" ? true : user.role === roleFilter;

      const matchesStatus =
        statusFilter === "All Status" ? true : user.status === statusFilter;

      const matchesSearch = searchFilter
        ? user.username.toLowerCase().includes(searchFilter.toLowerCase()) ||
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
          <UserRoleDropdown onChange={setRoleFilter} />
          <UserStatusDropdown onChange={setStatusFilter} />

          {/*Add User Button*/}
          <Button
            variant="primary"
            bg="#800000"
            color="white"
            borderRadius="xl"
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
                <Th>{" "}</Th>
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
                        bg={getColorScheme(user.role)}
                        color={user.role === "Admin" ? "white" : "black"}
                        border="1px"
                        borderColor="gray.300"
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
                        colorScheme={getColorScheme(user.status)}
                        borderRadius="xl"
                        pl={2}
                        pr={2}
                        pb={0.5}
                      >
                        {user.status}
                      </Badge>
                    </Td>
                    <Td>{getDateOnly(user.created_at)}</Td>
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
              <TableCaption mt={20} mb={20} fontSize="14px" fontWeight="bold">
                No users to display.
              </TableCaption>
            )}
          </Table>
        </TableContainer>
      </Box>
      {/* Modals will be placed here */}
      <AddUserModal isOpen={isAddOpen} onClose={onAddClose} />
      <UpdateUserModal
        isOpen={isEditOpen}
        onClose={onEditClose}
        user={selectedUser}
      />
      <ResetPasswordModal
        isOpen={isResetOpen}
        onClose={onResetClose}
        user={selectedUser}
      />
      <DeleteUserModal
        isOpen={isDeleteOpen}
        onClose={onDeleteClose}
        user={selectedUser}
      />
      <ToggleStatusModal
        isOpen={isStatusOpen}
        onClose={onStatusClose}
        user={selectedUser}
      />
    </Box>
  );
};

export default UsersTable;
