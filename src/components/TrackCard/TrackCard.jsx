import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { fetchCamperById } from "../../redux/truck/operations";
import css from "./TrackCard.module.css";
import petrol from "./images/petrol.svg";
import water from "./images/water.svg";
import fridge from "./images/fridge.svg";
import microwave from "./images/microwave.svg";
import radio from "./images/radio.svg";
import gas from "./images/gas.svg";
import AC from "./images/AC.svg";
import automatic from "./images/automatic.svg";
import bath from "./images/bath.svg";
import kitchen from "./images/kitchen.svg";
import tv from "./images/tv.svg";

const TrackCard = ({ camper, onShowMore }) => {
  const dispatch = useDispatch();
  const camperData = camper;
  const [isActive, setIsActive] = useState(false);
  const [features, setFeatures] = useState([]);

useEffect(() => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    setIsActive(storedFavorites.some((item) => item.id === camperData.id));
  }, [camperData.id]);

  const toggleHeart = () => {
    const storedFavorites = JSON.parse(localStorage.getItem("favorites")) || [];
    let updatedFavorites;

    if (isActive) {
      updatedFavorites = storedFavorites.filter((item) => item.id !== camperData.id);
    } else {
      updatedFavorites = [{ ...camperData }, ...storedFavorites];
    }

    localStorage.setItem("favorites", JSON.stringify(updatedFavorites));
    setIsActive((prev) => !prev);
  };

  useEffect(() => {
    if (camperData) {
      const availableFeatures = [];
      if (camperData.AC) availableFeatures.push("AC");
      if (camperData.automatic) availableFeatures.push("Automatic");
      if (camperData.petrol) availableFeatures.push("Petrol");
      if (camperData.bathroom) availableFeatures.push("Bathroom");
      if (camperData.kitchen) availableFeatures.push("Kitchen");
      if (camperData.TV) availableFeatures.push("TV");
      if (camperData.radio) availableFeatures.push("Radio");
      if (camperData.refrigerator) availableFeatures.push("Refrigerator");
      if (camperData.microwave) availableFeatures.push("Microwave");
      if (camperData.gas) availableFeatures.push("Gas");
      if (camperData.water) availableFeatures.push("Water");

      setFeatures(availableFeatures); // Оновлюємо список фіч
    }
  }, [camperData]);

  useEffect(() => {
    if (!camperData) {
      dispatch(fetchCamperById(camper.id));
    }
  }, [camperData, dispatch]);

  if (!camperData) {
    return <div>Loading...</div>;
  }

  const formattedPrice = camperData.price
    ? camperData.price.toFixed(2)
    : "0.00";

  const imageUrl =
    camperData.gallery && camperData.gallery.length > 0
      ? camperData.gallery[0].thumb
      : null;

  return (
    <div className={css.card}>
      {imageUrl ? (
        <img src={imageUrl} alt={camperData.name} className={css.image} />
      ) : (
        <div className={css.imageFallback}>No image available</div>
      )}
      <div className={css.cardContent}>
        <div className={css.headerInfo}>
          <div className={css.header}>
            <h2 className={css.title}>{camperData.name}</h2>
            <div className={css.rightContent}>
              <p className={css.price}>€{formattedPrice}</p>
              <button
                className={`${css.heartIcon} ${
                  isActive ? css.heartIconActive : ""
                }`}
                onClick={toggleHeart}
              >
                <svg
                  width="26"
                  height="24"
                  viewBox="0 0 26 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path d="M13 9.854L11.659 7.1705C11.326 6.506 10.7485 5.5505 9.931 4.778C9.127 4.0175 8.164 3.5 7 3.5C4.486 3.5 2.5 5.489 2.5 7.88C2.5 9.6965 3.331 10.979 5.302 12.935C5.8075 13.436 6.3835 13.9775 7.021 14.5745C8.683 16.1345 10.75 18.0755 13 20.6705C15.25 18.0755 17.317 16.1345 18.979 14.5745C19.6165 13.9775 20.194 13.4345 20.698 12.935C22.669 10.979 23.5 9.6965 23.5 7.88C23.5 5.489 21.514 3.5 19 3.5C17.8345 3.5 16.873 4.0175 16.069 4.778C15.2515 5.5505 14.674 6.506 14.341 7.1705L13 9.854ZM13.588 22.292C13.5158 22.3776 13.4257 22.4463 13.3242 22.4935C13.2226 22.5407 13.112 22.5651 13 22.5651C12.888 22.5651 12.7774 22.5407 12.6758 22.4935C12.5743 22.4463 12.4842 22.3776 12.412 22.292C10.0105 19.439 7.837 17.399 6.0475 15.7205C2.95 12.812 1 10.9835 1 7.88C1 4.6325 3.685 2 7 2C9.4 2 11.0785 3.575 12.106 5.012C12.496 5.5595 12.793 6.086 13 6.5C13.2597 5.982 13.5586 5.48456 13.894 5.012C14.9215 3.5735 16.6 2 19 2C22.315 2 25 4.6325 25 7.88C25 10.9835 23.05 12.812 19.9525 15.7205C18.163 17.4005 15.9895 19.442 13.588 22.292Z" />
                </svg>
              </button>
            </div>
          </div>
         <div className={css.ratingLocation}>
            <div className={css.ratingLocationInto}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={css.starIcon}
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_12164_420)">
                  <path
                    d="M7.55778 0.838169C7.74538 0.482595 8.25462 0.482596 8.44222 0.838169L10.3305 4.41705C10.4028 4.55417 10.5347 4.64997 10.6874 4.67641L14.6747 5.36629C15.0708 5.43484 15.2282 5.91915 14.948 6.20745L12.1277 9.10921C12.0197 9.22039 11.9693 9.3754 11.9914 9.52886L12.5674 13.5341C12.6246 13.932 12.2126 14.2314 11.8519 14.054L8.22062 12.2685C8.0815 12.2001 7.9185 12.2001 7.77938 12.2685L4.14815 14.054C3.78737 14.2314 3.37539 13.932 3.43262 13.5341L4.00861 9.52886C4.03068 9.3754 3.98031 9.22039 3.87226 9.10921L1.05204 6.20745C0.771841 5.91915 0.929206 5.43484 1.32535 5.36629L5.31256 4.67641C5.46533 4.64997 5.59719 4.55417 5.66954 4.41705L7.55778 0.838169Z"
                    fill="#FFC531"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_12164_420">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span>
                {camperData.rating} (
                {camperData.reviews ? camperData.reviews.length : 0} Reviews)
              </span>
            </div>
            <div className={css.ratingLocationInto}>
              <svg
                width="16"
                height="16"
                viewBox="0 0 16 16"
                fill="none"
                className={css.locationIcon}
                xmlns="http://www.w3.org/2000/svg"
              >
                <g clipPath="url(#clip0_12164_424)">
                  <path
                    fillRule="evenodd"
                    clipRule="evenodd"
                    d="M15.817 0.112823C15.8743 0.159759 15.9204 0.218822 15.952 0.285748C15.9837 0.352674 16 0.425792 16 0.499823V14.4998C15.9999 14.6154 15.9598 14.7273 15.8866 14.8167C15.8133 14.906 15.7113 14.9672 15.598 14.9898L10.598 15.9898C10.5333 16.0028 10.4667 16.0028 10.402 15.9898L5.5 15.0098L0.598 15.9898C0.525489 16.0043 0.450665 16.0025 0.378921 15.9846C0.307176 15.9667 0.240296 15.9331 0.183099 15.8863C0.125903 15.8394 0.0798134 15.7804 0.0481518 15.7136C0.0164902 15.6468 4.46527e-05 15.5738 0 15.4998L0 1.49982C6.9782e-05 1.38428 0.0401561 1.27232 0.113443 1.18299C0.186731 1.09366 0.288695 1.03247 0.402 1.00982L5.402 0.00982311C5.46669 -0.00310763 5.53331 -0.00310763 5.598 0.00982311L10.5 0.989823L15.402 0.00982311C15.4745 -0.00476108 15.5493 -0.00308756 15.6211 0.0147231C15.6928 0.0325338 15.7597 0.0660382 15.817 0.112823ZM10 1.90982L6 1.10982V14.0898L10 14.8898V1.90982ZM11 14.8898L15 14.0898V1.10982L11 1.90982V14.8898ZM5 14.0898V1.10982L1 1.90982V14.8898L5 14.0898Z"
                    fill="#101828"
                  />
                </g>
                <defs>
                  <clipPath id="clip0_12164_424">
                    <rect width="16" height="16" fill="white" />
                  </clipPath>
                </defs>
              </svg>
              <span className={css.location}>{camperData.location}</span>
            </div>
          </div>
        </div>
        <p className={css.description}>{camperData.description}</p>
        <div className={css.features}>
          {features.length > 0 ? (
            features.map((feature, index) => (
              <Feature key={index} icon={getIcon(feature)} label={feature} />
            ))
          ) : (
            <p>No features available</p>
          )}
        </div>
        <button onClick={onShowMore} className={css.button}>
          Show more
        </button>
      </div>
    </div>
  );
};

const Feature = ({ icon, label }) => (
  <div className={css.feature}>
    <img src={icon} alt={label} className={css.featureIcon} />
    <span>{label}</span>
  </div>
);

const getIcon = (feature) => {
  switch (feature) {
    case "AC":
      return AC;
    case "Bathroom":
      return bath;
    case "Kitchen":
      return kitchen;
    case "TV":
      return tv;
    case "Radio":
      return radio;
    case "Refrigerator":
      return fridge;
    case "Microwave":
      return microwave;
    case "Gas":
      return gas;
    case "Water":
      return water;
    case "Petrol":
      return petrol;
    case "Automatic":
      return automatic;
    default:
      return null;
  }
};

export default TrackCard;
