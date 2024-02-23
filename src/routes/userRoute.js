const express = require("express");
const router = express.Router();

const {
  Signin,
  Signup,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getCart,
  refreshToken,
} = require("../controller/userController");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

// auth
router.post("/signin", Signin);
// ~ /users [create user]
router.post("/signup", Signup);

// refresh_token
router.get("/refresh-token", refreshToken);
// get cart
router.get("/cart", verifyToken, getCart);
// view info
router.get("/:userId", verifyToken, isAdmin, getUser);
// get all user
router.get("/", verifyToken, isAdmin, getAllUsers);

// update info
router.put("/:userId", verifyToken, isAdmin, updateUser);

// delete user
router.delete("/:userId", deleteUser);

module.exports = router;
