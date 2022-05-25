import app from "./server.js";
import connectdb from "./config/mongo.js";
import dotenv from "dotenv";
import { Server } from "socket.io";
import http from "http";
import socket from "./utils/Socket.js";

async function main() {
  dotenv.config();
  connectdb();

  const server = http.createServer(app);
  const io = new Server(server, {
    cors: {
      origin: "*",
    },
  });

  socket(io);

  const port = process.env.PORT || 8000;

  server.listen(port, () => {
    console.log("Server is running on port", port);
  });
}

main().catch(console.error);
