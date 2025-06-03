import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import styles from "./widget.module.scss";
import { Check, ChevronDown } from "lucide-react";
import LoaderLine from "../../LoaderLine";

type Props = {
  isLoading: boolean;
  title: string;
  dispatchHandle: (name: string) => void;
  data: string[] | undefined;
}

const AsideFilterWidget = ({isLoading, title, data, dispatchHandle}: Props) => {
  const [openWidget, setOpenWidget] = useState(true);

  return (
    <div className={styles.widget}>
    <button
      type="button"
      className={`${styles.heading} ${openWidget ? styles.rotate : ""}`}
      onClick={() => setOpenWidget(!openWidget)}
    >
      
      
      {title}
      <ChevronDown />
    </button>
    <AnimatePresence 
    initial={false} 
    >
      
      <motion.ul
        // initial={{ height: 0, opacity: 0 }}
        exit={{ height: 0, opacity: 0}}
        animate={{
          height: openWidget ? "auto" : 0,
          opacity: openWidget ? 1 : 0,
        }}
        transition={{ duration: 0.3 }}
        className={styles.list}
      >
        
        {isLoading ? 
          <ul className={styles.listtttt}>
            {[...Array(5)].map((_, index) => (
              <li  key={index}>
              <LoaderLine />
              </li>
            ))}
          </ul>
          
        
        :
        data?.map((item) => {
          return (
            <li
              className={styles.item}
              key={item}
            >
              <label className={styles.label} onClick={() => dispatchHandle(item)}>
                <input className={styles.input} name={title} type="radio" />
                <span><Check /></span>
                {item}
              </label>
            </li>
          );
        })}
      </motion.ul>
    </AnimatePresence>
  </div>
  );
}
 
export default AsideFilterWidget;