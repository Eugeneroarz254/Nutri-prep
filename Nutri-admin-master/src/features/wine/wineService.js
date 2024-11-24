import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getWines = async () => {
  const response = await axios.get(`${base_url}wine/`);

  return response.data;
};

const createWine = async (wine) => {
  const response = await axios.post(`${base_url}wine/`, wine, config);

  return response.data;
};

const getWine = async (id) => {
  try {
    const response = await axios.get(`${base_url}wine/${id}`, config);
    return response.data;
  } catch (error) {
    console.error("Error while fetching wine:", error);
    throw error;
  }
};

const updateWine = async (wine) => {
  const response = await axios.put(
    `${base_url}wine/${wine.id}`,
    { wineData: wine.wineData },
    config
  );

  return response.data;
};

const deleteWine = async (id) => {
  const response = await axios.delete(`${base_url}wine/${id}`, config);

  return response.data;
};

const wineService = {
  getWines,
  createWine,
  updateWine,
  deleteWine,
  getWine
};

export default wineService;
