import express from "express";
import ConversationController from "../controllers/ConversationController.js";

const router = express.Router();

 router.route("/").get(ConversationController.apiGetListConversations)

 router.route("/:memberId").post(ConversationController.apiPostConversation)

export default router;
