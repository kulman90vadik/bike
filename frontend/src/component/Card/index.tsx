import { Heart } from "lucide-react";
import { ProductProps } from "../../propstype";
import { fetchBasket } from "../../redux/slices/basket";
import { useAppDispatch } from "../../redux/store";
import styles from './card.module.scss';

type Props = {
  obj: ProductProps,
  isInBasket: boolean
}

const Card = ({obj, isInBasket}: Props) => {
  const dispatch = useAppDispatch();
  const addToBasket = (id: string) => {
    dispatch(fetchBasket(id));
  }


    
  return (
    <li className={styles.item}>
      <div className={styles.top}>
        <img className={styles.flag} src={obj.flag} alt={obj.flag} />
        <button type="button" className={styles.heart}>
          <Heart />
        </button>
        <span className={`${obj.stocked ? styles.stocked : ''}`}>{obj.stocked ? 'New' : ''}</span>
      </div>
        <img className={styles.image} src={obj.image} alt={obj.name} />
        <div className={styles.name}>{obj.name}</div>
        <div className={styles.price}>
          {new Intl.NumberFormat('en-US', {
            currency: 'EUR',
            style: 'currency',
          }).format(Number(obj.price))}
        </div>
        <button className={`${styles.btn} ${isInBasket ? styles.btngreen : ''}`} type="button" onClick={() => addToBasket(obj._id)}>{`${isInBasket ? 'Remove from Basket' : 'Add to Cart'}`}</button>
    </li>
  );
};

export default Card;

