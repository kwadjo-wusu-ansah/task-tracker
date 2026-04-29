import express from "express";
import { config } from "./config/config.js";
import taskRoutes from "./routes/taskRoutes.js";
import { requestLogger } from "./middlewares/logger.js";
import { errorHandler } from "./middlewares/errorHandler.js";
import { notFoundHandler } from "./middlewares/notFoundHandler.js";
import { connectDB } from "./config/db.js";

const app = express();
connectDB();

app.use(requestLogger);
app.use(express.json()); // middleware for parsing the req body
app.use("/api/tasks", taskRoutes);
app.use(notFoundHandler);
app.use(errorHandler);

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
