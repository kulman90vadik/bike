import styles from "./catalog.module.scss";
import { RootState, useAppDispatch } from "../../redux/store";
import { useSelector } from "react-redux";
import React from "react";
import Loader from "../../Loader";
import { ProductProps } from "../../propstype";
import Card from "../Card";
import AsideFilter from "../AsideFilter";
import TopFilter from "../TopFilter";
import { fetchSortProducts } from "../../redux/slices/products";

const Catalog = () => {
  const dispatch = useAppDispatch();
  const products = useSelector((state: RootState) => state.products.data);
  const basket = useSelector((state: RootState) => state.basket.data);
  const favorites = useSelector((state: RootState) => state.favorites.data);
  const search = useSelector((state: RootState) => state.search.search);
  const status = useSelector((state: RootState) => state.products.status);
  const isLoading = status === "loading";
  const {sortOrder, branding, sales, preisRange, country} = useSelector((state: RootState) => state.products);


    React.useEffect(() => {
        const categoryParam = branding ? `category=${branding}` : 'category=allbranding';
        const countryParam = country ? `country=${country}` : 'country=allcountry';
        const sortParam = sortOrder ? `sort=${sortOrder}` : '';
        const saleParam = sales ? `filter=${sales}` : '';
        const queryString = `${categoryParam}${categoryParam && sortParam ? '&' : ''}${sortParam}${(categoryParam || sortParam) && saleParam ? '&' : ''}${saleParam}${countryParam ? `&${countryParam}` : ''}`;  
        dispatch(fetchSortProducts(queryString));
    }, [branding, country, sortOrder, sales]);




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
                  <li className={styles.loadercard} key={index}>
                    <Loader />
                  </li>
                ))}
              </ul>
            ) : status === "loaded" ? (
              (() => {
                // const filteredProducts = products.filter((item: ProductProps) =>
                //   item.name.toLowerCase().includes(search.toLowerCase())
                // );

                return products.length > 0 ? (
                  <ul className={styles.list}>
                    {products
                    
                    .filter(item => {
                      if(Number(item.sale) == 0) return Number(item.price) >= Number(preisRange) 
                      let priceSale = Number(item.price) - (Number(item.price) * (Number(item.sale?.replace(/%/g, ""))/100));
                      if(priceSale >= Number(preisRange)) {
                        return item
                      }
                    })
                    
                    .filter((item: ProductProps) =>
                      item.name.toLowerCase().includes(search.toLowerCase())
                    )
                    
                    .map((obj: ProductProps) => {
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
