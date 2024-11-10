import { NavLink } from "react-router-dom";
import css from "./NavBar.module.css";

const NavBar = () => {

  return (
    <nav className={css.headRow}>
      <NavLink
        to="/"
        className={({ isActive }) => (isActive ? css.active : css.text)}
      >
        Home
      </NavLink>
      <NavLink
        to="/catalog"
        className={({ isActive }) => (isActive ? css.active : css.text)}
      >
        Catalog
      </NavLink>
    </nav>
  );
};

export default NavBar;
