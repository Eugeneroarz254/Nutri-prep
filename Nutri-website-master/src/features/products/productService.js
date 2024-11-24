
import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";
console.log(config);
const getProducts = async (data) => {
  const response = await axios.get(`${base_url}product?${data?.tag ? `tags=${data?.tag}&&` : ""}${data?.category ? `category=${data?.category}&&` : ""}${data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""}${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""}${data?.sort ? `sort=${data?.sort}&&` : ""}`);
  if (response.data) {
    return response.data;
  }
};

const getSingleProduct = async (id) => {
  const response = await axios.get(`${base_url}product/${id}`);
  if (response.data) {
    return response.data;
  }
};

const getRelatedProducts = async (productId) => {
  const response = await axios.get(`${base_url}product/${productId}/related`);
  if (response.data) {
    return response.data;
  }
};

const addToViewedProducts = async (data) => {
  try {
    const response = await axios.put(`${base_url}product/${data.productId}/save-viewed`,data, config);

    return response.data;
  } catch (error) {
    throw error;
  }
};




const addToWishlist = async (prodId) => {
  const response = await axios.put(
    `${base_url}product/wishlist`,
    { prodId },
    config
  );
  if (response.data) {
    return response.data;
  }
};


const rateProduct = async (data) => {

  try {
    const response = await axios.put(
      `${base_url}product/rating`,
      data,
      config
    );

    // Log the response from the backend
    console.log('Rating response:', response);

    if (response.data) {
      return response.data;
    }
  } catch (error) {
    console.error('Error in rating product:', error);
    throw error; // Re-throw the error for further handling if needed
  }
};

export const productService = {
  getProducts,
  addToWishlist,
  getSingleProduct,
  rateProduct,
  getRelatedProducts,
  addToViewedProducts,
};
