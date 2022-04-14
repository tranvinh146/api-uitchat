import express from "express";
// import UsersController from "./user.controller.js";
import UserController from "../../controllers/UserController.js";
import {
  verifyToken,
  verifyUserAuthorization,
  verifyAdmin,
} from "../../middleware/jwt.js";

const router = express.Router();

router
  .route("/")
  .get(verifyToken, UserController.getAll)
  .post(UserController.add)
  .patch(verifyToken, verifyUserAuthorization, UserController.update)
  .delete(verifyToken, verifyAdmin, UserController.delete);

router.route("/:id").get(verifyToken, UserController.getById);

export default router;
