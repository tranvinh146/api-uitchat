import express from "express";
import ChannelsController from "./channel.controller.js";

const router = express.Router();

router
    .route("/")
    .put(ChannelsController.apiUpdateChannel)
    .delete(ChannelsController.apiDeleteChannel)
    .post(ChannelsController.apiPostChannel);

router.route("/:serverId").get(ChannelsController.apiGetChannelsByServerId);

router
    .route("/users")
    .delete(ChannelsController.apiDeleteUsersByChannelId)
    .put(ChannelsController.apiUpdateUsersByChannelId);

router
    .route("/leaders")
    .delete(ChannelsController.apiDeleteLeadersByChannelId)
    .put(ChannelsController.apiUpdateLeadersByChannelId);

export default router;
