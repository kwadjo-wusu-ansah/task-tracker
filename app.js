import express from "express";
import { config } from "./config/config.js";

const app = express();

app.use(express.json()); // middleware for parsing the req body

app.get("/", (req, res) => {
  res.send("Hello World! Server is running.");
});

app.listen(config.port, () => {
  console.log(`Server is running on http://localhost:${config.port}`);
});
