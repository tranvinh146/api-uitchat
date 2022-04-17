import express from "express";
import AuthController from "./auth.controller.js";

const router = express.Router();

router.post("/login", AuthController.login); // login by email
router.post("/register", AuthController.register);
// auto login after register

export default router;
