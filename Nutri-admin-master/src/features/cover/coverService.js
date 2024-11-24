import axios from "axios";
import { base_url } from "../../utils/baseUrl";
import { config } from "../../utils/axiosconfig";

const getCovers = async () => {
  const response = await axios.get(`${base_url}cover/`);

  return response.data;
};
const createCover = async (cover) => {
  const response = await axios.post(`${base_url}cover/`, cover, config);

  return response.data;
};
const updateCover = async (cover) => {
  const response = await axios.put(
    `${base_url}cover/${cover.id}`,
    {
      coverData: cover.coverData
    },
    config
  );

  return response.data;
};
const getCover = async (id) => {
  const response = await axios.get(`${base_url}cover/${id}`, config);

  return response.data;
};

const deleteCover = async (id) => {
  const response = await axios.delete(`${base_url}cover/${id}`, config);

  return response.data;
};
const coverService = {
  getCovers,
  createCover,
  getCover,
  updateCover,
  deleteCover,
};

export default coverService;