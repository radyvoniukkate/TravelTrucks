import { Routes, Route } from "react-router-dom";
import HomePage from "../../pages/HomePage/HomePage.jsx";
import Layout from "../Layout/Layout.jsx";
import CatalogPage from "../../pages/CatalogPage/CatalogPage.jsx"
import CamperPage from "../../pages/CamperPage/CamperPage.jsx"

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="/catalog" element={<CatalogPage />} />
        <Route path="/catalog/:id" element={<CamperPage />} />
      </Route>
    </Routes>
  );
};

export default App;
