const express = require("express");
const router = express.Router();
const users = require("../../controllers/users");
const passport = require("passport");
const catchAsync = require("../../utils/catchAsync");

// Root Route
router.get("/", users.redirIndex);

// Error route
router.get("/error", (req, res) => {
    res.render('yelpcamp/error')
})

// Register
router.get("/register", users.renderRegister);
router.post("/register", catchAsync(users.register));

// Login
router.get("/login", users.renderLogin);
router.post("/login", passport.authenticate("local", {failureFlash: true,  failureRedirect: "/yelpcamp/login"}), users.login);

// Logout
router.get("/logout", users.logout)

module.exports = router;