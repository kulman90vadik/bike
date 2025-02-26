import { BasketProps } from '../../propstype';
import { fetchCounterBasketCard } from '../../redux/slices/basket';
import { useAppDispatch } from '../../redux/store';
import styles from './counter.module.scss';


type Props = {
  obj: BasketProps
}

const Counter = ({obj}: Props) => {
  const dispatch = useAppDispatch(); 
  const counter = (id: string, str: string) => {
    dispatch(fetchCounterBasketCard({ id, str }));
  }

  return (
    <div className={styles.counter}>
      <button disabled={obj.counter === 1} className={styles.minus} onClick={() => counter(obj._id, 'minus')}>&minus;</button>
      <button className={styles.nummber}>{obj.counter}</button>
      <button className={styles.plus} onClick={() => counter(obj._id, 'plus')}>+</button>
    </div>
  );
}
 
export default Counter;