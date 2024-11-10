import React from "react";
import TrackDetails from "../../components/TrackDetails/TrackDetails";
import css from "./CamperPage.module.css";

const CamperPage = () => {

  return (
    <div className={css.camperPage}>
      <TrackDetails />
    </div>
  );
};

export default CamperPage;
