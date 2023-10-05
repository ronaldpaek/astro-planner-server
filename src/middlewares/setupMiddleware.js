import express from "express";
import cors from "cors";
import cookieParser from "cookie-parser";

const setupMiddleware = (app, isProduction, PORT) => {
  app.use(
    cors({
      origin: isProduction
        ? "https://www.example.com"
        : `http://localhost:${PORT}`,
      credentials: true,
    })
  );
  app.use(cookieParser());
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
};

export default setupMiddleware;
