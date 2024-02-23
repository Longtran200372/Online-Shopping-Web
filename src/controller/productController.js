const fs = require("fs");
const ProductModel = require("../models/ProductModel");
// GET /

const getAllProducts = async (req, res) => {
  try {
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields", "search"];
    const fields = req?.query?.fields?.split(",").join(" ") || null;
    const sort = req?.query?.sort?.split(",").join(" ") || "createdAt";
    const page = req?.query?.page || 1;
    const limit = req?.query?.limit || 0;
    const skip = (page - 1) * limit;
    const search = req?.query?.search || "";
    excludeFields.forEach((el) => delete queryObj[el]);
    // convert to json and add $ before gte, gt, lte, lt
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
    // Model.find(objectQuery, stringFields, obtion)
    const products = await ProductModel.find(
      {
        ...JSON.parse(queryStr),
        $or: [
          {
            name: { $regex: search, $options: "i" },
          },
          {
            description: { $regex: search, $options: "i" },
          },
          {
            brand: { $regex: search, $options: "i" },
          },
          {
            categories: { $regex: search, $options: "i" },
          },
        ],
      },
      fields,
      {
        skip,
        limit,
        sort,
      }
    );
    return res.status(200).json({
      success: true,
      message: "OK",
      products,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Something went wrong",
      error,
    });
  }
};

// GET /:id
let getProduct = async (req, res) => {
  try {
    let productId = req.params.productId;
    let product = await ProductModel.findById(productId).exec();
    if (!product) {
      return res.status(200).json("Product not found");
    }
    return res.status(200).json({
      success: true,
      message: "OK",
      product,
    });
  } catch (error) {
    res.status(500).json({
      message: "error",
      error,
    });
  }
};

//  POST /
let createProduct = async (req, res) => {
  try {
    let data = ({
      name,
      description,
      price,
      discount,
      categories,
      rear_camera,
      front_camera,
      operating_system,
      display_size,
      power,
      memory,
      ram,
    } = req.body);
    data.images = req.files
      ? req.files.map((file) => {
          const path = file.path.split("public")[1];
          return path.replace(/\\/g, "/");
        })
      : [];
    data.categories = categories.split(",");
    data.detail = {
      rear_camera,
      front_camera,
      operating_system,
      display_size,
      power,
      memory,
      ram,
    };

    let product = new ProductModel(data);
    product.save((validateBeforeSave = true));
    return res.status(200).json({
      success: true,
      message: "OK",
      product: product,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

// PUT /:id
let updateProduct = async (req, res) => {
  try {
    let productId = req.params.productId;
    const foundProduct = await ProductModel.findById(productId);
    if (!foundProduct) return res.status(200).json("This product not exist");
    let {
      name,
      description,
      price,
      discount,
      categories,
      rear_camera,
      front_camera,
      operating_system,
      display_size,
      power,
      memory,
      ram,
      deleteImage,
    } = req.body;
    if (deleteImage) {
      deleteImage = deleteImage.split(",");
      deleteImage.forEach((url) => {
        fs.unlinkSync(`${__dirname}/../public${url}`);
      });
    }
    let data = {
      name,
      description,
      price,
      discount,
      categories,
      rear_camera,
      front_camera,
      operating_system,
      display_size,
      power,
      memory,
      ram,
    };
    // solve image
    // get image in form
    data.images = req.files
      ? req.files.map((file) => {
          const path = file.path.split("public")[1];
          return path.replace(/\\/g, "/");
        })
      : [];
    // images = images in form + image has saved - image was delete
    data.images = [
      ...data.images,
      ...foundProduct.images?.filter((value) => !deleteImage?.includes(value)),
    ];
    // end solve image
    data.categories = categories.split(",");

    let newProduct = await ProductModel.findByIdAndUpdate(productId, data, {
      new: true,
    });
    return res.status(200).json({
      success: true,
      message: "OK",
      newProduct,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

// DELETE /:productId
let deleteProduct = async (req, res) => {
  try {
    let productId = req.params.productId;
    let productDelete = await ProductModel.findByIdAndDelete(productId);
    return res.status(200).json({
      success: true,
      message: "OK",
      productDelete,
    });
  } catch (error) {
    return res.status(500).json({
      error,
    });
  }
};

module.exports = {
  getAllProducts,
  getProduct,
  createProduct,
  updateProduct,
  deleteProduct,
};
