import express from "express";

import { register } from "../controllers/authController.js";

const router = express.Router();

router.get("/login", (req, res) => {
  res.json({
    message: "Hello World From Login",
  });
});

router.post("/register", register);
export default router;
