// import { Search } from "lucide-react";
import { Search, X } from "lucide-react";
import styles from "./search.module.scss";
import React from "react";

const SearchBox = () => {
  const[open, setOpen] = React.useState(false);
  const[value, setValue] = React.useState('');
  const ref = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const openSearchHandler = (event: MouseEvent) => {
      const e = event as MouseEvent;
      if (ref.current && !e.composedPath().includes(ref.current)) {
        setOpen(false);
        setValue('');
      }
    };
    document.body.addEventListener("click", openSearchHandler);
    return () => {
      document.body.removeEventListener("click", openSearchHandler);
    };
  }, []);



  return (
    <div className={styles.search} ref={ref}>
      <button className={styles.searchBtn} onClick={() => setOpen(!open)}>
        <Search />
      </button>
      <div className={styles.box}>

      <input
        value={value}
        placeholder="... Search Name"
        onChange={(e) => setValue(e.target.value)}
        className={`${styles.input} ${open ? styles.show : styles.hidden}`}
        type="text"
        />
      {value &&
        <button className={styles.close} onClick={() => setValue('')}>
          <X />
        </button>
      }
      </div>
    </div>
  );
};

export default SearchBox;
