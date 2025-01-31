import styles from './catalog.module.scss';
import { RootState, useAppDispatch } from '../../redux/store';
import { fetchProducts } from '../../redux/slices/products';
import { useSelector } from 'react-redux';
import React from 'react';
import Loader from '../../Loader';
import { ProductProps } from '../../propstype';
import Card from '../Card';


const Catalog = () => {
  const dispatch = useAppDispatch();
  // const isAuth = useSelector(selectIsAuth);
  const products = useSelector((state: RootState) => state.products.data);
  const basket = useSelector((state: RootState) => state.basket.data);
  const favorites = useSelector((state: RootState) => state.favorites.data);

  const search = useSelector((state: RootState) => state.search.search);

  const status = useSelector((state: RootState) => state.products.status);
  const isLoading = status === 'loadingg';

  React.useEffect(() => {
    dispatch(fetchProducts())
  }, [dispatch])

  return (
    <section className={styles.catalog}>
    <div className="container">
      <ul className={styles.list}>
        {isLoading ? (
          [...Array(5)].map((_, index) => <Loader key={index} />)
        ) : status === 'loaded' ? (
          products
          .filter((item: ProductProps) => {
            return item.name.toLowerCase().includes(search.toLowerCase());
          })
          .map((obj: ProductProps) => {
            const isInBasket = basket?.find((item: ProductProps) => item._id === obj._id);
            const isInFavorites = favorites?.find((item: ProductProps) => item._id === obj._id);
            return (
              <Card obj={obj} key={obj._id} isInBasket={!!isInBasket}  isInFavorites={!!isInFavorites} />
            )
          })
        ) : null}
      </ul>
    </div>
  </section>
  
  );
}
 
export default Catalog;