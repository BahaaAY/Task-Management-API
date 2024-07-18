import express from "express";
import { connect } from "mongoose";
import dotenv from "dotenv";

dotenv.config();

import authRoutes from "./routes/authRoutes.js";

const PORT = process.env.PORT || 3000;
const mongdb_url = process.env.MONGODB_URL;
const app = express();

app.use(express.json());
app.use("/auth", authRoutes);
app.get("/", (req, res) => {
  res.json({
    message: "Hello World",
  });
});

connect(mongdb_url, {})
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => console.log(err));
