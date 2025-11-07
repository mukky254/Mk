import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL;

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

export const authAPI = {
  login: (email: string, password: string) =>
    api.post('/api/auth/login', { email, password }),
  register: (data: any) =>
    api.post('/api/auth/register', data),
  getMe: () =>
    api.get('/api/auth/me'),
};

export const productsAPI = {
  getProducts: (params?: any) =>
    api.get('/api/products', { params }),
  getProduct: (id: string) =>
    api.get(`/api/products/${id}`),
  createProduct: (data: any) =>
    api.post('/api/products', data),
  updateProduct: (id: string, data: any) =>
    api.put(`/api/products/${id}`, data),
  deleteProduct: (id: string) =>
    api.delete(`/api/products/${id}`),
  getFarmerProducts: (farmerId: string) =>
    api.get(`/api/products/farmer/${farmerId}`),
};

export const ordersAPI = {
  createOrder: (data: any) =>
    api.post('/api/orders', data),
  getMyOrders: () =>
    api.get('/api/orders/myorders'),
  getOrder: (id: string) =>
    api.get(`/api/orders/${id}`),
  updateOrderStatus: (id: string, status: string) =>
    api.put(`/api/orders/${id}/status`, { status }),
  updatePaymentStatus: (id: string, paymentStatus: string, mpesaCode?: string) =>
    api.put(`/api/orders/${id}/payment`, { paymentStatus, mpesaCode }),
};

export const usersAPI = {
  getUserProfile: (id: string) =>
    api.get(`/api/users/profile/${id}`),
  updateProfile: (data: any) =>
    api.put('/api/users/profile', data),
  getFarmers: (params?: any) =>
    api.get('/api/users/farmers', { params }),
};

export const messagesAPI = {
  getConversations: () =>
    api.get('/api/messages/conversations'),
  getMessages: (userId: string) =>
    api.get(`/api/messages/${userId}`),
  sendMessage: (data: any) =>
    api.post('/api/messages', data),
};

export default api;
