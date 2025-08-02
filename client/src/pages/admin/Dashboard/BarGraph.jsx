import {
  Box,
  Heading,
  Text,
  HStack,
  Circle,
  Flex,
  VStack,
  Center,
  Skeleton,
  useColorModeValue,
} from "@chakra-ui/react";
import {
  BarChart,
  Bar,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
} from "recharts";
import { useStatsStore } from "@/store/statsStore";

const BarGraph = () => {
  const { loading } = useStatsStore();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const textColor = useColorModeValue("gray.600", "gray.400");

  // Color palette
  const colors = {
    approved: "#166534", // Dark green
    pending: "#800000", // Maroon
    accent: "#c75d5d", // Light maroon
    grid: "#e2e8f0", // Grid color
  };

  // Mock Data
  const data = {
    barGraph: [
      { month: "Jan", approved: 5, pending: 3 },
      { month: "Feb", approved: 8, pending: 1 },
      { month: "Mar", approved: 6, pending: 3 },
      { month: "Apr", approved: 4, pending: 5 },
      { month: "May", approved: 10, pending: 4 },
      { month: "Jun", approved: 2, pending: 4 },
      { month: "Jul", approved: 4, pending: 2 },
      { month: "Aug", approved: 10, pending: 4 },
      { month: "Sep", approved: 3, pending: 7 },
      { month: "Oct", approved: 10, pending: 4 },
      { month: "Nov", approved: 18, pending: 9 },
      { month: "Dec", approved: 1, pending: 4 },
    ],
  };

  if (loading) {
    return (
      <Skeleton height="420px" width="100%" borderRadius="2xl" boxShadow="sm" />
    );
  }

  return (
    <Box
      bg={cardBg}
      borderRadius="2xl"
      p={6}
      boxShadow="sm"
      border="1px solid"
      borderColor={borderColor}
      w="100%"
      h="420px"
      transition="all 0.3s ease"
      _hover={{
        boxShadow: "md",
        transform: "translateY(-2px)",
      }}
    >
      {/* Header */}
      <Flex justify="space-between" mb={6} align="flex-end">
        <VStack align="flex-start" spacing={0}>
          <Heading size="md" fontWeight="semibold" color="maroon.600">
            Request Overview
          </Heading>
          <Text fontSize="sm" color={textColor}>
            Monthly approvals and pending requests
          </Text>
        </VStack>

        {/* Legend */}
        <HStack spacing={4}>
          <HStack spacing={2}>
            <Circle size="12px" bg={colors.approved} />
            <Text fontSize="sm" color={textColor} fontWeight="medium">
              Approved
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Circle size="12px" bg={colors.pending} />
            <Text fontSize="sm" color={textColor} fontWeight="medium">
              Pending
            </Text>
          </HStack>
        </HStack>
      </Flex>

      {/* Chart */}
      {loading ? (
        <Skeleton height="300px" borderRadius="lg" />
      ) : data?.barGraph.length > 0 ? (
        <ResponsiveContainer width="100%" height="80%">
          <BarChart
            data={data.barGraph}
            margin={{ top: 5, right: 5, left: -20 }}
          >
            <CartesianGrid
              strokeDasharray="3 3"
              vertical={false}
              stroke={colors.grid}
            />
            <XAxis
              dataKey="month"
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, color: textColor }}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, color: textColor }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                backgroundColor: cardBg,
              }}
              itemStyle={{
                color: textColor,
                fontSize: 12,
                fontWeight: 500,
              }}
              labelStyle={{
                fontWeight: 600,
                color: "maroon.600",
                marginBottom: 4,
              }}
            />
            <Bar
              dataKey="approved"
              fill={colors.approved}
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
            <Bar
              dataKey="pending"
              fill={colors.pending}
              radius={[4, 4, 0, 0]}
              barSize={24}
            />
          </BarChart>
        </ResponsiveContainer>
      ) : (
        <Center h="80%">
          <VStack>
            <Heading size="sm" color="gray.500" mb={2}>
              No request data available
            </Heading>
            <Text fontSize="sm" color="gray.500">
              Submit new requests to see analytics
            </Text>
          </VStack>
        </Center>
      )}
    </Box>
  );
};

export default BarGraph;
