import express from "express";

import { register, login, me } from "../controllers/userControllers.js";
import { authMiddleware } from "../middlewares/index.js";

const router = express.Router();

// Unprotected routes
router.post("/register", register);
router.post("/login", login);

// Protected routes
router.get("/me", authMiddleware, me);

export default router;
