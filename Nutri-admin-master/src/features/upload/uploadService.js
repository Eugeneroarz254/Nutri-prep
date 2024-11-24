import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const uploadImg = async (data) => {
  const response = await axios.post(`${base_url}upload/images`, data, config);
  return response.data;
};

const deleteImg = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/images/${id}`,
    config
  );
  return response.data;
};

const uploadDescImg = async (data) => {
  const response = await axios.post(`${base_url}upload/desc/images`, data, config);
  return response.data;
};

const deleteDescImg = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/desc/images/${id}`,
    config
  );
  return response.data;
};

const uploadVideo = async (data) => {
  const response = await axios.post(`${base_url}upload/videos`, data, config); // Adjust the endpoint for video uploads
  return response.data;
};

const deleteVideo = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/video/${id}`, // Use the correct endpoint for video deletion
    config
  );
  return response.data;
};

const deleteDescVideo = async (id) => {
  const response = await axios.delete(
    `${base_url}upload/desc/video/${id}`, // Use the correct endpoint for video deletion
    config
  );
  return response.data;
};

const uploadDescVideo = async (data) => {
  const response = await axios.post(`${base_url}upload/desc/videos`, data, config); // Adjust the endpoint for video uploads
  return response.data;
};

const uploadService = {
  uploadImg,
  deleteImg,
  uploadVideo,
  deleteVideo,
  uploadDescImg,
  deleteDescImg,
  deleteDescVideo,
  uploadDescVideo,
};

export default uploadService;
