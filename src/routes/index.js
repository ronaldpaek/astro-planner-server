import express from "express";

const router = express.Router();

router.get("/", (req, res) => {
  res.send("Hi Mom!");
});

router.use("/", (err, req, res, next) => {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

export default router;
