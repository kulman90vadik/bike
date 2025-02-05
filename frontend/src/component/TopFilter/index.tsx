import React from "react";
import styles from "./topfilter.module.scss";
import { useAppDispatch } from "../../redux/store";
import { fetchSortProducts } from "../../redux/slices/products";

const TopFilter = () => {
  const dispatch = useAppDispatch();
  const [sortOrder, setSortOrder] = React.useState("asc");

  const toggleSortOrder = () => {
    dispatch(fetchSortProducts(sortOrder === "asc" ? "desc" : "asc"));
    setSortOrder(prevOrder => (prevOrder === "asc" ? "desc" : "asc"));
  }
  
  
  return (
    <div className={styles.top}>
     <button className={styles.sort} onClick={toggleSortOrder}>
         Sort by price ({sortOrder === "asc" ? "↑" : "↓"})
      </button>
    </div>
  );
};

export default TopFilter;
