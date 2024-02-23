const express = require("express");
const router = express.Router();
const {
  getAllBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
} = require("../controller/brandController");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

router.get("/", getAllBrands);
router.post("/", verifyToken, isAdmin, createBrand);
router.get("/:brandId", getBrand);
router.put("/:brandId", verifyToken, isAdmin, updateBrand);
router.delete("/:brandId", verifyToken, isAdmin, deleteBrand);

module.exports = router;
