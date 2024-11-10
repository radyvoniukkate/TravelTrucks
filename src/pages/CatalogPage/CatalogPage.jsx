import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import css from "./CatalogPage.module.css";
import Filter from "../../components/Filters/Filters.jsx";
import TrackCard from "../../components/TrackCard/TrackCard.jsx";
import { fetchCampers } from "../../redux/truck/operations";
import {
  selectCampersList,
  selectCampersStatus,
  selectCampersError,
} from "../../redux/truck/selector";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const campersData = useSelector(selectCampersList);
  const campersList = campersData.items || []; // Перевіряємо, чи є дані
  const filters = useSelector((state) => state.filters) || {}; // Отримуємо фільтри зі стейту
  console.log("Filters before dispatch:", filters);
  const status = useSelector(selectCampersStatus);
  const error = useSelector(selectCampersError);

  const [visibleCount, setVisibleCount] = useState(4);


   useEffect(() => {
     dispatch(fetchCampers({})); // Порожні фільтри за замовчуванням
   }, [dispatch]);


  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleShowMoreClick = (id) => {
    navigate(`/catalog/${id}`); 
  };

const handleFilterSubmit = () => {
  dispatch(fetchCampers(filters)); // Завантаження з фільтрацією
};
  
  if (status === "loading") {
    return <div>Loading campers...</div>;
  }

  if (status === "failed") {
    return <div>Error: {error}</div>;
  }

  return (
    <div className={css.catalogPage}>
      <Filter />
      <div className={css.cardsContainer}>
        {campersList.slice(0, visibleCount).map((camper) => (
          <TrackCard
            key={camper.id}
            camper={camper}
            onShowMore={() => handleShowMoreClick(camper.id)}
          />
        ))}
        {visibleCount < campersList.length && (
          <button onClick={loadMore} className={css.loadMoreButton}>
            Load More
          </button>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
