import express from "express";
import MessagesController from "./message.controller.js";
import { verifyToken } from "../../middleware/jwt.js";

const router = express.Router();

router.route("/:channelId/search").get(verifyToken, MessagesController.apiSearchMessages);

router.route("/:channelId").get(verifyToken, MessagesController.apiGetMessagesByChannelId);

router
  .route("/")
  .post(verifyToken,MessagesController.apiPostMessage)
  .put(verifyToken,MessagesController.apiPutMessage)
  .delete(verifyToken,MessagesController.apiDeleteMessage);

export default router;
