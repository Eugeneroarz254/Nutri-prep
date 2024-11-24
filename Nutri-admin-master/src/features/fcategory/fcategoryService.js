import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getCategories = async () => {
  const response = await axios.get(`${base_url}FurnitureCategory/`);

  return response.data;
};

const createCategory = async (fcat) => {
  const response = await axios.post(`${base_url}FurnitureCategory/`, fcat, config);

  return response.data;
};

const updateFurnitureCategory = async (furnitureCat) => {
  const response = await axios.put(
    `${base_url}FurnitureCategory/${furnitureCat.id}`,
    { title: furnitureCat.furnitureCatData.title },
    config
  );

  return response.data;
};

const getCategory = async (id) => {
  const response = await axios.get(`${base_url}FurnitureCategory/${id}`, config);

  return response.data;
};

const deleteFurnitureCategory = async (id) => {
  const response = await axios.delete(`${base_url}FurnitureCategory/${id}`, config);

  return response.data;
};

const fCategoryService = {
  getCategories,
  createCategory,
  deleteFurnitureCategory,
  getCategory,
  updateFurnitureCategory,
};

export default fCategoryService;
