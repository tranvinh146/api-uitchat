import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.route("/me")
    .get(UserController.apiGetCurrentUser)
    .patch(UserController.apiUpdate)
    .delete(UserController.apiDelete);

router.route("/:userid").get(UserController.apiGetById);

router.route("/me/servers/:serverid").get(UserController.apiGetUsersByServerId);

router.route("/me/servers/:serverid").patch(UserController.apiJoinServer);

router.route("/me/friends").get(UserController.apiGetFriendsList);

router.route("/me/friends/:friendid").patch(UserController.apiAddFriend);

export default router;
