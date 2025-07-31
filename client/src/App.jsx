import { Box } from "@chakra-ui/react";
import { BrowserRouter as Router } from "react-router-dom";
import AdminRoutes from "./routes/AdminRoutes";
import '@/assets/global.css';
import LoginPage from "./pages/LoginPage";
import { useState } from "react";

function App() {
  const [isAuthenticated, setAuthenticated] = useState(false);

  return (
    <Box>
        {isAuthenticated ? (
          <AdminRoutes />
        ) : (
          <LoginPage onLogin={setAuthenticated} />
        )}
      {/* <Router>*/}
      {/*   <AdminRoutes />*/}
      {/* </Router>*/}
    </Box>
  );
}

export default App;
