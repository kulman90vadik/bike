import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';
import styles from './favorites.module.scss';
import Card from '../../component/Card';
import { ProductProps } from '../../propstype';
import Loader from '../../Loader';
// import TopProducts from '../../component/TopProducts';


const Favorites = () => {
    const favorites = useSelector((state: RootState) => state.favorites.data);
    const basket = useSelector((state: RootState) => state.basket.data);
    const status = useSelector((state: RootState) => state.favorites.status);
    const errorMessage = useSelector((state: RootState) => state.favorites.errorMessage);
    const isLoading = status === 'loadingg';



  return (
    <section className={styles.favorites}>
          {status === 'error' && (
            <div className={styles.error}>{errorMessage}</div>
          )}
      <div className="container">


      <ul className={styles.list}>
        {isLoading ? (
          [...Array(5)].map((_, index) => <Loader key={index} />)
        ) : status === 'loaded' ? (
          favorites?.map((obj: ProductProps) => {

            const id = obj.productId || obj._id; // выбираем ID товара
            const isInBasket = basket?.some((item: ProductProps) => item.productId === id);
            const isInFavorites = favorites?.some((item: ProductProps) => item.productId === id);

            return (
              <Card 
                obj={{ ...obj, _id: id }} // <-- перезаписываем _id на настоящий ID товара
                key={id}
                isInFavorites={!!isInFavorites}
                isInBasket={!!isInBasket}
              />
            )
          })
        ) : null}
      </ul>
      </div>
      {/* <TopProducts/> */}
    </section>
  );
}
 
export default Favorites;