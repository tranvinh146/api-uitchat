import express from "express";
import UsersController from './user.controller.js';
import MessagesController from './message.controller.js';
import server from "./server.route.js";
import ChannelsController from "./channel.controller.js";
import auth from './auth.route.js';
import { verifyToken, verifyUserAuthorization, verifyAdmin } from '../middleware/verifyToken.js';

const router = express.Router();

router.use("/auth", auth);
router.use("/server", server);

router.route("/messages/:id")
  .get(MessagesController.apiGetMessages)
  
router.route("/messages")
  .post(MessagesController.apiPostMessage)
  .put(MessagesController.apiPutMessage)
  .delete(MessagesController.apiDeleteMessage)

router
    .route("/users")
    .get(verifyToken, UsersController.apiGetUsers)
    .post(UsersController.apiPostUser)
    .patch(verifyToken, verifyUserAuthorization, UsersController.apiPatchUser)
    .delete(verifyToken, verifyAdmin, UsersController.apiDeleteUser);
router
    .route("/users/:id")
    .get(verifyToken, UsersController.getById);

router
    .route('/server/:id')
    .get(ChannelsController.apiGetChannelsByServerId);

router
    .route('/channels')
    .put(ChannelsController.apiUpdateChannel)
    .delete(ChannelsController.apiDeleteChannel)
    .post(ChannelsController.apiPostChannel);


export default router;