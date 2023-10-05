import express from "express";
import dotenv from "dotenv";
import cors from "cors";
import cookieParser from "cookie-parser";
import jwt from "jsonwebtoken";

//configure dotenv
dotenv.config();

// initialize express app
const app = express();
const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 3333;

// middlewares
app.use(
  cors({
    origin: isProduction
      ? "https://www.example.com"
      : `http://localhost:${PORT}`,
    credentials: true, // allow cookies to be sent from client
  })
);
app.use(cookieParser());

app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.listen(PORT, () => {
  console.log(
    `Server is running on ${
      isProduction ? "production" : "development"
    } mode, on port ${PORT}`
  );
});
