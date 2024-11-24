import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getCoverCategories = async () => {
  const response = await axios.get(`${base_url}CoverCategory/`);

  return response.data;
};
const createCoverCategory = async (ccat) => {
  const response = await axios.post(`${base_url}CoverCategory/`, ccat, config);

  return response.data;
};
const updateCoverCategory = async (coverCat) => {
  const response = await axios.put(
    `${base_url}CoverCategory/${coverCat.id}`,
    { title: coverCat.coverCatData.title },
    config
  );

  return response.data;
};
const getCoverCategory = async (id) => {
  const response = await axios.get(`${base_url}CoverCategory/${id}`, config);

  return response.data;
};

const deleteCoverCategory = async (id) => {
  const response = await axios.delete(`${base_url}CoverCategory/${id}`, config);

  return response.data;
};
const bCategoryService = {
  getCoverCategories,
  createCoverCategory,
  deleteCoverCategory,
  getCoverCategory,
  deleteCoverCategory,
  updateCoverCategory,
};

export default bCategoryService;