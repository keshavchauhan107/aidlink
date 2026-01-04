import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";

const app = express();

/**
 * MIDDLEWARES
 */
const allowedOrigins = [
  "http://localhost:4200",
  "https://aidlinks.netlify.app"
];

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (Postman, curl, server-to-server)
      if (!origin) return callback(null, true);

      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }

      return callback(new Error("Not allowed by CORS"));
    },
    credentials: true
  })
);

app.use(express.json());

/**
 * ROUTES
 */
app.use("/users", userRoutes);
app.use("/posts", postRoutes);

/**
 * HEALTH CHECK
 */
app.get("/health", (_req, res) => {
  res.json({ status: "ok" });
});

export default app;
