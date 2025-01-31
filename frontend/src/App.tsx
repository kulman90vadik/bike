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

const App = () => {
  const dispatch = useAppDispatch();
  // const isAuth = useSelector(selectIsAuth);
  React.useEffect(() => {
      const loadData = async () => {
        await dispatch(fetchAuthMe())
        await dispatch(fetchAllBasket())
        await dispatch(fetchAllFavorites())
      }
      loadData();
  }, [])


  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/basket" element={<Basket />} />
          <Route path="/favorites" element={<Favorites />} />
        </Routes>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default App;

