import { Route, Routes } from "react-router-dom";
import Header from "./component/Header";
import Home from "./page/Home";
import Login from "./page/Login";
import React from "react";
import { fetchAuthMe } from "./redux/slices/auth";
import { useAppDispatch } from "./redux/store";
import Registration from "./page/Registration";
// import { useDispatch } from "react-redux";



const App = () => {
  const dispatch = useAppDispatch();
  // const isAuth = useSelector(selectIsAuth);


 React.useEffect(() => {
   dispatch(fetchAuthMe())
  //  console.log(dispatch(fetchAuthMe()));
 }, [])


 
  return (
    <>
      <Header />
      <main>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/registration" element={<Registration />} />
          {/* <Route path="/hookform" element={<HookForm />} /> */}
        </Routes>
      </main>
      {/* <Footer /> */}
    </>
  );
};

export default App;

