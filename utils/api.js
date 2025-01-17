import axios from "axios";

export const fetchPosts = async () => {
  const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/api/post`);
  return response.data;
};
