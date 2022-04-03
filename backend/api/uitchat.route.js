import express from "express";
import UsersController from './user.controller.js';
import MessagesController from './message.controller.js';
import server from "./server.route.js";

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

export default router;
