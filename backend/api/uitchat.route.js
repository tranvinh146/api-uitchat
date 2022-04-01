import express from "express";
import UsersController from './user.controller.js';

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Hello World");
});

router
  .route("/users")
  .get(UsersController.apiGetUsers)
  .post(UsersController.apiPostUser)
  .patch(UsersController.apiPatchUser)
  .delete(UsersController.apiDeleteUser);

export default router;
