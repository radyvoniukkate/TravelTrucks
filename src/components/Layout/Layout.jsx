import { Outlet } from "react-router-dom";
import NavBar from "../NavBar/NavBar.jsx"
import Logo from "../Logo/Logo.jsx"
import css from "./Layout.module.css"

const Layout = () => {
  return (
    <div className={css.Layout}>
      <div className={css.header}>
        <div className={css.logo}>
          <Logo />
        </div>
        <div className={css.navbar}>
          <NavBar />
        </div>
      </div>

      <Outlet />
    </div>
  );
};

export default Layout;
