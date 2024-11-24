import axios from "axios";
import { base_url, config } from "../../utils/axiosConfig";

const getCovers = async (data) => {
    const response = await axios.get(
      `${base_url}cover?${data?.category?`category=${data?.category}&&`:""}`
    );

    if (response.data) {
      return response.data;
    }
  };
  

const getSingleCover = async (id) => {
  const response = await axios.get(`${base_url}cover/${id}`);
  if (response.data) {
    return response.data;
  }
};

const createCover = async (coverData) => {
  const response = await axios.post(`${base_url}cover`, coverData, config);
  if (response.data) {
    return response.data;
  }
};

const updateCover = async (data) => {
  const { id, coverData } = data;
  const response = await axios.put(`${base_url}cover/${id}`, coverData, config);
  if (response.data) {
    return response.data;
  }
};

const deleteCover = async (id) => {
  const response = await axios.delete(`${base_url}cover/${id}`, config);
  if (response.data) {
    return response.data;
  }
};

export const coverService = {
  getCovers,
  getSingleCover,
  createCover,
  updateCover,
  deleteCover,
};
