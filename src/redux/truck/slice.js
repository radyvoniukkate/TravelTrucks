import { createSlice } from "@reduxjs/toolkit";
import {
  fetchCampers,
  fetchCamperById,
  addToFavorites,
  removeFromFavorites,
} from "./operations";

// Create the campers slice
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
      state.filters = {
        location: action.payload.location || "",
        type: action.payload.type || "",
        amenities: action.payload.amenities || [],
      };
    },
    updateFilters: (state, action) => {
      console.log("Filters updated:", action.payload);
      state.filters = action.payload;
    },
    setFilteredItems: (state, action) => {
      state.filteredItems = action.payload;
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
    .addCase(fetchCamperById.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchCamperById.fulfilled, (state, action) => {
        state.status = "succeeded";
        state.list = action.payload;
      })
      .addCase(fetchCamperById.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.payload;
      });
  },
});

export const {
  setFilters, 
  updateFilters, 
  setFilteredItems, 
  addFavorite,
  removeFavorite,
} = campersSlice.actions;

export default campersSlice.reducer;
