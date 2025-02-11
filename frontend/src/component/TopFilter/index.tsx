import React, { useEffect } from "react";
import styles from "./topfilter.module.scss";
import { RootState, useAppDispatch } from "../../redux/store";
import { fetchSortProducts, setSortOrder, setSale } from "../../redux/slices/products";
import { useSelector } from "react-redux";

const TopFilter = () => {
  const dispatch = useAppDispatch();
  const {sortOrder, sales} = useSelector((state: RootState) => state.products);
  const [count, setCount] = React.useState(0);
  let filters = ["All", "Sale", "New"];

  useEffect(() => {
    const sortParam = sortOrder ? `sort=${sortOrder}` : '';
    const saleParam = sales ? `filter=${sales}` : '';
    const queryString = `${sortParam}${sortParam && saleParam ? '&' : ''}${saleParam}`;

    dispatch(fetchSortProducts(queryString));
  }, [sortOrder, sales]);


  const handleSale = (button: string, index: number) => {
    dispatch(setSale(button.toLowerCase()))
    setCount(index);
  }
  
  return (
    <div className={styles.top}>
     <button className={styles.sort}
      onClick={() => dispatch(setSortOrder(sortOrder === "asc" ? "desc" : "asc"))}>
         Sort by price ({sortOrder === "asc" ? "↑" : "↓"})
      </button>

      <ul className={styles.list}>
        {filters?.map((button, index) => {
          return (
          <li key={index} className={styles.item}>
            <button 
              className={`${styles.btn} ${index === count ? styles.btnorange : ''}`} 
              type="button" 
              onClick={() => handleSale(button, index)}>
                {button}
            </button>
          </li>
          )
        })}
      </ul>
    </div>
  );
};

export default TopFilter;
