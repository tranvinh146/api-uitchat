import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router
  .route("/")
  .get(UserController.apiGetAllUsers)
  .patch(UserController.apiUpdate)
  .delete(UserController.apiDelete);

router.route("/search").post(UserController.apiSearchUsers);

router.route("/:id").get(UserController.apiGetById);

router.route("/server/:id").get(UserController.apiGetUsersByServerId);

router.route("/:userid/join/:serverid").post(UserController.apiJoinServer);

export default router;
