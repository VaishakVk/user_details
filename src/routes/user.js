const express = require("express");
const router = express.Router();
const userLib = require("../lib/users");
const isAuthenticated = require("../middleware/isAuthenticated");

router.get("/", isAuthenticated, userLib.getAllUsersHandler);

module.exports = router;
