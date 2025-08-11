import { formatTime } from "@/utils/formatTime";
import {
  Box,
  Button,
  Flex,
  Grid,
  GridItem,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
  Badge,
} from "@chakra-ui/react";
import { FiInfo, FiClock, FiCalendar } from "react-icons/fi";

const MAROON = "#800000";
const MAROON_DARK = "#6A0D0D";
const DARK_GRAY = "#616161";
const MAROON_HOVER = "#A52A2A";

const ScheduleDetailsModal = ({
  isOpen,
  onClose,
  scheduleDetails,
  onOpenAddRequest,
}) => {
  const items = scheduleDetails?.data;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      size="lg"
      motionPreset="slideInBottom"
    >
      <ModalOverlay bg="blackAlpha.400" backdropFilter="blur(4px)" />
      <ModalContent
        borderRadius="2xl"
        overflow="hidden"
        top="5%"
        boxShadow="2xl"
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
              <FiInfo size={24} />
            </Box>
            <Box>
              <Text fontSize="xl" fontWeight="bold" color={MAROON_DARK}>
                Equipment Availability Summary
              </Text>
              <Text color="gray.600" fontSize="sm">
                Review availability for your selected time slot
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

        {/* BODY */}
        <ModalBody px={6} py={4} bg="gray.50">
          {/* Time Slot Card */}
          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="lg"
            p={4}
            mb={4}
            boxShadow="sm"
          >
            <Grid templateColumns="repeat(2, 1fr)" gap={4}>
              <GridItem>
                <Flex align="center" gap={2}>
                  <FiCalendar color={MAROON} />
                  <Text fontSize="sm" color={DARK_GRAY}>
                    <strong>Date:</strong> {scheduleDetails.date_use}
                  </Text>
                </Flex>
              </GridItem>
              <GridItem>
                <Flex align="center" gap={2}>
                  <FiClock color={MAROON} />
                  <Text fontSize="sm" color={DARK_GRAY}>
                    <strong>Time:</strong>{" "}
                    {formatTime(scheduleDetails.time_from)} -{" "}
                    {formatTime(scheduleDetails.time_to)}
                  </Text>
                </Flex>
              </GridItem>
            </Grid>
          </Box>

          {/* Equipment Availability */}
          <Text fontSize="md" fontWeight="semibold" mb={3} color={MAROON_DARK}>
            Equipment Status
          </Text>

          <Box
            bg="white"
            border="1px solid"
            borderColor="gray.100"
            borderRadius="lg"
            p={4}
            boxShadow="sm"
          >
            {items?.length > 0 ? (
              <Grid templateColumns="repeat(2, 1fr)" gap={4}>
                {items.map((item, index) => (
                  <GridItem key={`equip-${index}`}>
                    <Box
                      p={3}
                      borderLeft={`4px solid ${MAROON}`}
                      bg={`${MAROON}05`}
                      borderRadius="md"
                      transition="all 0.2s"
                      _hover={{ bg: `${MAROON}08` }}
                    >
                      <Text fontWeight="bold" color={MAROON_DARK}>
                        {item.type}
                      </Text>
                      <Flex align="center" mt={1}>
                        <Badge
                          colorScheme={
                            item.available_count > 0 ? "green" : "red"
                          }
                          variant="subtle"
                          fontSize="xs"
                          borderRadius="full"
                        >
                          {item.available_count > 0
                            ? "Available"
                            : "Unavailable"}
                        </Badge>
                        <Text ml={2} fontSize="sm" color="gray.600">
                          {item.available_count} unit(s)
                        </Text>
                      </Flex>
                    </Box>
                  </GridItem>
                ))}
              </Grid>
            ) : (
              <Text fontSize="sm" color="gray.500" textAlign="center" py={4}>
                No equipment data available
              </Text>
            )}
          </Box>

          <Text mt={4} fontSize="sm" color="gray.600" textAlign="center">
            <b>Note:</b> Availability is subject to change. Your request will be
            confirmed upon submission.
          </Text>
        </ModalBody>

        {/* FOOTER */}
        <ModalFooter
          borderTop="1px solid"
          borderTopColor="gray.100"
          px={6}
          py={4}
          bg="white"
        >
          <Button
            flex={1}
            variant="outline"
            mr={3}
            onClick={onClose}
            color={MAROON}
            borderColor={MAROON}
            _hover={{ bg: `${MAROON}10` }}
          >
            Cancel
          </Button>
          <Button
            flex={1}
            bg={MAROON}
            color="white"
            _hover={{ bg: MAROON_HOVER }}
            onClick={() => onOpenAddRequest()}
            isDisabled={items?.some((item) => item.available_count <= 0)}
          >
            Reserve Available Equipment
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ScheduleDetailsModal;
