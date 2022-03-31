import express from "express";
import UsersController from './user.controller.js';

const router = express.Router();

router.route("/").get((req, res) => {
  res.send("Hello World");
});

router.route("/users")
.get(UsersController.apiGetUsers);

export default router;
