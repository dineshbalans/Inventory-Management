import axios from "axios";

const API_URL = "http://localhost:5000/api/v1";

const checkAuth = () => {
  return axios.get(`${API_URL}/user/refresh`, {
    withCredentials: true,
  });
};

const register = (username, password) => {
  return axios.post(
    `${API_URL}/user/register`,
    { username, password },
    {
      withCredentials: true,
    }
  );
};

const login = (username, password) => {
  return axios.post(
    `${API_URL}/user/login`,
    { username, password },
    {
      withCredentials: true,
    }
  );
};

const logout = () => {
  return axios.post(
    `${API_URL}/user/logout`,
    {},
    {
      withCredentials: true,
    }
  );
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
  checkAuth,
  register,
  login,
  logout,
  addProduct,
  updateProductQuantity,
  getUserProducts,
  createInvoice,
  getUserInvoices,
};
