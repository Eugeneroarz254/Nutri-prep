const Cover = require("../models/coverModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");

const createCover = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newCover = await Cover.create(req.body);
    res.json(newCover);
  } catch (error) {
    throw new Error(error);
  }
});

const updateCover = asyncHandler(async (req, res) => {
  const { id } = req.params; // Extract the id from req.params
  validateMongoDbId(id);
  try {
    const { coverData } = req.body; // Extract the entire coverData from the request body

    if (coverData.category) {
      coverData.slug = slugify(coverData.category);
    }

    console.log("Received data for update:", coverData);

    const updatedCover = await Cover.findByIdAndUpdate(id, coverData, {
      new: true,
    });
    res.json(updatedCover);
  } catch (error) {
    throw  new Error(error);
  }
});

const deleteCover = asyncHandler(async (req, res) => {
  const id = req.params;
  validateMongoDbId(id);
  try {
    const deletedCover = await Cover.findOneAndDelete(id);
    res.json(deletedCover);
  } catch (error) {
    throw new Error(error);
  }
});

const getACover = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const foundCover = await Cover.findById(id);
    // Handle any necessary population or data retrieval here
    res.json(foundCover);
  } catch (error) {
    throw new Error(error);
  }
});

const getAllCovers = asyncHandler(async (req, res) => {
    try {
      // Filtering
      const queryObj = { ...req.query };
      const excludeFields = ["page", "sort", "limit", "fields"];
      excludeFields.forEach((el) => delete queryObj[el]);
      let queryStr = JSON.stringify(queryObj);
      queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);
  
      let query = Cover.find(JSON.parse(queryStr))
  
      // Sorting
  
      if (req.query.sort) {
        const sortBy = req.query.sort.split(",").join(" ");
        query = query.sort(sortBy);
      } else {
        query = query.sort("-createdAt");
      }
  
      // limiting the fields
  
      if (req.query.fields) {
        const fields = req.query.fields.split(",").join(" ");
        query = query.select(fields);
      } else {
        query = query.select("-__v");
      }
  
      // pagination
  
      const page = req.query.page;
      const limit = req.query.limit;
      const skip = (page - 1) * limit;
      query = query.skip(skip).limit(limit);
      if (req.query.page) {
        const coverCount = await Cover.countDocuments();
        if (skip >= coverCount) throw new Error("This Page does not exists");
      }
      const cover = await query;
      res.json(cover);
    } catch (error) {
      throw new Error(error);
    }
  });
  

module.exports = {
  createCover,
  getACover,
  getAllCovers,
  updateCover,
  deleteCover,
};
