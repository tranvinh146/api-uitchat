import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router.route("/contacts").get(UserController.apiGetContactsByUserId);

router.route("/contacts/:contactId").get(UserController.apiGetContactById);

router
  .route("/me")
  .get(UserController.apiGetCurrentUser)
  .patch(UserController.apiUpdate)
  .delete(UserController.apiDelete);

router.route("/:userid").get(UserController.apiGetById);

router.route("/me/servers/:serverid").get(UserController.apiGetUsersByServerId);

router
  .route("/me/servers/:serverid/members")
  .get(UserController.apiGetMembersByServerId);

router.route("/me/servers/:serverid").patch(UserController.apiJoinServer);

router.route("/me/invitations").get(UserController.apiGetInvitations);

// router.route("/me/friends").get(UserController.apiGetFriendsList);

// router.route("/me/friends/:friendid").patch(UserController.apiAddFriend);
router.route("/").get(UserController.apiGetAllUsersInfo);

export default router;
