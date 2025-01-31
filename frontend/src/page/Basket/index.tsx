import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./basket.module.scss";
import { BasketProps } from "../../propstype";
import CardBasket from "../../component/CardBasket";
import { useEffect, useState } from "react";

const Basket = () => {
  const basket = useSelector((state: RootState) => state.basket.data);
  const[preisTotal, setPreisTotal] = useState(0);


  useEffect(() => {
    const totalPrice = basket.reduce((sum, item) => sum + Number(item.price), 0);
    setPreisTotal(
      totalPrice
    )
  }, [basket])

  return (
    <section className={`${styles.basket} ${basket.length > 0 ? styles.bg : ''}`}>
      <div className="container">
        <div className={styles.inner}>
          {basket.length > 0 ? (
            <>
              <ul className={styles.list}>
                {basket.map((obj: BasketProps) => (
                  <CardBasket obj={obj} key={obj._id} />
                ))}
              </ul>
              <div className={styles.right}>
                <div className={styles.block}>
                  <div className={styles.text}>Order total:</div>
                  <span className={styles.price}>
                    {new Intl.NumberFormat('en-US', {
                      useGrouping: true,
                      minimumFractionDigits: 0,
                      maximumFractionDigits: 0,
                    }).format(Number(preisTotal)) + ' €'}
                  </span>    
                </div>
                <button className={styles.btn}>
                  Place an order
                </button>
              </div>
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
