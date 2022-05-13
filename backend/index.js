import app from "./server.js";
import connectdb from "./config/mongo.js";
import dotenv from "dotenv";
import mongoose from "mongoose";
import { Server } from "socket.io";
import { createServer } from "http";
import socketio from "./utils/Socketio.js"
// import mongodb from "mongodb";
// import UsersDAO from "./dao/usersDAO.js";
// import ServersDAO from "./dao/serversDAO.js";
// import ChannelsDAO from "./dao/channelsDAO.js";
// import MessagesDAO from "./dao/messagesDAO.js";

async function main() {
  dotenv.config();

  // const client = new mongodb.MongoClient(process.env.UITCHAT_DB_URI);

  const port = process.env.PORT || 8000;

  // try {
  //   await client.connect();
  //   await UsersDAO.injectDB(client);
  //   await ServersDAO.injectDB(client);
  //   await ChannelsDAO.injectDB(client);
  //   await MessagesDAO.injectDB(client);
  //   app.listen(port, () => {
  //     console.log("Server is running on port", port);
  //   });
  // } catch (error) {
  //   console.error(error);
  //   process.exit(1);
  // }

  connectdb();

  const httpServer = createServer(app);
  const io = new Server(httpServer);
  socketio(io);
  // next line is the money
  app.set('socketio', io);
  httpServer.listen(port, () => {
    console.log("Server is running on port", port);
  });
}

main().catch(console.error);
