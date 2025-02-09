import { Trash2 } from "lucide-react";
import { BasketProps, ProductProps } from "../../propstype";
import styles from "./cardbasket.module.scss";
import Counter from "../Counter";
import { fetchBasket } from "../../redux/slices/basket";
import { useAppDispatch } from "../../redux/store";

type Props = {
  obj: ProductProps;
};

const CardBasket = ({ obj }: Props) => {
  
  const dispatch = useAppDispatch();
  const removeFromBasket = (id: string) => {
    dispatch(fetchBasket(id));
  }

  let price = obj.sale 
  ? Number(obj.price) * (1 - Number(obj.sale.replace(/%/g, "")) / 100) 
  : obj.price;

  // console.log(obj);
  // console.log(price);

  return (
    <li className={styles.card}>
      <div className={styles.photo}>
        <img className={styles.image} src={obj.image} alt={obj.name} />
      </div>
      <div className={styles.name}>{obj.name}</div>
      <Counter obj={obj}/>
      <div className={styles.price}>
          {new Intl.NumberFormat('en-US', {
            useGrouping: true,
            minimumFractionDigits: 0,
            maximumFractionDigits: 0,
          }).format(Number(price)) + ' €'}
      </div>
        <button className={styles.btn} type="button" onClick={() => removeFromBasket(obj._id)}>
          <Trash2 />
        </button>
    </li>
  );
};

export default CardBasket;
