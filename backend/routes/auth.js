import express from "express";
import AuthController from "../controllers/AuthController.js";
import passport from "passport";

const router = express.Router();

router.post("/login", AuthController.login);
router.post("/oauth", AuthController.oauthLogin);
router.get("/oauth", AuthController.oauthLogin);
router.post("/register", AuthController.register);

router.get("/google", passport.authenticate("google", {
    scope: ["profile", "email"],
}))

router.get("/google/callback", passport.authenticate("google", {
    failureRedirect: "http://localhost:3000/api/v1/uitchat/auth/google",
    successRedirect: "http://localhost:3000/api/v1/uitchat/auth/oauth",
    failureFlash: true,
    successFlash: "Successfully logged in!",
}))

router.get("/facebook", passport.authenticate("facebook", {
    scope: ['user_friends', 'manage_pages'],
}))

router.get("/facebook/callback", passport.authenticate("facebook", {
    failureRedirect: "http://localhost:3000/api/v1/uitchat/auth/facebook",
    successRedirect: "http://localhost:3000/api/v1/uitchat/auth/oauth",
    failureFlash: true,
    successFlash: "Successfully logged in!",
}))

export default router;
