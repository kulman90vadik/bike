import React from "react"
import { useParams } from "react-router-dom"
import { ProductProps } from "../../propstype"
import styles from "./fullproduct.module.scss"
import { RootState, useAppDispatch } from "../../redux/store"
import { fetchBasket } from "../../redux/slices/basket"
import { useSelector } from "react-redux"
import Review from "../../component/Review"
import { fetchProduct } from "../../redux/slices/fullproduct"

import { Swiper, SwiperSlide } from "swiper/react"
import type { Swiper as SwiperClass } from "swiper"

// Import Swiper styles
import "swiper/swiper-bundle.css"

import { FreeMode, Thumbs } from "swiper/modules"
// import SimpleZoom from "../../component/SimpleZoom";
import InnerImageZoom from "react-inner-image-zoom"

import "react-inner-image-zoom/lib/styles.min.css"

const FullProduct = () => {
    const [thumbsSwiper, setThumbsSwiper] = React.useState<SwiperClass | null>(null)

    const dispatch = useAppDispatch()
    const { id } = useParams()
    const basket = useSelector((state: RootState) => state.basket.data)
    const fullProduct = useSelector((state: RootState) => state.fullproduct.data)
    // const isLoading = useSelector((state: RootState) => state.fullproduct.status);
    // const statusId = useSelector((state: RootState ) => state.basket.statusId);
    React.useEffect(() => {
        const fetchData = async () => {
            if (id) {
                await dispatch(fetchProduct(id))
            }
        }

        fetchData()
    }, [id, dispatch])

    const addToBasket = (id: string) => {
        dispatch(fetchBasket(id))
    }

    let price = fullProduct?.sale
        ? Number(fullProduct?.price) * (1 - Number(fullProduct?.sale.replace(/%/g, "")) / 100)
        : fullProduct?.price

    const isInBasket = basket?.some((item: ProductProps) => item.productId === fullProduct?._id)

    return (
        <section className={styles.product}>
            {
                <div className="container">
                    <div className={styles.inner}>
                        <div className={styles.left}>
                            <Swiper
                                spaceBetween={10}
                                thumbs={{
                                    swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null
                                }}
                                modules={[FreeMode, Thumbs]}
                                className={`mySwiper2 ${styles.swipermy}`}
                                style={{ marginBottom: "10px" }}
                            >
                                {Array(5)
                                    .fill(0)
                                    .map((_, i) => {
                                        return (
                                            <SwiperSlide key={i} className={styles.slide}>
                                                {fullProduct?.image && (
                                                    <InnerImageZoom
                                                        className={styles.image}
                                                        zoomScale={1.6}
                                                        src={`${import.meta.env.VITE_API_BASE_URL}${fullProduct?.image}`}
                                                    />
                                                )}
                                            </SwiperSlide>
                                        )
                                    })}
                            </Swiper>

                            <Swiper
                                onSwiper={setThumbsSwiper}
                                spaceBetween={10}
                                slidesPerView={5}
                                freeMode={true}
                                watchSlidesProgress={true}
                                modules={[FreeMode, Thumbs]}
                                className="mySwiper"
                            >
                                {Array(5)
                                    .fill(0)
                                    .map((_, i) => {
                                        return (
                                            <SwiperSlide key={i}>
                                                <img
                                                    className={styles.smallimage}
                                                    src={`${import.meta.env.VITE_API_BASE_URL}${fullProduct?.image}`}
                                                    alt={fullProduct?.name}
                                                />
                                            </SwiperSlide>
                                        )
                                    })}
                            </Swiper>
                        </div>

                        <div className={styles.right}>
                            <div className={styles.info}>
                                <h1 className={styles.title}>{fullProduct?.name}</h1>
                                <div className={styles.box}>
                                    <img className={styles.flag}
                                    
                                    src={`${import.meta.env.VITE_API_BASE_URL}${fullProduct?.flag}`}
                                     alt={fullProduct?.flag} />
                                </div>
                                <div className={styles.text}>{fullProduct?.description}</div>
                                <div className={styles.price}>
                                    {Number(fullProduct?.sale) !== 0 && <span>{fullProduct?.price}</span>}
                                    {new Intl.NumberFormat("en-US", {
                                        useGrouping: true,
                                        minimumFractionDigits: 0,
                                        maximumFractionDigits: 0
                                    }).format(Number(price)) + " €"}
                                </div>
                                <button
                                    className={`${styles.btn} ${isInBasket ? styles.btngreen : ""}`}
                                    type="button"
                                    onClick={() => {
                                        if (fullProduct?._id) {
                                            addToBasket(fullProduct._id)
                                        }
                                    }}
                                >
                                    {`${isInBasket ? "Remove from Basket" : "Add to Cart"}`}
                                </button>
                            </div>
                        </div>
                    </div>

                    {fullProduct && !Array.isArray(fullProduct) && <Review />}
                </div>
                // )
            }
        </section>
    )
}

export default FullProduct
