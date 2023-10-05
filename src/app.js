import express from "express";
import dotenv from "dotenv";

import { setupMiddleware } from "./middlewares/index.js";
import routes from "./routes/index.js";

dotenv.config();

// Initialize express app
const app = express();
const isProduction = process.env.NODE_ENV === "production";
const PORT = process.env.PORT || 3333;

// Setup general middleware
setupMiddleware(app, isProduction, PORT);

// Setup Routes
app.use("/", routes);

export default app;
