import express from "express";
import AuthController from "../controllers/AuthController.js";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/oauth", AuthController.oauthLogin);
router.post("/register", AuthController.register);

export default router;
