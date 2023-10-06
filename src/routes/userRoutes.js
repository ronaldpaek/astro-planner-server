import express from "express";

import * as userController from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/index.js";

const router = express.Router();

// Public route
router.post("/signup", userController.signup);
router.post("/login", userController.login);

// Protected route
router.get("/protected", authMiddleware, (req, res, next) => {
  return res
    .status(200)
    .json({ success: true, message: "You are authorized!" });
});

export default router;
