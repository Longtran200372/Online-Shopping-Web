const jwt = require("jsonwebtoken");
const validator = require("validator");
const bcrpyt = require("bcrypt");
const UserModel = require("../models/UserModel");
const CartModel = require("../models/CartModel");

const bornToken = (data, secret, time) => {
  return jwt.sign(data, secret, { expiresIn: time });
};

const refreshToken = async (req, res) => {
  try {
    // get refreshToken from cookies
    let refreshToken = req.cookies?.refreshToken;

    if (!refreshToken)
      return res.json("no refresh token in cookie, go to login");
    const decode = await jwt.verify(refreshToken, process.env.REFRESH_KEY);

    const foundUser = await UserModel.findById(decode._id);
    if (!foundUser)
      return res.json(
        "No user match with refresh token data, go to login again"
      );

    const access_token = bornToken(
      { _id: decode._id },
      process.env.ACCESS_KEY,
      "1d"
    );
    const refresh_token = bornToken(
      { _id: decode._id },
      process.env.REFRESH_KEY,
      "1d"
    );

    res.cookie("refreshToken", refresh_token, {
      httpOnly: true,
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    });
    return res.status(200).json({
      message: "OK",
      access_token,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error went refresh token, go to login",
      error,
    });
  }
};

// [POST] : /signin
let Signin = async (req, res) => {
  const { userName, password } = req.body;
  try {
    // find user
    let user = await UserModel.findOne({ userName });
    // check user ? exist
    if (!user) return res.status(200).json("User not exist");
    // check password
    if (!user.isPasswordMatched(password))
      return res.status(200).json("Wrong password");
    // correct email and password
    const access_token = bornToken(
      { _id: user._id },
      process.env.ACCESS_KEY,
      "1d"
    );

    const refresh_token = bornToken(
      {
        _id: user._id,
      },
      process.env.REFRESH_KEY,
      "1d"
    );
    user.refresh_token = refresh_token;
    await user.save();

    res.cookie("refreshToken", refresh_token, {
      // httpOnly: true,
      // expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
      // sameSite: "none",
      // domain: ".localhost",
    });

    return res.status(200).json({
      success: true,
      message: "OK",
      access_token,
      user: {
        firstName: user.firstName,
        lastName: user.lastName,
        userName: user.userName,
        email: user.email,
        _id: user._id,
        isAdmin: user.isAdmin,
      },
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

// [POST] : /signup
let Signup = async (req, res) => {
  // get data from req.body
  const { firstName, lastName, userName, email, password } = req.body;
  try {
    // validate in server side
    if (!firstName || !lastName || !userName || !email || !password)
      return res.status(200).json("All fields are required");
    if (!validator.isEmail(email))
      return res.status(200).json("Email is invalid");
    // if (!validator.isStrongPassword(password))
    //   return res.status(200).json("Password must be strong");
    // find user to check exist
    let foundUser = await UserModel.findOne({ email });
    if (foundUser) return res.status(200).json("Email already exist");
    foundUser = await UserModel.findOne({ userName });
    if (foundUser) return res.status(200).json("UserName already exist");

    // create and save new user
    let newUser = new UserModel(req.body);

    // hash password
    const salt = bcrpyt.genSaltSync(parseInt(process.env.SALT));
    newUser.password = bcrpyt.hashSync(password, salt);
    await newUser.save((validateBeforeSave = true));
    return res.status(200).json({
      success: true,
      message: "OK",
      userInfo: { firstName, lastName, userName, email },
    });
  } catch (error) {
    return res.status(500).json({
      message: "error",
      error,
    });
  }
};

// [GET] : /:id
let getUser = async (req, res) => {
  try {
    // get userId from url
    let userId = req?.params?.userId;
    // if user is user in token
    const foundUser = await UserModel.findById(userId);
    if (!foundUser) return res.stauts(200).json("User not found");
    return res.status(200).json({
      success: true,
      message: "OK",
      user: foundUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};

// GET: /
let getAllUsers = async (req, res) => {
  try {
    const users = await UserModel.find({});

    return res.status(200).json({
      success: true,
      message: "OK",
      users: users,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong!",
      error,
    });
  }
};

// GET /cart
let getCart = async (req, res) => {
  try {
    let userId = req.userId;
    let cart = await CartModel.findOne({ orderBy: userId })
      .populate("products.product")
      .exec();
    if (!cart) {
      let newCart = new CartModel({
        orderBy: userId,
        products: [],
      });
      await newCart.save();
      return res.status(200).json("Cart not found");
    }
    return res.status(200).json({
      success: true,
      message: "OK",
      cart,
    });
  } catch (error) {
    return res.status(500).json({
      message: "something wrong in get cart",
      error,
    });
  }
};
// PUT : /:userId
let updateUser = async (req, res) => {
  try {
    let { firstName, lastName, email } = req.body;
    if (!firstName || !lastName || !email)
      return res.status(200).json("firstName, lastName or email is empty");
    let userId = req.params.userId;
    let newUser = await UserModel.findByIdAndUpdate(userId, req.body, {
      new: true,
    });
    res.status(200).json({
      success: true,
      message: "update successful!",
      newUser,
    });
  } catch (error) {
    return res.status(500).json({
      message: "error",
      error,
    });
  }
};

// DELETE: /:userId
let deleteUser = async (req, res) => {
  try {
    let userId = req.params.userId;
    await UserModel.findByIdAndDelete(userId);
    res.status(200).json({
      success: true,
      message: "Delete user successful!",
    });
  } catch (error) {
    return res.status(500).json({
      messsage: "error",
      error,
    });
  }
};

const handleLogout = async () => {
  try {
    res.clearCookie("refreshToken");
    res.status(200).json({
      success: true,
      message: "OK",
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error",
      error,
    });
  }
};
module.exports = {
  Signin,
  Signup,
  getUser,
  updateUser,
  deleteUser,
  getAllUsers,
  getCart,
  refreshToken,
  handleLogout,
};
