import express from "express";
import servers from "./server.route.js";
import channels from "./channel.route.js";
import users from "./user.route.js";
import messages from "./message.route.js";

const router = express.Router();

router.use("/servers", servers);

router.use("/channels", channels);

router.use("/users", users);

router.use("/messages", messages);

export default router;
