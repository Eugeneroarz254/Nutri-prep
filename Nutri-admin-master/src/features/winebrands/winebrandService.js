import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getWineBrands = async () => {
  const response = await axios.get(`${base_url}winebrand/`);

  return response.data;
};

const createWineBrand = async (winebrand) => {
  const response = await axios.post(`${base_url}winebrand/`, winebrand, config);

  return response.data;
};

const updateWineBrand = async (winebrand) => {
  const response = await axios.put(
    `${base_url}winebrand/${winebrand.id}`,
    { title: winebrand.winebrandData.title },
    config
  );

  return response.data;
};

const getWineBrand = async (id) => {
  const response = await axios.get(`${base_url}winebrand/${id}`, config);

  return response.data;
};

const deleteWineBrand = async (id) => {
  const response = await axios.delete(`${base_url}winebrand/${id}`, config);

  return response.data;
};

const winebrandService = {
  getWineBrands,
  createWineBrand,
  getWineBrand,
  updateWineBrand,
  deleteWineBrand,
};

export default winebrandService;
