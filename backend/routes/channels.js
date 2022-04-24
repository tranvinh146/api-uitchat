import express from "express";
import ChannelsController from "../controllers/ChannelController.js";

const router = express.Router();

router
    .route("/")
    .put(ChannelsController.apiUpdateChannel)
    .delete(ChannelsController.apiDeleteChannel)
    .post(ChannelsController.apiPostChannel);

router.route("/:serverId").get(ChannelsController.apiGetChannelsByServerId);

<<<<<<< HEAD:backend/api/channel/channel.route.js
router.route("/:serverId/:channelId").get(ChannelsController.apiGetChannel);

router
    .route("/users")
    .delete(ChannelsController.apiDeleteUsersByChannelId)
    .put(ChannelsController.apiUpdateUsersByChannelId);

router
    .route("/leaders")
    .delete(ChannelsController.apiDeleteLeadersByChannelId)
    .put(ChannelsController.apiUpdateLeadersByChannelId);
=======
// router.route("/:serverId/:channelId").get(ChannelsController.apiGetChannel);

router
  .route("/:serverId/:channelId/users")
  .delete(ChannelsController.apiDeleteUsersByChannelId)
  .put(ChannelsController.apiUpdateUsersByChannelId);

router
  .route("/:serverId/:channelId/leaders")
  .delete(ChannelsController.apiDeleteLeadersByChannelId)
  .put(ChannelsController.apiUpdateLeadersByChannelId);
>>>>>>> 66c292e6b71519c96c48db38279014b1c46fd373:backend/routes/channels.js

export default router;
