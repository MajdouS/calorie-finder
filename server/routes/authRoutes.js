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
  authController.socialLogin
);

// Facebook authentication routes
router.get("/facebook", passport.authenticate("facebook"));
router.get(
  "/facebook/callback",
  authController.socialLogin
);

// Logout route
router.get("/logout", authController.logout);

module.exports = router;
