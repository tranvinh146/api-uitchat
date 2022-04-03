import express from "express";
import UsersController from './user.controller.js';
import MessagesController from './message.controller.js';
import server from "./server.route.js";
import ChannelsController from "./channel.controller.js";

const router = express.Router();

router.use("/server", server);

router.route("/messages/:id")
  .get(MessagesController.apiGetMessages)
  
router.route("/messages")
  .post(MessagesController.apiPostMessage)
  .put(MessagesController.apiPutMessage)
  .delete(MessagesController.apiDeleteMessage)

router
    .route("/users")
    .get(UsersController.apiGetUsers)
    .post(UsersController.apiPostUser)
    .patch(UsersController.apiPatchUser)
    .delete(UsersController.apiDeleteUser);

router
    .route('/server/:id')
    .get(ChannelsController.apiGetChannelsByServerId);

router
    .route('/channels')
    .put(ChannelsController.apiUpdateChannel)
    .delete(ChannelsController.apiDeleteChannel)
    .post(ChannelsController.apiPostChannel);

export default router;
