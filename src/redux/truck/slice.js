import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCampers,
  fetchCamperById,
  addToFavorites,
  removeFromFavorites,
} from "./operations";

const campersSlice = createSlice({
  name: "campers",
  initialState: {
    list: [],
    favorites: [],
    filters: {
      location: "",
      type: "",
      amenities: [],
    },
    status: "idle",
    error: null,
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = action.payload;
    },
    addFavorite: (state, action) => {
      if (!state.favorites.includes(action.payload)) {
        state.favorites.push(action.payload);
      }
    },
    removeFavorite: (state, action) => {
      state.favorites = state.favorites.filter((id) => id !== action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchCampers.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCampers.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchCampers.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.selectedCamper = action.payload;
      })
      .addCase(addToFavorites.fulfilled, (state) => {
        // Обробка у разі успіху
      })
      .addCase(removeFromFavorites.fulfilled, (state) => {
        // Обробка у разі успіху
      });
  },
});

export const { setFilters, addFavorite, removeFavorite } = campersSlice.actions;
export default campersSlice.reducer;
