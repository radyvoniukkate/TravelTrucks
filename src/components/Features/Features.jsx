import React, { useEffect, useState } from "react";
import css from "./Features.module.css";
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

const Features = ({ camperData }) => {
  const [features, setFeatures] = useState([]);

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

      setFeatures(availableFeatures);
    }
  }, [camperData]);

  if (features.length === 0) {
    return <p>No features available</p>;
  }

  return (
    <div className={css.features}>
      <div className={css.shortInfo}>
        {features.map((feature, index) => (
          <Feature key={index} icon={getIcon(feature)} label={feature} />
        ))}
      </div>
      <div className={css.moreInfo}>
        <h3 className={css.title}>Vehicle details</h3>
        <hr className={css.line}></hr>
        <div className={css.facts}>
          <div className={css.point}>
            <p>Form</p>
            <p>{camperData.form}</p>
          </div>
          <div className={css.point}>
            <p>Length</p>
            <p>{camperData.length}</p>
          </div>
          <div className={css.point}>
            <p>Width</p>
            <p>{camperData.width}</p>
          </div>
          <div className={css.point}>
            <p>Height</p>
            <p>{camperData.height}</p>
          </div>
          <div className={css.point}>
            <p>Tank</p>
            <p>{camperData.tank}</p>
          </div>
          <div className={css.point}>
            <p>Consumption</p>
            <p>{camperData.consumption}</p>
          </div>
        </div>
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

export default Features;
