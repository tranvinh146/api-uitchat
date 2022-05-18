import express from "express";
import auth from "./auth.js";
import users from "./users.js";
import servers from "./servers.js";
import channels from "./channels.js";
import messages from "./messages.js";
// import midddlewares
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.use("/auth", auth);

router.use("/users", verifyToken, users);

router.use("/servers", verifyToken, servers);

router.use("/channels", verifyToken, channels);

router.use("/messages", verifyToken, messages);

export default router;