import express from "express";
import ServersController from "./server.controller.js";

const router = express.Router();

router
  .route("/users")
  .post(ServersController.apiAddUsers)
  .delete(ServersController.apiRemoveUsers);

router
  .route("/")
  .get(ServersController.apiGetServersByUserId)
  .post(ServersController.apiPostServer)
  .patch(ServersController.apiUpdateServer)
  .delete(ServersController.apiDeleteServer);

router.route("/:id").get(ServersController.apiGetServerById);

export default router;
