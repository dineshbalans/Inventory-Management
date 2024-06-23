import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

const register = (username, password) => {
  return axios.post(`${API_URL}/register`, { username, password });
};

const login = (username, password) => {
  return axios.post(`${API_URL}/login`, { username, password });
};

const addProduct = (token, product) => {
  return axios.post(`${API_URL}/product`, product, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const updateProductQuantity = (token, productId, quantity) => {
  return axios.put(
    `${API_URL}/product`,
    { productId, quantity },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const getUserProducts = (token) => {
  return axios.get(`${API_URL}/products`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

const createInvoice = (token, products) => {
  return axios.post(
    `${API_URL}/invoice`,
    { products },
    { headers: { Authorization: `Bearer ${token}` } }
  );
};

const getUserInvoices = (token) => {
  return axios.get(`${API_URL}/invoices`, {
    headers: { Authorization: `Bearer ${token}` },
  });
};

export {
  register,
  login,
  addProduct,
  updateProductQuantity,
  getUserProducts,
  createInvoice,
  getUserInvoices,
};
