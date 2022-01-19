const express = require("express");
const router = express.Router();
const authLib = require("../lib/auth");
const isAuthenticated = require("../middleware/isAuthenticated");
const { signupValidator, loginValidator } = require("../validator/auth");

router.post("/signup", signupValidator(), authLib.signupHandler);
router.patch("/login", loginValidator(), authLib.loginHandler);
router.get("/me", isAuthenticated, authLib.getMyProfileHandler);

module.exports = router;
