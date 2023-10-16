import express from "express";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const setupMiddleware = (app, isProduction, origin) => {
  // Enable CORS
  app.use(
    cors()
  );

  // {
  //     origin: isProduction ? "https://www.example.com" : origin,
  //   }

  app.use(express.json()); // Parse JSON automatically
  app.use(express.urlencoded({ extended: true })); // Parse URL-encoded bodies automatically
};

export default setupMiddleware;
