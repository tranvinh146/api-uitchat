import express from "express";
import MessagesController from "./message.controller.js";

const router = express.Router();

router.route("/:id").get(MessagesController.apiGetMessages);

router
  .route("/")
  .post(MessagesController.apiPostMessage)
  .put(MessagesController.apiPutMessage)
  .delete(MessagesController.apiDeleteMessage);

export default router;
