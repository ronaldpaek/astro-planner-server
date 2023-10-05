import dotenv from "dotenv";

import app from "./app.js";

// Configure dotenv
dotenv.config();

const PORT = process.env.PORT || 3333;
const isProduction = process.env.NODE_ENV === "production";

app.listen(PORT, () => {
  console.log(
    `Server is running on ${
      isProduction ? "production" : "development"
    } mode, on port ${PORT}`
  );
});
