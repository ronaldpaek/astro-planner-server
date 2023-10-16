import express from "express";
import dotenv from "dotenv";

import {
  setupMiddleware,
  errorHandler,
  routeNotFoundHandler,
} from "./middlewares/index.js";
import routes from "./routes/index.js";

dotenv.config();

// Initialize express app
const app = express();
const isProduction = process.env.NODE_ENV === "production";
const origin = process.env.ORIGIN;

// Setup general middleware
setupMiddleware(app, isProduction, origin);

// Setup Routes
app.use("/", routes);

// Route Not Found Handler
app.use("*", routeNotFoundHandler);

// General Error Handler
app.use(errorHandler);

export default app;
