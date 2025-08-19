import { getRequestStatusColor, getUserColor } from "@/utils/getColorScheme";
import {
  Avatar,
  Badge,
  Box,
  Button,
  Flex,
  Heading,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  SimpleGrid,
  Stack,
  Text,
  Icon,
  useColorModeValue,
  Tag,
} from "@chakra-ui/react";
import {
  BsProjector,
  BsCalendarDate,
  BsClock,
  BsPerson,
  BsJournal,
  BsPencil,
  BsBox,
} from "react-icons/bs";
import { MdOutlineDocumentScanner } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiProjectorScreenChart } from "react-icons/pi";
import { getDateOnly } from "@/utils/getDate";
import { formatTimeOnly } from "@/utils/formatTime";

// Color constants
const MAROON = "#800000";
const MAROON_HOVER = "#A52A2A";
const MAROON_DARK = "#6A0D0D";
const MAROON_XLIGHT = "#f5e8e8";
const DARK_GRAY = "#616161";
const GRAY_BORDER = "#e2e8f0";
const GRAY_TEXT = "#4a5568";
const RADIUS = "12px";

const EquipmentIcon = ({ type }) => {
  const iconProps = { size: "20px", color: MAROON };

  switch (type) {
    case "Projector":
      return <Icon as={BsProjector} {...iconProps} />;
    case "White Screen":
      return <Icon as={PiProjectorScreenChart} {...iconProps} />;
    case "AVR":
      return <Icon as={FaChalkboardTeacher} {...iconProps} />;
    default:
      return <Icon as={BsBox} {...iconProps} />;
  }
};

const formatRequestsId = (id) => {
  return `REQ-${String(id).padStart(3, "0")}`;
};

const formatEquipmentId = (id) => {
  return `EQ-${String(id).padStart(3, "0")}`;
};

const ViewRequestModal = ({ isOpen, onClose, request }) => {
  const borderColor = useColorModeValue(GRAY_BORDER, "gray.200");

  if (!request) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="2xl"
      isCentered
      motionPreset="scale"
    >
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(4px)" />
      <ModalContent
        borderRadius="2xl"
        overflow="hidden"
        boxShadow="2xl"
        border={`1px solid ${borderColor}`}
      >
        {/* HEADER */}
        <ModalHeader
          px={6}
          pt={6}
          pb={3}
          borderBottom="1px solid"
          borderColor="gray.100"
        >
          <Flex gap={3} align="center">
            <Box
              bg={`${MAROON}15`}
              color={MAROON}
              borderRadius="full"
              p={3}
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <MdOutlineDocumentScanner size={24} />
            </Box>
            <Box>
              <Text fontSize="xl" fontWeight="bold" color={MAROON_DARK}>
                Request Details Summary
              </Text>
              <Text color="gray.600" fontSize="sm">
                Request ID: #{formatRequestsId(request.id)}
              </Text>
            </Box>
          </Flex>
        </ModalHeader>

        <ModalCloseButton
          size="md"
          _hover={{ bg: `${MAROON}10` }}
          color={MAROON}
          borderRadius="full"
          mt={2}
        />

        <ModalBody px={6} py={4} bg="gray.50">
          {/* REQUESTOR CARD */}
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="lg"
            p={4}
            mb={4}
            boxShadow="sm"
            position="relative"
          >
            <Badge
              position="absolute"
              top={4}
              right={4}
              colorScheme={getRequestStatusColor(request.status)}
              borderRadius="md"
              px={3}
              py={1}
              fontSize="xs"
              textTransform="uppercase"
              letterSpacing="wide"
            >
              {request.status}
            </Badge>

            <Flex align="center" gap={4}>
              <Avatar
                size="md"
                bgGradient={`linear(to-br, ${MAROON}, ${MAROON_HOVER})`}
                color="white"
                name={request.name}
              />

              <Box>
                <Heading as="h3" fontSize="md" fontWeight="600" mb={1}>
                  {request.name}
                </Heading>

                <Tag
                  border="1px"
                  size={"sm"}
                  borderRadius="full"
                  bg={getUserColor(request.role)}
                  color={request.role === "Admin" ? "white" : "black"}
                  borderColor={request.role === "Admin" ? "maroon" : "gray.300"}
                  pb={0.5}
                >
                  {request.role}
                </Tag>
              </Box>
            </Flex>
          </Box>

          {/* REQUEST DETAILS */}
          <Heading size="sm" mb={4} color={MAROON} fontWeight="600">
            Request Information
          </Heading>
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="lg"
            p={4}
            mb={4}
            boxShadow="sm"
            position="relative"
          >
            <SimpleGrid columns={2} gap={4}>
              <DetailItem
                icon={BsPerson}
                label="Faculty-in-Charge"
                value={request.faculty_in_charge}
              />

              <DetailItem
                icon={BsJournal}
                label="Course & Section"
                value={request.course_section}
              />

              <DetailItem
                icon={BsCalendarDate}
                label="Date of Use"
                value={getDateOnly(request.date_use)}
              />

              <DetailItem
                icon={BsClock}
                label="Time"
                value={`${formatTimeOnly(request.time_from)} - ${formatTimeOnly(
                  request.time_to
                )}`}
              />

              <Box gridColumn="span 2">
                <DetailItem
                  icon={BsPencil}
                  label="Purpose"
                  value={request.purpose}
                />
              </Box>
            </SimpleGrid>
          </Box>

          {/* EQUIPMENT SECTION */}
          <Box>
            <Heading size="sm" mb={4} color={MAROON} fontWeight="600">
              Requested Equipment
            </Heading>

            <Stack spacing={3}>
              {request.equipment_list.map((eq, index) => (
                <EquipmentCard
                  key={index}
                  id={formatEquipmentId(eq.equipment_id)}
                  name={eq.equipment_name}
                  type={eq.equipment_type}
                />
              ))}
            </Stack>
          </Box>
        </ModalBody>

        {/* FOOTER */}
        <ModalFooter bg="white" borderTop={`1px solid ${borderColor}`} py={4}>
          <Button
            flex={1}
            variant="outline"
            onClick={onClose}
            color={MAROON}
            borderColor={MAROON}
            _hover={{ bg: `${MAROON}10` }}
          >
            Cancel
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

// Reusable Detail Item Component
const DetailItem = ({ icon, label, value }) => (
  <Box>
    <Flex align="center" gap={2} mb={2}>
      {icon && <Icon as={icon} color={MAROON} />}
      <Text fontSize="sm" color={DARK_GRAY} fontWeight="bold">
        {label}
      </Text>
    </Flex>
    <Text fontSize="sm" fontWeight="medium">
      {value || "Not specified"}
    </Text>
  </Box>
);

// Reusable Equipment Card Component
const EquipmentCard = ({ id, name, type }) => (
  <Box
    bg="white"
    borderRadius={RADIUS}
    p={3}
    border={`1px solid ${GRAY_BORDER}`}
    _hover={{
      borderColor: MAROON,
      transform: "translateY(-2px)",
      boxShadow: "sm",
    }}
    transition="all 0.2s"
  >
    <Flex align="center" gap={3}>
      <Box
        bg={MAROON_XLIGHT}
        borderRadius="md"
        p={2}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <EquipmentIcon type={type} />
      </Box>

      <Box flex={1}>
        <Text fontSize="sm" fontWeight="600">
          {name}
        </Text>
        <Text fontSize="xs" color={GRAY_TEXT}>
          #{id}
        </Text>
      </Box>

      <Tag size="sm" variant="subtle" colorScheme="gray" borderRadius="full">
        {type}
      </Tag>
    </Flex>
  </Box>
);

export default ViewRequestModal;
