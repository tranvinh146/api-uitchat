import express from "express";
import MessagesController from "./message.controller.js";

const router = express.Router();

router.route("/:channelid/search").get(MessagesController.apiSearchMessages);

router.route("/:channelid").get(MessagesController.apiGetMessagesByChannelId);

router
  .route("/")
  .post(MessagesController.apiPostMessage)
  .put(MessagesController.apiPutMessage)
  .delete(MessagesController.apiDeleteMessage);

export default router;
