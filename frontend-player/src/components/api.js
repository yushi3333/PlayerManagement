import axios from 'axios'

const API_BASE_URL = 'http://localhost:8080/api';

// 创建axios实例
const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// 请求拦截器：添加JWT token
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// 响应拦截器：处理token过期
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// 球员相关API
export const getPlayers = async () => {
  const response = await api.get('/players');
  return response.data;
};

export const getPlayer = async (id) => {
  try {
    const response = await api.get(`/players/${id}`);
    return response.data;
  } catch (err) {
    throw err;
  }
};

export const createPlayer = async (player) => {
  const response = await api.post('/players', player);
  return response.data;
};

export const updatePlayer = async (id, player) => {
  try {
    const response = await api.put(`/players/${id}`, player);
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const deletePlayer = async (id) => {
  const response = await api.delete(`/players/${id}`);
  return response.data;
};

// 认证相关API
export const registerUser = async (userData) => {
  const response = await api.post('/auth/register', userData);
  return response.data;
};

export const loginUser = async (credentials) => {
  const response = await api.post('/auth/login', credentials);
  return response.data;
};

// 评论相关API
export const getComments = async () => {
  const response = await api.get('/comments');
  return response.data;
};

export const getPlayerComments = async (playerId) => {
  const response = await api.get(`/comments/player/${playerId}`);
  return response.data;
};

export const getTeamComments = async (teamName) => {
  const response = await api.get(`/comments/team/${teamName}`);
  return response.data;
};

export const createComment = async (commentData) => {
  const response = await api.post('/comments', commentData);
  return response.data;
};

export const updateComment = async (id, commentData) => {
  const response = await api.put(`/comments/${id}`, commentData);
  return response.data;
};

export const deleteComment = async (id) => {
  const response = await api.delete(`/comments/${id}`);
  return response.data;
};

// 用户管理API
export const getUsers = async () => {
  const response = await api.get('/users');
  return response.data;
};

export const getUser = async (id) => {
  const response = await api.get(`/users/${id}`);
  return response.data;
};

export const updateUser = async (id, userData) => {
  const response = await api.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id) => {
  const response = await api.delete(`/users/${id}`);
  return response.data;
};

