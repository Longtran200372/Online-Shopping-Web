const express = require("express");
const router = express.Router();
const userRouter = require("./userRoute");
const categoryRouter = require("./categoryRoute");
const productRouter = require("./productRoute");
const cartRouter = require("./cartRoute");
const brandRouter = require("./brandRoute");
const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");

let Router = (app) => {
  router.use("/users", userRouter);
  router.use("/categories", categoryRouter);
  router.use("/brands", brandRouter);
  router.use("/products", productRouter);
  router.use("/carts", cartRouter);
  router.get("/is-admin", verifyToken, isAdmin, (req, res) =>
    res.status(200).json({ ok: true })
  );

  app.use("/api", router);
};

module.exports = Router;
