import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import '@/assets/global.css';

function App() {
  return (
    <Box>
      <Router>
        <AdminRoutes />
      </Router>
    </Box>
  );
}

export default App;
