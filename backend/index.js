import app from "./server.js";
import connectdb from "./config/mongo.js";
import dotenv from "dotenv";

async function main() {
  dotenv.config();

  const port = process.env.PORT || 8000;
  connectdb();

  app.listen(port, () => {
    console.log("Server is running on port", port);
  });
}

main().catch(console.error);
