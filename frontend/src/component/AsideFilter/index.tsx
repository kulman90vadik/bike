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
    console.log(name.toLocaleLowerCase().replace(/\s+/g, ''))
  };

 


  return (
    <aside className={styles.filters}>
      
      <AsideFilterWidget dispatchHandle={handleBrand} title='Brand' isLoading={isLoading} data={brandData}/>
      <AsideFilterWidget dispatchHandle={handleCountry} title='Country' isLoading={isLoading} data={countryData}/>

    </aside>
  );
};

export default AsideFilter;

