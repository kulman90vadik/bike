import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useAppDispatch } from "../../redux/store";
import { setPrice } from "../../redux/slices/products";

import { debounce } from "lodash";
import React from "react";


type Props = {
  isLoading: boolean;
  max: number;
  min: number;
}



const AsideRangePrice = ({isLoading, max, min}: Props) => {
  const [value, setValue] = useState(String(Math.trunc(min)));
    const dispatch = useAppDispatch();


    const debouncedDispatch = React.useMemo( () =>
        debounce((val: number) => {
          dispatch(setPrice(val));
        }, 400), // 300 мс задержка
      [dispatch]
    );

    let n = Math.trunc(min);
    useEffect(() => {
      setValue(String(n));
    }, [min])


 const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = Number(e.target.value);
    setValue(e.target.value);
    debouncedDispatch(val);
  };

  return (
    <div className={styles.range}>
    {isLoading ? (
      <p>... Loading</p>
    ) : (
      <>
        <input
        className={styles.input}
          type="range"
          id="vol"
          name="vol"
          value={value}
          // defaultValue={0}
          min={Math.trunc(min)}
          max={Math.trunc(max)}
          // step={10}
          onChange={changePrice}
        />
        {
          min > 0 && max > 0 ?
          <div className={styles.value}>
            {`from ${value} € to ${Math.trunc(max)} €`}
          </div>
        :
          ''  
        }
        <div className={styles.block}>
          <span>{Math.trunc(min)} €</span>
          <span>{Math.trunc(max)} €</span>
        </div>
      </>
    )}
  </div>
  
  );
};

export default AsideRangePrice;
function sortProducts(arg0: { price: number; }): any {
  throw new Error("Function not implemented.");
}

