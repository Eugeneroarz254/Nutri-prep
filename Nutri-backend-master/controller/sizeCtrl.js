const Size = require("../models/sizeModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");

const createSize = asyncHandler(async (req, res) => {
  try {
    const newSize = await Size.create(req.body);
    res.json(newSize);
  } catch (error) {
    throw new Error(error);
  }
});


const updateSize = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const updatedSize = await Size.findByIdAndUpdate(id, req.body, {
      new: true,
    });
    res.json(updatedSize);
  } catch (error) {
    throw new Error(error);
  }
});

const deleteSize = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const deletedSize = await Size.findByIdAndDelete(id);
    res.json(deletedSize);
  } catch (error) {
    throw new Error(error);
  }
});

const getSize = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const getSize = await Size.findById(id);
    res.json(getSize);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllSizes = asyncHandler(async (req, res) => {
  try {
    const allSizes = await Size.find();
    res.json(allSizes);
  } catch (error) {
    throw new Error(error);
  }
});

module.exports = {
  createSize,
  updateSize,
  deleteSize,
  getSize,
  getAllSizes,
};