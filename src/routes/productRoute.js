const express = require("express");
const multer = require("multer");
const router = express.Router();

const { verifyToken, isAdmin } = require("../middlewares/auth.middleware");
const {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
} = require("../controller/productController");
// multer
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "src/public/images/product");
  },
  filename: function (req, file, cb) {
    // imageName: product-time-fileNameUpload
    cb(null, "product-" + Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage: storage });

// get all product ~ Homepage
router.get("/", getAllProducts);

//get one product ~ ViewDetail
router.get("/:productId", getProduct);

// create new product
router.post("/", upload.array("images", 10), createProduct);
// update product
router.put(
  "/:productId",
  verifyToken,
  isAdmin,
  upload.array("images", 10),
  updateProduct
);

//delete product
router.delete("/:productId", deleteProduct);
module.exports = router;
