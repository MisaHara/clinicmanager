import axios from "axios";

const API_URL = "/api/patients";

export const getAllPatients = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};
