import { Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Home from "./page/Home";
import Login from "./page/Login";
import React from "react";
import { fetchAuthMe } from "./redux/slices/auth";
import { useAppDispatch } from "./redux/store";
import Registration from "./page/Registration";
import Basket from "./page/Basket";
import { fetchAllBasket } from "./redux/slices/basket";
import Favorites from "./page/Favorites";
import { fetchAllFavorites } from "./redux/slices/favorites";
import FullProduct from "./page/FullProduct/FullProduct";
import { fetchProducts, fetchProductsPag } from "./redux/slices/products";
import { fetchTopProducts } from "./redux/slices/topproducts";
import About from "./page/About";
// import AdminPage from "./admin/AdminPage";
import { useLocation } from "react-router-dom";


import { adminRoutes } from "./admin/routes";

const App = () => {
  const dispatch = useAppDispatch();
  const location = useLocation();
  const isAdminPage = location.pathname.startsWith("/admin");

  React.useEffect(() => {
      const loadData = async () => {
        await dispatch(fetchAuthMe())
        await dispatch(fetchAllBasket())
        await dispatch(fetchAllFavorites())
        await dispatch(fetchProducts());
        await dispatch(fetchProductsPag());
        await dispatch(fetchTopProducts());
      }
      loadData();
  }, [])



  return (
    <>
    
      {!isAdminPage && <Header />}

      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/products/:id" element={<FullProduct/>} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/about" element={<About />} />

          <Route path="/favorites" element={<Favorites />} />
          {adminRoutes}
          {/* <Route path="/admin" element={<AdminPage />} /> */}
        </Routes>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default App;

