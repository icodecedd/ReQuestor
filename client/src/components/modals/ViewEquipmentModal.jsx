import { getEqConditionColor, getEqStatusColor } from "@/utils/getColorScheme";
import {
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
  Text,
  Icon,
  useColorModeValue,
  Tag,
  Grid,
  GridItem,
} from "@chakra-ui/react";
import {
  BsProjector,
  BsBox,
  BsPinMap,
  BsCheckCircle,
  BsActivity,
} from "react-icons/bs";
import { MdOutlineViewInAr } from "react-icons/md";
import { FaChalkboardTeacher } from "react-icons/fa";
import { PiProjectorScreenChart } from "react-icons/pi";
import { TbFileDescription } from "react-icons/tb";

// Color constants
const MAROON = "#800000";
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

const formatEquipmentId = (id) => {
  return `EQ-${String(id).padStart(3, "0")}`;
};

const ViewEquipmentModal = ({ isOpen, onClose, equipment }) => {
  const borderColor = useColorModeValue(GRAY_BORDER, "gray.200");

  if (!equipment) return null;

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
              <MdOutlineViewInAr size={24} />
            </Box>
            <Box>
              <Text fontSize="xl" fontWeight="bold" color={MAROON_DARK}>
                Equipment Details
              </Text>
              <Text color="gray.600" fontSize="sm">
                Request ID: #{formatEquipmentId(equipment.id)}
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
          {/* EQUIPMENT SECTION */}
          <Box>
            <Heading size="sm" mb={4} color={MAROON} fontWeight="600">
              Requested Equipment
            </Heading>
            <EquipmentCard
              id={equipment.serial_number}
              name={equipment.name}
              type={equipment.type}
            />
          </Box>

          {/* REQUEST DETAILS */}
          <Heading size="sm" my={4} color={MAROON} fontWeight="600">
            Equipment Information
          </Heading>
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            borderRadius={RADIUS}
            p={4}
            mb={6}
            boxShadow="sm"
          >
            <Grid templateColumns="repeat(3, 1fr)" gap={4}>
              {/* Description - Full width */}
              <GridItem colSpan={3}>
                <DetailItem
                  icon={TbFileDescription}
                  label="Description"
                  value={equipment.description || "No description provided"}
                />
              </GridItem>

              {/* Location */}
              <GridItem>
                <DetailItem
                  icon={BsPinMap}
                  label="Location"
                  value={equipment.location || "Not specified"}
                />
              </GridItem>

              {/* Status */}
              <GridItem>
                <DetailItem
                  icon={BsCheckCircle}
                  label="Status"
                  value={
                    <Badge
                      colorScheme={getEqStatusColor(equipment.status)}
                      borderRadius="full"
                      px={3}
                      py={1}
                      textTransform="uppercase"
                      fontSize="xs"
                    >
                      {equipment.status}
                    </Badge>
                  }
                />
              </GridItem>

              {/* Condition */}
              <GridItem>
                <DetailItem
                  icon={BsActivity}
                  label="Condition"
                  value={
                    <Badge
                      colorScheme={getEqConditionColor(equipment.condition)}
                      borderRadius="full"
                      px={3}
                      py={1}
                      textTransform="uppercase"
                      fontSize="xs"
                    >
                      {equipment.condition}
                    </Badge>
                  }
                />
              </GridItem>
            </Grid>
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
          Serial Number: {id}
        </Text>
      </Box>

      <Tag size="sm" variant="subtle" colorScheme="gray" borderRadius="full">
        {type}
      </Tag>
    </Flex>
  </Box>
);

export default ViewEquipmentModal;
