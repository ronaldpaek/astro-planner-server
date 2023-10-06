import express from "express";

import userRoutes from "./userRoutes.js";

const router = express.Router();

router.get("/", (req, res, next) => {
  try {
    res.send("Hi Mom!");
  } catch (err) {
    next(err);
  }
});

router.use("/users", userRoutes);

export default router;
