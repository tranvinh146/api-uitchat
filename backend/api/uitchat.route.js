import express from "express";
import server from "./server/server.route.js";
// import channel from "./channel/channel.route.js";
import auth from "./auth/auth.route.js";
import user from "./user/user.route.js";
import message from "./message/message.route.js";
// import midddlewares
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.use("/servers", verifyToken, server);

// router.use("/channels", verifyToken, channel);

router.use("/auth", auth);
router.use("/users", verifyToken, user);

router.use("/messages", verifyToken, message);

export default router;
