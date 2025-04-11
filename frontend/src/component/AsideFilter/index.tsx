import { useEffect, useState } from "react";
import styles from "./asidefilter.module.scss";
import { ProductProps } from "../../propstype";
import axios from "../../axios";
import AsideFilterWidget from "../AsideFilterWidget";
import { setBranding, setCountry } from "../../redux/slices/products";
import { RootState, useAppDispatch } from "../../redux/store";
import AsideRangePrice from "../AsideRangePrice";
import { useSelector } from "react-redux";




const AsideFilter = () => {
  const products = useSelector((state: RootState) => state.products.data);
  const [brandData, setBrandData] = useState<string[]>();
  const [countryData, setСountryData] = useState<string[]>();
  const [max, setMax] = useState(0);
  const [min, setMin] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useAppDispatch();

  
 
  useEffect(() => {  
    axios.get<ProductProps>(`./products`).then(res => {
      let data = res.data;
      if (Array.isArray(data)) {
        const categories = ["all Branding", ...new Set(data.map(item => item.category).filter(category => category))];
        const country = ["all Сountry", ...new Set(data.map(item => item.country).filter(country => country))];
        
        const maxPrice = data?.reduce((max, product) => {
          const finalPrice = Number(product.price) * (1 - Number(product.sale?.replace("%", "")) / 100);
          return finalPrice > max ? finalPrice : max;
        }, 0);

        const minPrice = data?.reduce((min, product) => {
          const finalPrice = Number(product.price) * (1 - Number(product.sale?.replace("%", "")) / 100);
          return finalPrice < min ? finalPrice : min;
        }, Infinity);

        setBrandData(categories);
        setСountryData(country);
        setMax(maxPrice);
        setMin(minPrice);
      }
      setIsLoading(false)
    }).catch(err => {
      console.warn(err);
    })
  }, [])
  
  useEffect(() => {  
        const maxPrice = products?.reduce((max, product) => {
          const finalPrice = Number(product.price) * (1 - Number(product.sale?.replace("%", "")) / 100);
          return finalPrice > max ? finalPrice : max;
        }, 0);
        const minPrice = products?.reduce((min, product) => {
          const finalPrice = Number(product.price) * (1 - Number(product.sale?.replace("%", "")) / 100);
          return finalPrice < min ? finalPrice : min;
        }, Infinity);

        setMax(maxPrice);
        setMin(minPrice);
        setIsLoading(false)
  }, [products])
  

  const handleBrand = (name: string) => {
    dispatch(setBranding(name.toLocaleLowerCase()));
  };


  const handleCountry = (name: string) => {
    dispatch(setCountry(name.toLocaleLowerCase().replace(/\s+/g, '')));
  };

  return (
    <aside className={styles.filters}>
      <AsideFilterWidget dispatchHandle={handleBrand} title='Brand' isLoading={isLoading} data={brandData}/>
      <AsideFilterWidget dispatchHandle={handleCountry} title='Country' isLoading={isLoading} data={countryData}/>
      <AsideRangePrice isLoading={isLoading} max={max} min={min}/>
    </aside>
  );
};


export default AsideFilter;

