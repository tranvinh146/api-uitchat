import express from "express";
import ChannelsController from "../controllers/ChannelController.js";

const router = express.Router();

router
  .route("/")
  .put(ChannelsController.apiUpdateChannel)
  .delete(ChannelsController.apiDeleteChannel)
  .post(ChannelsController.apiPostChannel);

router.route("/:serverId").get(ChannelsController.apiGetChannelsByServerId);

// router.route("/:serverId/:channelId").get(ChannelsController.apiGetChannel);

router
  .route("/:serverId/:channelId/users")
  .delete(ChannelsController.apiDeleteUsersByChannelId)
  .put(ChannelsController.apiUpdateUsersByChannelId);

router
  .route("/:serverId/:channelId/leaders")
  .delete(ChannelsController.apiDeleteLeadersByChannelId)
  .put(ChannelsController.apiUpdateLeadersByChannelId);

export default router;