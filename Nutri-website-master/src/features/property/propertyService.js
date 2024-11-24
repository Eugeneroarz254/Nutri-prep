import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getProperties = async (data) => {
  const response = await axios.get(
    `${base_url}property?${data?.tag ? `tags=${data?.tag}&&` : ""
    }${data?.category ? `category=${data?.category}&&` : ""}${
      data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""
    }${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""}${
      data?.sort ? `sort=${data?.sort}&&` : ""
    }`
  );
  if (response.data) {
    return response.data;
  }
};

const getSingleProperty = async (id) => {
  const response = await axios.get(`${base_url}property/${id}`);
  if (response.data) {
    return response.data;
  }
};

const addToWishlist = async (propId) => {
  const response = await axios.put(
    `${base_url}property/wishlist`,
    { propId },
    config
  );
  if (response.data) {
    return response.data;
  }
};

const rateProperty = async (data) => {
  const response = await axios.put(
    `${base_url}property/rating`,
    data,
    config
  );
  if (response.data) {
    return response.data;
  }
};

export const propertyService = {
  getProperties,
  addToWishlist,
  getSingleProperty,
  rateProperty,
};
