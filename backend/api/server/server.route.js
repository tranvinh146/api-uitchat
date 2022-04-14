import express from "express";
import ServersController from "./server.controller.js";

const router = express.Router();

router
  .route("/:id")
  .get(ServersController.apiGetServerById)
  .patch(ServersController.apiAddUsers);

router
  .route("/")
  .get(ServersController.apiGetServersByUserId)
  .post(ServersController.apiPostServer)
  .put(ServersController.apiUpdateServer)
  .delete(ServersController.apiDeleteServer);

router.route("/channels").get(ServersController.apiGetChannelsByServerId);

router.route("/users").get(ServersController.apiGetUsersByServerId);

export default router;
