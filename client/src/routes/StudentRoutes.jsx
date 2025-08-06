import { useAuth } from "@/hooks/useAuth";
import { Button, Text } from "@chakra-ui/react";
import React from "react";

const StudentRoutes = () => {
  const { logout } = useAuth();

  return (
    <div align="center">
      <Text
        fontSize="2xl"
        fontWeight="bold"
        textAlign="center"
        mt={10}
        color="gray.700"
      >
        Student Routes Coming Soon!
      </Text>
      {/* Placeholder for future student routes */}
      {/* You can add more components or routes here as needed */}
      <Button variant="primary" bg="maroon" color="white" onClick={() => logout()}>Logout</Button>
    </div>
  );
};

export default StudentRoutes;
