import express from "express";
import server from "./server.route.js";

const router = express.Router();

router.use("/server", server);

export default router;
