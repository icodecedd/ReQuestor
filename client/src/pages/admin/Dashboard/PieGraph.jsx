import {
  Box,
  Heading,
  Text,
  HStack,
  Flex,
  Center,
  Skeleton,
} from "@chakra-ui/react";
import {
  ResponsiveContainer,
  Pie,
  PieChart,
  Tooltip,
  Cell,
  Legend,
} from "recharts";
import { useStats } from "@/hooks/useStatistics";

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
  const { /*data,*/ loading } = useStats();

  // Mock Data
  const data = {
   pieGraph: [
    { name: "Projector", value: 11 },
    { name: "White Screen", value: 9 },
    { name: "AVR", value: 2 },
   ],
  };

  // fallback to [] if undefined/null
  const pieRaw = (data?.pieGraph ?? []).map((item) => ({
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

  return (
    <Box bg="white" borderRadius="2xl" p={5} boxShadow="md" w="100%" h="420px">
      <Heading size="md">Equipment by Category</Heading>
      <Text fontSize="13px" textColor="gray.500">
        Equipment distribution
      </Text>

      {loading ? (
        <Skeleton
          height="300px"
          width="96%"
          borderRadius="lg"
          mx="auto"
          mt={5}
        />
      ) : pieRaw.length > 0 ? (
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
      ) : (
        <Center h="80%">
          <Heading fontSize="14px" color="#4a5568">
            No data available
          </Heading>
        </Center>
      )}
    </Box>
  );
};

export default OverviewPieGraph;
