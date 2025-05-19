import { RootState } from "../../redux/store";
import { useSelector } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './topproducts.module.scss';
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
            1050: {
              slidesPerView: 3.5,
            },
            650: {
              slidesPerView: 2.5,
            },
            450: {
              slidesPerView: 1.65,
            },
          }}


          className={styles.slider}
          spaceBetween={20}
          slidesPerView={1.25}
          loop={true}
          modules={[Autoplay]}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          onSwiper={(swiper) => {
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