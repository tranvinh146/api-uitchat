import express from "express";
// import UsersController from "./user.controller.js";
import UserController from "../../controllers/UserController.js";
import {
  verifyToken,
  verifyAdmin,
} from "../../middleware/jwt.js";
import User from "../../models/User.js";

const router = express.Router();

router
  .route("/")
  .get(UserController.getAll)
  .post(UserController.add)
  .patch(verifyToken, UserController.update)
  .delete(verifyToken, verifyAdmin, UserController.delete);

router.route("/:id").get(verifyToken, UserController.getById);

export default router;
