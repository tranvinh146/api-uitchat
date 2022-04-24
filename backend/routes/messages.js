import express from "express";
import MessagesController from "../controllers/MessageController.js";

const router = express.Router();

router.route("/:channelId/search").get(MessagesController.apiSearchMessages);

router.route("/:channelId").get(MessagesController.apiGetMessagesByChannelId);

router
  .route("/")
  .post(MessagesController.apiPostMessage)
  .put(MessagesController.apiPutMessage)
  .delete(MessagesController.apiDeleteMessage);

export default router;
