const express = require("express");
const { createUser } = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();

router.post("/", authenticate, createUser);

module.exports = router;
