import express from "express";
import cors from "cors";

import userRoutes from "./routes/user.routes";
import postRoutes from "./routes/post.routes";

const app = express();

/**
 * MIDDLEWARES
 */
app.use(cors({
  origin: "http://localhost:4200" // Angular dev URL
}));

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
