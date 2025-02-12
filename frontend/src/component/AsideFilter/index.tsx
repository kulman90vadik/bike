import { useState } from "react";
import { motion } from "framer-motion";
import styles from "./asidefilter.module.scss";
import { Check, ChevronDown } from "lucide-react";
import { RootState, useAppDispatch } from "../../redux/store";
import { setBranding } from "../../redux/slices/products";
import { useSelector } from "react-redux";
// import { useSelector } from "react-redux";

const brandData = [
  { id: 0, name: "Scott" },
  // { id: 1, name: "Marlin" },
  { id: 2, name: "Trek" },
  { id: 3, name: "Orbea" },
  { id: 4, name: "Look" },
];

const AsideFilter = () => {
  const [openWidget, setOpenWidget] = useState(true);
  const dispatch = useAppDispatch();
  // const { branding} = useSelector((state: RootState) => state.products);
  const handleBrand = (name: string) => {
    const n = name.toLocaleLowerCase();

    // Проверяем, есть ли уже этот бренд в массиве
    // const isPresent = branding.includes(n);
    
    // if (isPresent) {
    //   // Если уже есть, удаляем
    //   dispatch(delsetBranding(n));
    // } else {
      // Если нет, добавляем
      dispatch(setBranding(n));
    // }
};


  return (
    <aside className={styles.filters}>
      <div className={styles.widget}>
        <button
          type="button"
          className={`${styles.heading} ${openWidget ? styles.rotate : ""}`}
          onClick={() => setOpenWidget(!openWidget)}
        >
          Brand
          <ChevronDown />
        </button>
        <motion.ul
          // initial={{ height: 0, opacity: 0 }}
          animate={{
            height: openWidget ? "auto" : 0,
            opacity: openWidget ? 1 : 0,
          }}
          transition={{ duration: 0.3 }}
          className={styles.list}
        >
          {brandData.map((item, index) => {
            return (
              <li
                
                className={styles.item}
                key={item.id}
              >
                <label className={styles.label} onClick={() => handleBrand(item.name)}>
                  <input className={styles.input} type="checkbox" />
                  <span>
                    <Check />
                  </span>
                  {item.name}
                </label>
              </li>
            );
          })}
        </motion.ul>
      </div>
      <div>Test</div>
    </aside>
  );
};

export default AsideFilter;

{
  /* <ul
              className="catalog__price-list"
              style={{ maxHeight: open ? "500px" : "0px" }}
            >
              {sortPrice.map((el, index) => (
                <li
                  className="catalog__price-item"
                  key={el.title}
                  onClick={() => clickItemPrice(index, el.id)}
                >
                  {el.title}
                </li>
              ))}
            </ul> */
}
