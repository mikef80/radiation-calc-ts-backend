// userRoutes.js
const express = require("express");
const ensureAuthenticated = require("../middleware/ensureAuthenticated"); // Create this middleware
const userController = require("../controllers/userController");

const router = express.Router();

router.get("/profile", ensureAuthenticated, userController.getUserProfile);

module.exports = router;
