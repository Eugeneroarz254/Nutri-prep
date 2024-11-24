import axios from "axios";
import { config } from "../../utils/axiosconfig";
import { base_url } from "../../utils/baseUrl";

const getProperties = async () => {
  const response = await axios.get(`${base_url}property/`); // Assuming the endpoint is 'property/' for properties

  return response.data;
};

const createProperty = async (property) => {
  const response = await axios.post(`${base_url}property/`, property, config); // Assuming the endpoint is 'property/' for creating properties

  return response.data;
};

const deleteProperty = async (id) => {
  const response = await axios.delete(`${base_url}property/${id}`, config); // Assuming the endpoint is 'property/' for deleting properties

  return response.data;
};

const propertyService = {
  getProperties,
  createProperty,
  deleteProperty,
};

export default propertyService;
