import express from "express";
import ServersController from "../controllers/ServerController.js";

const router = express.Router();

router
  .route("/users")
  .post(ServersController.apiAddUsers)
  .delete(ServersController.apiRemoveMembers);

router
  .route("/users/owner-role")
  .post(ServersController.apiGrantOwner)
  .delete(ServersController.apiRevokeOwner);

router
  .route("/")
  .get(ServersController.apiGetServersByUserId)
  .post(ServersController.apiPostServer)
  .patch(ServersController.apiUpdateServer)
  .delete(ServersController.apiDeleteServer);

router.route("/:id").get(ServersController.apiGetServerById);

export default router;
