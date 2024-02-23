const jwt = require("jsonwebtoken");
const UserModel = require("../models/UserModel");

// middleware
const verifyToken = async (req, res, next) => {
  try {
    const authorization =
      req.headers.authorization || req.headers.Authorization;
    if (authorization?.startsWith("Bearer ")) {
      let token = authorization.split(" ")[1];
      if (!token) {
        return res.status(200).json("You need to login");
      } else {
        const decode = await jwt.verify(token, process.env.ACCESS_KEY);
        req.userId = decode._id;
        next();
      }
    } else {
      return res.status(200).json("You need to login");
    }
  } catch (error) {
    if (error.name === "TokenExpiredError") {
      return res.status(200).json({
        code: 401,
        message: "jwt expired",
      });
    }
    return res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};

// behind middleware requireSignin
const isAdmin = async (req, res, next) => {
  try {
    const userId = req?.userId;
    if (!userId) return res.status(200).json("You need to login");

    const user = await UserModel.findById(userId);
    // không tồn tại user
    if (!user)
      return res.status(200).json("User not found, need to login again");
    //   Không có field role hoặc role không phải admin
    if (!user.isAdmin) return res.status(200).json("Not permission");
    // isAdmin
    next();
  } catch (error) {
    return res.status(500).json({
      message: "Somthing went wrong!",
      error,
    });
  }
};
module.exports = { verifyToken, isAdmin };
