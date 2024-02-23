const express = require("express");
const router = express.Router();
const {
  addToCart,
  removeFromCart,
  removeAll,
} = require("../controller/cartController");
const { verifyToken } = require("../middlewares/auth.middleware");

router.post("/add", verifyToken, addToCart);
router.post("/remove", verifyToken, removeFromCart);
router.post("/remove-all", verifyToken, removeAll);
module.exports = router;
