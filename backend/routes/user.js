import express from "express";
import UserController from "../controllers/UserController.js";

const router = express.Router();

router
  .route("/")
  .get(UserController.getAll)
  .patch(UserController.update)
  .delete(verifyAdmin, UserController.delete);

router.route("/").get(UserController.getById);

router.route("/serverId/:id").get(UserController.getUsersByServerId);

export default router;
