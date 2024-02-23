const brandModel = require("../models/BrandModel");

const getAllBrands = async (req, res) => {
  try {
    const brands = await brandModel.find();
    return res.status(200).json({
      success: true,
      message: "OK",
      brands,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some thing went wrong in get all Brands",
      error,
    });
  }
};
const createBrand = async (req, res) => {
  try {
    const { name } = req.body;
    if (!name) return res.status(200).json("Name is required");
    const newBrand = new brandModel({ name });
    await newBrand.save();
    return res.status(200).json({
      success: true,
      message: "OK",
      newBrand,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some thing went wrong in create brand",
      error,
    });
  }
};
const getBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    const foundBrand = await brandModel.findById(brandId);
    return res.statsu(200).json({
      success: true,
      message: "OK",
      brand: foundBrand,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some thing went wrong in get brand",
      error,
    });
  }
};
const updateBrand = async (req, res) => {
  try {
    const { name } = req.body;
    const { brandId } = req.params;
    const foundBrand = await brandModel.findOne({ name });
    if (foundBrand) return res.status(200).json("Brand name already exist");
    const updateBrand = await brandModel.findByIdAndUpdate(brandId, { name });
    return res.status(200).json({
      success: true,
      message: "OK",
      updateBrand,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some thing went wrong in update brand",
      error,
    });
  }
};
const deleteBrand = async (req, res) => {
  try {
    const { brandId } = req.params;
    const foundBrand = await brandModel.findById(brandId);

    if (!foundBrand) return res.status(200).json("brand not found");

    const deleteBrand = await brandModel.findByIdAndDelete(brandId);
    return res.status(200).json({
      success: true,
      message: "OK",
      deleteBrand,
    });
  } catch (error) {
    return res.status(500).json({
      message: "Some thing went wrong in delete brand",
      error,
    });
  }
};

module.exports = {
  getAllBrands,
  createBrand,
  getBrand,
  updateBrand,
  deleteBrand,
};
