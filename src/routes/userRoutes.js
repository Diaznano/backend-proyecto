const express = require("express");
const { createUser, updateUser, getUsers, deleteUser } = require("../controllers/userController");
const { authenticate } = require("../middleware/authMiddleware");
const { UserRole } = require("../models/User");

const router = express.Router();

router.use(authenticate([UserRole.ADMIN]));

router.post("/", createUser);
router.put("/:id", updateUser);
router.get("/", getUsers);
router.delete("/:id", deleteUser);

module.exports = router;
