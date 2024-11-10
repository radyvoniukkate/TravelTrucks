import { createSelector } from "reselect";

export const selectCampersList = (state) => state.campers.list;
export const selectFavorites = (state) => state.campers.favorites;
export const selectFilters = (state) => state.campers.filters;
export const selectCampersStatus = (state) => state.campers.status;
export const selectCampersError = (state) => state.campers.error;
export const selectCamperDetails = (state) => state.campers.selectedCamper;


// Селектор для отримання кемперів, які відповідають фільтрам
export const selectFilteredCampers = createSelector(
  [selectCampersList, selectFilters],
  (campers, filters) => {
    return campers.filter((camper) => {
      const matchesLocation =
        !filters.location || camper.location === filters.location;
      const matchesType = !filters.type || camper.type === filters.type;
      const matchesAmenities = filters.amenities.every((amenity) =>
        camper.amenities.includes(amenity)
      );

      return matchesLocation && matchesType && matchesAmenities;
    });
  }
);
