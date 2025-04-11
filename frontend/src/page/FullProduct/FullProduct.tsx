import React from "react";
import axios from "../../axios";
import { useParams } from "react-router-dom";
import { ProductProps } from "../../propstype";
import styles from "./fullproduct.module.scss";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchBasket } from "../../redux/slices/basket";
import { useSelector } from "react-redux";
import Review from "../../component/Review";
// import Counter from "../../component/Counter";

const FullProduct = () => {
  const dispatch = useAppDispatch();
  const [data, setData] = React.useState<ProductProps | null>(null);
  const { id } = useParams();
  const [isLoading, setIsLoading] = React.useState(true);
  const basket = useSelector((state: RootState) => state.basket.data);

  const addToBasket = (id: string) => {
    dispatch(fetchBasket(id));
  };

  let price = data?.sale
    ? Number(data?.price) * (1 - Number(data?.sale.replace(/%/g, "")) / 100)
    : data?.price;

  const isInBasket = basket?.some(
    (item: ProductProps) => item._id === data?._id
  );

  React.useEffect(() => {
    axios
      .get(`./products/${id}`)
      .then((res) => {
        setData(res.data);
        setIsLoading(false);
      })
      .catch((err) => {
        console.warn(err);
      });
  }, []);

if(isLoading) {
  return <img
  className={styles.loading}
  src="/images/loading.gif"
  alt="Loading"
/>
}


  return (
    <section className={styles.product}>
      {/* {isLoading && (
        
      )} */}
      <div className="container">
        <div className={styles.inner}>
          <div className={styles.left}>
            <img className={styles.image} src={data?.image} alt={data?.name} />
            <ul className={styles.list}>
              <li className={styles.imgitem}>
                <img
                  className={styles.smallimage}
                  src={data?.image}
                  alt={data?.name}
                />
              </li>
              <li className={styles.imgitem}>
                <img
                  className={styles.smallimage}
                  src={data?.image}
                  alt={data?.name}
                />
              </li>
            </ul>
          </div>

          <div className={styles.right}>
            <div className={styles.info}>
              <h1>{data?.name}</h1>
              <div className={styles.box}>
                <img
                  className={styles.flag}
                  src={data?.flag}
                  alt={data?.flag}
                />
                <div className={styles.price}>
                  {Number(data?.sale) !== 0 && <span>{data?.price}</span>}
                  {new Intl.NumberFormat("en-US", {
                    useGrouping: true,
                    minimumFractionDigits: 0,
                    maximumFractionDigits: 0,
                  }).format(Number(price)) + " €"}
                </div>
              </div>
              <button
                className={`${styles.btn} ${isInBasket ? styles.btngreen : ""}`}
                type="button"
                onClick={() => {
                  if (data?._id) {
                    addToBasket(data._id);
                  }
                }}
              >{`${isInBasket ? "Remove from Basket" : "Add to Cart"}`}</button>
            </div>

            {/* {
             data && 
             <div className={styles.counter}>
             <Counter obj={data}/>
             </div>
             } */}
          </div>
        </div>




       <Review data={data}/>



      </div>
    </section>
  );
};

export default FullProduct;
