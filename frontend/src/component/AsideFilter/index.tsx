import { useEffect, useState } from "react"
import styles from "./asidefilter.module.scss"
// import { ProductProps } from "../../propstype"
import AsideFilterWidget from "../AsideFilterWidget"
import { setBranding, setCountry } from "../../redux/slices/products"
import { RootState, useAppDispatch } from "../../redux/store"
import AsideRangePrice from "../AsideRangePrice"
import { useSelector } from "react-redux"
import { useTranslation } from "react-i18next"

const AsideFilter = () => {
    const {allproducts} = useSelector((state: RootState) => state.products)
    const { t } = useTranslation()

    const [brandData, setBrandData] = useState<string[]>()
    const [countryData, setСountryData] = useState<string[]>()
    const [max, setMax] = useState(0)
    const [min, setMin] = useState(0)
    const [isLoading, setIsLoading] = useState(true)
    const dispatch = useAppDispatch()

    // МОЖЕТ НА ЭТО ПЕРЕВЕСТИ ??????
    //  const products = useSelector((state: RootState) => state.products.allproducts)
    useEffect(() => {
        // axios
        //   .get<ProductProps[]>(`./products`)
        //   .then((res) => {
        //     let data = res.data;
        if (Array.isArray(allproducts)) {
            const categories = [
                "all Branding",
                ...new Set(allproducts.map(item => item.category).filter(category => category))
            ]
            const country = ["all Сountry", ...new Set(allproducts.map(item => item.country).filter(country => country))]

            const maxPrice = allproducts.reduce((max, product) => {
                const finalPrice = Number(product.price) * (1 - Number(product.sale?.replace("%", "")) / 100)
                return finalPrice > max ? finalPrice : max
            }, 0)

            const minPrice = allproducts?.reduce((min, product) => {
                const finalPrice = Number(product.price) * (1 - Number(product.sale?.replace("%", "")) / 100)
                return finalPrice < min ? finalPrice : min
            }, Infinity)

            setBrandData(categories)
            setСountryData(country)
            setMax(maxPrice)
            setMin(minPrice)

            setIsLoading(false);
        }
    }, [allproducts])

    useEffect(() => {
        if (Array.isArray(allproducts)) {
            const maxPrice = allproducts.reduce((max, product) => {
                const finalPrice = Number(product.price) * (1 - Number(product.sale?.replace("%", "")) / 100)
                return finalPrice > max ? finalPrice : max
            }, 0)
            const minPrice = allproducts.reduce((min, product) => {
                const finalPrice = Number(product.price) * (1 - Number(product.sale?.replace("%", "")) / 100)
                return finalPrice < min ? finalPrice : min
            }, Infinity)

            setMax(maxPrice)
            setMin(minPrice)
            setIsLoading(false);
        }
    }, [allproducts])

    const handleBrand = (name: string) => {
        dispatch(setBranding(name.toLocaleLowerCase()))
        // dispatch(setPage(1))
    }

    const handleCountry = (name: string) => {
        dispatch(setCountry(name.toLocaleLowerCase().replace(/\s+/g, "")))
    }

    return (
        <aside className={styles.filters}>
            <AsideFilterWidget dispatchHandle={handleBrand} 
            title={t("filterwidget.title")} isLoading={isLoading} data={brandData} />
            <AsideFilterWidget
                dispatchHandle={handleCountry}
                title={t('filterwidget.country')}
                isLoading={isLoading}
                data={countryData}
            />
            <AsideRangePrice isLoading={isLoading} max={max} min={min} />
        </aside>
    )
}

export default AsideFilter
