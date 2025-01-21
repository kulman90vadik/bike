import { Trash2 } from "lucide-react";
import { ProductProps } from "../../propstype";
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

  console.log(obj);

  return (
    <li className={styles.card}>
      <img className={styles.image} src={obj.image} alt={obj.name} />
      <div className={styles.name}>{obj.name}</div>
      <Counter obj={obj}/>
      <div className={styles.price}>
        {new Intl.NumberFormat("en-US", {
          currency: "EUR",
          style: "currency",
        }).format(Number(obj.price))}
      </div>
        <button className={styles.btn} type="button" onClick={() => removeFromBasket(obj._id)}>
          <Trash2 />
        </button>
    </li>
  );
};

export default CardBasket;
