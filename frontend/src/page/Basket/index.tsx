import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./basket.module.scss";
import { BasketProps } from "../../propstype";
import CardBasket from "../../component/CardBasket";

const Basket = () => {
  const basket = useSelector((state: RootState) => state.basket.data);

  return (
    <section className={styles.basket}>
      <div className="container">
        <div className={styles.inner}>
          {basket.length > 0 ? (
            <>
              <ul className={styles.list}>
                {basket.map((obj: BasketProps) => (
                  <CardBasket obj={obj} key={obj._id} />
                ))}
              </ul>
              <div className={styles.right}></div>
            </>
          ) : (
            <img  className={styles.image} src="/images/empty-cart.svg" alt="Empty" />
          )}
        </div>
      </div>
    </section>
  );
};

export default Basket;
