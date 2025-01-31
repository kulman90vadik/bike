import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './favorites.module.scss';
import Card from '../../component/Card';
import { ProductProps } from '../../propstype';
import Loader from '../../Loader';


const Favorites = () => {

  const favorites = useSelector((state: RootState) => state.favorites.data);
  const basket = useSelector((state: RootState) => state.basket.data);
  console.log(favorites, ' favorites');
  const status = useSelector((state: RootState) => state.favorites.status);
  const isLoading = status === 'loadingg';


  return (
    <section className={styles.favorites}>
      <div className="container">
      <ul className={styles.list}>
        {isLoading ? (
          [...Array(5)].map((_, index) => <Loader key={index} />)
        ) : status === 'loaded' ? (
          favorites?.map((obj: ProductProps) => {
            const isInBasket = basket?.find((item: ProductProps) => item._id === obj._id);
            const isInFavorites = favorites?.find((item: ProductProps) => item._id === obj._id);
            return (
              <Card obj={obj} key={obj._id} isInFavorites={!!isInFavorites} isInBasket={!!isInBasket}/>
            )
          })
        ) : null}
      </ul>
      </div>
    </section>
  );
}
 
export default Favorites;