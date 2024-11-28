const express = require("express");
const router = express.Router();
const { register, login, getAll, getAdminContent, getUserContent } = require("../controllers/user.controller");
const authorize = require("../middlewares/authorize");

// Routes
router.post("/register", register); // Register a new user
router.post("/login", login); // Login and get a token
router.get("/", authorize(["Admin"]), getAll); // Admin-only: Retrieve all users
router.get("/admin", authorize(["Admin"]), getAdminContent); // Admin-only: Access admin content
router.get("/user", authorize(["User", "Admin"]), getUserContent); // User and Admin: Access user content

module.exports = router;
