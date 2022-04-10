import express from "express";
import UsersController from "./user.controller.js";

const router = express.Router();

router
  .route("/")
  .get(UsersController.apiGetUsers)
  .post(UsersController.apiPostUser)
  .patch(UsersController.apiPatchUser)
  .delete(UsersController.apiDeleteUser);

export default router;
