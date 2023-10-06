import dotenv from "dotenv";

import app from "./app.js";

dotenv.config();

const port = process.env.PORT || 3333;
const isProduction = process.env.NODE_ENV === "production";

app.listen(port, () => {
  console.log(
    `Server is running on ${
      isProduction ? "production" : "development"
    } mode, on port ${port}`
  );
});
