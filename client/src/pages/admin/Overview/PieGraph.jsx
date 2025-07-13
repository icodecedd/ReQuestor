import { Box, Heading, Text, HStack, Flex } from "@chakra-ui/react";
import {
  ResponsiveContainer,
  Pie,
  PieChart,
  Tooltip,
  Cell,
  Legend,
} from "recharts";

// TODO: Change With Real Data
const rawData = [
  { name: "Projector", value: 12 },
  { name: "White Screen", value: 5 },
  { name: "AVR 1", value: 1 },
  { name: "AVR 2", value: 1 },
];

const COLORS = ["#800000", "#a94444", "#c87c7c", "#e0b1b1", "#f5d3d3ff"];
const maxVisibleItems = 4;

const CustomLegend = ({ data }) => {
  const total = data.reduce((sum, item) => sum + item.value, 0);
  return (
    <Box>
      {data.map((entry, index) => {
        const percent = ((entry.value / total) * 100).toFixed(1);
        return (
          <Flex key={index} align="center" mb={0.5} justify="space-between">
            <HStack>
              <Box
                w="10px"
                h="10px"
                borderRadius="full"
                bg={COLORS[index % COLORS.length]}
                mr={1}
              />
              <Text fontSize="sm">{entry.name}</Text>
            </HStack>
            <Text fontSize="sm" fontWeight="medium">
              {percent}%
            </Text>
          </Flex>
        );
      })}
    </Box>
  );
};

const OverviewPieGraph = () => {
  const sorted = [...rawData].sort((a, b) => b.value - a.value); // sort by value desc
  const visible = sorted.slice(0, maxVisibleItems);
  const hidden = sorted.slice(maxVisibleItems);
  const othersValue = hidden.reduce((sum, item) => sum + item.value, 0);
  const pieData = [
    ...visible,
    ...(othersValue > 0 ? [{ name: "Others", value: othersValue }] : []),
  ];

  return (
    <Box bg="white" borderRadius="2xl" p={5} boxShadow="md" w="100%" h="420px">
      <Heading size="md">Equipment by Category</Heading>
      <Text fontSize="13px" textColor="gray.500">
        Equipment distribution
      </Text>
      <ResponsiveContainer width="100%" height="90%">
        <PieChart>
          <Pie
            data={pieData}
            cy={100}
            innerRadius={50}
            outerRadius={90}
            fill="#8884d8"
            paddingAngle={5}
            dataKey="value"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${entry.name}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{ borderRadius: "8px", backgroundColor: "#fff" }}
          />
          <Legend content={<CustomLegend data={pieData} />} />
        </PieChart>
      </ResponsiveContainer>
    </Box>
  );
};

export default OverviewPieGraph;
