import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getWines = async (data) => {
  const response = await axios.get(`${base_url}wine?${data?.brand ? `brand=${data?.brand}&&` : ""}${data?.tag ? `tags=${data?.tag}&&` : ""}${data?.category ? `category=${data?.category}&&` : ""}${data?.minPrice ? `price[gte]=${data?.minPrice}&&` : ""}${data?.maxPrice ? `price[lte]=${data?.maxPrice}&&` : ""}${data?.sort ? `sort=${data?.sort}&&` : ""}`);
  if (response.data) {
    return response.data;
  }
};

const getSingleWine = async (id) => {
  const response = await axios.get(`${base_url}wine/${id}`);
  if (response.data) {
    return response.data;
  }
};

const addToWishlist = async (wineId) => {
  const response = await axios.put(
    `${base_url}wine/wishlist`,
    { wineId },
    config
  );
  if (response.data) {
    return response.data;
  }
};

const rateWine = async (data) => {
  const response = await axios.put(
    `${base_url}wine/rating`,
    data,
    config
  );
  if (response.data) {
    return response.data;
  }
};

export const wineService = {
  getWines,
  addToWishlist,
  getSingleWine,
  rateWine,
};
