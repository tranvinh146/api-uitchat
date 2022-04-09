import express from "express";
import AuthController from "./auth.controller.js";

const router = express.Router();

router.post("/login", AuthController.login);
// router.post("/refresh-token", );
// router.post("/registry", );

export default router;