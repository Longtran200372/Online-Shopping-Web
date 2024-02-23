const slugify = require("slugify");
const categoryModel = require("../models/CategoryModel");

const createCategory = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(200).json("name is required");
    const existCategory = await categoryModel.findOne({ name });
    if (existCategory) return res.status(200).json("category already exist");

    const category = await new categoryModel({
      name,
      slug: slugify(name),
    }).save();

    return res.status(200).json({
      success: true,
      message: "new category created",
      category,
    });
  } catch (error) {
    res.status(500).json({
      error,
      message: "Error in category",
    });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { name } = req.body;
    const { categoryId } = req.params;

    const foundCategory = await categoryModel.findOne({ name });
    if (foundCategory) return res.status(200).json("This name already exist");

    const category = await categoryModel.findByIdAndUpdate(
      categoryId,
      { name, slug: slugify(name) },
      { new: true }
    );
    return res.status(200).json({
      success: true,
      message: "Category updated successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error white update category",
      error,
    });
  }
};

const getAllCategories = async (req, res) => {
  try {
    const categories = await categoryModel.find({});
    return res.status(200).json({
      success: true,
      message: "Get all categories successfully",
      categories,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error when get category",
      error,
    });
  }
};

const getCategory = async (req, res) => {
  try {
    const { slug } = req.params;
    const category = await categoryModel.findOne({ slug });
    return res.status(200).json({
      success: true,
      message: "Get one category successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error when get one category",
      error,
    });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const category = await categoryModel.findByIdAndDelete(categoryId);
    return res.status(200).json({
      success: true,
      message: "Delete category successfully",
      category,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Error when delete category",
      error,
    });
  }
};
module.exports = {
  createCategory,
  updateCategory,
  getAllCategories,
  getCategory,
  deleteCategory,
};
