import styles from "./catalog.module.scss";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchProducts } from "../../redux/slices/products";
import { useSelector } from "react-redux";
import React from "react";
import Loader from "../../Loader";
import { ProductProps } from "../../propstype";
import Card from "../Card";
import AsideFilter from "../AsideFilter";
import TopFilter from "../TopFilter";

const Catalog = () => {
  const dispatch = useAppDispatch();
  // const isAuth = useSelector(selectIsAuth);
  const products = useSelector((state: RootState) => state.products.data);
  const basket = useSelector((state: RootState) => state.basket.data);
  const favorites = useSelector((state: RootState) => state.favorites.data);

  const search = useSelector((state: RootState) => state.search.search);

  const status = useSelector((state: RootState) => state.products.status);
  const isLoading = status === "loading";

  React.useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);



  return (
    <section className={styles.catalog}>
      <div className="container">
        <div className={styles.wrapper}>

          <AsideFilter />

          <div className={styles.right}>

            <TopFilter />

            {isLoading ? (
              <ul className={styles.list}>
                {[...Array(5)].map((_, index) => (
                  <Loader key={index} />
                ))}
              </ul>
            ) : status === "loaded" ? (
              (() => {
                const filteredProducts = products.filter((item: ProductProps) =>
                  item.name.toLowerCase().includes(search.toLowerCase())
                );

                return filteredProducts.length > 0 ? (
                  <ul className={styles.list}>
                    {filteredProducts.map((obj: ProductProps) => {
                      const isInBasket = basket?.some(
                        (item: ProductProps) => item._id === obj._id
                      );
                      const isInFavorites = favorites?.some(
                        (item: ProductProps) => item._id === obj._id
                      );

                      return (
                        <Card
                          key={obj._id}
                          obj={obj}
                          isInBasket={!!isInBasket}
                          isInFavorites={!!isInFavorites}
                        />
                      );
                    })}
                  </ul>
                ) : (
                  <p className={styles.notFound}>Nothing found.</p>
                );
              })()
            ) : (
              <div className={styles.error}>
                Error retrieving products. Please try again later.
                <span>&#128524;</span>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Catalog;
