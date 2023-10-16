import express from "express";

import {
  getAllReservations,
  createReservation,
  updateReservation,
  deleteReservation,
} from "../controllers/reservationControllers.js";
import { authMiddleware } from "../middlewares/index.js";

const router = express.Router();

router.use(authMiddleware);

// GET / reservations;
router.get("/", getAllReservations);
//  POST /reservations/flights

router.post("/", createReservation);

//  PUT/reservations/flights

router.put("/:reservationId", updateReservation);

// Delete reservation
router.delete("/:reservationId", deleteReservation);

export default router;
