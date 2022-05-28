import express from "express";
import InvitesController from "../controllers/InviteController.js";

const router = express.Router();

router.route("/").get(InvitesController.apiGetInvitesByUserId);

export default router;
