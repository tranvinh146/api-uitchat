import express from "express";
import ServersController from "./server.controller.js";

const router = express.Router();

router.route("/").get(ServersController.apiGetServers);

router.route("/id/:id").get(ServersController.apiGetServerById);

router
  .route("/server")
  .post(ServersController.apiPostServer)
  .put(ServersController.apiUpdateServer)
  .delete(ServersController.apiDeleteServer);

export default router;
