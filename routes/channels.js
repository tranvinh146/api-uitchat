import express from "express";
import ChannelsController from "../controllers/ChannelController.js";

const router = express.Router();

router
  .route("/")
  .put(ChannelsController.apiUpdateChannel)
  .delete(ChannelsController.apiDeleteChannel)
  .post(ChannelsController.apiPostChannel);

router.route("/:serverId").get(ChannelsController.apiGetChannelsByServerId);

router.route("/:serverId/:channelId").get(ChannelsController.apiGetChannelById);

router
  .route("/:serverId/:channelId/members")
  .delete(ChannelsController.apiDeleteMembersByChannelId)
  .put(ChannelsController.apiUpdateMembersByChannelId);

router
  .route("/:serverId/:channelId/owners")
  .delete(ChannelsController.apiDeleteOwnersByChannelId)
  .put(ChannelsController.apiUpdateOwnersByChannelId);

export default router;
