import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './basket.module.scss';
import Loader from '../../Loader';
import Card from '../../component/Card';
import { BasketProps } from '../../propstype';

const Basket = () => {


  const basket = useSelector((state: RootState) => state.basket.data);
    const status = useSelector((state: RootState) => state.basket.status);
    const isLoading = status === 'loadingg';

  console.log(basket);

  return (
    <section className={styles.basket}>
      <div className="container">
      <ul className={styles.list}>
        {isLoading ? (
          [...Array(5)].map((_, index) => <Loader key={index} />)
        ) : status === 'loaded' ? (
          basket?.map((obj: BasketProps) => (
            <Card obj={obj} key={obj._id} />
          ))
        ) : null}
      </ul>
      </div>
    </section>
  );
}
 
export default Basket;