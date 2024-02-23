const express = require("express");
const router = express.Router();

const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

const {
  createCategory,
  updateCategory,
  getAllCategories,
  getCategory,
  deleteCategory,
} = require("../controller/categoryController");

router.post("/", createCategory);
router.put("/:categoryId", verifyToken, isAdmin, updateCategory);

router.get("/", getAllCategories);
router.get("/:slug", getCategory);

router.delete("/:categoryId", deleteCategory);

module.exports = router;
