import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getWineCategories = async () => {
  const response = await axios.get(`${base_url}winecategory/`); // Assuming your endpoint for wine categories is 'winecategory/'

  return response.data;
};

const createWineCategory = async (category) => {
  const response = await axios.post(`${base_url}winecategory/`, category, config);

  return response.data;
};

const getWineCategory = async (id) => {
  const response = await axios.get(`${base_url}winecategory/${id}`, config);

  return response.data;
};

const deleteWineCategory = async (id) => {
  const response = await axios.delete(`${base_url}winecategory/${id}`, config);

  return response.data;
};

const updateWineCategory = async (category) => {
  console.log(category);
  const response = await axios.put(
    `${base_url}winecategory/${category.id}`,
    { title: category.pCatData.title },
    config
  );

  return response.data;
};

const wcategoryService = {
  getWineCategories,
  createWineCategory,
  getWineCategory,
  deleteWineCategory,
  updateWineCategory,
};

export default wcategoryService;
