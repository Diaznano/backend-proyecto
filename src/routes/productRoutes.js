const express = require("express");
const multer = require("multer");
const {
  createProduct,
  updateProduct,
  deleteProduct,
  getProducts,
} = require("../controllers/productController");
const { UserRole } = require("../models/User");
const { authenticate } = require("../middleware/authMiddleware");

const router = express.Router();
const upload = multer();

router.use(authenticate([UserRole.ADMIN]));

router.post("/", upload.single("image"), createProduct);

router.put("/:id", upload.single("image"), updateProduct);

router.delete("/:id", deleteProduct);

router.get("/", getProducts);

module.exports = router;
