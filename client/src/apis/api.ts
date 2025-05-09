import axios from 'axios';

export const api = axios.create({
  baseURL: process.env.REACT_APP_SERVER_URL,
  timeout: 1000,
  headers: { 'Content-Type': 'application/json' },
});

api.interceptors.request.use(
  function (config) {
    const token = localStorage.getItem('chat-user');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  function (error) {
    // Handle the error
    return Promise.reject(error);
  },
);
