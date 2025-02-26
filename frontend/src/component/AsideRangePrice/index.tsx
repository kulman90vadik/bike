import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { useAppDispatch } from "../../redux/store";
import { setRangePrice } from "../../redux/slices/products";

type Props = {
  isLoading: boolean;
  max: number;
  min: number;
}

const AsideRangePrice = ({isLoading, max, min}: Props) => {
    const dispatch = useAppDispatch();
    let n = Math.trunc(min);
    useEffect(() => {
      setValue(String(n));
    }, [min])

  const [value, setValue] = useState(String(Math.trunc(min)));
  const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(setRangePrice(e.target.value))
    setValue(e.target.value);
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
