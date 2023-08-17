const express = require("express");
const authController = require("../controllers/authController");
const passport = require("passport");

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);

// Google authentication routes
router.get(
  "/google",
  passport.authenticate("google", {
    scope: ["profile", "email"],
  })
);
router.get(
  "/google/callback",
  passport.authenticate("google"),
  authController.socialLogin
);

// Facebook authentication routes
router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  passport.authenticate("facebook"),
  authController.socialLogin
);

module.exports = router;
