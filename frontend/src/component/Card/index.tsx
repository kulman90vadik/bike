import { ProductProps } from "../../propstype";
import { fetchBasket } from "../../redux/slices/basket";
import { useAppDispatch } from "../../redux/store";
import styles from './card.module.scss';

type Props = {
  obj: ProductProps
}

const Card = ({obj}: Props) => {

  const dispatch = useAppDispatch();

  
  const addToBasket = (id: string) => {
    // console.log(id);
    dispatch(fetchBasket(id));
  }

    
  return (
    <li className={styles.item}>
      <div className={styles.top}>
        <img className={styles.flag} src={obj.flag} alt="" />
        <span className={styles.stocked}>{obj.stocked}</span>
      </div>
      <img className={styles.image} src={obj.image} alt={obj.name} />
      <div className={styles.name}>{obj.name}</div>
      <div className={styles.price}>{obj.price} &#x20AC;</div>
      <button className={styles.btn} type="button" onClick={() => addToBasket(obj._id)}>click</button>
    </li>
  );
};

export default Card;

