import express from "express";
import prisma from "../db/prismaClient.js";

import * as userController from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/index.js";

const router = express.Router();
router.use(authMiddleware);

export default router;
