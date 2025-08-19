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

// Import your middleware
import { verifyToken } from "./middleware/verifyToken.js";
import { checkMaintenance } from "./middleware/checkMaintenance.js";
import { checkAuth } from "./middleware/checkAuth.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5001;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);
app.use(helmet());
app.use(morgan("dev"));
app.use(cookieParser());

// Public routes (no middleware)
app.use("/api/auth", authRoutes);

// Protected routes (with middleware)
app.use(
  "/api/equipment",
  verifyToken,
  checkMaintenance,
  checkAuth,
  equipmentRoutes
);
app.use("/api/stats", verifyToken, checkMaintenance, checkAuth, statRoutes);
app.use(
  "/api/requests",
  verifyToken,
  checkMaintenance,
  checkAuth,
  requestRoutes
);
app.use(
  "/api/activities",
  verifyToken,
  checkMaintenance,
  checkAuth,
  activityRoutes
);
app.use("/api/users", verifyToken, checkMaintenance, checkAuth, userRoutes);
app.use(
  "/api/settings",
  verifyToken,
  checkMaintenance,
  checkAuth,
  settingsRoutes
);

app.listen(PORT, () => {
  console.log(`\n🚀 Server is running on port: ${PORT}\n`);
});
