import { Link, Navigate, useLocation  } from "react-router-dom";
import Navigation from "../Navigation";
import styles from "./header.module.scss";
import { useSelector } from "react-redux";
import { logout, selectIsAuth, userData } from "../../redux/slices/auth";
import { RootState, useAppDispatch } from "../../redux/store";
import { Heart, LogIn, LogOut, ShoppingCart, UserRoundPlus } from "lucide-react";
import { useEffect, useState } from "react";
import { fetchAllBasket } from "../../redux/slices/basket";
import SearchBox from "../Search";
import { fetchAllFavorites } from "../../redux/slices/favorites";


const navigation = [
  { lebel: "Home", link: "/" },
  { lebel: "Favorites", link: "/favorites" },
  { lebel: "Basket", link: "/basket" }
];

const Header = () => {
  const location  = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(userData); // name 
  const dispatch = useAppDispatch();
  const basket = useSelector((state: RootState) => state.basket.data);
  const favorites = useSelector((state: RootState) => state.favorites.data);

  // const [basketStorage, setBasketStorage] = useState<any[]>([]); 

  

  // const storedBasket = localStorage.getItem('basket');
  // if (storedBasket) {
  //   setBasketStorage(JSON.parse(storedBasket));
  // }
  
  // console.log(storedBasket?.length,  ' storedBasket')


  // useEffect(() => {
  //   if (storedBasket) {
  //     setBasketStorage(JSON.parse(storedBasket)); 
  //     console.log('render');
  //   }
  // }, []);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      dispatch(fetchAllBasket())
      dispatch(fetchAllFavorites())
      window.localStorage.removeItem("token");
      <Navigate to="/" />
    }
  };



    const handleScroll = () => {
        if (window.scrollY > 55) {
            setIsScrolled(true);
        } else {
            setIsScrolled(false);
        }
    };

    useEffect(() => {
        window.addEventListener('scroll', handleScroll);
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    // let count = isAuth ? basket.length : basketStorage.length;


  return (
    <header className={`${styles.header} ${isScrolled ? styles.active : ''}`}>
      <div className="container">
        <div className={styles.wrapper}>
          <Link className={styles.link_logo} to="/">
            <img className={styles.logo} src="../images/logo.svg" alt="Logo" />
          </Link>
          <div className={styles.inner}>
            <Navigation navigation={navigation} classNameNav="header-nav" />
            
            {
              location.pathname  === '/' && <SearchBox /> 
            }
          
            {isAuth ? (
              <>
                <button
                  className={styles.exit}
                  onClick={onClickLogout}
                  type="button"
                >
                  <LogOut />
                  {user}
                </button>
              </>
            ) : (
              <>
                <Link className={styles.login} to="./login">
                  <LogIn />
                </Link>
                <Link className={styles.login} to="./registration">
                  <UserRoundPlus />
                </Link>
              </>
            )}
             <Link to="/favorites" className={styles.heart}>
              <Heart />
              <span>{favorites.length}</span>
             </Link>
            <Link to="/basket" className={styles.card}>
                <ShoppingCart />
                <span>{basket.length}</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
