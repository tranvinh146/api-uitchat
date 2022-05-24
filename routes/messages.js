import express from "express";
import MessagesController from "../controllers/MessageController.js";

const router = express.Router();

router
  .route("/conversation/:guestId")
  .get(MessagesController.apiGetMessagesByConversationId);

router.route("/:channelId/search").get(MessagesController.apiSearchMessages);

router.route("/:channelId").get(MessagesController.apiGetMessagesByChannelId);

router.route("/channel").post(MessagesController.apiPostMessageFromChannel);

router
  .route("/conversation")
  .post(MessagesController.apiPostMessageFromConversation);

router
  .route("/")
  .put(MessagesController.apiPutMessage)
  .delete(MessagesController.apiDeleteMessage);

export default router;
