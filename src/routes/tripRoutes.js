import express from "express";
import prisma from "../db/prismaClient.js";

import * as userController from "../controllers/userController.js";
import { authMiddleware } from "../middlewares/index.js";

const router = express.Router();
router.use(authMiddleware);

// GET /trips
router.get("/", async (req, res) => {
  try {
    const trip = await prisma.trip.findMany();
    const data = {
      success: true,
      trip,
    };
    res.json({ data });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

//  POST /trips

router.post("/", async (req, res) => {
  console.log(req.user);
  try {
    const { checkIn, checkOut, passengers, location } = req.body;
    // const userId = req.user ? req.user.id : null;
    if (!location || !checkIn || !checkOut || !passengers) {
      return res.send({
        success: false,
        error: "You must provide all fields to create a trip",
      });
    }
    if (!req.user) {
      return res.send({
        success: false,
        error: "Login to create a trip.",
      });
    }
    const trip = await prisma.trip.create({
      data: {
        userId: req.user.id,
        checkIn,
        checkOut,
        location,
        passengers,
      },
    });
    res.send({
      success: true,
      trip,
    });
  } catch (error) {
    res.send({
      success: false,
      error: error.message,
    });
  }
});

export default router;
