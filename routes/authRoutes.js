import express from "express";

import { register, verifyEmail } from "../controllers/authController.js";

const router = express.Router();

router.get("/login", (req, res) => {
  res.json({
    message: "Hello World From Login",
  });
});

router.post("/register", register);

router.get("/verify-email", verifyEmail);

export default router;
