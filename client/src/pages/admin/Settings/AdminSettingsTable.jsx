import {
  Box,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Button,
  Flex,
  Heading,
  Text,
} from "@chakra-ui/react";
import { AiFillNotification } from "react-icons/ai";
import { FiBell, FiDatabase, FiGlobe, FiSave, FiShield } from "react-icons/fi";

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
          <TabPanel mt={2} p={0}>
            <Box borderRadius="md" border={"1px solid #e2e8f0"} p={3}>
              <Flex gap={3} alignItems={"center"}>
                <FiGlobe size="22px" />
                <Heading fontSize="25px" fontWeight={"semibold"}>
                  General Settings
                </Heading>
              </Flex>
              <Text fontSize="sm" mb={2} color="#71717e">
                Configure basic system settings and preferences
              </Text>
            </Box>
          </TabPanel>
          <TabPanel mt={2} p={0}>
            <Box borderRadius="md" border={"1px solid #e2e8f0"} p={3}>
              <Flex gap={3} alignItems={"center"}>
                <FiBell size="22px" />
                <Heading fontSize="25px" fontWeight={"semibold"}>
                  Notification
                </Heading>
              </Flex>
              <Text fontSize="sm" mb={2} color="#71717e">
                Configure how and when you receive notifications
              </Text>
            </Box>
          </TabPanel>
          <TabPanel mt={2} p={0}>
            <Box borderRadius="md" border={"1px solid #e2e8f0"} p={3}>
              <Flex gap={3} alignItems={"center"}>
                <FiShield size="22px" />
                <Heading fontSize="25px" fontWeight={"semibold"}>
                  Security Settings
                </Heading>
              </Flex>
              <Text fontSize="sm" mb={2} color="#71717e">
                Configure security policies and access controls
              </Text>
            </Box>
          </TabPanel>
          <TabPanel mt={2} p={0}>
            <Box borderRadius="md" border={"1px solid #e2e8f0"} p={3}>
              <Flex gap={3} alignItems={"center"}>
                <FiDatabase size="22px" />
                <Heading fontSize="25px" fontWeight={"semibold"}>
                  System Settings
                </Heading>
              </Flex>
              <Text fontSize="sm" mb={2} color="#71717e">
                Configure system settings and preferences
              </Text>
            </Box>
          </TabPanel>
        </TabPanels>
      </Tabs>
    </Box>
  );
};

export default AdminSettingsTable;
