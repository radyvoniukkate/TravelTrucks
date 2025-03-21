import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {setFilters} from "./slice"


const baseApi = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io",
  headers: {
    "Content-Type": "application/json",
  },
});

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

export const fetchCampers = createAsyncThunk(
  "campers/fetchCampers",
  async (filters = {}, { rejectWithValue }) => {
    console.log("Thunk fetchCampers is called with filters:", filters);

    try {
      const params = {};

      // Фільтрація за зручностями
      if (filters.amenities && Array.isArray(filters.amenities)) {
        filters.amenities.forEach((amenity) => {
          params[amenity] = true;
        });
      }

      // Фільтрація за типом транспорту
      if (filters.form) {
        params.form = encodeURIComponent(filters.form);
      }

      // Фільтрація за містом
      if (filters.location) {
        params.location = filters.location; // Формат, як у БД
      }

      const queryString = new URLSearchParams(params).toString();
      console.log("Запит на сервер з параметрами:", `?${queryString}`);

      const response = await baseApi.get(`/campers?${queryString}`);
      console.log("API response:", response.data);

      return response.data;
    } catch (error) {
      if (error.response && error.response.status === 404) {
        console.warn("Даних не знайдено, повертаємо порожній масив.");
        return []; // повертаємо порожній масив campersList
      }

      console.error("API error:", error.message);
      return rejectWithValue(error.message);
    }
  }
);


// Оператор для отримання деталей кемпера за ID
export const fetchCamperById = createAsyncThunk(
  "campers/fetchCamperById",
  async (id, { rejectWithValue }) => {
    try {
      const response = await axios.get(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers/${id}`
      );

      return response.data;
    } catch (error) {
      return rejectWithValue(error.message);
    }
  }
);

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
