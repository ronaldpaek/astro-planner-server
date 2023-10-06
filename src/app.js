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
const port = process.env.PORT || 3333;

// Setup general middleware
setupMiddleware(app, isProduction, port);

// Setup Routes
app.use("/", routes);

// General Error Handler
app.use(errorHandler);

// Route Not Found Handler
app.use(routeNotFoundHandler);

export default app;
