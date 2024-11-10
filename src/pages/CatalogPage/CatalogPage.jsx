import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom"; // Імпорт useNavigate
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
  const navigate = useNavigate(); // Створення змінної навігації

  const campersData = useSelector(selectCampersList);
  const campersList = campersData.items || [];
  const status = useSelector(selectCampersStatus);
  const error = useSelector(selectCampersError);

  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    dispatch(fetchCampers());
  }, [dispatch]);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  // Функція для обробки перенаправлення
  const handleShowMoreClick = (id) => {
    navigate(`/catalog/${id}`);
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
        {campersList.length > 0 ? (
          campersList.slice(0, visibleCount).map((camper) => (
            <TrackCard
              key={camper.id}
              camper={camper}
              onShowMore={() => handleShowMoreClick(camper.id)} // Передача функції як пропс
            />
          ))
        ) : (
          <p>No campers found.</p>
        )}
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
