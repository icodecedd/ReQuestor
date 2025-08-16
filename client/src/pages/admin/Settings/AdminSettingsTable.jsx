import { Box, Tabs, TabList, Tab, TabPanels, TabPanel, Button, Flex } from "@chakra-ui/react";
import { FiSave } from "react-icons/fi";

const AdminSettingsTable = () => {
  return (
    <Box w="99.5%" mx="auto" p={8}>
      {/* Save Changes Button */}
      <Flex align="flex-end" gap={3} mb={2}>
        <Button
          ml="auto"
          variant="primary"
          bg="#800000"
          color="white"
          borderRadius="lg"
          _hover={{ bg: "#a12828" }}
          transition="background-color 0.2s ease-in-out"
          gap={1}
          p={3}
          fontSize="95%"
          w="150px"
          //onClick={() => setAddRequestOpen(true)}
        >
          <FiSave size="20px" />
          Save Changes
        </Button>
      </Flex>
      <Tabs isFitted variant="unstyle" size="sm">
        <TabList bg="#e9e9e9ff" borderRadius="lg" p={1.5} pr={1.5} pl={1.5}>
          {["General", "Notifications", "Security", "System"].map((tab) => (
            <Tab
              key={tab}
              _selected={{
                bg: "white",
                color: "black",
                borderRadius: "md",
                boxShadow: "0 0.5px 1px rgba(0, 0, 0, 0.15)",
              }}
              borderRadius="md"
              color="#71717e"
              fontWeight="bold"
            >
              {tab}
            </Tab>
          ))}
        </TabList>
        <TabPanels>
          <TabPanel>
            General
          </TabPanel>
          <TabPanel>Notifications</TabPanel>
          <TabPanel>Security</TabPanel>
          <TabPanel>System</TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminSettingsTable;
