import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import equipmentRoutes from "./routes/equipmentRoutes.js";
import statRoutes from "./routes/statRoutes.js";
import requestRoutes from "./routes/requestsRoutes.js"
import activityRoutes from "./routes/activityRoutes.js"

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Helps to parse incoming JSON data
app.use(express.json());

// Controls how your server responds to requests from other origins
app.use(cors());

// Helmet is a security middleware that helps protect the app by setting various HTTP headers
app.use(helmet());

// Logs HTTP requests in the console
app.use(morgan("dev"));

app.use("/api/equipment", equipmentRoutes);
app.use("/api/stats", statRoutes);
app.use("/api/requests", requestRoutes)
app.use("/api/activities", activityRoutes)

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`\n🚀 Server is running at: http://localhost:${PORT}\n`);
});
