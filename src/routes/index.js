import express from "express";

import userRoutes from "./userRoutes.js";
import tripRoutes from "./tripRoutes.js";
import reservationRoutes from "./reservationRoutes.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.send("Hi Mom!");
  } catch (err) {
    next(err);
  }
});

router.use("/users", userRoutes);
router.use("/trips", tripRoutes);
router.use("/reservations", reservationRoutes);

export default router;
