import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";

const PORT = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
