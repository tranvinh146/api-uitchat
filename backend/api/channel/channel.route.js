import express from "express";
import ChannelsController from "./channel.controller.js";

const router = express.Router();

router.route("/:id").get(ChannelsController.apiGetChannelsByServerId);

router
  .route("/")
  .put(ChannelsController.apiUpdateChannel)
  .delete(ChannelsController.apiDeleteChannel)
  .post(ChannelsController.apiPostChannel);

export default router;
