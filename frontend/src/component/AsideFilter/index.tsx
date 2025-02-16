import { useEffect, useState } from "react";
// import { motion } from "framer-motion";
import styles from "./asidefilter.module.scss";
// import { Check, ChevronDown } from "lucide-react";
// import { useAppDispatch } from "../../redux/store";
// import { setBranding } from "../../redux/slices/products";
import { ProductProps } from "../../propstype";
import axios from "../../axios";
import AsideFilterWidget from "../AsideFilterWidget";
import { setBranding, setCountry } from "../../redux/slices/products";
import { useAppDispatch } from "../../redux/store";

const AsideFilter = () => {
  const [brandData, setBrandData] = useState<string[]>();
  const [countryData, setСountryData] = useState<string[]>();
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  const[value, setValue] = useState('');
  const[min, setMin] = useState(0);
  const[max, setMax] = useState(0);

 
  useEffect(() => {  
    axios.get<ProductProps>(`./products`).then(res => {
      let data = res.data;
      if (Array.isArray(data)) {
        // Защита от undefined и null значений
        const categories = ["all Branding", ...new Set(data.map(item => item.category).filter(category => category))];
        const country = ["all Сountry", ...new Set(data.map(item => item.country).filter(country => country))];
        setBrandData(categories);
        setСountryData(country);
      }
      setIsLoading(false)
    }).catch(err => {
      console.warn(err);
    })
  }, [])

  const handleBrand = (name: string) => {
    dispatch(setBranding(name.toLocaleLowerCase()));
  };

  const handleCountry = (name: string) => {
    dispatch(setCountry(name.toLocaleLowerCase().replace(/\s+/g, '')));
    // console.log(name.toLocaleLowerCase().replace(/\s+/g, ''))
  };

  const changePrice = (e: React.ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
    // dispatch(priceChange(Number(e.target.value)));
  }



  // let max = 0;
  // data.map(item => (item.price - (item.price * item.sale) / 100) > max ? max = (item.price - (item.price * item.sale) / 100) : null)
  // setMax(max);

  // let min = data[0].price - (data[0].price * data[0].sale) / 100;
  // data.map(item => (item.price - (item.price * item.sale) / 100) < max ? max = (item.price - (item.price * item.sale) / 100) : null)
  // setMin(min)



  return (
    <aside className={styles.filters}>
      
      <AsideFilterWidget dispatchHandle={handleBrand} title='Brand' isLoading={isLoading} data={brandData}/>
      <AsideFilterWidget dispatchHandle={handleCountry} title='Country' isLoading={isLoading} data={countryData}/>

      <div className="filter-price">
            <input type="range" id="vol" name="vol" defaultValue={0} min={min} max={max} onChange={changePrice} />
            <div className="filter-price__value">{value && `from ${value} € to ${max} €`}</div>
            <div className="filter-price__prices">
              <span>{min} €</span>
              <span>{max} €</span>
            </div>
      </div>

    </aside>
  );
};

export default AsideFilter;

