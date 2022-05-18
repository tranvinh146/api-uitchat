import express from "express";
import MessagesController from "../controllers/MessageController.js";
import { verifyToken } from "../middleware/jwt.js";

const router = express.Router();

router.route("/conversation/:guestId").get(verifyToken, MessagesController.apiGetMessagesByConversationId);

router.route("/:channelId/search").get(MessagesController.apiSearchMessages);

router.route("/:channelId").get(MessagesController.apiGetMessagesByChannelId);

router
  .route("/channel/")
  .post(verifyToken,MessagesController.apiPostMessageFromChannel)

  router
  .route("/conversation/")
  .post(verifyToken,MessagesController.apiPostMessageFromConversation)

 router
  .route("/")
  .put(verifyToken,MessagesController.apiPutMessage)
  .delete(verifyToken,MessagesController.apiDeleteMessage);

export default router;
