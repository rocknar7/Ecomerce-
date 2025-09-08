import axios from "axios";

const API = import.meta.env.VITE_API_BASE || "http://localhost:4000/api";

// Helper to get auth header
function authHeaders() {
  const token = localStorage.getItem("token");
  return token ? { Authorization: `Bearer ${token}` } : {};
}

// ----------------- Items -----------------
export const items = {
  list: async (filters = {}) => {
    const params = {};
    if (filters.q) params.q = filters.q;
    if (filters.category) params.category = filters.category;
    if (filters.minPrice) params.minPrice = filters.minPrice;
    if (filters.maxPrice) params.maxPrice = filters.maxPrice;
    if (filters.sort) params.sort = filters.sort;

    const res = await axios.get(`${API}/items`, { params });
    return res.data; // array or { items, total }
  },

  add: async (item) => {
    const res = await axios.post(`${API}/items`, item, {
      headers: authHeaders(),
    });
    return res.data;
  },

  update: async (itemId, item) => {
    const res = await axios.put(`${API}/items/${itemId}`, item, {
      headers: authHeaders(),
    });
    return res.data;
  },

  delete: async (itemId) => {
    const res = await axios.delete(`${API}/items/${itemId}`, {
      headers: authHeaders(),
    });
    return res.data;
  },
};

// ----------------- Cart -----------------
export const cart = {
  list: async () => {
    const res = await axios.get(`${API}/cart`, { headers: authHeaders() });
    return res.data;
  },
  add: async (itemId, qty) => {
    const res = await axios.post(
      `${API}/cart/add`,
      { itemId, qty },
      { headers: authHeaders() }
    );
    return res.data;
  },
  remove: async (itemId) => {
    const res = await axios.post(
      `${API}/cart/remove`,
      { itemId },
      { headers: authHeaders() }
    );
    return res.data;
  },
};

// ----------------- Auth -----------------
export const auth = {
  signup: async (data) => {
    const res = await axios.post(`${API}/auth/signup`, data);
    return res.data;
  },
  login: async (data) => {
    const res = await axios.post(`${API}/auth/login`, data);
    if (res.data.token) {
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));
    }
    return res.data;
  },
  logout: () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
  },
  currentUser: () => {
    const user = localStorage.getItem("user");
    return user ? JSON.parse(user) : null;
  },
};
  