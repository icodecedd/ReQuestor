import {
  Box,
  Grid,
  Text,
  Heading,
  VStack,
  HStack,
  Flex,
  useBreakpointValue,
} from "@chakra-ui/react";
import { motion } from "framer-motion";
import { Card, CardBody } from "@chakra-ui/react";

// Motion wrappers
const MotionBox = motion(Box);

const TimelineCard = ({ steps }) => {
  const isDesktop = useBreakpointValue({ base: false, lg: true });

  return (
    <Box position="relative" w="full" py={12}>
      {/* Desktop Timeline */}
      {isDesktop && (
        <Box position="relative">
          {/* Timeline Line */}
          <Box
            position="absolute"
            top="45%"
            left={0}
            right={0}
            h="2px"
            bgGradient="linear(to-r, maroon, #a83232)"
            transform="translateY(-50%)"
            borderRadius="full"
          />

          <Grid templateColumns="repeat(4, 1fr)" gap={8} position="relative">
            {steps.map((step, index) => {
              const IconComponent = step.icon;
              return (
                <Box key={index} position="relative" gridColumn={index + 1}>
                  {/* Timeline Node */}
                  <Box
                    position="absolute"
                    top="45%"
                    left="50%"
                    transform="translate(-50%, -50%)"
                    w={6}
                    h={6}
                    bg="maroon"
                    border="4px solid"
                    borderColor="white"
                    borderRadius="full"
                    boxShadow="md"
                    zIndex={10}
                  />

                  <MotionBox
                    mt={16}
                    whileHover={{ y: -8, boxShadow: "lg" }}
                    transition={{ duration: 0.3 }}
                  >
                    <Card
                      bg="whiteAlpha.800"
                      backdropFilter="blur(6px)"
                      border="none"
                      shadow="md"
                      _hover={{ shadow: "xl" }}
                    >
                      <CardBody textAlign="center" p={8}>
                        <Flex
                          mb={6}
                          w={16}
                          h={16}
                          mx="auto"
                          align="center"
                          justify="center"
                          borderRadius="2xl"
                          bgGradient="linear(to-br, maroonAlpha.100, maroonAlpha.50)"
                          _groupHover={{
                            bgGradient:
                              "linear(to-br, maroonAlpha.200, maroonAlpha.100)",
                          }}
                        >
                          <IconComponent
                            size={28}
                            color="maroon"
                            style={{ transition: "transform 0.3s" }}
                          />
                        </Flex>

                        <Text
                          fontSize="sm"
                          fontWeight="semibold"
                          color="maroon"
                          mb={2}
                        >
                          STEP {step.step}
                        </Text>

                        <Heading
                          as="h3"
                          fontSize="xl"
                          fontWeight="semibold"
                          mb={4}
                          color="gray.800"
                          _groupHover={{ color: "maroon" }}
                          transition="color 0.3s"
                        >
                          {step.title}
                        </Heading>

                        <Text color="gray.600" lineHeight="tall">
                          {step.description}
                        </Text>
                      </CardBody>
                    </Card>
                  </MotionBox>
                </Box>
              );
            })}
          </Grid>
        </Box>
      )}

      {/* Mobile Timeline */}
      {!isDesktop && (
        <VStack spacing={8} align="stretch">
          {steps.map((step, index) => {
            const IconComponent = step.icon;
            return (
              <Box key={index} position="relative">
                {/* Connector Line */}
                {index < steps.length - 1 && (
                  <Box
                    position="absolute"
                    left="32px"
                    top="80px"
                    w="2px"
                    h="64px"
                    bgGradient="linear(to-b, maroon, #a83232)"
                  />
                )}

                <HStack align="start" spacing={6}>
                  <Flex
                    w={16}
                    h={16}
                    borderRadius="2xl"
                    bgGradient="linear(to-br, maroonAlpha.100, maroonAlpha.50)"
                    align="center"
                    justify="center"
                    flexShrink={0}
                  >
                    <IconComponent size={28} color="maroon" />
                  </Flex>

                  <VStack align="start" spacing={2}>
                    <Text fontSize="sm" fontWeight="semibold" color="maroon">
                      STEP {step.step}
                    </Text>
                    <Heading as="h3" fontSize="xl" fontWeight="semibold">
                      {step.title}
                    </Heading>
                    <Text color="gray.600">{step.description}</Text>
                  </VStack>
                </HStack>
              </Box>
            );
          })}
        </VStack>
      )}

      {/* Bottom CTA */}
      <Box textAlign="center" mt={16}>
        <HStack
          spacing={2}
          fontSize="sm"
          color="gray.600"
          bg="whiteAlpha.700"
          px={6}
          py={3}
          borderRadius="full"
          display="inline-flex"
          backdropFilter="blur(6px)"
          borderWidth="1px"
          borderColor="gray.200"
        >
          <Text as="span">⚡</Text>
          <Text>Average processing time: Under 5 minutes</Text>
        </HStack>
      </Box>
    </Box>
  );
};

export default TimelineCard;
