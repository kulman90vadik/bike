import { BasketProps } from '../../propstype';
import { fetchCounterBasketCard } from '../../redux/slices/basket';
import { useAppDispatch } from '../../redux/store';
import styles from './counter.module.scss';


type Props = {
  obj: BasketProps
}

const Counter = ({obj}: Props) => {
  const dispatch = useAppDispatch();
  // let plus = 'plus';
  
  const counter = (id: string, str: string) => {
    dispatch(fetchCounterBasketCard({ id, str }));
  }

  return (
    <div className={styles.counter}>
      <button className={styles.minus} onClick={() => counter(obj._id, 'minus')}>-</button>
      <button className={styles.nummber}>{obj.counter}</button>
      <button className={styles.plus} onClick={() => counter(obj._id, 'plus')}>+</button>
    </div>
  );
}
 
export default Counter;