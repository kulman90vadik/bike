import React from 'react';
import { fetchProductsPag } from '../../redux/slices/products';
import { RootState, useAppDispatch } from '../../redux/store';
import styles from './pagination.module.scss';
import { useSelector } from 'react-redux';


type Props = {
  totalPages: number
  page: number
}

const Pagination = ({ totalPages, page }: Props) => {
  const dispatch = useAppDispatch();
  const { limit } = useSelector((state: RootState) => state.products);

  const clickPage = (n: number) => {
    dispatch(fetchProductsPag({page: n, limit}))
  }



  return (
    <ul className={styles.pagination}>
      {totalPages > 1 && [...Array(totalPages)].map((_, index) => {
        return (
          <li key={index} className={styles.item}>
            <button 
              onClick={() => clickPage(index + 1)}
              className={`${styles.btn} ${page === index + 1 ? styles.active : ''}`}>
              {index + 1}
            </button>
          </li>
        );
      })}
    </ul>
  );
};

export default Pagination;
