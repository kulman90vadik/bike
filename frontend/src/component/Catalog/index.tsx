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
          products?.map((obj: ProductProps) => (
            <Card obj={obj} key={obj._id} />
          ))
        ) : null}
      </ul>
    </div>
  </section>
  
  );
}
 
export default Catalog;