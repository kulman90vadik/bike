// import { Search } from "lucide-react";
import { Search, X } from "lucide-react";
import styles from "./search.module.scss";
import React from "react";
// import { useSelector } from "react-redux";
import { useAppDispatch } from "../../redux/store";
import { searchValue, searchValueClear } from "../../redux/slices/search";

const SearchBox = () => {
  const[open, setOpen] = React.useState(false);
  const[value, setValue] = React.useState('');
  const ref = React.useRef<HTMLDivElement>(null);
  const dispatch = useAppDispatch();

  React.useEffect(() => {
    const openSearchHandler = (event: MouseEvent) => {
      const e = event as MouseEvent;
      if (ref.current && !e.composedPath().includes(ref.current)) {
        setOpen(false);
        dispatch(searchValueClear());        
        setValue('');
      }
    };
    document.body.addEventListener("click", openSearchHandler);
    return () => {
      document.body.removeEventListener("click", openSearchHandler);
    };
  }, []);


  const focusElement = () => {
    setOpen(!open);
    const screenHeight = window.innerHeight;
    window.scrollTo({
     top: screenHeight - 170,
      behavior: 'smooth', // Плавный скролл
    });
  }

  const changeSearch = (event: React.ChangeEvent<HTMLInputElement>) => {
    dispatch(searchValue(event.target.value));
    setValue(event.target.value)
  }


  const handleValue = () => {
    setValue('');
    dispatch(searchValue(''));
  }


  return (
    <div className={styles.search} ref={ref}>
      <button className={styles.searchBtn} onClick={focusElement}>
        <Search />
      </button>
      <div className={styles.box}>
      <input
        value={value}
        placeholder="...Search Name Bike"
        onChange={(event) => changeSearch(event)}
       
        className={`${styles.input} ${open ? styles.show : styles.hidden}`}
        type="text"
        />
      {value &&
        <button className={styles.close} onClick={() => handleValue()}>
          <X />
        </button>
      }
      </div>
    </div>
  );
};

export default SearchBox;
