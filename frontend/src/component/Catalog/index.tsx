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
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Pagination from "../Pagination";

const Catalog = () => {
  gsap.registerPlugin(ScrollTrigger);
  
  const {
    data: products, status, sortOrder, branding, sales,
    country, totalPages, page, limit, price
   } = useSelector((state: RootState) => state.products);
  const cardRefs = React.useRef<(HTMLLIElement | null)[]>([]);
  const dispatch = useAppDispatch();
  const basket = useSelector((state: RootState) => state.basket.data);
  const favorites = useSelector((state: RootState) => state.favorites.data);
  const search = useSelector((state: RootState) => state.search.search);
  const isLoading = status === "loading";


  // React.useEffect(() => {
  //   const categoryParam = branding
  //     ? `category=${branding}`
  //     : "category=allbranding";
  //   const countryParam = country ? `country=${country}` : "country=allcountry";
  //   const sortParam = sortOrder ? `sort=${sortOrder}` : "";
  //   const saleParam = sales ? `filter=${sales}` : "";
  //   const queryString = `${categoryParam}${
  //     categoryParam && sortParam ? "&" : ""
  //   }${sortParam}${
  //     (categoryParam || sortParam) && saleParam ? "&" : ""
  //   }${saleParam}${countryParam ? `&${countryParam}` : ""}`;
  //   dispatch(fetchSortProducts(queryString));
  // }, [branding, country, sortOrder, sales]);
  React.useEffect(() => {
  const categoryParam = branding
    ? `category=${branding}`
    : "category=allbranding";
  const countryParam = country ? `country=${country}` : "country=allcountry";
  const sortParam = sortOrder ? `sort=${sortOrder}` : "";
  const saleParam = sales ? `filter=${sales}` : "";
  const pageParam = `page=${page}`;
  const limitParam = `limit=${limit}`;
  const priceParam = price ? `price=${price}` : "";

  const queryParts = [
    categoryParam,
    countryParam,
    sortParam,
    saleParam,
    priceParam,
    pageParam,
    limitParam
  ].filter(Boolean); // удаляет пустые строки

  const queryString = queryParts.join("&");

  console.log(queryString);
  

  dispatch(fetchSortProducts(queryString));
}, [branding, country, sortOrder, sales, page, limit, price]);



  const addToRefs = (el: HTMLLIElement | null) => {
    if (el) {
      if (!cardRefs.current.includes(el)) {
        cardRefs.current.push(el);
      }
    }
  };

  React.useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      if (status === "loaded") {
        cardRefs.current.forEach((ref) => {
          if (ref) {
            const tl = gsap.timeline({
              scrollTrigger: {
                trigger: ref,
                // markers: true,
                // pin: true,
                start: "top 95%",
                end: "top 40%",
                // scrub: 1, // ползунок тоде в теме
              },
            });

            tl.from(ref, {
              opacity: 0,
              // scale: 0.5,
              y: 160,
              duration: 4,
              ease: "power3.out",
            });
          }
        });
      }
    });
    return () => ctx.revert();
  }, [status]);



  return (
    <section className={styles.catalog}>
      <div
        className={styles.bgtop}
        style={{ backgroundImage: "url(/images/paralax/first1.png)" }}
      ></div>
      <div className="container">
        <div className={styles.wrapper}>
          <AsideFilter />

          <div className={styles.right}>
            <TopFilter />

            {isLoading ? (
              <ul className={styles.list}>
                {[...Array(3)].map((_, index) => (
                  <li className={styles.loadercard} key={index}>
                    <Loader />
                  </li>
                ))}
              </ul>
            ) : status === "loaded" ? (
              (() => {
                return products.length > 0 ? (
                  <>
                    <ul className={styles.list}>
                      {products
                        // .filter((item) => {
                        //   if (Number(item.sale) == 0) {
                            
                        //     if(Number(item.price) >= Number(preisRange)) {
                        //       // console.log(products.length);
                              
                        //       // dispatch(setPage(products.length))
                        //       return item
                        //     }
                        //   }
                        //   let priceSale = Number(item.price) - Number(item.price) * (Number(item.sale?.replace(/%/g, "")) / 100);
                        //   if (priceSale >= Number(preisRange)) {
                        //     return item;
                        //   }
                        // })

                        .filter((item: ProductProps) =>
                          item.name.toLowerCase().includes(search.toLowerCase())
                        )

                        .map((obj: ProductProps) => {
                          const isInBasket = basket?.some(
                            (item: ProductProps) => item.productId === obj._id
                          );
                          const isInFavorites = favorites?.some(
                            (item: ProductProps) => item.productId === obj._id
                          );

                          return (
                            <li
                              key={obj._id}
                              ref={addToRefs}
                              className={styles.it}
                            >
                              <Card
                                obj={obj}
                                isInBasket={!!isInBasket}
                                isInFavorites={!!isInFavorites}
                              />
                            </li>
                          );
                        })}
                    </ul>
                    <Pagination totalPages={totalPages} page={page} />
                  </>
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
