import mongoose from "mongoose";

export default function () {
  const CONNECTION_URI = process.env.UITCHAT_DB_URI;

  mongoose.connect(CONNECTION_URI);

  mongoose.connection.on("connected", () => {
    console.log("Mongo has connected successfully");
  });

  mongoose.connection.on("reconnected", () => {
    console.log("Mongo has reconnected");
  });

  mongoose.connection.on("error", (error) => {
    console.log("Mongo connection has an error: ", error);
    mongoose.disconnect();
  });

  mongoose.connection.on("disconnected", () => {
    console.log("Mongo connection is disconnected");
  });
}
