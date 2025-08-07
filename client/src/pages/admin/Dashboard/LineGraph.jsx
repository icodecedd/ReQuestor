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
} from "@chakra-ui/react";
import {
  LineChart,
  Line,
  Tooltip,
  ResponsiveContainer,
  XAxis,
  YAxis,
  CartesianGrid,
  Bar,
} from "recharts";
import { useStatsStore } from "@/store/statsStore";

const LineGraph = () => {
  const { stats, loading } = useStatsStore();

  // Color palette
  const colors = {
    approved: "#166534", // Dark green
    rejected: "#800000", // Maroon
    cancelled: "#a04040", // Light maroon
    accent: "#c75d5d", // Light maroon
    grid: "#e2e8f0", // Grid color
    cardBg: "white",
    borderColor: "gray.200",
    textColor: "gray.600",
  };

  // Mock Data
  const normalizedStats = [
    { month: "Jan", approved: 5, rejected: 2, cancelled: 3 },
    { month: "Feb", approved: 8, rejected: 3, cancelled: 1 },
    { month: "Mar", approved: 6, rejected: 5, cancelled: 3 },
    { month: "Apr", approved: 4, rejected: 0, cancelled: 5 },
    { month: "May", approved: 10, rejected: 1, cancelled: 4 },
    { month: "Jun", approved: 2, rejected: 2, cancelled: 4 },
    { month: "Jul", approved: 4, rejected: 0, cancelled: 2 },
    { month: "Aug", approved: 10, rejected: 1, cancelled: 4 },
    { month: "Sep", approved: 3, rejected: 0, cancelled: 7 },
    { month: "Oct", approved: 10, rejected: 2, cancelled: 4 },
    { month: "Nov", approved: 18, rejected: 0, cancelled: 9 },
    { month: "Dec", approved: 1, rejected: 0, cancelled: 4 },
  ];

  function normalizeStats(stats) {
    const fullMonths = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];

    return fullMonths.map((abbrev) => {
      // Find the stat object with the matching month
      const found = stats.find((entry) => entry.month === abbrev);

      return {
        month: abbrev,
        approved: found ? found.approved : 0,
        rejected: found ? found.rejected : 0,
        cancelled: found ? found.cancelled : 0,
      };
    });
  }

  // const normalizedStats = normalizeStats(stats.LineGraph);

  if (loading) {
    return (
      <Skeleton height="420px" width="100%" borderRadius="2xl" boxShadow="sm" />
    );
  }

  return (
    <Box
      bg={colors.cardBg}
      borderRadius="2xl"
      p={6}
      boxShadow="sm"
      border="1px solid"
      borderColor={colors.borderColor}
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
            Request Trends
          </Heading>
          <Text fontSize="sm" color={colors.textColor}>
            Monthly request patterns over time
          </Text>
        </VStack>

        {/* Legend */}
        <HStack spacing={4}>
          <HStack spacing={2}>
            <Circle size="12px" bg={colors.approved} />
            <Text fontSize="sm" color={colors.textColor} fontWeight="medium">
              Approved
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Circle size="12px" bg={colors.rejected} />
            <Text fontSize="sm" color={colors.textColor} fontWeight="medium">
              Rejected
            </Text>
          </HStack>
          <HStack spacing={2}>
            <Circle size="12px" bg={colors.cancelled} />
            <Text fontSize="sm" color={colors.textColor} fontWeight="medium">
              Cancelled
            </Text>
          </HStack>
        </HStack>
      </Flex>

      {/* Chart */}
      {loading ? (
        <Skeleton height="300px" borderRadius="lg" />
      ) : normalizedStats?.length > 0 ? (
        <ResponsiveContainer width="100%" height="80%">
          <LineChart
            data={normalizedStats}
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
              tick={{ fontSize: 12, color: colors.textColor }}
            />
            <YAxis
              allowDecimals={false}
              axisLine={false}
              tickLine={false}
              tick={{ fontSize: 12, color: colors.textColor }}
            />
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                backgroundColor: colors.cardBg,
              }}
              itemStyle={{
                color: colors.textColor,
                fontSize: 12,
                fontWeight: 500,
              }}
              labelStyle={{
                fontWeight: 600,
                color: "maroon.600",
                marginBottom: 4,
              }}
            />
            <Line
              type="monotone"
              dataKey="approved"
              stroke={colors.approved}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="rejected"
              stroke={colors.rejected}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
            <Line
              type="monotone"
              dataKey="cancelled"
              stroke={colors.cancelled}
              strokeWidth={3}
              dot={{ r: 4 }}
              activeDot={{ r: 6, strokeWidth: 0 }}
            />
          </LineChart>
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

export default LineGraph;
