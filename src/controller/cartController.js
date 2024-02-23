const CartModel = require("../models/CartModel");

// POST  /add
// middleware requireSignin
let addToCart = async (req, res) => {
  /*
    body: {
      product: productId, 
      quantity: number, 
    }
  */
  try {
    let cart = await CartModel.findOne({ orderBy: req.userId }).exec();
    // has cart
    if (cart) {
      let product = req.body.product;
      // find product in cart
      // cart.products = {{product, quantity},...}
      let productIndex = cart.products.findIndex((item) => {
        return item.product == product;
      });
      // has product
      if (productIndex >= 0) {
        let newQuantity =
          cart.products[productIndex].quantity + req.body.quantity;
        // change products with spread
        cart.products[productIndex] = {
          product: req.body.product,
          quantity: newQuantity,
        };
        // save
        let newCart = await cart.save();
        res.status(200).json({
          success: true,
          message: "OK",
          cart: newCart,
        });
      } else {
        // add product to cart
        cart.products.push({
          product: req.body.product,
          quantity: req.body.quantity,
        });
        cart.save();
        return res.status(200).json({
          success: true,
          message: "OK",
          cart: cart,
        });
      }
    } else {
      // don't has cart before
      const newCart = new CartModel({
        orderBy: req.userId,
        products: [{ product: req.body.product, quantity: req.body.quantity }],
      });
      await newCart.save();
      return res.status(200).json({
        success: true,
        message: "OK",
        cart: newCart,
      });
    }
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// DELETE
// remove is add with odd quantity
let removeFromCart = async (req, res) => {
  try {
    let cart = await CartModel.findOne({ orderBy: req.userId }).exec();
    // has cart
    if (cart) {
      let product = req.body.product;
      // find product in cart
      let indexItem = cart.products.findIndex((item) => {
        return item.product == product;
      });
      // has product
      if (indexItem >= 0) {
        // change products with spread
        // new quantity
        let newQuantity = cart.products[indexItem].quantity - req.body.quantity;
        // delete product
        if (newQuantity <= 0) {
          cart.products.splice(indexItem, 1);
          let newCart = await cart.save();
          return res.status(200).json({
            success: true,
            message: "OK",
            cart: newCart,
          });
        }
        cart.products[indexItem] = {
          product: req.body.product,
          quantity: newQuantity,
        };
        // save
        let newCart = await cart.save();
        res.status(200).json({
          success: true,
          message: "OK",
          cart: newCart,
        });
      } else {
        // add product to cart
        return res.status(200).json("product not found");
      }
    } else {
      const newCart = new CartModel({
        orderBy: req.userId,
        products: [],
      });
      await newCart.save();
      return res.status(200).json({
        success: true,
        cart: newCart,
      });
    }
  } catch (error) {
    return res.status(500).json({ error });
  }
};

let removeAll = async (req, res) => {
  try {
    let cart = await CartModel.findOne({ orderBy: req.userId }).exec();
    // has cart
    if (cart) {
      cart.products = [];
      await cart.save();
    }
    return res.status(200).json({
      success: true,
    });
  } catch (error) {
    return res.status(500).json({ error });
  }
};
module.exports = { addToCart, removeFromCart, removeAll };
