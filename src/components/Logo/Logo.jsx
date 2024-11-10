import { NavLink } from "react-router-dom";
import css from "./Logo.module.css";

const Logo = () => {
  return (
    <nav className={css.headRow}>
      <NavLink
        to="/"
        className={css.logo}
      >
        <img src="/src/components/Logo/images/TravelTrucks.png" alt="Travel Trucks" />
      </NavLink>
    </nav>
  );
};

export default Logo;
