import { Heart } from "lucide-react";
import { ProductProps } from "../../propstype";
import { fetchBasket } from "../../redux/slices/basket";
import { RootState, useAppDispatch } from "../../redux/store";
import styles from "./card.module.scss";
import { fetchFavorites } from "../../redux/slices/favorites";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";

type Props = {
  obj: ProductProps;
  isInBasket: boolean;
  isInFavorites: boolean;
};

const Card = ({ obj, isInBasket, isInFavorites }: Props) => {
  const { t } = useTranslation(); 
  const search = useSelector((state: RootState) => state.search.search);
  const statusId = useSelector((state: RootState) => state.basket.statusId);
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

  const regex = new RegExp(`(${search})`, "gi");
  const parts = obj.name.split(regex);

  const isLoading = statusId[obj._id] === "loading";

 

  return (
    <article className={styles.item}>
      <div className={styles.top}>
        <img className={styles.flag} src={`${import.meta.env.VITE_API_BASE_URL}${obj.flag}`} alt={obj.flag} />
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
        <img className={styles.image} src={`${import.meta.env.VITE_API_BASE_URL}${obj.image}`} alt={obj.name} />
          {/* src={`${import.meta.env.VITE_API_BASE_URL}${auth?.avatarUrl}`} */}
      </Link>

      <div className={styles.inner}>
        <div className={styles.name}>
          {parts.map((part, index) =>
            part.toLowerCase() === search.toLowerCase() ? (
              <span key={index} className={styles.highlight}>
                {part}
              </span>
            ) : (
              part
            )
          )}
        </div>

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
        >
          {isLoading ? (
            <svg
              className={styles.loading}
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 100 100"
              preserveAspectRatio="xMidYMid"
              width="200"
              height="200"
            >
              <g>
                <g transform="rotate(0 50 50)">
                  <rect
                    fill="#fff"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.9166666666666666s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(30 50 50)">
                  <rect
                    fill="#fff"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.8333333333333334s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(60 50 50)">
                  <rect
                    fill="#fff"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.75s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(90 50 50)">
                  <rect
                    fill="#fff"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.6666666666666666s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(120 50 50)">
                  <rect
                    fill="#fff"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.5833333333333334s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(150 50 50)">
                  <rect
                    fill="#fff"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.5s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(180 50 50)">
                  <rect
                    fill="#fff"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.4166666666666667s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(210 50 50)">
                  <rect
                    fill="#fe718d"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.3333333333333333s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(240 50 50)">
                  <rect
                    fill="#fe718d"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.25s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(270 50 50)">
                  <rect
                    fill="#fe718d"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.16666666666666666s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(300 50 50)">
                  <rect
                    fill="#fe718d"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="-0.08333333333333333s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g transform="rotate(330 50 50)">
                  <rect
                    fill="#fe718d"
                    height="12"
                    width="6"
                    ry="6"
                    rx="3"
                    y="24"
                    x="47"
                  >
                    <animate
                      repeatCount="indefinite"
                      begin="0s"
                      dur="1s"
                      keyTimes="0;1"
                      values="1;0"
                      attributeName="opacity"
                    ></animate>
                  </rect>
                </g>
                <g></g>
              </g>
            </svg>
          ) : (
            <span>{isInBasket ? t('card.remove') : t('card.add')}</span>

          )}
        </button>
      </div>
    </article>
  );
};

export default Card;
