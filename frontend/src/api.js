import axios from 'axios';

const API = axios.create({
  baseURL: 'https://moviebooker-api.onrender.com/api',
});

// Ajouter le token si disponible
API.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default API;
