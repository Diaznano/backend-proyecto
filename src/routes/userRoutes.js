const express = require("express");
const { createUser, updateUser, getUsers, deleteUser } = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");
const { UserRole } = require("../models/User");

const router = express.Router();

router.post("/", authenticate([UserRole.ADMIN]), createUser);
router.put("/:id", authenticate([UserRole.ADMIN]), updateUser);
router.get("/", authenticate([UserRole.ADMIN]), getUsers);
router.delete("/:id", authenticate([UserRole.ADMIN]), deleteUser);

module.exports = router;
