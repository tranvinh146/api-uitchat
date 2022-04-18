import express from "express";
import auth from "./auth.js";
import user from "./user.js";
import server from "./server.js";
import channel from "./channel.js";
import message from "./message.js";
// import middlewares
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.use("/auth", auth);

router.use("/users", verifyToken, user);

router.use("/servers", verifyToken, server);

router.use("/channels", verifyToken, channel);

router.use("/messages", verifyToken, message);

export default router;
