import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Створення інстансу axios з базовим URL
const baseApi = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers",
  headers: {
    "Content-Type": "application/json",
  },
});

// Інтерцептор для авторизації (якщо потрібен)
baseApi.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Оператор для завантаження всіх кемперів з фільтрами
export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (filters = {}, { rejectWithValue }) => {
    try {
      const response = await baseApi.get("/", { params: filters });
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Оператор для отримання деталей кемпера за ID
export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await baseApi.get(`/${id}`);
      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

// Оновлення фільтрів і повторне завантаження списку кемперів
export const updateFilters = (filters) => (dispatch) => {
  dispatch(setFilters(filters));
  dispatch(fetchCampers(filters)); // Оновлює список кемперів на основі нових фільтрів
};

// Додавання до обраних
export const addToFavorites = createAsyncThunk(
  "campers/addToFavorites",
  async (camperId, { getState, dispatch }) => {
    const { favorites } = getState().campers;
    if (!favorites.includes(camperId)) {
      dispatch(addFavorite(camperId));
    }
  }
);

// Видалення з обраних
export const removeFromFavorites = createAsyncThunk(
  "campers/removeFromFavorites",
  async (camperId, { dispatch }) => {
    dispatch(removeFavorite(camperId));
  }
);
