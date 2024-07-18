import express from "express";

const router = express.Router();

router.get("/login", (req, res) => {
  res.json({
    message: "Hello World From Login",
  });
});
export default router;
