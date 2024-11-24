
 const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");

const createProduct = asyncHandler(async (req, res) => {
  try {
    // Check if the title exists and generate a slug
    if (req.body.title) {
      let slug = slugify(req.body.title);
      let slugExists = await Product.findOne({ slug });

      // If a product with the same slug exists, generate a new slug by appending a unique identifier
      if (slugExists) {
        const randomString = Math.random().toString(36).substring(7); // Generates a random 7 character string
        slug = `${slug}-${randomString}`;
      }

      req.body.slug = slug;
    }

    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (error) {
    throw new Error(error);
  }
});


const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params; // Extract the id from req.params
  validateMongoDbId(id);

  try {
    let { productData } = req.body; // Extract the entire productData from the request body

    if (productData.title) {
      let slug = slugify(productData.title);
      let slugExists = await Product.findOne({ slug });

      if (slugExists && slugExists._id.toString() !== id) {
        const randomString = Math.random().toString(36).substring(7); // Generate a random 7-character string
        slug = `${slug}-${randomString}`;
      }

      productData.slug = slug;
    }

    // Find and update the product by id, returning the updated product
    const updatedProduct = await Product.findByIdAndUpdate(id, productData, {
      new: true,
    });

    res.json(updatedProduct);
  } catch (error) {
    throw new Error(error);
  }
});




const deleteProduct = asyncHandler(async (req, res) => {
  const { id } = req.params; 
  validateMongoDbId(id);
  try {
    const deletedProduct = await Product.findOneAndDelete({ _id: id });
    res.json(deletedProduct);
  } catch (error) {
    throw new Error(error);
  }
});


const getaProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    // Find the product and populate the size field in the pricePerSize array
    const findProduct = await Product.findById(id).populate('pricePerSize.size'); // Populates size with full details

    res.json(findProduct);
  } catch (error) {
    throw new Error(error);
  }
});



const getAllProduct = asyncHandler(async (req, res) => {
  try {
    // Filtering
    const queryObj = { ...req.query };
    const excludeFields = ["page", "sort", "limit", "fields"];
    excludeFields.forEach((el) => delete queryObj[el]);
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`);

    let query = Product.find(JSON.parse(queryStr));

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
      const productCount = await Product.countDocuments();
      if (skip >= productCount) throw new Error("This Page does not exists");
    }
    const product = await query;
    res.json(product);
  } catch (error) {
    throw new Error(error);
  }
});

const getRelatedProducts = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);

  try {
    // Get the product by ID
    const product = await Product.findById(id);
    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    // Find related products based on common category or brand
    const relatedProducts = await Product.find({
      $or: [
        { category: product.category },
        
      ],
      _id: { $ne: product._id }, // Exclude the current product from the results
    }).limit(6); // Adjust the limit as needed

    res.json(relatedProducts);
  } catch (error) {
    throw new Error(error);
  }
});

const addToViewedProducts = asyncHandler(async (req, res) => {
  const { id } = req.user;
  const { productId } = req.body;
console.log("req.body",req.body)
  try {
    // Update the user's profile with the recently viewed product
    const user = await User.findByIdAndUpdate(
      id,
      {
        $addToSet: { recentlyViewed: productId },
      },
      {
        new: true,
      }
    );

    res.json(user);
  } catch (error) {
    throw new Error(error);
  }
});

const getRecentlyViewedProducts = asyncHandler(async (req, res) => {
  const { id } = req.user;
  try {
    // Retrieve the user's document and return the recently viewed products
    const user = await User.findById(id).populate('recentlyViewed');
    const recentlyViewedProducts = user.recentlyViewed;

    res.json(recentlyViewedProducts);
  } catch (error) {
    throw new Error(error);
  }
});



const addToWishlist = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { prodId } = req.body;
  try {
    const user = await User.findById(_id);
    const alreadyadded = user.wishlist.find((id) => id.toString() === prodId);
    if (alreadyadded) {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    } else {
      let user = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(user);
    }
  } catch (error) {
    throw new Error(error);
  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment, userName } = req.body;
  console.log(req.body,"rating")
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.ratings.find(
      (rating) => rating.postedby === userName
    );

    if (alreadyRated) {
      const updateRating = await Product.findOneAndUpdate(
        {
          ratings: { $elemMatch: { postedby: userName } },
        },
        {
          $set: { "ratings.$.star": star, "ratings.$.comment": comment },
        },
        {
          new: true,
        }
      );

      const updatedProduct = await Product.findById(prodId).populate('ratings.postedby', 'firstname name');

      if (updatedProduct) {
        const { firstname, name } = updatedProduct.ratings.find(
          (rating) => rating.postedby === userName
        ).postedby;
        console.log(`Name: ${name}`);
      }
    } else {
      const rateProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            ratings: {
              star: star,
              comment: comment,
              postedby: userName,
              name: userName,
              productId: prodId,
            },
          },
        },
        {
          new: true,
        }
      );
      
      const updatedProduct = await Product.findById(prodId).populate('ratings.postedby', 'firstname name');

      if (updatedProduct) {
        const { firstname, name } = updatedProduct.ratings.find(
          (rating) => rating.postedby === userName
        ).postedby;
        console.log(`Name: ${name}`);
      }
    }

    const getallratings = await Product.findById(prodId).populate('ratings.postedby', 'firstname');
    let totalRating = getallratings.ratings.length;
    let ratingsum = getallratings.ratings
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let averageRating = ratingsum / totalRating;  

    const finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: averageRating,
      },
      { new: true }
    );
    res.json(finalproduct);
  } catch (error) {
    throw new Error(error);
  }
});




module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  getRelatedProducts,
addToViewedProducts,
getRecentlyViewedProducts,
};

