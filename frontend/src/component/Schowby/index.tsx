import React from "react";
import { fetchProductsPag } from "../../redux/slices/products";
import { useAppDispatch } from "../../redux/store";
import styles from "./schow.module.scss";
import { isArray } from "lodash";

type Props = {
  schowArr: number[];
};

const Schowby = ({ schowArr }: Props) => {
  const[count, setCount] = React.useState(0);
  const dispatch = useAppDispatch();

  const handleClick = (item: number, index: number) => {
    // console.log(count, index);
    setCount(index)
    dispatch(fetchProductsPag({limit: item}))
  }
  
  // console.log(count);

  return (
    <div className={styles.block}>
      Show:
      <ul className={styles.list}>
        {isArray(schowArr) &&
          schowArr.map((item, index) => {
            return (
              <li className={styles.item} key={index}>
                <button className={`${styles.btn} ${count === index ? styles.active : ''}`}
                  onClick={() => handleClick(item, index)}
                >{item}</button>
              </li>
            );
          })}
      </ul>
      per page
    </div>
  );
};

export default Schowby;
