import { Link, Navigate } from "react-router-dom";
import Navigation from "../Navigation";
import styles from "./header.module.scss";
import { useSelector } from "react-redux";
import { logout, selectIsAuth, userData } from "../../redux/slices/auth";
import { useAppDispatch } from "../../redux/store";
import { LogIn, LogOut, Search, ShoppingCart, UserRoundPlus } from "lucide-react";

const navigation = [
  { lebel: "Home", link: "/" },
  // { lebel: "Login", link: "/login" },
];

const Header = () => {
  const isAuth = useSelector(selectIsAuth);
  const user = useSelector(userData);
  const dispatch = useAppDispatch();
  // const user = useSelector((state: RootState) => state.auth.data);

  const onClickLogout = () => {
    if (window.confirm("Вы действительно хотите выйти?")) {
      dispatch(logout());
      window.localStorage.removeItem("token");
      <Navigate to="/" />
    }
  };

  return (
    <header className={styles.header}>
      <div className="container">
        <div className={styles.wrapper}>
          <Link className={styles.link_logo} to="/">
            <img className={styles.logo} src="../images/logo.svg" alt="Logo" />
          </Link>
          <div className={styles.inner}>
            <Navigation navigation={navigation} classNameNav="header-nav" />

            <button className={styles.search}>
                <Search />
            </button>

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
            <Link to="/basket" className={styles.card}>
                <ShoppingCart />
                <span>0</span>
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
