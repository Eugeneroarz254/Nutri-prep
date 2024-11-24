import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getCameraCategories = async () => {
  const response = await axios.get(`${base_url}cameracategory/`); // Assuming your endpoint for camera categories is 'cameracategory/'

  return response.data;
};

const createCameraCategory = async (category) => {
  const response = await axios.post(`${base_url}cameracategory/`, category, config);

  return response.data;
};

const getCameraCategory = async (id) => {
  const response = await axios.get(`${base_url}cameracategory/${id}`, config);

  return response.data;
};

const deleteCameraCategory = async (id) => {
  const response = await axios.delete(`${base_url}cameracategory/${id}`, config);

  return response.data;
};

const updateCameraCategory = async (category) => {
  console.log(category);
  const response = await axios.put(
    `${base_url}cameracategory/${category.id}`,
    { title: category.pCatData.title },
    config
  );

  return response.data;
};

const wcategoryService = {
  getCameraCategories,
  createCameraCategory,
  getCameraCategory,
  deleteCameraCategory,
  updateCameraCategory,
};

export default wcategoryService;
