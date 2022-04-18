import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.route("/").patch(UserController.update).delete(UserController.delete);

router.route("/").get(UserController.getById);

router.route("/serverId/:id").get(UserController.getUsersByServerId);

export default router;
