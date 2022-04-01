import express from "express";
import UsersController from './user.controller.js';
import server from "./server.route.js";

const router = express.Router();

router.use("/server", server);

router
  .route("/users")
  .get(UsersController.apiGetUsers)
  .post(UsersController.apiPostUser)
  .patch(UsersController.apiPatchUser)
  .delete(UsersController.apiDeleteUser);

export default router;
