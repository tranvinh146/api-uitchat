import app from "./server.js";
import mongodb from "mongodb";
import dotenv from "dotenv";
import UsersDAO from './dao/usersDAO.js';
import ServersDAO from "./dao/serversDAO.js";

async function main() {
  dotenv.config();

  const client = new mongodb.MongoClient(process.env.UITCHAT_DB_URI);

  const port = process.env.PORT || 8000;

  try {
    await client.connect();
    await UsersDAO.injectDB(client);
    await ServersDAO.injectDB(client);

    app.listen(port, () => {
      console.log("Server is running on port", port);
    });
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
}

main().catch(console.error);
