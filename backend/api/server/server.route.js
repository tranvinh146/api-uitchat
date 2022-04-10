import express from "express";
import ServersController from "./server.controller.js";

const router = express.Router();

router.route("/:id").get(ServersController.apiGetServerById);

router
  .route("/")
  .get(ServersController.apiGetServers)
  .post(ServersController.apiPostServer)
  .put(ServersController.apiUpdateServer)
  .delete(ServersController.apiDeleteServer);

export default router;
