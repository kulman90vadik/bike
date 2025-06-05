import { useTranslation } from "react-i18next";
import { fetchProductsPag } from "../../redux/slices/products";
import { useAppDispatch } from "../../redux/store";
import styles from "./schow.module.scss";
import { isArray } from "lodash";

type Props = {
  schowArr: number[];
  count: number;
  handleCount: (n: number ) => void
};

const Schowby = ({ schowArr, count, handleCount }: Props) => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation()
  const handleClick = (item: number, index: number) => {
    dispatch(fetchProductsPag({limit: item}))
    setTimeout(() => handleCount(index), 0);
  }
  

  return (
    <div className={styles.block}>
      {t('pagination.show')}
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
      {t('pagination.per')}
    </div>
  );
};

export default Schowby;
