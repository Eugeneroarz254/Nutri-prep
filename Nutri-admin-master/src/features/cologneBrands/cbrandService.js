import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getCologneBrands = async () => {
  const response = await axios.get(`${base_url}colognebrand/`); // Update the endpoint to match your actual route

  return response.data;
};

const createCologneBrand = async (colognebrand) => {
  const response = await axios.post(`${base_url}colognebrand/`, colognebrand, config); // Update the endpoint to match your actual route

  return response.data;
};

const updateCologneBrand = async (colognebrand) => {
  const response = await axios.put(
    `${base_url}colognebrand/${colognebrand.id}`, // Update the endpoint to match your actual route
    { title: colognebrand.colognebrandData.title },
    config
  );

  return response.data;
};

const getCologneBrand = async (id) => {
  const response = await axios.get(`${base_url}colognebrand/${id}`, config); 

  return response.data;
};

const deleteCologneBrand = async (id) => {
  const response = await axios.delete(`${base_url}colognebrand/${id}`, config); // Update the endpoint to match your actual route

  return response.data;
};

const cbrandService = {
  getCologneBrands,
  createCologneBrand,
  getCologneBrand,
  updateCologneBrand,
  deleteCologneBrand,
};

export default cbrandService;
