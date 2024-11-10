import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import {setFilters} from "./slice"


const baseApi = axios.create({
  baseURL: "https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers",
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
      const response = await axios.get(
        `https://66b1f8e71ca8ad33d4f5f63e.mockapi.io/campers`,
        {
          params: filters, 
        }
      );
      console.log("API response:", response.data);
      return response.data;
    } catch (error) {
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
