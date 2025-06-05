import React, { lazy, Suspense } from "react";
// import { useLocation } from "react-router-dom";
import { adminRoutes } from "./admin/routes";
import { Route, Routes } from "react-router-dom";
import { useAppDispatch } from "./redux/store";
import { fetchProducts, fetchProductsPag } from "./redux/slices/products";
import { fetchTopProducts } from "./redux/slices/topproducts";
import { fetchAllFavorites } from "./redux/slices/favorites";
import { fetchAllBasket } from "./redux/slices/basket";
import { fetchAuthMe } from "./redux/slices/auth";


// import Header from "./component/Header";
import LoadingPage from "./component/LoadingPage";
// import Home from "./page/Home";
// import Login from "./page/Login";
// import Registration from "./page/Registration";
// import Basket from "./page/Basket";
// import Favorites from "./page/Favorites";
// import FullProduct from "./page/FullProduct/FullProduct";
// import About from "./page/About";

const Home = lazy(() => import('./page/Home'))
const About = lazy(() => import('./page/About'))
const Login = lazy(() => import('./page/Login'))
const Registration = lazy(() => import('./page/Registration'))
const Basket = lazy(() => import('./page/Basket'))
const Favorites = lazy(() => import('./page/Favorites'))
const FullProduct = lazy(() => import('./page/FullProduct/FullProduct'))

const App = () => {
  const dispatch = useAppDispatch();



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

        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/login" element={<Login />}/>
          <Route path="/registration" element={<Registration />}/>
          <Route path="/about" element={<About />} />
          {/* <Route path="/favorites" element={<Suspense fallback="...loading"><Favorites /></Suspense>} /> */}
          <Route path="/products/:id" element={<FullProduct />} />
          {/* <Route path="/basket" element={<Basket />} /> */}
          {/* <Route path="/about" element={<About />} /> */}
          <Route path="/favorites" element={<Favorites />} />

          {adminRoutes}

        </Routes>
    
  );
};



export default App;

