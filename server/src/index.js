import express from "express";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import equipmentRoutes from "./routes/equipmentRoutes.js";
import statRoutes from "./routes/statRoutes.js";
import requestRoutes from "./routes/requestsRoutes.js";
import activityRoutes from "./routes/activityRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import settingsRoutes from "./routes/settingsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

// Helps to parse incoming JSON data
app.use(express.json());

// Controls how your server responds to requests from other origins
app.use(
  cors({
    origin: "http://localhost:5173", // Your frontend origin
    credentials: true, // Required to accept cookies
  })
);

// Helmet is a security middleware that helps protect the app by setting various HTTP headers
app.use(helmet());

// Logs HTTP requests in the console
app.use(morgan("dev"));

// Parse cookies
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/equipment", equipmentRoutes);
app.use("/api/stats", statRoutes);
app.use("/api/requests", requestRoutes);
app.use("/api/activities", activityRoutes);
app.use("/api/users", userRoutes);
app.use("/api/settings", settingsRoutes);

// Start the server on the specified port
app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on port: ${PORT}\n`);
});
