import axios from "axios";

const API_URL = "http://localhost:5001/api";

export const fetchProducts = async () => {
  const res = await axios.get(`${API_URL}/products`);
  return res.data;
};

export const trackUserView = async (userId, productId) => {
  await axios.post(`${API_URL}/users/view`, { userId, productId });
};

export const fetchRecommendations = async (userId) => {
  const res = await axios.get(`${API_URL}/users/${userId}/recommendations`);
  return res.data;
};