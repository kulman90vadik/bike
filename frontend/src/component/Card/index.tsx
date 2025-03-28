import { Heart } from "lucide-react";
import { ProductProps } from "../../propstype";
import { fetchBasket } from "../../redux/slices/basket";
import { RootState, useAppDispatch } from "../../redux/store";
import styles from "./card.module.scss";
import { fetchFavorites } from "../../redux/slices/favorites";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";

// import gsap from "gsap";
// import React from "react";
// gsap.registerPlugin(ScrollTrigger);

type Props = {
  obj: ProductProps;
  isInBasket: boolean;
  isInFavorites: boolean;
};

const Card = ({ obj, isInBasket, isInFavorites }: Props) => {
  const search = useSelector((state: RootState) => state.search.search);
  console.log(search, 'search');
  
  const dispatch = useAppDispatch();

  const addToBasket = (id: string) => {
    dispatch(fetchBasket(id));
  };

  const addToFavorites = (id: string) => {
    dispatch(fetchFavorites(id));
  };

  let price = obj.sale
    ? Number(obj.price) * (1 - Number(obj.sale.replace(/%/g, "")) / 100)
    : obj.price;

  return (
    <article className={styles.item}>
      <div className={styles.top}>
        <img className={styles.flag} src={obj.flag} alt={obj.flag} />
        <button
          type="button"
          onClick={() => addToFavorites(obj._id)}
          className={`${styles.heart} ${isInFavorites ? styles.btnorange : ""}`}
        >
          <Heart />
        </button>

        <span className={`${obj.newproduct ? styles.stocked : ""}`}>
          {obj.newproduct ? "New" : ""}
        </span>
        {Number(obj.sale) !== 0 && (
          <span className={styles.sale}>{obj.sale}</span>
        )}
      </div>
      <Link
        className={styles.photo}
        to={`/products/${obj._id}`}
        state={{ name: obj.name }}
      >
        <img className={styles.image} src={obj.image} alt={obj.name} />
      </Link>

      <div className={styles.inner}>
        <div className={styles.name}>{obj.name}</div>
        <div className={styles.price}>
          {Number(obj.sale) !== 0 && <span>{obj.price}</span>}
          {new Intl.NumberFormat("en-US", {
            useGrouping: true,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(Number(price)) + " €"}
        </div>
        <button
          className={`${styles.btn} ${isInBasket ? styles.btngreen : ""}`}
          type="button"
          onClick={() => addToBasket(obj._id)}
        >{`${isInBasket ? "Remove from Basket" : "Add to Cart"}`}</button>
      </div>
    </article>
  );
};

export default Card;
