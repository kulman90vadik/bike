import { useSelector } from "react-redux";
import { RootState } from "../../redux/store";
import styles from "./basket.module.scss";
import { BasketProps } from "../../propstype";
import CardBasket from "../../component/CardBasket";
import { useEffect, useState } from "react";
import { selectIsAuth } from "../../redux/slices/auth";

const Basket = () => {
  const basket = useSelector((state: RootState) => state.basket.data);
  const[preisTotal, setPreisTotal] = useState(0);
  // const isAuth = useSelector(selectIsAuth);
  const [basketStorage, setBasketStorage] = useState<any[]>([]); 

    const storedBasket = localStorage.getItem('basket');
  
    useEffect(() => {
      if (storedBasket) {
        setBasketStorage(JSON.parse(storedBasket)); 
      }
    }, [storedBasket]);

    useEffect(() => {
      const totalPrice = basket.reduce((sum, item) => {
          let price = item.sale 
              ? Number(item.price) * (1 - Number(item.sale.replace(/%/g, "")) / 100) 
              : Number(item.price);
          return sum + price;
      }, 0);

      setPreisTotal(totalPrice);
    }, [basket]);

// console.log(basketStorage, ' basketStorage')
console.log(basket, ' basket')

// let basketArr = isAuth ? basket : basketStorage;

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
