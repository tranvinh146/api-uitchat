import express from "express";
import UsersController from "./user.controller.js";
import {
  verifyToken,
  verifyUserAuthorization,
  verifyAdmin,
} from "../../middleware/verifyToken.js";

const router = express.Router();

router
  .route("/")
  .get(UsersController.apiGetUsers)
  .post(UsersController.apiPostUser)
  .patch(UsersController.apiPatchUser)
  .delete(UsersController.apiDeleteUser);

router
  .route("/users")
  .get(verifyToken, UsersController.apiGetUsers)
  .post(UsersController.apiPostUser)
  .patch(verifyToken, verifyUserAuthorization, UsersController.apiPatchUser)
  .delete(verifyToken, verifyAdmin, UsersController.apiDeleteUser);

router.route("/users/:id").get(verifyToken, UsersController.getById);

export default router;
