import axios from "axios";
const APP_URL = `${import.meta.env.VITE_BASE_URL}`;

export const getAllPosts = async () => {
  try {
    const response = await axios.get(`${APP_URL}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
}