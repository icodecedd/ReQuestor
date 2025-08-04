import {
    Badge,
    Box,
    Button,
    Divider,
    Flex,
    FormControl,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalFooter,
    ModalHeader,
    ModalOverlay,
    Text,
    useToast,
} from "@chakra-ui/react";
import {FiEdit} from "react-icons/fi";
import {ModalDropdown} from "@/components/dropdowns/ModalDropdown";
import {useEffect, useState} from "react";
import useUserStore from "@/store/usersStore";
import {getUserColor} from "@/utils/getColorScheme.js";

const fields = [
    {name: "name", label: "Name", placeholder: "Enter name"},
    {name: "email", label: "Email", placeholder: "Enter email"},
];

const rolesOptions = ["Admin", "Student"];
const statusOptions = ["Active", "Inactive", "Suspended"];

const UpdateUserModal = ({isOpen, onClose, user}) => {
    const updateUser = useUserStore((state) => state.updateUser);
    const toast = useToast();

    const [form, setForm] = useState({
        name: "",
        email: "",
        role: "",
        status: "",
    });

    useEffect(() => {
        if (user) {
            setForm({
                name: user.name,
                email: user.email,
                role: user.role,
                status: user.status,
            });
        }
    }, [user]);

    const handleChange = (e) => {
        const {name, value} = e.target;
        setForm((prev) => ({...prev, [name]: value}));
    };

    const handleUpdate = async () => {
        const result = await updateUser(user.id, form); // Direct call to Zustand store

        toast({
            title: result.message,
            status: result.success ? "success" : "error",
            duration: 1500,
            variant: "top-accent",
            position: "top-right",
        });

        if (result.success) {
            onClose();
            setForm({
                name: "",
                email: "",
                role: "",
                status: "",
            });
        }
    };

    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            size="lg"
            motionPreset="slideInBottom"
        >
            <ModalOverlay/>
            <ModalContent borderRadius="2xl" overflow="hidden">
                <ModalHeader>
                    <Flex color="gray.900" gap={3} align="center" mb={3}>
                        <Box
                            bg="white"
                            color="#f0f0f0ff"
                            borderRadius="md"
                            boxShadow="0 2px 8px rgba(0,0,0,0.12)"
                            border="1px solid #e2e8f0"
                            p={2}
                            transition="all 0.3s ease"
                            _hover={{
                                transform: "scale(1.02)",
                                boxShadow: "lg",
                            }}
                        >
                            <FiEdit color="#800000"/>
                        </Box>
                        <Box>
                            <Text fontSize="lg" mt={0.5}>
                                Edit User
                            </Text>
                            <Text color="gray.700" fontWeight="normal" fontSize="14px">
                                Modify user information and permissions.
                            </Text>
                        </Box>
                    </Flex>
                    <Divider w="110%" ml={-6}/>
                </ModalHeader>
                <ModalCloseButton
                    size="md"
                    _hover={{bg: "#f7eaea"}}
                    borderRadius="lg"
                />
                <ModalBody mt={-2}>
                    {fields.map((field, index) => (
                        <FormControl key={index} p={2}>
                            <FormLabel fontSize={15}>{field.label}</FormLabel>
                            <Input
                                name={field.name}
                                value={form[`${field.name}`]}
                                placeholder={field.placeholder}
                                focusBorderColor="maroon"
                                borderRadius="lg"
                                borderColor="gray.400"
                                onChange={handleChange}
                            />
                        </FormControl>
                    ))}
                    <Flex gap={5} p={2}>
                        <ModalDropdown
                            value={form.role}
                            onChange={(newRole) => setForm({...form, role: newRole})}
                            roles={rolesOptions}
                            w={206}
                            label="Role"
                            placeholder="Select role"
                            isRequired={false}
                        />
                        <FormControl>
                            <FormLabel fontSize={15}>Selected Role</FormLabel>
                            <Box
                                border="1px"
                                borderRadius="lg"
                                h="40px"
                                borderColor="gray.400"
                            >
                                <Badge
                                    bg={getUserColor(form.role)}
                                    border="1px"
                                    color={form.role !== "Admin" ? "black" : "white"}
                                    borderColor={
                                        form.role === "Admin" ? "maroon" : "gray.300"
                                    }
                                    borderRadius="xl"
                                    pl={2}
                                    pr={2}
                                    pb={0.5}
                                    mt={2}
                                    ml={2}
                                >
                                    {form.role || "No Selected Role"}
                                </Badge>
                            </Box>
                        </FormControl>
                    </Flex>
                    <Flex gap={5} p={2}>
                        <ModalDropdown
                            value={form.status}
                            onChange={(newStatus) => setForm({...form, status: newStatus})}
                            roles={statusOptions}
                            w={206}
                            label="Status (Optional)"
                            placeholder="Select status"
                            isRequired={false}
                        />
                        <FormControl>
                            <FormLabel fontSize={15}>Selected Status</FormLabel>
                            <Box
                                border="1px"
                                borderRadius="lg"
                                h="40px"
                                borderColor="gray.400"
                            >
                                <Badge
                                    colorScheme={getUserColor(form.status)}
                                    borderRadius="xl"
                                    pl={2}
                                    pr={2}
                                    pb={0.5}
                                    mt={2}
                                    ml={2}
                                >
                                    {form.status || "No Selected Status"}
                                </Badge>
                            </Box>
                        </FormControl>
                    </Flex>
                </ModalBody>
                <ModalFooter borderTop="1px solid #e2e8f0" mt={5}>
                    <Button
                        mr={3}
                        variant="outline"
                        borderRadius="lg"
                        onClick={onClose}
                        _hover={{bg: "#f7eaea"}}
                    >
                        Close
                    </Button>
                    <Button
                        bg="#800000"
                        color="white"
                        borderRadius="lg"
                        _hover={{bg: "#a12828"}}
                        transition="background-color 0.2s ease-in-out"
                        onClick={handleUpdate}
                    >
                        Update User
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    );
};

export default UpdateUserModal;
