import {
  Box,
  Heading,
  Text,
  HStack,
  Flex,
  Center,
  Skeleton,
  useColorModeValue,
  VStack,
} from "@chakra-ui/react";
import {
  ResponsiveContainer,
  Pie,
  PieChart,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { useStatsStore } from "@/store/statsStore";

// Maroon color palette with gradient
const COLORS = [
  "#5a0000", // Dark maroon
  "#800000", // Classic maroon
  "#a04545", // Medium maroon
  "#c87c7c", // Light maroon
  "#e0b1b1", // Very light maroon
  "#f5d3d3", // Lightest maroon
];

const maxVisibleItems = 4;

const CustomLegend = ({ data }) => {
  const textColor = useColorModeValue("gray.600", "gray.300");
  const total = data.reduce((sum, item) => sum + item.value, 0);

  return (
    <Box>
      {data.map((entry, index) => {
        const percent = ((entry.value / total) * 100).toFixed(1);
        return (
          <Flex
            key={index}
            align="center"
            mb={2}
            justify="space-between"
            px={3}
            borderRadius="md"
            _hover={{ bg: "#f7eaea" }}
          >
            <HStack spacing={2}>
              <Box
                w="12px"
                h="12px"
                borderRadius="full"
                bg={COLORS[index % COLORS.length]}
                boxShadow="sm"
              />
              <Text fontSize="sm" color={textColor} fontWeight="medium">
                {entry.name}
              </Text>
            </HStack>
            <Text fontSize="sm" fontWeight="semibold" color="maroon.600">
              {percent}%
            </Text>
          </Flex>
        );
      })}
    </Box>
  );
};

const PieGraph = () => {
  const { stats, loading } = useStatsStore();
  const cardBg = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");
  const headingColor = useColorModeValue("maroon.600", "maroon.300");
  const subTextColor = useColorModeValue("gray.500", "gray.400");

  // fallback to [] if undefined/null
  const pieRaw = (stats?.pieGraph ?? []).map((item) => ({
    name: item.name,
    value: Number(item.value),
  }));
  const sorted = [...pieRaw].sort((a, b) => b.value - a.value);
  const visible = sorted.slice(0, maxVisibleItems);
  const hidden = sorted.slice(maxVisibleItems);
  const othersValue = hidden.reduce((sum, item) => sum + item.value, 0);
  const pieData = [
    ...visible,
    ...(othersValue > 0 ? [{ name: "Others", value: othersValue }] : []),
  ];

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
      <VStack align="flex-start" spacing={0} mb={4}>
        <Heading size="md" fontWeight="semibold" color={headingColor}>
          Equipment by Category
        </Heading>
        <Text fontSize="sm" color={subTextColor}>
          Distribution across equipment categories
        </Text>
      </VStack>

      {pieRaw.length > 0 ? (
        <ResponsiveContainer width="100%" height="85%">
          <PieChart>
            <Pie
              data={pieData}
              cy={90}
              innerRadius={60}
              outerRadius={90}
              paddingAngle={2}
              dataKey="value"
              animationBegin={0}
              animationDuration={1000}
              animationEasing="ease-out"
            >
              {pieData.map((entry, index) => (
                <Cell
                  key={`cell-${entry.name}`}
                  fill={COLORS[index % COLORS.length]}
                  stroke={cardBg}
                  strokeWidth={2}
                />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                borderRadius: "8px",
                border: "none",
                boxShadow: "0 4px 12px rgba(0,0,0,0.15)",
                backgroundColor: cardBg,
              }}
              itemStyle={{
                color: subTextColor,
                fontSize: 12,
                fontWeight: 500,
              }}
              labelStyle={{
                fontWeight: 600,
                color: headingColor,
                marginBottom: 4,
              }}
              formatter={(value, name) => [`${value} units`, name]}
            />
            <Legend content={<CustomLegend data={pieData} />} />
          </PieChart>
        </ResponsiveContainer>
      ) : (
        <Center h="80%">
          <VStack spacing={2}>
            <Heading size="sm" color="gray.500">
              No equipment data
            </Heading>
            <Text fontSize="sm" color="gray.400">
              Add equipment to see distribution
            </Text>
          </VStack>
        </Center>
      )}
    </Box>
  );
};

export default PieGraph;
