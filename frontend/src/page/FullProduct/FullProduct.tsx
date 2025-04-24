import React from "react";
import { useParams } from "react-router-dom";
import { ProductProps } from "../../propstype";
import styles from "./fullproduct.module.scss";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchBasket } from "../../redux/slices/basket";
import { useSelector } from "react-redux";
import Review from "../../component/Review";
import { fetchProduct } from "../../redux/slices/fullproduct";

const FullProduct = () => {
  const dispatch = useAppDispatch();
  const { id } = useParams();
  const basket = useSelector((state: RootState) => state.basket.data);
  const fullProduct = useSelector((state: RootState) => state.fullproduct.data);
  const isLoading = useSelector((state: RootState) => state.fullproduct.status);

  React.useEffect(() => {
    const fetchData = async () => {
      if (id) {
        await dispatch(fetchProduct(id));
      }
    };
    fetchData();
  }, [id, dispatch]);


  const addToBasket = (id: string) => { dispatch(fetchBasket(id)) };
  
  let price = fullProduct?.sale
    ? Number(fullProduct?.price) * (1 - Number(fullProduct?.sale.replace(/%/g, "")) / 100)
    : fullProduct?.price;
  const isInBasket = basket?.some(
    (item: ProductProps) => item._id === fullProduct?._id
  );



  return (
    <section className={styles.product}>
      {
      isLoading == "loading" ? (
        <img
          className={styles.loading}
          src="/images/loading.gif"
          alt="Loading"
        />
      ) : (
       
          <div className="container">
            <div className={styles.inner}>
              <div className={styles.left}>
                <img
                  className={styles.image}
                  src={fullProduct?.image}
                  alt={fullProduct?.name}
                />
                <ul className={styles.list}>
                  <li className={styles.imgitem}>
                    <img
                      className={styles.smallimage}
                      src={fullProduct?.image}
                      alt={fullProduct?.name}
                    />
                  </li>
                  <li className={styles.imgitem}>
                    <img
                      className={styles.smallimage}
                      src={fullProduct?.image}
                      alt={fullProduct?.name}
                    />
                  </li>
                </ul>
              </div>

              <div className={styles.right}>
                <div className={styles.info}>
                  <h1  className={styles.title}>{fullProduct?.name}</h1>
                  <div className={styles.box}>
                    <img
                      className={styles.flag}
                      src={fullProduct?.flag}
                      alt={fullProduct?.flag}
                    />
                    <div className={styles.price}>
                      {Number(fullProduct?.sale) !== 0 && (
                        <span>{fullProduct?.price}</span>
                      )}
                      {new Intl.NumberFormat("en-US", {
                        useGrouping: true,
                        minimumFractionDigits: 0,
                        maximumFractionDigits: 0,
                      }).format(Number(price)) + " €"}
                    </div>
                  </div>
                  <div className={styles.text}>
                    {fullProduct?.description}
                  </div>
                  <button
                    className={`${styles.btn} ${
                      isInBasket ? styles.btngreen : ""
                    }`}
                    type="button"
                    onClick={() => {
                      if (fullProduct?._id) {
                        addToBasket(fullProduct._id);
                      }
                    }}
                  >{`${
                    isInBasket ? "Remove from Basket" : "Add to Cart"
                  }`}</button>
                </div>

                {/* {
             data && 
             <div className={styles.counter}>
             <Counter obj={data}/>
             </div>
             } */}
              </div>
            </div>


            {fullProduct && !Array.isArray(fullProduct) && (
              <Review />
            )}


          </div>
      )
      }
    </section>
  );
};

export default FullProduct;
