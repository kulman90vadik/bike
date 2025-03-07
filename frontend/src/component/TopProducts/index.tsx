import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './topProducts.module.scss';
import "swiper/css";
import Card from "../Card";
import { Autoplay } from "swiper/modules";
import { ProductProps } from "../../propstype";


const TopProducts = () => {
  const topProducts = useSelector((state: RootState) => state.topproducts.data);
  const basket = useSelector((state: RootState) => state.basket.data);
  const favorites = useSelector((state: RootState) => state.favorites.data);

  return (
    <div className={styles.wrapper}>
      <h1 className={styles.title}>Top Viewed Products</h1>
        <Swiper
          breakpoints={{
            // 991: {
            //   slidesPerView: 4,
            //   // spaceBetween: 20,
            // },
            // 650: {
            //   slidesPerView: 2.5,
            // },
            // 450: {
            //   slidesPerView: 2.5,
            //   spaceBetween: 10,
            // },
          }}

          className={styles.slider}
          spaceBetween={30}
          slidesPerView={3.5}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => {
            // Явно запускаем автоплей при инициализации
            swiper.autoplay.start();
          }}
          // onSlideChange={() => console.log('slide change')}
          // onSwiper={(swiper) => console.log(swiper)}
        >
          {topProducts
          .map((obj: ProductProps) => {
            const isInBasket = basket?.some((item: ProductProps) => item._id === obj._id  );
            const isInFavorites = favorites?.some((item: ProductProps) => item._id === obj._id );
            return (
              <SwiperSlide key={obj._id}>
                  <Card obj={obj} isInBasket={!!isInBasket} isInFavorites={!!isInFavorites}/>
              </SwiperSlide>
            )
          })}
        </Swiper>
      </div>
  );


}

export default TopProducts;