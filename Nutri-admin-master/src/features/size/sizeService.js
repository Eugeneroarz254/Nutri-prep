import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getSizes = async () => {
  const response = await axios.get(`${base_url}size`);

  return response.data;
};

const addSize = async (sizeData) => {
  const response = await axios.post(`${base_url}size`, sizeData, config);

  return response.data;
};



const updateSize = async (size) => {
  const response = await axios.put(
    `${base_url}size/${size.id}`,
    { title: size.sizeData.title },
    config
  );

  return response.data;
};

const getSize = async (id) => {
  const response = await axios.get(`${base_url}size/${id}`, config);

  return response.data;
};

const deleteSize = async (id) => {
  const response = await axios.delete(`${base_url}size/${id}`, config);

  return response.data;
};

const sizeService = {
  getSizes,
  addSize,
  updateSize,
  getSize,
  deleteSize,
  
};

export default sizeService;
