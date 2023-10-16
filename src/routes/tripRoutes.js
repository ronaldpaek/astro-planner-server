import express from "express";

import {
  getAllTrips,
  createTrip,
  updateTrip,
  deleteTrip,
} from "../controllers/tripControllers.js";
import { authMiddleware } from "../middlewares/index.js";

const router = express.Router();

// Apply authMiddleware to all routes in tripRoutes
router.use(authMiddleware);

// GET /trips
router.get("/", getAllTrips);

//  POST /trips

router.post("/", createTrip);

router.put("/:tripId", updateTrip);

router.delete("/:tripId", deleteTrip);

export default router;
