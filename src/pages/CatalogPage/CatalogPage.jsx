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
  selectFavorites, // Додаємо новий селектор
} from "../../redux/truck/selector";

const CatalogPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const campersData = useSelector(selectCampersList);
  const campersList = campersData.items || []; 
  const filters = useSelector((state) => state.filters) || {}; 
  const favorites = useSelector(selectFavorites); // Отримуємо список улюблених кемперів
  const status = useSelector(selectCampersStatus);
  const error = useSelector(selectCampersError);

  const [visibleCount, setVisibleCount] = useState(4);

  useEffect(() => {
    dispatch(fetchCampers({}));
  }, [dispatch]);

  const loadMore = () => {
    setVisibleCount((prevCount) => prevCount + 4);
  };

  const handleShowMoreClick = (id) => {
    navigate(`/catalog/${id}`);
  };

  const handleFilterSubmit = () => {
    dispatch(fetchCampers(filters)); 
  };

  // Перевіряємо, чи кемпер у вибраному
  const sortedCampers = [...campersList].sort((a, b) => {
    const aIsFavorite = favorites.includes(a.id); // true, якщо є у вибраному
    const bIsFavorite = favorites.includes(b.id);
    return bIsFavorite - aIsFavorite; // Якщо bIsFavorite true → b йде раніше
  });

  return (
    <div className={css.catalogPage}>
      <Filter />
      <div className={css.campersBlock}>
        {status === "loading" && (
          <div className={css.message}>Loading campers...</div>
        )}

        {status === "succeeded" && sortedCampers.length === 0 && (
          <div className={css.messageError}>
            <img className={css.errorImg} src="/src/pages/CatalogPage/images/nodata.jpg" alt="No data" />
          </div>
        )}

        {sortedCampers.length > 0 && (
          <div className={css.cardsContainer}>
            {sortedCampers.slice(0, visibleCount).map((camper) => (
              <TrackCard
                key={camper.id}
                camper={camper}
                onShowMore={() => handleShowMoreClick(camper.id)}
              />
            ))}
            {visibleCount < sortedCampers.length && (
              <button onClick={loadMore} className={css.loadMoreButton}>
                Load More
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default CatalogPage;
